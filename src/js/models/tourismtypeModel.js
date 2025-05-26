let tourismTypes;

// Load tourism types from localstorage
export function init() {
  tourismTypes = localStorage.tourismTypes
    ? JSON.parse(localStorage.tourismTypes)
    : [];
}

export function getAll() {
  return tourismTypes;
}

class TourismType {
  id = null;
  name = "";

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
