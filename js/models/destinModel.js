class Destination {
    id = null;
    name = ""; 
    isoCode = ""; 
    description = "";
    typesOfTourism = [];
    images = [];
    pointsOfInterest = [];
  
    constructor(
      id,
      name,
      isoCode,
      description = "",
      typesOfTourism = [],
      images = [],
      pointsOfInterest = []
    ) {
      this.id = id;
      this.name = name;
      this.isoCode = isoCode;
      this.description = description;
      this.typesOfTourism = typesOfTourism;
      this.images = images;
      this.pointsOfInterest = pointsOfInterest;
    }
  }
  