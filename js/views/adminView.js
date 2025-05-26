import * as User from "../models/userModel.js";
import * as TourismTypes from "../models/tourismtypeModel.js";

TourismTypes.init();

const userTableList = document.getElementById("userTableList");
const tourismTypeTableList = document.getElementById("tourismTypeList");

window.addEventListener("load", (event) => {
  const users = localStorage.users ? JSON.parse(localStorage.users) : [];

  const tourismTypes = TourismTypes.getAll();
  console.log(tourismTypes);
  userTableList.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.className = "border-t py-3";

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td class="text-right">
        <div class="inline-flex gap-2">
          <button class="text-blue-500 hover:text-blue-300 rounded-md px-2.5 py-0.5 cursor-pointer edit-btn" data-id="${user.id}">
            Editar
          </button>
          <button class="text-blue-500 hover:text-blue-300 rounded-md px-2.5 py-0.5 cursor-pointer delete-btn" data-id="${user.id}">
            Apagar
          </button>
        </div>
      </td>
    `;

    userTableList.appendChild(row);
  });

  tourismTypeTableList.innerHTML = "";

  tourismTypes.forEach((tourismType) => {
    const row = document.createElement("tr");
    row.className = "border-t py-3";

    row.innerHTML = `
      <td>${tourismType.id}</td>
      <td>${tourismType.name}</td>
      <td class="text-right">
        <div class="inline-flex gap-2">
          <button class="text-blue-500 hover:text-blue-300 rounded-md px-2.5 py-0.5 cursor-pointer edit-btn" data-id="${tourismType.id}">
            Editar
          </button>
          <button class="text-blue-500 hover:text-blue-300 rounded-md px-2.5 py-0.5 cursor-pointer delete-btn" data-id="${tourismType.id}">
            Apagar
          </button>
        </div>
      </td>
    `;
    tourismTypeTableList.appendChild(row);
  });
});
