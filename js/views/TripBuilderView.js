import * as Flight from "../models/flightModel.js";
import * as Helper from "../models/ModelHelper.js";
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

/* Origin Obj */
let originObj;

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
  iconSize: [10, 10],
  iconAnchor: [5, 5],
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
new Sortable(destinationList, {
  group: {
    name: "Map",
    put: false,
    pull: "Trip",
  },
  sort: false,
  dragClass: "destinationGhost",
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

new Sortable(tripList, {
  group: {
    name: "Trip",
    put: ["Map"],
    pull: "Trash",
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
      updateMap();
    });
  },

  onSort: function () {
    updateMap();
  },

  onStart: function () {
    trashCan.classList.remove("opacity-30");
  },
  onEnd: function () {
    trashCan.classList.add("opacity-30");
  },
});

new Sortable(trashCan, {
  group: {
    name: "Trash",
    put: ["Trip"],
  },
  onAdd: function (event) {
    event.item.remove();
  },
});

/* Map */
document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("userQuery")) {
    location.href = "../index.html";
  }
  const userQuery = JSON.parse(sessionStorage.getItem("userQuery"));
  createMap(Flight.getFlightsByOrigin(userQuery.origin)[0]);
  loadMap(userQuery.origin);
  document.getElementById("origin").textContent = userQuery.origin;
});

const createMap = function (origin) {
  var map = L.map("map").setView([origin.originLat, origin.originLong], 5);
  originObj = Helper.createDestinObj(
    origin.origin,
    origin.originLat,
    origin.originLong
  );

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
    zIndexOffset: 1000,
  }).addTo(map);
};

function loadMap(origin) {
  const flightList = Flight.getFlightsByOrigin(origin);

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
        <p class="truncate">${flight.destinationName} <span class="opacity-60 text-xs">${flight.destination}</span></p>
      </li>`
    );

    /* populate mapView */
    const marker = L.marker([flight.destinLat, flight.destinLong], {
      icon: mapIcon,
      zIndexOffset: 900,
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

  loadMap(flight.destination);
}

let oldFlight;

function mapLine() {
  const createMapPoints = function (obj, index, arrLeng) {
    if (index != 0) {
      const pin = index == arrLeng - 1 ? pathIcon : ballIcon;
      const flightPin = L.marker([obj.lat, obj.long], {
        icon: pin,
      }).addTo(pathGroup);
    }
  };
  const createMapLines = function (obj, index, arr) {
    if (index != 0) {
      const flightLine = L.polyline(
        [
          [obj.lat, obj.long],
          [arr[index - 1].lat, arr[index - 1].long],
        ],
        {
          color: "red",
          weight: 2,
          dashArray: "6, 6",
        }
      ).addTo(pathGroup);
    }
  };

  pathGroup.clearLayers();

  let liArray = Array.from(tripList.getElementsByTagName("li"));
  let pointsObjArray = [];

  pointsObjArray.push(originObj);

  liArray.forEach((element, index) => {
    let flight = Flight.getFlightById(parseInt(element.getAttribute("id")));

    const destinObj = Helper.createDestinObj(
      flight.destination,
      flight.destinLat,
      flight.destinLong
    );

    pointsObjArray.push(destinObj);
  });

  pointsObjArray.forEach((element, idx) => {
    createMapPoints(element, idx, pointsObjArray.length),
      createMapLines(element, idx, pointsObjArray);
  });
}

function updateMap() {
  mapLine();
  let origin = Array.from(tripList.getElementsByTagName("li"));
  loadMap(
    Flight.getFlightById(parseInt(origin[origin.length - 1].getAttribute("id")))
      .destination
  );
}
