export function getAllCountries() {
  return fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => data.map((country) => country.cca2));
}

export function createDestinObj(destinName, latitude, longitude, poi) {
  const obj = {
    objName: destinName,
    lat: latitude,
    long: longitude,
    pois: poi,
  };

  return obj;
}

export function formatDateToYMD(dateString) {
  const [day, month, year] = dateString.split("-");

  return Date.parse(`${year},${month},${day}`);
}

export function formatFlightTime(dateString) {
  const date = dateString.split("T")[0];
}

export function loadViews(flight) {
  /* flight loop */

  let formatedDepartureTime = Date.parse(
    flight.departureTime.split("T")[0].split("-").join(",")
  );

  if (departureDate < formatedDepartureTime) {
    /* populate listView */
    destinationList.insertAdjacentHTML(
      "beforeend",
      `<li id="${flight.id}"class="border-2 border-blue-800 bg-white p-4 rounded shadow-lg last" value="${flight.destinationName}" id="${flight.id}">
          <p class="truncate">${flight.destinationName} <span class="opacity-60 text-xs">${flight.destination}</span></p>
        </li>`
    );

    /* populate mapView */
    let pin = user.favorites.includes(flight.destinationName)
      ? favIcon
      : destinIcon;

    const marker = L.marker([flight.destinLat, flight.destinLong], {
      icon: pin,
      zIndexOffset: 900,
    }).addTo(iconGroup);

    const apiKey = "NpYuyyJzclnrvUUkVK1ISyi2FGnrw4p9sNg9CCODQGsiFc0nWvuUJJMN";
    fetch(
      `https://api.pexels.com/v1/search?query=${flight.destinationName}&per_page=2`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const image =
          data.photos[1]?.src.medium || "../img/images/fallback.jpg";
        marker.bindPopup(
          `
              <div class="flex justify-center backdrop-blur-sm h-10 rounded-t-lg">
               <p class="">${flight.destinationName}</p>
              </div>
              <div class="w-40 h-30 bg-[url(${image})] bg-cover bg-center flex flex-col justify-between">
                
                </div>
                <div 
                  data-id="${flight.id}" 
                  class="popup-add-btn px-10 py-3 w-40 h-10 bg-blue-600  text-white flex justify-center items-center rounded-b-lg">
                  <p class="w-fit fle text-center mb-2">Adicionar à lista</p>
                </div>
              `
        );
      });

    marker.on("popupopen", (e) => {
      setTimeout(() => {
        const btn = e.popup._contentNode.querySelector(".popup-add-btn");

        btn.addEventListener("click", function (e) {
          const flightId = parseInt(this.getAttribute("data-id"));
          addToList(flightId);
        });
      }, 100);

      /* flight.poi.forEach((poi) => {
        const html = `<img />`;
        const poiMarker = L.marker([poi.latitude, poi.long], {
          icon: poiIcon,
          zIndexOffset: 200,
        }).addTo(poiGroup);
      }); */
    });

    marker.on("mouseover", function () {
      poiCards.innerHTML = "";
      poiDisplay.textContent = `${flight.destinationName} points of interest`;

      flight.poi.forEach((poi) => {
        const apiKey =
          "NpYuyyJzclnrvUUkVK1ISyi2FGnrw4p9sNg9CCODQGsiFc0nWvuUJJMN";
        fetch(`https://api.pexels.com/v1/search?query=${poi.name}&per_page=2`, {
          headers: {
            Authorization: apiKey,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const image =
              data.photos[1]?.src.medium || "../img/images/fallback.jpg";

            poiCards.insertAdjacentHTML(
              "beforeend",
              ` <div class="group border-2 border-blue-800 bg-[url(${image})] bg-cover w-30 h-30 rounded-lg">
                    <div class=" hidden group-hover:flex p-2 items-center text-center w-full h-full flex bg-[#6C6EA0] opacity-75 rounded-lg">
                      <span class="text-white">${poi.name}</span>
                    </div>
                  </div>
                `
            );
          });
      });
    });
  }
  mapLine();
}

export function getTurismTypeId(tourismType) {
  let tourismTypesArray = JSON.parse(localStorage.getItem("tourismTypes"));
  for (const [id, type] of Object.entries(tourismTypesArray)) {
    if (tourismType === type) {
      console.log(id);

      return id;
    }
  }
}
