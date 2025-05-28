import * as TourismTypes from "../models/TourismtypeModel.js";

TourismTypes.init();

const tourismFormSection = document.getElementById("tourismFormSection");

window.addEventListener("load", (event) => {
  const tourismTypes = TourismTypes.getAll();

  tourismFormSection.innerHTML = "";

  tourismTypes.forEach((tourismType) => {
    tourismFormSection.insertAdjacentHTML(
      "beforeend",
      `<div
              class="px-2 py-1 flex items-center gap-2 w-full last:rounded-b-md first:rounded-t-md hover:bg-gray-100 cursor-pointer"
            >
            <button>${tourismType.name}</button>
            </div>`
    );
  });
});
