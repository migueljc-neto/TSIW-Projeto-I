import * as Trips from "../models/TripModel.js";

Trips.init();

window.addEventListener("load", async () => {
  const packs = Trips.getAllPacks();
  const swiperPacks = document.getElementById("swiperPacks");

  const apiKey = "NpYuyyJzclnrvUUkVK1ISyi2FGnrw4p9sNg9CCODQGsiFc0nWvuUJJMN";

  const fetchSlides = packs.map(async (pack) => {
    const query = `${pack.name} city`;

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
        {
          headers: { Authorization: apiKey },
        }
      );
      const data = await response.json();
      const image = data.photos[0]?.src.medium || "fallback.jpg";

      swiperPacks.insertAdjacentHTML(
        "beforeend",
        `<div class="swiper-slide relative cursor-drag">
            <img src="${image}" alt="${
          pack.name
        }" class="w-full h-auto rounded-t-lg" />
            <div class="absolute backdrop-blur-sm bottom-0 left-0 p-5 w-full h-30 bg-white bg-opacity-80 text-black p-2">
                <div class="flex gap-6 items-center font-space font-light mb-3">
                    <p class="text-lg">${pack.name}</p>
                    <p class="text-sm">${formatDateToLabel(
                      pack.startDate
                    )} - ${formatDateToLabel(pack.endDate)}</p>
                </div>
                <div class="color-primary font-light">${pack.price}€</div>
            </div>
        </div>`
      );
    } catch (error) {
      console.error("Image fetch failed:", error);
    }
  });

  await Promise.all(fetchSlides);

  // Now initialize Swiper
  new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
  });
});

function formatDateToLabel(dateString) {
  const [year, month, day] = dateString.split("-");
  const currentYear = new Date().getFullYear().toString();

  if (year === currentYear) {
    return `${day}/${month}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}

const testBtn = document.getElementById("testBtn");

testBtn.addEventListener("click", () => {
  return fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((datas) => {
        console.log(`${datas.cca2.toLowerCase()}.svg`);
      });
    });
});
