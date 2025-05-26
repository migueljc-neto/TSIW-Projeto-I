let trips;

// Load trips from localstorage
export function init() {
  trips = localStorage.trips ? JSON.parse(localStorage.trips) : [];
}

export function getAllTrips() {
  return trips;
}

export function getTripById(ids) {
  let trips = getAllTrips();
  return trips.filter((trip) => ids.includes(trip.id));
}

class Trip {
  id = null;
  name = "";
  typesOfTourism = [];
  origin = "";
  destination = "";
  price = 0;
  company = "";
  duration = "";
  startDate = "";
  endDate = "";
  description = "";
  isAvailable = true;
  flights = [];

  constructor(
    id,
    name,
    typesOfTourism = [],
    origin,
    destination,
    price = 0,
    company = "",
    duration = "",
    startDate = "",
    endDate = "",
    description = "",
    flights = []
  ) {
    this.id = id;
    this.name = name;
    this.typesOfTourism = typesOfTourism;
    this.origin = origin;
    this.destination = destination;
    this.price = price;
    this.company = company;
    this.duration = duration;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.flights = flights;
  }
}
