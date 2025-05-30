import * as TourismTypes from "../models/TourismtypeModel.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main > section");
  const mainForm = document.getElementById("mainForm");
  const formNavContainer = document.getElementById("formNavContainer");
  const footer = document.querySelector("footer");

  const tourismText = document.getElementById("tourismText");
  const originText = document.getElementById("originText");

  const firstSection = sections[0];

  let currentSectionIndex = 0;

  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(sections).indexOf(entry.target);
        currentSectionIndex = index;

        if (currentSectionIndex === 0) {
          if (!footer.contains(mainForm)) {
            footer.appendChild(mainForm);
            tourismText.classList.remove("hidden");
            originText.classList.remove("hidden");
          }
          formNavContainer.classList.add("hidden");
        } else {
          if (!formNavContainer.contains(mainForm)) {
            formNavContainer.appendChild(mainForm);
            formNavContainer.classList.remove("hidden");
            tourismText.classList.add("hidden");
            originText.classList.add("hidden");
          }
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});
