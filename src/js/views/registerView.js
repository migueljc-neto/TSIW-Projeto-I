import * as User from "../models/userModel.js";

User.init();

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearMessages();
  const name = document.getElementById("nameRegister").value.trim();
  const email = document.getElementById("emailRegister").value.trim();
  const password = document.getElementById("passwordRegister").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  const isAdmin = false;

  try {
    User.add(name, email, password, passwordConfirm);
    displayMessage("Registo efetuado com sucesso!", "success");

    registerForm.reset();
    setTimeout(() => {
      registerFormClose();
    }, 1000);
  } catch (error) {
    displayMessage(error.message);
  }
});

function displayMessage(message, type = "error") {
  const colorClass = type === "error" ? "text-red-500" : "text-green-500";
  registerForm.insertAdjacentHTML(
    "beforeend",
    `<p class='${colorClass} mt-2'>${message}</p>`
  );
}

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
