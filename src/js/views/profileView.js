document.body.classList.add("hidden");

function getUser() {
  let user = null;

  if (localStorage.getItem("user") === null) {
    user = JSON.parse(sessionStorage.getItem("user"));
  } else {
    user = JSON.parse(localStorage.getItem("user"));
  }

  return user;
}

const user = getUser();

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
