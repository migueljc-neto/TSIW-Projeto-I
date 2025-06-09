import * as Flights from "../models/flightModel.js";
import * as Helper from "../models/ModelHelper.js";

Flights.init();

let trip = {
  id: 4,
  name: "Visita ao Iceberg",
  typesOfTourism: [1, 4],
  origin: "OPO",
  destination: "CDK",
  price: 3200,
  company: "Icelandair",
  duration: "10 dias",
  startDate: "2025-07-01",
  endDate: "2025-07-11",
  description: "Descubra a Islândia.",
  isPack: true,
  flights: [114, 116, 20],
};

let flightsTrip = Array.from(trip.flights);

window.addEventListener("DOMContentLoaded", () => {
  populateData();
});
const flightResume = document.getElementById("flightResume");
function populateData() {
  flightResume.innerHTML = "";
  flightResume.insertAdjacentHTML(
    "beforeend",
    `<h1 class="text-4xl font-semibold text-[#3b3b3b] mb-6">Resumo viagem - ${trip.name}</h1>
    `
  );
  flightsTrip.forEach((flight, index) => {
    let flightData = Flights.getFlightById(flight);
    // Pega o próximo voo, se existir
    let nextFlightData = null;
    let arrivalDate = "";
    if (index < flightsTrip.length - 1) {
      nextFlightData = Flights.getFlightById(flightsTrip[index + 1]);
      arrivalDate = Helper.formatDate(nextFlightData.departureTime);
    } else {
      arrivalDate = Helper.formatDate(flightData.departureTime);
    }

    let departureDate = Helper.formatDate(flightData.arrivalTime);
    let arrivalTime = Helper.formatTime(flightData.arrivalTime);
    let departureTime = Helper.formatTime(flightData.departureTime);
    let dateString;
    if (departureDate == arrivalDate) {
      dateString = departureDate;
    } else {
      dateString = departureDate + " - " + arrivalDate;
    }

    // Usa o código IATA para mostrar o logo da companhia
    const iata = Helper.getIata(flightData.company);
    const logoUrl = `https://images.daisycon.io/airline/?width=100&height=40&color=ffffff&iata=${iata}`;
    flightResume.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-6" id="legCard">
        <div
          class="bg-[#3d4c75] flex justify-between text-white px-7 py-7 rounded-lg mb-2"
        >
          <div class="text-xl font-semibold items-center flex gap-5">
            <img
              src="../img/icons/white/startTrip.svg"
              alt="startpointIcon"
              width="15"
              height="10"
            />
            <p class="text-xl">${flightData.originName}</p>
          </div>
          <p>${dateString}</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg text-white rounded-lg">
          <div class="bg-[#7f7bb7] px-6 py-4 text-white rounded-t-lg">
            <div class="flex justify-between items-center">
              <p class="text-lg">
                ${flightData.originName}<span class="font-light text-sm"> - ${flightData.duration} - </span>${flightData.destinationName}
              </p>
              <p class="text-sm">${departureDate}</p>
            </div>
          </div>

          <div class="py-4 px-10">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <img
                  src="${logoUrl}"
                  alt=""
                  srcset=""
                />
                <p class="flex text-lg text-[#3d4c75]">${flightData.origin}</p>
                <img src="../img/icons/blue/plane.svg" alt="Flight Icon" />
                <p class="flex text-lg text-[#3d4c75]">${flightData.destination}</p>
              </div>
              <p class="text-sm text-[#3d4c75]">${departureDate}</p>
            </div>

            <div class="py-4 flex flex-col gap-8 relative">
              <div
                class="items-center flex justify-between text-lg text-[#3d4c75] relative"
              >
                <div class="flex items-center gap-2">
                  <div class="relative">
                    <p class="text-4xl relative z-10 bg-white">•</p>
                    <div
                      class="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-16 z-10 bg-[#3d4c75]"
                    ></div>
                  </div>
                  <div>
                    <p>${flightData.originName} (${flightData.origin})</p>
                    <p class="text-sm text-gray-500">
                      Francisco Sá Carneiro Int Airport
                    </p>
                  </div>
                </div>
                <div><p>${departureTime}h</p></div>
              </div>

              <div
                class="items-center flex justify-between text-lg text-[#3d4c75]"
              >
                <div class="flex items-center gap-2">
                  <p class="text-4xl relative z-10 bg-white">•</p>
                  <div
                    class="absolute top-14 transform translate-x-2.5 w-0.5 h-16 z-10 bg-[#3d4c75]"
                  ></div>
                  <div>
                    <p>${flightData.destinationName} (${flightData.destination})</p>
                    <p class="text-sm text-gray-500">
                      Adolfo Suárez Madrid–Barajas Airport
                    </p>
                  </div>
                </div>
                <div><p>${arrivalTime}h</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    );
  });

  flightResume.insertAdjacentHTML(
    "beforeend",
    `<div class="fixed print:hidden bottom-0 left-0 right-0 z-20 py-2 border-t-2 bg-white w-full mx-auto text-center">
  <div class="flex justify-around">
    <button class="border-2 border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50" onClick="window.print()">Imprimir</button>
    <button class="border-2 border-blue-900 text-blue-900 px-4 py-2 rounded hover:bg-red-50" onClick="window.print()">Pagar</button>
  </div>
</div>`
  );
}
