import * as User from "../models/userModel.js";

document.body.classList.add("hidden");

const user = User.getUserLogged();

const userNameLabel = document.getElementById("userNameLabel");
const userEmailLabel = document.getElementById("userEmailLabel");
const userMilesLabel = document.getElementById("userMilesLabel");
const userTotalMilesLabel = document.getElementById("userTotalMilesLabel");
const userTripsLabel = document.getElementById("userTripsLabel");

const flagWrapper = document.getElementById("flagWrapper");

window.addEventListener("load", (event) => {
  if (user === null) {
    window.location.href = "../index.html";
  }

  document.title = `Compass - ${user.name}`;
  userNameLabel.insertAdjacentText("beforeend", ` ${user.name}`);
  userEmailLabel.insertAdjacentText("beforeend", ` ${user.email}`);
  userMilesLabel.insertAdjacentText("beforeend", ` ${user.miles["available"]}`);
  userTotalMilesLabel.insertAdjacentText(
    "beforeend",
    ` ${user.miles["total"]}`
  );
  userTripsLabel.insertAdjacentText("beforeend", ` ${user.trips}`);
  document.body.classList.remove("hidden");
  const userBadges = user.badges;
  let regionNames = new Intl.DisplayNames(["pt"], { type: "region" });
  userBadges.forEach((element) => {
    flagWrapper.insertAdjacentHTML(
      "beforeend",
      `
<div
              class="has-tooltip w-12 h-12 rounded overflow-hidden flex items-center justify-center"
            >
            <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>${regionNames.of(
              element.toUpperCase()
            )}</span>
              <img
                src="../img/flags/${element}.svg"
                alt="${element}"
                class="object-contain w-full h-full"
              />
            </div>`
    );
  });
});
