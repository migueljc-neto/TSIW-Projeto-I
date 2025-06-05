import * as User from "../models/UserModel.js";
import * as Trips from "../models/TripModel.js";
import * as Helper from "../models/ModelHelper.js";

Trips.init();
User.init();
document.body.classList.add("hidden");

const user = User.getUserLogged();

const userNameLabel = document.getElementById("userNameLabel");
const userEmailLabel = document.getElementById("userEmailLabel");
const userMilesLabel = document.getElementById("userMilesLabel");
const userTotalMilesLabel = document.getElementById("userTotalMilesLabel");
const userTripsLabel = document.getElementById("userTripsLabel");

const flagWrapper = document.getElementById("flagWrapper");
const tripsWrapper = document.getElementById("tripsWrapper");

const profileImg = document.getElementById("profileImg");

const profileEditBtn = document.getElementById("profileEditBtn");

window.addEventListener("load", (event) => {
  let avatarInt = Math.floor(Math.random() * 5) + 1;

  profileImg.src = `../img/avatar${avatarInt}.png`;

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
  userTripsLabel.insertAdjacentText("beforeend", ` ${user.trips.length}`);
  document.body.classList.remove("hidden");

  const userBadges = user.badges;

  let regionNames = new Intl.DisplayNames(["pt"], { type: "region" });

  userBadges.forEach((element) => {
    flagWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="has-tooltip w-12 h-12 rounded overflow-hidden flex items-center justify-center">
        <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>${regionNames.of(
          element.toUpperCase()
        )}</span>
              <img src="../img/flags/${element}.svg" alt="${element}" class="object-contain w-full h-full"/>
        </div>`
    );
  });

  /* Favorites */
  const userFavorites = user.favorites;

  userFavorites.forEach((favorite) => {
    const apiKey = "NpYuyyJzclnrvUUkVK1ISyi2FGnrw4p9sNg9CCODQGsiFc0nWvuUJJMN";

    fetch(`https://api.pexels.com/v1/search?query=${favorite}&per_page=2`, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const image =
          data.photos[1]?.src.medium || "../img/images/fallback.jpg";

        favoritesWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="has-tooltip flex bg-white rounded-lg shadow-md overflow-hidden h-24">
            <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black mt-10'>${favorite}</span>
            <div class="w-2/5">
              <img
                src="${image}"
                alt="${favorite}"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="w-3/5 p-3 flex flex-col justify-center">
              <p class="font-bold text-gray-800">${favorite}</p>
            </div>
          </div>`
        );
      })
      .catch((err) => {
        console.error("Error fetching image:", err);
      });
  });

  /* Trips */
  const userTripIds = user.trips;

  if (userTripIds.length > 0) {
    const userTrips = Trips.getTripById(userTripIds);

    const fetchPromises = userTrips.map((trip) => {
      const query = `${trip.destination} city`;
      const apiKey = "NpYuyyJzclnrvUUkVK1ISyi2FGnrw4p9sNg9CCODQGsiFc0nWvuUJJMN";

      return fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=2`,
        {
          headers: { Authorization: apiKey },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const image =
            data.photos[1]?.src.medium || "../img/images/fallback.jpg";

          tripsWrapper.insertAdjacentHTML(
            "beforeend",
            `<button class="cursor-pointer transition transform hover:-translate-y-1"><div class="has-tooltip flex bg-white rounded-lg shadow-md overflow-hidden h-24">
            <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black mt-10'>${
              trip.name
            }</span>
            <div class="w-2/5">
              <img src="${image}" alt="${
              trip.name
            }" class="w-full h-full object-cover"/>
            </div>
            <div class="w-3/5 p-3 flex flex-col justify-center">
              <p class="font-bold text-gray-800 truncate">${trip.name}</p>
              <p class="text-sm text-gray-600">${Helper.formatDateToLabel(
                trip.startDate
              )}<br>${Helper.formatDateToLabel(trip.endDate)}</p>
            </div>
          </div></button>`
          );
        });
    });

    Promise.all(fetchPromises).then(() => {
      if (tripsWrapper.innerHTML === "") {
        tripsWrapper.classList.add("items-center");
        tripsWrapper.classList.remove("grid");
        tripsWrapper.insertAdjacentHTML(
          "beforeend",
          `<p class="text-gray-600 text-center">Nenhuma viagem associada.</p>`
        );
      }
    });
  } else {
    tripsWrapper.classList.add("items-center");
    tripsWrapper.classList.remove("grid");
    tripsWrapper.insertAdjacentHTML(
      "beforeend",
      `<p class="text-gray-600 text-center">Nenhuma viagem associada.</p>`
    );
  }
});

const passportBtns = document.querySelectorAll(
  '[data-modal-target="passport-modal"]'
);

passportBtns.forEach((passportBtn) => {
  Helper.getAllCountries().then((data) => {
    allCountriesData = data;
    renderPassportGrid();
    continentFilter.onchange = () => renderPassportGrid(continentFilter.value);
  });
});

/* Edit User */

const userEditForm = document.getElementById("userEditForm");
const userEditModal = new Modal(document.getElementById("userEditModal"));

profileEditBtn.addEventListener("click", (event) => {
  const user = User.getUserLogged();
  userEditModal.show();
  if (user) {
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;

    userEditForm.onsubmit = function (e) {
      e.preventDefault();

      const updatedUser = {
        name: document.getElementById("editName").value,
        email: document.getElementById("editEmail").value,
        password: user.password,
        isAdmin: user.isAdmin,
      };

      try {
        User.updateUser(user.id, updatedUser);
        try {
          User.updateLoggedUser(user.id);
        } catch (e) {
          displayMessage(userEditForm, err.message);
        }
        location.reload();
      } catch (err) {
        displayMessage(userEditForm, err.message);
      }
    };
  }
});

const continentFilter = document.getElementById("continentFilter");

let allCountriesData;

function renderPassportGrid(continent = "") {
  const user = User.getUserLogged();
  const passportModalGrid = document.getElementById("passportModalGrid");
  let regionNames = new Intl.DisplayNames(["pt"], { type: "region" });
  passportModalGrid.innerHTML = "";

  let userCountries = [];
  if (user && user.badges) {
    userCountries = user.badges.map((c) => c.toLowerCase());
  }

  const filteredCountries = allCountriesData.filter((country) => {
    const code = country.cca2?.toLowerCase();
    const countryContinents = country.continents || [];
    if (!code) return false;
    if (continent && !countryContinents.includes(continent)) return false;
    return true;
  });

  const visited = filteredCountries.filter((country) =>
    userCountries.includes(country.cca2.toLowerCase())
  );
  const notVisited = filteredCountries.filter(
    (country) => !userCountries.includes(country.cca2.toLowerCase())
  );

  visited.forEach((country) => {
    const code = country.cca2.toLowerCase();
    passportModalGrid.insertAdjacentHTML(
      "beforeend",
      `
      <div class="has-tooltip col-span-2 sm:col-span-1 p-1">
        <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>
          ${regionNames.of(code.toUpperCase())}
        </span>
        <img 
          class="w-8 h-8 object-contain transition-all" 
          src="../img/flags/${code}.svg"
          alt="${code}"
          title="${code}"
        >
      </div>
      `
    );
  });

  notVisited.forEach((country) => {
    const code = country.cca2.toLowerCase();
    passportModalGrid.insertAdjacentHTML(
      "beforeend",
      `
      <div class="has-tooltip col-span-2 sm:col-span-1 p-1">
        <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>
          ${regionNames.of(code.toUpperCase())}
        </span>
        <img 
          class="w-8 h-8 object-contain grayscale hover:grayscale-0 transition-all" 
          src="../img/flags/${code}.svg"
          alt="${code}"
          title="${code}"
        >
      </div>
      `
    );
  });
}

function displayMessage(form, message, type = "error") {
  const oldMessage = form.querySelector(".text-red-500, .text-green-500");
  if (oldMessage) {
    oldMessage.remove();
  }
  if (type === "clear" || !message) return;
  const colorClass = type === "error" ? "text-red-500" : "text-green-500";
  form.insertAdjacentHTML(
    "beforeend",
    `<p class='${colorClass} mt-2'>${message}</p>`
  );
}
