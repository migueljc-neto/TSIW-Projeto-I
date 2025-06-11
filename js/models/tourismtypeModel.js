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

// Delete tourism type by ID
export function deleteTourismType(id) {
  const numId = typeof id === "string" ? Number(id) : id;

  const index = tourismTypes.findIndex(
    (tourismType) => tourismType.id === numId
  );

  tourismTypes.splice(index, 1);
  localStorage.setItem("tourismTypes", JSON.stringify(tourismTypes));
}

class TourismType {
  id = null;
  name = "";

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export function searchAllTypes(value) {
  if (value === "Todos") {
    return true;
  } else {
    return false;
  }
}
