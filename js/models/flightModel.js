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

// Devolve todos os voos a partir de uma origem específica
export function getFlightsByOrigin(originGet) {
  const flights = getAllFlights();

  const filteredFlights = flights.filter(
    (flight) => flight.origin === originGet
  );

  return filteredFlights;
}

// FUNÇÃO DE MODELO: Cria um voo a partir dos dados do formulário
export function createFlightFromFormData(formData) {
  const flightData = {
    id: Date.now(),
    origin: formData.origin,
    originName: formData.originName, // Fixed: was missing
    destination: formData.destination,
    destinationName: formData.destinationName, // Fixed: was using destinName instead of destinationName
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
  };

  // Cria uma instância de voo com a ordem correta dos parâmetros
  const flight = new Flight(
    flightData.id,
    flightData.origin,
    flightData.originName, // nome da origem
    flightData.destination,
    flightData.destinationName, // Fixed: was using destinName
    flightData.departureTime,
    flightData.arrivalTime,
    flightData.price,
    flightData.duration,
    flightData.company,
    flightData.distance,
    flightData.pois, // Fixed: was using poi instead of pois
    flightData.originLat, // latitude da origem
    flightData.originLong, // longitude da origem
    flightData.destinLat, // latitude do destino
    flightData.destinLong, // longitude do destino
    flightData.tourismTypes
  );

  return flight;
}
// FUNÇÃO DE MODELO: Guarda o voo criado a partir dos dados do formulário
export function saveFlightFromData(formData) {
  const flight = createFlightFromFormData(formData);
  addFlight(flight); // Garante que esta função existe
  return flight;
}

// Classe que representa um voo
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
    tourismTypes = []
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
  }
}
