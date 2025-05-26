class PointOfInterest {
  id = null;
  name = "";
  description = "";
  location = "";
  coordinates = { lat: 0, lng: 0 };
  images = [];
  tourismTypes = [];
  destinationId = null;

  constructor(
    id,
    name,
    description,
    location = "",
    coordinates = { lat: 0, lng: 0 },
    images = [],
    tourismTypes = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.coordinates = coordinates;
    this.images = images;
    this.tourismTypes = tourismTypes;
  }
}
