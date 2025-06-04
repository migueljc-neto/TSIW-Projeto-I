import * as Flight from "../models/flightModel.js";

Flight.init();

/* Map and list view buttons */
const mapViewBtn = document.getElementById("mapViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

/* Map and list view */
const mapCell = document.getElementById("map");
const listViewCell = document.getElementById("mapListView");

/* Sortable lists */
const tripList = document.getElementById("destinationSortableList");
const destinationList = document.getElementById("destinationSortableListView");
const trashCan = document.getElementById("trashCan");

/* map icons */
let iconGroup;

let pathGroup;

const mapOriginIcon = L.icon({
  iconUrl: "/img/icons/other/compassPin.png",
  iconSize: [32, 50],
  iconAnchor: [16, 50],
});
const mapIcon = L.icon({
  iconUrl: "/img/icons/other/normalPin.png",
  iconSize: [16, 25],
  iconAnchor: [8, 25],
});
const pathIcon = L.icon({
  iconUrl: "/img/icons/other/pathLastPoint.png",
  iconSize: [16, 25],
  iconAnchor: [8, 25],
});
const ballIcon = L.icon({
  iconUrl: "/img/icons/other/pathPoint.png",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/* Map and list view toggle */
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

/* sortable js  lists setup */
new Sortable(tripList, {
  group: {
    name: "destinationListGroup",
  },

  animation: 150,

  onAdd: function (cell) {
    requestAnimationFrame(() => {
      let item = cell.item;
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
              </div>
              <div class="flex hide gap-5">
                <div
                  id="drag"
                  class="cursor-pointer"
                >
                  <img
                    src="../img/icons/white/menu.svg"
                    alt="trashIcon"
                    class="h-5"
                  />
                </div>
              </div>`
        );
      }
    });
    loadMap();
  },
});
new Sortable(destinationList, {
  group: {
    name: "destinationListGroup",
    put: "false",
  },
  sort: false,
  animation: 150,

  onStart: function () {
    tripList.classList.add(
      "outline-2",
      "outline-offset-2",
      "outline-solid",
      "outline-blue-500"
    );
  },

  onEnd: function () {
    tripList.classList.remove(
      "outline-2",
      "outline-offset-2",
      "outline-solid",
      "outline-blue-500"
    );
  },
});
new Sortable(trashCan),
  {
    group: {
      name: "trashCan",
    },
  };

/* Map */
document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("userQuery")) {
    location.href = "../index.html";
  }
  const userQuery = JSON.parse(sessionStorage.getItem("userQuery"));
  createMap(Flight.getFlightsByOrigin(userQuery.origin)[0]);
  loadMap(userQuery.origin);
});

const createMap = function (origin) {
  var map = L.map("map").setView([origin.originLat, origin.originLong], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    minZoom: 3,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  /* marker and polygon groups */
  iconGroup = L.layerGroup().addTo(map);
  pathGroup = L.layerGroup().addTo(map);

  /* origin marker */
  var originMarker = L.marker([origin.originLat, origin.originLong], {
    icon: mapOriginIcon,
  }).addTo(map);
};

function loadMap(origin) {
  const flightList = Flight.getFlightsByOrigin(origin);
  console.log(flightList);

  flightList.forEach((element) =>
    console.log(Flight.getFlightById(element.id))
  );

  iconGroup.clearLayers();
  destinationList.innerHTML = "";

  /* flight loop */
  flightList.forEach((flight) => {
    /* populate listView */
    destinationList.insertAdjacentHTML(
      "beforeend",
      `<li id="${flight.id}"class="bg-white p-4 rounded shadow-lg" value="${flight.destinationName}" id="${flight.id}">
        <p class="truncate">${flight.destinationName}</p>
      </li>`
    );

    /* populate mapView */
    const marker = L.marker([flight.destinLat, flight.destinLong], {
      icon: mapIcon,
    }).addTo(iconGroup);

    marker.bindPopup(`
        <div class="flex flex-col item-center w-fit ">
        <p>${flight.destinationName}</p>
        <button 
        data-id="${flight.id}" 
        class="popup-add-btn px-3 py-1 bg-blue-900 text-white rounded">
        Add to List
        </button>
        </div>
        `);

    marker.on("popupopen", () => {
      setTimeout(() => {
        const btn = document.querySelector(".popup-add-btn");
        if (btn) {
          btn.addEventListener("click", function () {
            const flightId = parseInt(this.getAttribute("data-id"));
            addToList(flightId);
          });
        }
      }, 100);
    });
  });
  mapLine();
}

function addToList(id) {
  const flight = Flight.getFlightById(id);

  const itemHTML = `
    <li id="${flight.id}" class="pr-10 pl-5 bg-[#39578A] focus:bg-[#6C6EA0] text-white h-20 w-full flex items-center justify-between rounded-lg">
        <div class="flex gap-5 inline-flex">
                <img
                  src="../img/icons/white/destinationElipse.svg"
                  alt="startingPoint"
                />
                <p id="destinationName" class="truncate">${flight.destinationName}</p>
              </div>
              <div class="flex hide gap-5">
                <div
                  id="drag"
                  class="cursor-pointer"
                >
                  <img
                    src="../img/icons/white/menu.svg"
                    alt="trashIcon"
                    class="h-5"
                  />
                </div>
              </div>
    </li>
  `;

  tripList.insertAdjacentHTML("beforeend", itemHTML);

  console.log(id);
  loadMap(flight.destination);
}

let oldFlight;

function mapLine() {
  pathGroup.clearLayers();

  let liArray = Array.from(tripList.getElementsByTagName("li"));

  liArray.forEach((element, curIndex) => {
    let flightCords = Flight.getFlightById(
      parseInt(element.getAttribute("id"))
    );

    console.log(flightCords.path);
    /* create elements */
    const flightLine = L.polyline([flightCords.path[0], flightCords.path[1]], {
      color: "red",
      weight: 4,
      dashArray: "6, 8",
    }).addTo(pathGroup);

    const pin = curIndex == liArray.length - 1 ? pathIcon : ballIcon;
    const flightPin = L.marker(
      [flightCords.destinLat, flightCords.destinLong],
      { icon: pin }
    ).addTo(pathGroup);

    console.log(flightPin);
  });
}
/* pathGroup */
