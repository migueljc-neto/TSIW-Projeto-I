import * as Flights from "../models/FlightModel.js";

// Initialize all flights from localStorage
Flights.init();

const destinations = ["OPO", "LIS", "MAD", "ROM"]; // Example destinations
const flightsSection = document.getElementById("flightsSection");
let totalPrice = 0;
let selectedFlights = {}; // Stores selected flights for payment
let selectedCount = 0; // Number of currently selected flights
const totalSections = destinations.length - 1; // Number of flight sections (pairs)

window.addEventListener("DOMContentLoaded", () => {
  const allFlights = JSON.parse(localStorage.getItem("flights"));
  const flightSections = [];

  // For each pair of destinations, build the carousel and flight cards
  for (let index = 0; index < destinations.length - 1; index++) {
    const origin = destinations[index];
    const destination = destinations[index + 1];

    // Filter flights for this origin-destination pair
    const relevantFlights = allFlights.filter(
      (flight) => flight.origin === origin && flight.destination === destination
    );

    if (relevantFlights.length === 0) continue;

    // Group flights by date and find the lowest price for each date
    const flightsByDate = {};
    relevantFlights.forEach((flight) => {
      const departureDate = new Date(flight.departureTime);
      const dateKey = departureDate.toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "long",
      });

      if (!flightsByDate[dateKey]) {
        flightsByDate[dateKey] = {
          flights: [],
          minPrice: flight.price,
        };
      }
      flightsByDate[dateKey].flights.push(flight);
      if (flight.price < flightsByDate[dateKey].minPrice) {
        flightsByDate[dateKey].minPrice = flight.price;
      }
    });

    // Sort the dates
    const sortedDates = Object.keys(flightsByDate).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    // Divide dates into groups of 3 for the carousel
    const dateGroups = [];
    for (let i = 0; i < sortedDates.length; i += 3) {
      dateGroups.push(sortedDates.slice(i, i + 3));
    }

    // Generate carousel slides (each slide with up to 3 dates)
    let carouselSlides = "";
    dateGroups.forEach((dateGroup, groupIndex) => {
      let carouselItems = "";

      dateGroup.forEach((date) => {
        // Create carousel items for each date
        carouselItems += `
          <div class="bg-white p-2 translate-x-[100%] rounded shadow text-center w-[320px] mx-1 cursor-pointer hover:bg-gray-50 transition-colors" 
               data-date="${date}">
            <p class="text-sm">${date}</p>
            <p class="font-bold text-blue-700">€${flightsByDate[
              date
            ].minPrice.toFixed(2)}</p>
          </div>
        `;
      });

      carouselSlides += `
        <div class="flex duration-700 ease-in-out" ${
          groupIndex === 0
            ? 'data-carousel-item="active"'
            : "data-carousel-item"
        }>
          ${carouselItems}
        </div>
      `;
    });

    const sectionId = `flight-section-${index}`;
    flightSections.push({
      id: sectionId,
      origin,
      destination,
      flightsByDate,
      sortedDates,
      defaultFlight: flightsByDate[sortedDates[0]].flights[0],
    });

    // Insert the section HTML for this flight pair
    flightsSection.insertAdjacentHTML(
      "beforeend",
      `<section id="${sectionId}" data-origin="${origin}" data-destination="${destination}" data-index="${index}">
        <div class="mb-4">
          <img src="../img/icons/blue/plane.svg" alt="plane icon" class="w-5 h-5" />
          <h2 class="text-xl font-semibold mb-2">${origin} para ${destination}</h2>
          
          <div id="carousel-${index}" class="relative w-full" data-carousel="static">
            <div class="relative overflow-hidden w-full h-20">
              <div class="flex duration-700 ease-in-out" data-carousel-inner>
                ${carouselSlides}
              </div>
            </div>
            
            <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-1 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-gray-400 group-focus:outline-none">
                <svg class="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span class="sr-only">Previous</span>
              </span>
            </button>
            
            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-1 cursor-pointer group focus:outline-none" data-carousel-next>
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-gray-400 group-focus:outline-none">
                <svg class="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>

        <div class="flight-cards-container mb-6">
          <!-- All flights for this date will be displayed as cards here -->
        </div>
      </section>`
    );
  }

  // Add event listeners for each carousel item (date)
  document.querySelectorAll("[data-date]").forEach((item) => {
    item.addEventListener("click", function () {
      const date = this.getAttribute("data-date");
      const section = this.closest("section");
      const sectionIndex = parseInt(section.getAttribute("data-index"));
      const sectionData = flightSections[sectionIndex];

      // Update the displayed flights for the selected date
      updateFlightCards(section, sectionData.flightsByDate[date].flights);
    });
  });

  // Initialize the flights for the first date of each section
  flightSections.forEach((sectionData, index) => {
    const section = document.getElementById(sectionData.id);
    const firstDate = sectionData.sortedDates[0];
    const flightsForFirstDate = sectionData.flightsByDate[firstDate].flights;
    updateFlightCards(section, flightsForFirstDate);

    // Initialize the carousel for this section
    initCarousel(section.querySelector(`#carousel-${index}`));
  });

  // Add footer with total price and selection counter
  flightsSection.insertAdjacentHTML(
    "beforeend",
    `<div class="flex justify-between items-center mt-6">
      <p class="text-xl font-semibold total-price">Valor Total: €0.00</p>
      <div class="flex items-center space-x-4">
        <button class="border-2 border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50">
          Cancelar
        </button>
        <div id="selection-counter">
          <span id="selected-count">0</span>/${totalSections}
        </div>
        <button id="payment-btn" class="bg-transparent border-2 border-gray-600 cursor-not-allowed opacity-50 text-gray-600 px-4 py-2 rounded">
          Pagamento
        </button>
      </div>
    </div>`
  );
});

// Format a date string to HH:mm
function formatTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Update the flight cards for the selected date in a section
function updateFlightCards(section, flights) {
  const container = section.querySelector(".flight-cards-container");
  container.innerHTML = "";

  const sectionIndex = parseInt(section.getAttribute("data-index"));
  const selectedFlightId = selectedFlights[sectionIndex];

  flights.forEach((flight) => {
    const isSelected = selectedFlightId === flight.id;
    const departureTime = formatTime(flight.departureTime);
    const arrivalTime = formatTime(flight.arrivalTime);

    const flightCardHTML = `
      <div class="bg-white rounded-xl shadow-md p-6 mb-3 flex justify-between items-center flight-card ${
        isSelected ? "border-2 border-indigo-500" : ""
      }" data-flight-id="${flight.id}">
        <div class="flex items-center space-x-6">
          <span class="text-orange-600 font-bold text-lg">${
            flight.company
          }</span>

          <div class="text-center">
            <p class="text-sm font-bold">${departureTime}</p>
            <p class="text-xs text-gray-500">${flight.origin}</p>
          </div>

          <div class="flex items-center space-x-2">
            <div class="w-16 h-px bg-blue-800"></div>
            <img src="../img/icons/blue/plane.svg" alt="plane icon" class="w-5 h-5" />
            <div class="w-16 h-px bg-blue-800"></div>
          </div>

          <div class="text-center">
            <p class="text-sm font-bold">${arrivalTime}</p>
            <p class="text-xs text-gray-500">${flight.destination}</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <p class="text-xl font-bold text-indigo-700">€${flight.price.toFixed(
            2
          )}</p>
          <button class="${
            isSelected
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-indigo-500 hover:bg-indigo-600"
          } text-white font-semibold px-5 py-2 rounded-lg shadow-sm select-flight-btn">
            ${isSelected ? "Desselecionar" : "Selecionar"}
          </button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", flightCardHTML);
  });

  // Add event listeners to the select/deselect buttons
  container.querySelectorAll(".select-flight-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const flightCard = this.closest(".flight-card");
      const flightId = parseInt(flightCard.getAttribute("data-flight-id"));
      const section = this.closest("section");
      const sectionIndex = parseInt(section.getAttribute("data-index"));

      // If already selected, deselect
      if (selectedFlights[sectionIndex] === flightId) {
        selectedFlights[sectionIndex] = null;
        flightCard.classList.remove("border-2", "border-indigo-500");
        this.textContent = "Selecionar";
        this.classList.remove("bg-gray-500", "hover:bg-gray-600");
        this.classList.add("bg-indigo-500", "hover:bg-indigo-600");
        selectedCount--;
      } else {
        // Deselect any previously selected flight in this section
        if (selectedFlights[sectionIndex]) {
          const prevSelectedCard = container.querySelector(
            `.flight-card[data-flight-id="${selectedFlights[sectionIndex]}"]`
          );
          if (prevSelectedCard) {
            prevSelectedCard.classList.remove("border-2", "border-indigo-500");
            const prevBtn =
              prevSelectedCard.querySelector(".select-flight-btn");
            prevBtn.textContent = "Selecionar";
            prevBtn.classList.remove("bg-gray-500", "hover:bg-gray-600");
            prevBtn.classList.add("bg-indigo-500", "hover:bg-indigo-600");
          }
        } else {
          // If there was no flight selected in this section, increment the counter
          selectedCount++;
        }

        // Select the new flight
        selectedFlights[sectionIndex] = flightId;
        flightCard.classList.add("border-2", "border-indigo-500");
        this.textContent = "Desselecionar";
        this.classList.remove("bg-indigo-500", "hover:bg-indigo-600");
        this.classList.add("bg-gray-500", "hover:bg-gray-600");
      }

      // Update the selection counter and payment button
      updateSelectionCounter();

      // Recalculate the total price
      calculateTotalPrice();
    });
  });
}

// Custom infinite carousel logic: always show 3 dates, loop infinitely
function initCarousel(carouselElement) {
  const inner = carouselElement.querySelector("[data-carousel-inner]");
  const slides = carouselElement.querySelectorAll("[data-carousel-item]");
  const prevButton = carouselElement.querySelector("[data-carousel-prev]");
  const nextButton = carouselElement.querySelector("[data-carousel-next]");

  const visibleItems = 3;
  const totalSlides = slides.length;
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = carouselElement.offsetWidth;
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
      slide.style.flex = `0 0 ${slideWidth}px`;
    });

    // Manage active state: always show 3 slides, wrap around if needed
    slides.forEach((slide) => slide.removeAttribute("data-carousel-item"));
    for (let i = 0; i < visibleItems; i++) {
      let idx = (currentIndex + i) % totalSlides;
      if (idx < 0) idx += totalSlides;
      slides[idx].setAttribute("data-carousel-item", "active");
    }
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  // Responsive: update size on window resize
  window.addEventListener("resize", updateCarousel);

  updateCarousel();
}

// Calculate the total price of all selected flights
function calculateTotalPrice() {
  totalPrice = 0;
  const allFlights = JSON.parse(localStorage.getItem("flights"));

  // Sum only the selected flights
  Object.values(selectedFlights).forEach((flightId) => {
    if (flightId) {
      const flight = allFlights.find((f) => f.id === flightId);
      if (flight) {
        totalPrice += flight.price;
      }
    }
  });

  updateTotalPriceDisplay();
}

// Update the total price display in the footer
function updateTotalPriceDisplay() {
  const totalPriceElement = document.querySelector(".total-price");
  if (totalPriceElement) {
    totalPriceElement.textContent = `Valor Total: €${totalPrice.toFixed(2)}`;
  }
}

// Update the selection counter and payment button
function updateSelectionCounter() {
  const selectedCountElement = document.getElementById("selected-count");
  const paymentBtn = document.getElementById("payment-btn");

  if (selectedCountElement) {
    selectedCountElement.textContent = selectedCount;
  }

  // Enable or disable the payment button based on selection
  if (paymentBtn) {
    if (selectedCount === totalSections) {
      paymentBtn.classList.remove(
        "bg-transparent",
        "border-gray-600",
        "cursor-not-allowed",
        "opacity-50",
        "text-gray-600"
      );
      paymentBtn.classList.add(
        "bg-green-500",
        "text-white",
        "hover:bg-green-600",
        "border-green-600"
      );
      paymentBtn.disabled = false;
    } else {
      paymentBtn.classList.add(
        "bg-transparent",
        "border-gray-600",
        "cursor-not-allowed",
        "opacity-50",
        "text-gray-600"
      );
      paymentBtn.classList.remove(
        "bg-green-500",
        "text-white",
        "hover:bg-green-600",
        "border-green-600"
      );
      paymentBtn.disabled = true;
    }
  }
}

// Add event listener for the payment button
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "payment-btn") {
    // Create a list with the IDs of the selected flights in the original order
    const flightIds = [];
    for (let i = 0; i < totalSections; i++) {
      if (selectedFlights[i]) {
        flightIds.push(selectedFlights[i]);
      }
    }

    console.log("Id's selecionados:", flightIds);
  }
});
