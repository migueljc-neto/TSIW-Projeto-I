import * as User from "../models/userModel.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let users = (await User.fetchUsers()) || [];

  console.log(users);

  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  const keepSigned = document.getElementById("keepSigned").checked;

  const user = users.find((user) => user.email === email);

  const existingError = loginForm.querySelector(".text-red-500");
  if (existingError) existingError.remove();

  if (!user) {
    loginForm.insertAdjacentHTML(
      "beforeend",
      "<p class='text-red-500 mt-2'>Não existe nenhum utilizador com o email inserido!</p>"
    );
    return;
  }

  if (user.password !== password) {
    loginForm.insertAdjacentHTML(
      "beforeend",
      "<p class='text-red-500 mt-2'>A password está incorreta!</p>"
    );
    return;
  }

  const userData = JSON.stringify(user);

  if (keepSigned) {
    localStorage.setItem("user", userData);
  } else {
    sessionStorage.setItem("user", userData);
  }

  const loginModal = document.getElementById("loginModal");

  loginModal.classList.add("hidden");
  console.log("Login successful!");
});
