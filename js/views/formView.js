import * as TourismTypes from "../models/tourismtypeModel.js";

TourismTypes.init();

const mainForm = document.getElementById("mainForm");
const tourismFormSection = document.getElementById("tourismFormSection");

const today = new Date().toLocaleDateString("pt-PT");

window.addEventListener("load", (event) => {
  mainForm.insertAdjacentHTML(
    "afterbegin",
    `<div
    class="group flex gap-3 min-w-fit h-fit bg-white hover:outline-blue-600 hover:outline-3 hover:border- px-6 py-3 cursor transition rounded-l-full"
    >
    <input
      datepicker
      datepicker-autohide
      id="form-datepicker"
      type="text"
      placeholder="Select date"
      class="cursor-pointer"
     />
     <img
      src="./img/icons/blue/calendar.svg"
      alt="calendarIcon"
      class="w-4"
     />
    </div>`
  );

  const datePicker = document.getElementById("form-datepicker");

  new Datepicker(datePicker, {
    autohide: true,
    format: "dd-mm-yyyy",
    minDate: today,
    orientation: "top",
    autoSelectToday: 1,
  });

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
