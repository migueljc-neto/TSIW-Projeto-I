class Flight {
  id = null;
  origin = "";
  destination = "";
  departureTime = "";
  arrivalTime = "";
  price = 0;
  duration = "";
  company = "";
  distance = 0;

  constructor(
    id,
    origin,
    destination,
    departureTime,
    arrivalTime,
    price = 0,
    duration = "",
    company = "",
    distance = 0
  ) {
    this.id = id;
    this.origin = origin;
    this.destination = destination;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.price = price;
    this.duration = duration;
    this.company = company;
    this.distance = distance;
  }
}
