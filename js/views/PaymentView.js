// Importa módulos de utilizadores e funções auxiliares
import * as Users from "../models/userModel.js";
import * as Helper from "../models/ModelHelper.js";
import * as Flights from "../models/flightModel.js";
import * as Trips from "../models/tripModel.js";

// Inicializa os dados de voos, utilizadores e viagens
Flights.init();
Users.init();
Trips.init();

// Obtém os parâmetros da URL (por exemplo, id da viagem)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Seleciona elementos do DOM para manipulação posterior
const milesLabel = document.getElementById("milesLabel");
const priceLabel = document.getElementById("priceLabel");
const milesCheckbox = document.getElementById("milesCheckbox");
const accumMiles = document.getElementById("accumMiles");
const form = document.querySelector("form");

// Inicializa dados do utilizador e obtém o utilizador autenticado
Users.init();
const user = Users.getUserLogged();

// Verifica se o utilizador está autenticado
if (!user) {
  console.error("User not logged in");
  window.location.href = "./login.html";
  // Termina a execução do script
  throw new Error("User not authenticated");
}

// Variáveis para guardar a viagem e os voos associados
let trip;
let flightsTrip;

// Se existir parâmetro id, obtém a viagem correspondente
if (id) {
  trip = Trips.getSingleTripById(id);
} else {
  // Caso contrário, tenta obter a viagem do sessionStorage
  const currentTripData = sessionStorage.getItem("currentTrip");
  if (currentTripData) {
    try {
      trip = JSON.parse(currentTripData);
    } catch (error) {
      console.error("Erro ao converter currentTrip do sessionStorage:", error);
      trip = null;
    }
  }
}

console.log(trip);

// Se não houver dados da viagem, redireciona para o perfil
if (!trip) {
  console.error("No trip data available");
  window.location.href = "./profile.html";
  throw new Error("No trip data available");
}

// Guarda os voos da viagem
flightsTrip = Array.from(trip.flights);

/* MOCK DATA */
let finalPrice = trip.price;
let acummulatingMiles = 900;
let tripName = trip.name;

// Quando a página carrega, preenche os dados de pagamento e configurações iniciais
window.addEventListener("DOMContentLoaded", () => {
  populatePayment();
  checkValue();
  populateAccumMiles();
  changePageTitle();
});

// Atualiza o label das milhas e verifica valor do preço
function populatePayment() {
  if (user && user.miles && user.miles.available !== undefined) {
    milesLabel.innerText = `Aplicar Milhas (${user.miles["available"]} disponíveis)`;
    checkValue();
  } else {
    console.error("User miles data not available");
    milesLabel.innerText = "Aplicar Milhas (0 disponíveis)";
  }
}

// Atualiza o preço exibido na tela
function populatePrice(price) {
  priceLabel.innerText = price + "€";
}

// Altera o título da página para incluir o nome da viagem
function changePageTitle() {
  document.title = tripName + " - " + "Pagamento";
}

// Atualiza o campo de milhas acumuladas
function populateAccumMiles() {
  accumMiles.innerText = acummulatingMiles + " milhas";
}

// Formatação automática do número do cartão
document.getElementById("cardNumber").addEventListener("input", function () {
  let value = this.value.replace(/\D/g, ""); // Remove tudo que não for número
  value = value.replace(/(.{4})/g, "$1 ").trim(); // Adiciona espaço a cada 4 dígitos
  this.value = value;
});

// Permite apenas números no campo CVV
document.getElementById("cvv").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, ""); // Remove tudo que não for número
});

// Formatação automática da data de validade no formato MM/AA
document.getElementById("expireDate").addEventListener("input", function () {
  let value = this.value.replace(/\D/g, ""); // Remove tudo que não for número
  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4); // Adiciona a barra após o mês
  }
  this.value = value.slice(0, 5); // Limita a 5 caracteres (MM/AA)
});

// Quando o checkbox de milhas é clicado, recalcula o valor do preço
milesCheckbox.addEventListener("click", () => {
  checkValue();
});

// Verifica se as milhas devem ser aplicadas e atualiza o preço exibido
function checkValue() {
  if (milesCheckbox.checked) {
    // Verifica se o utilizador tem milhas disponíveis
    if (user && user.miles && user.miles.available > 0) {
      // Aplica desconto usando milhas disponíveis do utilizador
      let discountedPrice = Helper.calculateDiscount(
        user.miles.available,
        finalPrice
      );
      populatePrice(discountedPrice);
    } else {
      // Se não tem milhas, desmarca o checkbox e exibe preço normal
      milesCheckbox.checked = false;
      populatePrice(finalPrice);
      alert("Não tem milhas disponíveis para aplicar.");
    }
  } else {
    // Exibe o preço normal
    populatePrice(finalPrice);
  }
}

// Handler do submit do formulário de pagamento
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtém o número do cartão
  const cardNumber = document.getElementById("cardNumber").value;

  // Valida os campos do formulário
  if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Simula processamento do pagamento
  const paymentData = {
    tripId: trip.id,
    userId: user.id,
    amount: milesCheckbox.checked
      ? Helper.calculateDiscount(user.miles.available, finalPrice)
      : finalPrice,
    cardNumber: cardNumber,
    milesUsed: milesCheckbox.checked ? user.miles.available : 0,
  };

  console.log("Dados do pagamento:", paymentData);

  // Calcula milhas a serem descontadas
  let milesToDraw = milesCheckbox.checked ? user.miles.available : 0;

  // Se não existir parâmetro id, significa que é uma nova viagem a ser criada
  if (!id) {
    try {
      const flightObjects = Flights.getFlightsByIds(flightsTrip);

      if (flightObjects.length === 0) {
        throw new Error("Voos não encontrados");
      }

      // Cria a viagem com os objetos de voo
      const newTrip = Trips.addTrip(flightObjects, flightsTrip, tripName);

      console.log("Nova viagem criada:", newTrip);
      Users.addTripToUser(user.id, newTrip.id);

      // Atualiza as milhas
      Users.updateUserMiles(user.id, milesToDraw, acummulatingMiles);
    } catch (error) {
      console.error("Erro ao criar viagem:", error);
      alert("Erro ao processar a viagem. Tente novamente.");
      return;
    }
  } else {
    // Para viagem existente, apenas atualiza as milhas
    Users.updateUserMiles(user.id, milesToDraw, acummulatingMiles);
    Users.addTripToUser(user.id, trip.id);
  }

  alert("Pagamento processado com sucesso!");
  window.location.href = "./profile.html";
});
