// Variável para armazenar os voos em memória
let flights;

// Carrega os voos do localStorage
export function init() {
  flights = localStorage.flights ? JSON.parse(localStorage.flights) : [];
}

// Adiciona um novo voo e guarda no localStorage
export function addFlight(flight) {
  flights.push(flight);
  localStorage.setItem("flights", JSON.stringify(flights));
}

// Devolve todos os voos
export function getAllFlights() {
  return flights;
}

// Devolve os voos cujos IDs estão presentes no array fornecido
export function getFlightByTripId(ids) {
  let flights = getAllFlights();
  return flights.filter((trip) => ids.includes(trip.id));
}

// Devolve um voo pelo seu ID
export function getFlightById(id) {
  const flights = getAllFlights();
  return flights.find((flight) => flight.id === id);
}

// Procura um voo alternativo para uma determinada ligação (escala)
export function findAlternateLeg(from, to, flightList) {
  const flights = getAllFlights();

  // Encontra o voo de escala (legFlight) que termina em 'to'
  let legFlight = flights.find((flight) => flight.destination === to);

  console.log(legFlight);

  // Encontra o voo alternativo que parte de 'from' e chega ao ponto de partida do legFlight
  let newFlight = flights.find(
    (flight) =>
      flight.destination == legFlight.origin &&
      flight.origin == from &&
      legFlight.departureTime > flight.arrivalTime
  );
  console.log(newFlight);

  // Encontra o índice do 'from' na lista de destinos
  const index = flightList.findIndex((destination) => destination === to);

  // Só faz a alteração se o índice for válido e o destino seguinte for 'to'
  if (index !== -1) {
    const array1 = flightList.slice(0, index);
    const array2 = flightList.slice(index, flightList.length);

    array2.unshift(newFlight.destination);

    let newArray = array1.concat(array2);
    console.log(newArray);
    return newArray;
  }
}

// Devolve todos os voos entre duas cidades específicas
export function getAllFlightsByLeg(from, to) {
  const allFlights = getAllFlights();
  return allFlights.filter((f) => f.origin === from && f.destination === to);
}

// Elimina um voo pelo seu ID
export function deleteFlight(id) {
  const numId = typeof id === "string" ? Number(id) : id;

  const index = flights.findIndex((flight) => flight.id === numId);

  flights.splice(index, 1);
  localStorage.setItem("flights", JSON.stringify(flights));
}

// Devolve todos os aeroportos de origem únicos dos voos disponíveis
export function getAllUniqueOrigins() {
  const flights = getAllFlights();

  const origins = flights.map((flight) => flight.origin);

  const uniqueOrigins = [...new Set(origins)];
  console.log(uniqueOrigins);

  return uniqueOrigins;
}

// Filtra as origens únicas pelo texto fornecido
export function getFilteredOrigins(filterText) {
  let uniqueOrigins = getAllUniqueOrigins();

  return uniqueOrigins.filter((origin) =>
    origin.toLowerCase().includes(filterText.toLowerCase())
  );
}

// Extrai dados de viagem a partir de um array de IDs de voos
export function extractTripDataFromFlights(flightIds) {
  // Obtém os objetos de voo a partir dos IDs
  const flightsArray = getFlightsByIds(flightIds);

  if (flightsArray.length === 0) {
    throw new Error("Nenhum voo encontrado");
  }

  // Ordena os voos por data de partida
  flightsArray.sort(
    (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
  );

  // Extrai todos os tipos de turismo únicos dos voos
  let allTourismTypes = [];
  flightsArray.forEach((flight) => {
    if (Array.isArray(flight.tourismTypes)) {
      flight.tourismTypes.forEach((typeId) => {
        if (!allTourismTypes.includes(typeId)) {
          allTourismTypes.push(typeId);
        }
      });
    }
  });

  // Obtém as datas de início e fim (apenas a data, sem hora)
  const startDate = flightsArray[0].departureTime.split("T")[0];
  const endDate =
    flightsArray[flightsArray.length - 1].arrivalTime.split("T")[0];

  // Gera um ID único
  const id = Date.now();

  return {
    id,
    typesOfTourism: allTourismTypes,
    startDate,
    endDate,
  };
}

// Importa o próprio modelo de voos para funções auxiliares
import * as Flights from "./flightModel.js";

// Função auxiliar para obter voos por IDs
export function getFlightsByIds(flightIds) {
  const allFlights = Flights.getAllFlights();
  return allFlights.filter((flight) => flightIds.includes(flight.id));
}

// Devolve todos os voos a partir de uma origem específica
export function getFlightsByOrigin(originGet) {
  const flights = getAllFlights();

  const filteredFlights = flights.filter(
    (flight) => flight.origin === originGet
  );

  return filteredFlights;
}

export function getFlightBadges(flightObjects) {
  let badges = [];

  flightObjects.forEach((flight) => {
    badges.push(flight.badge);
  });

  return [...new Set(badges)];
}

// FUNÇÃO DE MODELO: Cria um voo a partir dos dados do formulário
export function createFlightFromFormData(formData) {
  const flightData = {
    id: Date.now(),
    origin: formData.origin,
    originName: formData.originName,
    destination: formData.destination,
    destinationName: formData.destinationName,
    departureTime: formData.departureTime,
    arrivalTime: formData.arrivalTime,
    price: parseFloat(formData.price) || 0,
    duration: formData.duration,
    company: formData.company,
    distance: parseFloat(formData.distance) || 0,
    originLat: parseFloat(formData.originLat) || 0,
    originLong: parseFloat(formData.originLong) || 0,
    destinLat: parseFloat(formData.destinLat) || 0,
    destinLong: parseFloat(formData.destinLong) || 0,
    pois: formData.pois || [],
    tourismTypes: formData.tourismTypes || [],
    badge: formData.badge,
  };

  // Cria uma instância de voo com a ordem correta dos parâmetros
  const flight = new Flight(
    flightData.id,
    flightData.origin,
    flightData.originName,
    flightData.destination,
    flightData.destinationName,
    flightData.departureTime,
    flightData.arrivalTime,
    flightData.price,
    flightData.duration,
    flightData.company,
    flightData.distance,
    flightData.pois,
    flightData.originLat,
    flightData.originLong,
    flightData.destinLat,
    flightData.destinLong,
    flightData.tourismTypes,
    flightData.badge
  );

  return flight;
}

// FUNÇÃO DE MODELO: Guarda o voo criado a partir dos dados do formulário
export function saveFlightFromData(formData) {
  const flight = createFlightFromFormData(formData);
  addFlight(flight);
  return flight;
}

// Classe que representa um voo
export function filterByTourismId(flightArray, tourismId) {
  if (tourismId === "todos") {
    return flightArray;
  }
  return flightArray.filter((flight) =>
    flight.tourismTypes.includes(tourismId)
  );
}

class Flight {
  id = null;
  origin = "";
  originName = "";
  destination = "";
  destinationName = "";
  departureTime = "";
  arrivalTime = "";
  price = 0;
  duration = "";
  company = "";
  distance = 0;
  poi = [];
  originLat = 0;
  originLong = 0;
  destinLat = 0;
  destinLong = 0;
  tourismTypes = [];
  badge = "";
  constructor(
    id,
    origin,
    originName,
    destination,
    destinationName,
    departureTime,
    arrivalTime,
    price = 0,
    duration = "",
    company = "",
    distance = 0,
    poi = [],
    originLat,
    originLong,
    destinLat,
    destinLong,
    tourismTypes = [],
    badge
  ) {
    this.id = id;
    this.origin = origin;
    this.originName = originName;
    this.destination = destination;
    this.destinationName = destinationName;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.price = price;
    this.duration = duration;
    this.company = company;
    this.distance = distance;
    this.poi = poi;
    this.originLat = originLat;
    this.originLong = originLong;
    this.destinLat = destinLat;
    this.destinLong = destinLong;
    this.tourismTypes = tourismTypes;
    this.badge = badge;
  }
}
