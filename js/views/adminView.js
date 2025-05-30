import * as User from "../models/UserModel.js";
import * as TourismTypes from "../models/TourismtypeModel.js";
import * as Flights from "../models/FlightModel.js";
import * as Trips from "../models/TripModel.js";

User.init();
TourismTypes.init();
Flights.init();
Trips.init();

const body = document.querySelector("body");

const userTableList = document.getElementById("userTableList");
const tourismTypeTableList = document.getElementById("tourismTypeList");
const flightTableList = document.getElementById("flightTableList");
const packsTableList = document.getElementById("packsTableList");

window.addEventListener("load", (event) => {
  document.getElementById("userAddBtn").click();
  const isAdmin = User.isAdmin(User.getUserLogged());
  if (!isAdmin) {
    location.href = "../index.html";
  } else {
    body.classList.remove("hidden");
  }
  /* Users */
  const users = User.getAllUsers();

  userTableList.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.className = "border-t py-3";

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td class="text-right">
        <div class="inline-flex gap-4">
          <button class="text-blue-500 hover:text-blue-300 rounded-md py-0.5 cursor-pointer edit-btn" data-id="${user.id}">
            Editar
          </button>
          <button id="userDeleteBtn" class="text-blue-500 hover:text-blue-300 rounded-md py-0.5 cursor-pointer delete-btn" data-id="${user.id}">
            Apagar
          </button>
        </div>
      </td>
    `;

    userTableList.appendChild(row);
  });

  userTableList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      User.deleteUser(id);
    }
    location.reload();
  });

  /* Tourism Type */
  const tourismTypes = TourismTypes.getAll();

  tourismTypeTableList.innerHTML = "";

  tourismTypes.forEach((tourismType) => {
    const row = document.createElement("tr");
    row.className = "border-t py-3";

    row.innerHTML = `
      <td>${tourismType.id}</td>
      <td>${tourismType.name}</td>
      <td class="text-right">
          <button class="text-blue-500 hover:text-blue-300 rounded-md py-0.5 cursor-pointer delete-btn" data-id="${tourismType.id}">
            Apagar
          </button>
      </td>
    `;
    tourismTypeTableList.appendChild(row);
  });

  tourismTypeTableList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      TourismTypes.deleteTourismType(id);
    }
    location.reload();
  });

  /* Flights */
  const flights = Flights.getAllFlights();
  flightTableList.innerHTML = "";

  flights.forEach((flight) => {
    const row = document.createElement("tr");
    row.className = "border-t py-3";

    row.innerHTML = `
      <td>${flight.id}</td>
      <td>${flight.origin}</td>
      <td>${flight.destination}</td>
      <td>${flight.price}€</td>
      <td>${formatDateToLabel(flight.departureTime)}</td>
      <td class="text-right">
        <button class="text-blue-500 hover:text-blue-300 rounded-md py-0.5 cursor-pointer delete-btn" data-id="${
          flight.id
        }">
            Apagar
          </button>
      </td>
    `;
    flightTableList.appendChild(row);
  });

  flightTableList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      Flights.deleteFlight(id);
    }
    location.reload();
  });

  /* Packs */
  const packs = Trips.getAllPacks();
  packsTableList.innerHTML = "";

  packs.forEach((pack) => {
    const row = document.createElement("tr");
    row.className = "border-t py-3";

    row.innerHTML = `
      <td>${pack.id}</td>
      <td>${pack.name}</td>
      <td>${pack.price}€</td>
      <td>${formatDateToLabel(pack.startDate)} - ${formatDateToLabel(
      pack.endDate
    )}</td>
      <td class="text-right">
        <div class="inline-flex gap-4">
          <button class="text-blue-500 hover:text-blue-300 rounded-md py-0.5 cursor-pointer edit-btn" data-id="${
            pack.id
          }">
            Editar
          </button>
          <button class="text-blue-500 hover:text-blue-300 rounded-md py-0.5 cursor-pointer delete-btn" data-id="${
            pack.id
          }">
            Apagar
          </button>
        </div>
      </td>
    `;
    packsTableList.appendChild(row);
  });
  packsTableList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      Trips.deleteTrip(id);
      User.deletePack(id);
    }
    location.reload();
  });
});

function formatDateToLabel(dateString) {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");
  const currentYear = new Date().getFullYear().toString();

  if (year === currentYear) {
    return `${day}/${month}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}
