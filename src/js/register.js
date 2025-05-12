import { fetchUsers } from "./getUsers.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let users = (await fetchUsers()) || [];

  console.log(users);

  const name = document.getElementById("nameRegister").value;
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  const isAdmin = false;

  const existingError = registerForm.querySelector(".text-red-500");
  if (existingError) existingError.remove();

  if (password !== passwordConfirm) {
    registerForm.insertAdjacentHTML(
      "beforeend",
      "<p class='text-red-500 mt-2'>As Passwords não coincidem!</p>"
    );
    return;
  } else if (users.some((user) => user.email === email)) {
    registerForm.insertAdjacentHTML(
      "beforeend",
      "<p class='text-red-500 mt-2'>O email já existe!</p>"
    );
    return;
  }

  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, isAdmin }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta do servidor:", data);
    })
    .catch((error) => {
      console.error("Erro no registo:", error);
    });
});
