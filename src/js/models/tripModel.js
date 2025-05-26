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
  legs = [];
  images = [];

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
    legs = [],
    images = []
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
    this.legs = legs;
    this.images = images;
  }
}
