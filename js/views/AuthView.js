import * as User from "../models/UserModel.js";

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

function displayMessage(message, type = "error") {
  const oldMessage = loginForm.querySelector(".text-red-500");
  if (oldMessage) {
    oldMessage.remove();
  }

  loginForm.insertAdjacentHTML(
    "beforeend",
    `<p class='text-red-500 mt-2'>${message}</p>`
  );
  const colorClass = type === "error" ? "text-red-500" : "text-green-500";
  registerForm.insertAdjacentHTML(
    "beforeend",
    `<p class='${colorClass} mt-2'>${message}</p>`
  );
}

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearMessages();
  const name = document.getElementById("nameRegister").value.trim();
  const email = document.getElementById("emailRegister").value.trim();
  const password = document.getElementById("passwordRegister").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  try {
    User.add(name, email, password, passwordConfirm);
    displayMessage("Registo efetuado com sucesso!", "success");
    registerForm.reset();
    setTimeout(() => {
      registerFormClose();
      User.login(email, password, false);
    }, 1000);
  } catch (error) {
    displayMessage(error.message);
  }
});

function clearMessages() {
  const existing = registerForm.querySelector(".text-red-500, .text-green-500");
  if (existing) existing.remove();
}

function registerFormClose() {
  modalRegisterContent.classList.remove("opacity-100", "scale-100");
  modalRegisterContent.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    registerModal.classList.add("hidden");
  }, 300);
}
