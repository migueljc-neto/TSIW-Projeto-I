import * as User from "../models/userModel.js";

// Initialize users
User.init();
const users = localStorage.users ? JSON.parse(localStorage.users) : [];

const userTableList = document.getElementById("userTableList");

window.addEventListener("load", (event) => {
  renderUserTable();
});

function renderUserTable() {
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

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Edit Button Click!");
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Delete Button Click!");
    });
  });
}
