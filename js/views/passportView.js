import * as User from "../models/userModel.js";

let countriesData = {};

async function getAvailableCountries() {
  try {
    const response = await fetch('./js/json/countries.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading countries:', error);
    return {};
  }
}

function loadAllCountries() {
  const allCountries = document.getElementById("allCountries");
  const user = User.getUserLogged();
  const userBadges = user ? user.badges || [] : [];

  allCountries.innerHTML = "";

  Object.entries(countriesData).forEach(([code, name]) => {
    const upperCode = code.toUpperCase();
    const hasVisited = userBadges.includes(upperCode);

    allCountries.insertAdjacentHTML(
      "beforeend",
      `<div class="text-xs mt-1 text-center ${hasVisited ? '' : 'opacity-40'}">
        ${name}
      </div>`
    );
  });
}

document.getElementById("passportButton").addEventListener("click", async (event) => {
  event.preventDefault();
  if (!User.isLogged()) {
    document.getElementById("loginModal").classList.remove("hidden");
    return;
  }
  countriesData = await getAvailableCountries();
  document.getElementById("passportModal").classList.remove("hidden");
  loadAllCountries();
});

document.addEventListener("click", (event) => {
  const modal = document.getElementById("passportModal");
  if (event.target.id === "closePassportModal" || event.target === modal) {
    modal.classList.add("hidden");
  }
}); 