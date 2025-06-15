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

export function filteredTrips(userTrips, filter) {
  const now = new Date();
  if (filter === "past") {
    return userTrips.filter((trip) => new Date(trip.startDate) <= now);
  }
  return userTrips.filter((trip) => new Date(trip.startDate) >= now);
}

// Adiciona uma nova viagem
export function addTrip(flightsArray, name, description = "") {
  let allTourismTypes = [];
  // Junta todos os tipos de turismo dos voos
  flightsArray.forEach((flight) => {
    if (Array.isArray(flight.tourismTypes)) {
      flight.tourismTypes.forEach((type) => {
        if (!allTourismTypes.includes(type)) {
          allTourismTypes.push(type);
        }
      });
    }
  });

  // Define origem e destino da viagem
  const origin = flightsArray[0].origin;
  const destination = flightsArray[flightsArray.length - 1].destination;

  // Soma o preço total dos voos
  const price = flightsArray.reduce(
    (total, flight) => total + (flight.price || 0),
    0
  );

  // Datas de início e fim da viagem
  const startDate = flightsArray[0].departureTime;
  const endDate = flightsArray[flightsArray.length - 1].arrivalTime;

  // Calcula a duração em dias
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const duration = `${durationDays} dias`;

  // Guarda os IDs dos voos da viagem
  const flights = flightsArray.map((flight) => flight.id);

  // Cria nova viagem
  const id = Date.now();
  const newTrip = new Trip(
    id,
    name,
    allTourismTypes,
    origin,
    destination,
    price,
    duration,
    startDate,
    endDate,
    description,
    false,
    flights
  );

  trips.push(newTrip);
  localStorage.setItem("trips", JSON.stringify(trips));
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
export function getSingleTripById(ids) {
  let trips = getAllTrips();
  return trips.find((trip) => ids.includes(trip.id));
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

  constructor(
    id,
    name,
    typesOfTourism = [],
    price = 0,
    startDate = "",
    endDate = "",
    isPack = false,
    flights = []
  ) {
    this.id = id;
    this.name = name;
    this.typesOfTourism = typesOfTourism;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isPack = isPack;
    this.flights = flights;
  }
}
