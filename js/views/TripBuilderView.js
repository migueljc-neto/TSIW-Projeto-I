console.log("hello");

const mapViewBtn = document.getElementById("mapViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

const mapCell = document.getElementById("map");
const listViewCell = document.getElementById("mapListView");

let mapView = true;

mapViewBtn.addEventListener("click", function () {
  if (!mapView) {
    mapCell.classList.toggle("hidden");
    listViewCell.classList.toggle("hidden");
    mapViewBtn.classList.toggle("border-b-0");
    listViewBtn.classList.toggle("border-b-0");
    mapView = true;
  }
});

listViewBtn.addEventListener("click", function () {
  if (mapView) {
    mapCell.classList.toggle("hidden");
    listViewCell.classList.toggle("hidden");
    mapViewBtn.classList.toggle("border-b-0");
    listViewBtn.classList.toggle("border-b-0");
    mapView = false;
  }
});
