import * as TourismTypes from "../models/tourismtypeModel.js";

TourismTypes.init();

const tourismFormSection = document.getElementById("tourismFormSection");

window.addEventListener("load", (event) => {
  const tourismTypes = TourismTypes.getAll();

  tourismFormSection.innerHTML = "";

  tourismTypes.forEach((tourismType) => {
    tourismFormSection.insertAdjacentHTML(
      "beforeend",
      `<div
              class="px-2 py-1 flex gap-2 last:rounded-b-md first:rounded-t-md hover:bg-gray-100"
            >
              <h1>${tourismType.name}</h1>
              <img src="${tourismType.icon}">
            </div>`
    );
  });

  console.log(tourismTypes);
});
