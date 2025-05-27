import * as User from "../models/userModel.js";

User.init();

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    User.login(
      document.getElementById("emailLogin").value,
      document.getElementById("passwordLogin").value,
      document.getElementById("keepSigned").checked
    );

    const loginModal = document.getElementById("loginModal");
    loginModal.classList.add("hidden");
  } catch (e) {
    displayMessage(e.message);
  }
});

function displayMessage(message) {
  const oldMessage = loginForm.querySelector(".text-red-500");
  if (oldMessage) {
    oldMessage.remove();
  }

  loginForm.insertAdjacentHTML(
    "beforeend",
    `<p class='text-red-500 mt-2'>${message}</p>`
  );
}
