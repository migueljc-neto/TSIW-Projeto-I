// Variável para armazenar as viagens em memória
let trips;

// Carrega as viagens do localStorage
export function init() {
  trips = localStorage.trips ? JSON.parse(localStorage.trips) : [];
}

// Devolve todas as viagens
export function getAllTrips() {
  return trips;
}

// Devolve todas as viagens que não são pacotes
export function getAllNonPacks() {
  const trips = getAllTrips();
  return trips.filter((trip) => !trip.isPack);
}

// Função de administração: define uma viagem como pacote e atribui preço
export function setPackAndPrice(tripId, newPrice) {
  const trip = trips.find((trip) => String(trip.id) === String(tripId));
  if (!trip) {
    throw new Error("Viagem não encontrada!");
  }

  trip.isPack = true;
  trip.price = newPrice;
  localStorage.setItem("trips", JSON.stringify(trips));
}

// Filtra viagens do utilizador por "passadas" ou "próximas"
export function filteredTrips(userTrips, filter) {
  const now = new Date();
  if (filter === "past") {
    // Viagens cujo início já passou
    return userTrips.filter((trip) => new Date(trip.startDate) <= now);
  }
  // Viagens cujo início é hoje ou no futuro
  return userTrips.filter((trip) => new Date(trip.startDate) >= now);
}

// Filtra viagens por ID (array de IDs)
export function getTripById(ids) {
  let trips = getAllTrips();
  return trips.filter((trip) => ids.includes(trip.id));
}

// Define a viagem atual no sessionStorage
export function setTrip(id) {
  let currentTrip = getSingleTripById(id);

  sessionStorage.setItem("currentTrip", JSON.stringify(currentTrip));
}

// Devolve uma viagem pelo ID (pode ser array de IDs)
export function getSingleTripById(id) {
  let trips = getAllTrips();
  return trips.find((trip) => id == trip.id);
}

// Remove o estado de pacote de uma viagem pelo ID
export function deleteTrip(id) {
  const numId = typeof id === "string" ? Number(id) : id;
  const trip = trips.find((trip) => trip.id === numId);
  if (trip) {
    trip.isPack = false;
    localStorage.setItem("trips", JSON.stringify(trips));
  }
}

// Devolve todas as viagens que são pacotes
export function getAllPacks() {
  const trips = getAllTrips();
  return trips.filter((trip) => trip.isPack);
}

export function getFilteredPacks(user) {
  const packs = getAllPacks();
  let filteredPacks;

  if (user) {
    filteredPacks = []; // Initialize as empty array
    packs.forEach((pack) => {
      if (!user.trips.includes(pack.id)) {
        filteredPacks.push(pack); // Push the full pack object, not just the ID
      }
    });
  } else {
    filteredPacks = packs;
  }
  console.log(packs, filteredPacks);
  return filteredPacks.filter(
    (pack) => pack.startDate > new Date().toISOString().split("T")[0]
  );
}

// Adiciona uma nova viagem
export function addTrip(flightObjects, flightsTrip, tripName, miles) {
  try {
    // Validação dos dados de entrada
    if (
      !flightObjects ||
      !Array.isArray(flightObjects) ||
      flightObjects.length === 0
    ) {
      throw new Error("Flight objects array is required and cannot be empty");
    }

    if (!tripName || typeof tripName !== "string") {
      throw new Error("Trip name is required and must be a string");
    }

    // Ordena os voos por data de partida
    const sortedFlights = [...flightObjects].sort(
      (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
    );

    // Extrai todos os tipos de turismo únicos dos voos
    let allTourismTypes = [];
    sortedFlights.forEach((flight) => {
      if (Array.isArray(flight.tourismTypes)) {
        flight.tourismTypes.forEach((typeId) => {
          if (!allTourismTypes.includes(typeId)) {
            allTourismTypes.push(typeId);
          }
        });
      }
    });

    // Obtém as datas de início e fim (apenas a data, sem hora)
    const startDate = sortedFlights[0].departureTime.split("T")[0];
    const endDate =
      sortedFlights[sortedFlights.length - 1].arrivalTime.split("T")[0];

    // Calcula o preço total somando o preço de todos os voos
    const totalPrice = flightObjects.reduce((total, flight) => {
      return total + (flight.price || 0);
    }, 0);

    // Gera um ID único para a viagem
    const tripId = Date.now();

    // Cria o novo objeto Trip
    const newTrip = new Trip(
      tripId,
      tripName,
      allTourismTypes,
      totalPrice,
      startDate,
      endDate,
      false,
      flightsTrip,
      miles
    );

    // Vai buscar as viagens atuais do storage
    let trips = getAllTrips();

    // Adiciona a nova viagem ao array
    trips.push(newTrip);

    // Guarda o array atualizado no storage
    saveTrips(trips);

    console.log("Trip added successfully:", newTrip);
    return newTrip;
  } catch (error) {
    console.error("Error in addTrip:", error);
    throw error;
  }
}

// Guarda as viagens no localStorage
export function saveTrips(trips) {
  try {
    localStorage.setItem("trips", JSON.stringify(trips));
  } catch (error) {
    console.error("Error saving trips to localStorage:", error);
  }
}

// Classe que representa uma viagem
class Trip {
  id = null;
  name = "";
  typesOfTourism = [];
  price = 0;
  startDate = "";
  endDate = "";
  isPack = false;
  flights = [];
  miles = 0;

  constructor(
    id,
    name,
    typesOfTourism = [],
    price = 0,
    startDate = "",
    endDate = "",
    isPack = false,
    flights = [],
    miles
  ) {
    this.id = id;
    this.name = name;
    this.typesOfTourism = typesOfTourism;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isPack = isPack;
    this.flights = flights;
    this.miles = miles;
  }
}
