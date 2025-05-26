class TripLeg {
  id = null;
  origin = "";
  destination = "";
  departureTime = "";
  arrivalTime = "";
  price = 0;
  duration = "";
  company = "";

  constructor(
    id,
    origin,
    destination,
    departureTime,
    arrivalTime,

    price = 0,
    duration = "",
    company = ""
  ) {
    this.id = id;
    this.origin = origin;
    this.destination = destination;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.price = price;
    this.duration = duration;
    this.company = company;
  }
}
