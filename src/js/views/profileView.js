import * as User from "../models/userModel.js";

document.body.classList.add("hidden");

const user = User.getUserLogged();

const userNameLabel = document.getElementById("userNameLabel");
const userEmailLabel = document.getElementById("userEmailLabel");
const userMilesLabel = document.getElementById("userMilesLabel");
const userTripsLabel = document.getElementById("userTripsLabel");

window.addEventListener("load", (event) => {
  if (user === null) {
    window.location.href = "../index.html";
  }

  document.title = `Compass - ${user.name}`;
  userNameLabel.insertAdjacentText("beforeend", user.name);
  userEmailLabel.insertAdjacentText("beforeend", user.email);
  document.body.classList.remove("hidden");
});
