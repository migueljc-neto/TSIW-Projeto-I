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

/* Sortable lists */
const tripList = document.getElementById("destinationSortableList");
const destinationList = document.getElementById("destinationSortableListView");

new Sortable(tripList, {
  group: {
    name: "destinationListGroup",
  },

  animation: 150,

  onAdd: function (cell) {
    requestAnimationFrame(() => {
      item = cell.item;
      let itemValue = item.getAttribute("value");
      const child = item.querySelector("p");

      if (item && item.classList) {
        item.removeChild(child);
        item.setAttribute("tabindex", "1");
        item.classList.remove("bg-white", "p-4", "rounded");
        item.classList.add(
          "pr-10",
          "pl-5",
          "bg-[#39578A]",
          "focus:bg-[#6C6EA0]",
          "text-white",
          "h-20",
          "w-full",
          "flex",
          "items-center",
          "justify-between",
          "rounded-lg"
        );

        item.insertAdjacentHTML(
          "afterbegin",
          ` <div class="flex gap-5 inline-flex">
                <img
                  src="../img/icons/white/destinationElipse.svg"
                  alt="startingPoint"
                />
                <p id="destinationName" class="truncate">${itemValue}</p>
              </div>`
        );

        item.insertAdjacentHTML(
          "beforeend",
          `<div class="flex hide gap-5">
                <button
                  id="deleteDestination"
                  class="cursor-pointer p-2 rounded-lg hover:shadow-lg"
                >
                  <img
                    src="../img/icons/white/trash.svg"
                    alt="trashIcon"
                    class="h-5"
                  />
                </button>
                <button
                  id="dragDestination"
                  class="cursor-pointer p-2 rounded-lg hover:shadow-lg"
                >
                  <img
                    src="../img/icons/white/menu.svg"
                    alt="trashIcon"
                    class="h-5"
                  />
                </button>
              </div>`
        );
      }
    });
  },
});

new Sortable(destinationList, {
  group: {
    name: "destinationListGroup",
    put: "false",
    sort: "false",
  },
  animation: 150,

  onStart: function () {
    console.log("drag started");

    tripList.classList.add(
      "outline-2",
      "outline-offset-2",
      "outline-solid",
      "outline-blue-500"
    );
  },

  onEnd: function () {
    console.log("drag finished");

    tripList.classList.remove(
      "outline-2",
      "outline-offset-2",
      "outline-solid",
      "outline-blue-500"
    );
  },
});

/* Map */
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  minZoom: 3,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/* map line */
/* var polygon = L.polygon([
  [51.505, -0.09],
  [51.503, -0.06],
]).addTo(map); */

var marker = L.marker([51.5, -0.09]).addTo(map);

marker
  .bindPopup(
    `
  <div>
    <p>Click the button below:</p>
    <button id="popupBtn" class="px-3 py-1 bg-blue-500 text-white rounded">Click me</button>
  </div>
`
  )
  .openPopup();
