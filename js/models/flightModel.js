class CustomTrip {
  id = null;
  userId = null;
  name = "";
  destinations = []; // country names or IDs
  legs = []; // TripLegs or Flights
  tourismTypes = [];
  startDate = "";
  endDate = "";
  totalPrice = 0;
  notes = "";

  constructor(
    id,
    userId,
    name,
    destinations = [],
    legs = [],
    tourismTypes = [],
    startDate = "",
    endDate = "",
    totalPrice = 0,
    notes = ""
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.destinations = destinations;
    this.legs = legs;
    this.tourismTypes = tourismTypes;
    this.startDate = startDate;
    this.endDate = endDate;
    this.totalPrice = totalPrice;
    this.notes = notes;
  }
}
