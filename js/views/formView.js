import * as TourismTypes from "../models/TourismtypeModel.js";

TourismTypes.init();

const mainForm = document.getElementById("mainForm");
const tourismFormSection = document.getElementById("tourismDropdown");

const today = new Date().toLocaleDateString("pt-PT");

window.addEventListener("load", (event) => {
  mainForm.insertAdjacentHTML(
    "afterbegin",
    `<div
    class="group flex gap-3 h-fit w-fit bg-white hover:outline-blue-600 hover:outline-3 hover:border- px-6 py-3 cursor transition rounded-l-full"
    >
    <input
      datepicker
      datepicker-autohide
      id="form-datepicker"
      type="text"
      placeholder="Data"
      class="cursor-pointer w-[6ch]"
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
      `<li class="list-none">
              <button
              data-value="${tourismType.name}"
                class="block px-4 py-2 w-full hover:first:rounded-t-md hover:last:rounded-t-md hover:bg-gray-200"
                >${tourismType.name}</button
              >
            </li>`
    );
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main > section");
  const mainForm = document.getElementById("mainForm");
  const formNavContainer = document.getElementById("formNavContainer");
  const footer = document.querySelector("footer");
  const logo = document.getElementById("logo");
  const logoImg = logo.querySelectorAll("img");
  const tourismText = document.getElementById("tourismText");
  const originText = document.getElementById("originText");
  const header = document.querySelector("header");
  const favoritesText = header.querySelector("#favoritesText");
  const passportText = header.querySelector("#passportText");
  const favoritesBtn = header.querySelector("#favoritesBtn");
  const passportBtn = header.querySelector("#passportBtn");
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
          }

          formNavContainer.classList.add("hidden");
          passportText.classList.remove("hidden");
          favoritesText.classList.remove("hidden");
          favoritesBtn.classList.remove("p-3");
          favoritesBtn.classList.add("px-4", "py-2");
          passportBtn.classList.remove("p-3");
          passportBtn.classList.add("px-4", "py-2");
          logoImg.forEach((img) => {
            img.src = "./img/logos/logoDarkmode_logotipo darkmode.png";
          });
        } else {
          if (!formNavContainer.contains(mainForm)) {
            formNavContainer.appendChild(mainForm);
          }
          if (window.innerWidth < 1024) {
            formNavContainer.classList.add("hidden");
          } else {
            formNavContainer.classList.remove("hidden");
          }
          logoImg.forEach((img) => {
            img.src = "./img/logos/logo-12.png";
          });

          passportText.classList.add("hidden");
          favoritesBtn.classList.add("p-3");
          favoritesBtn.classList.remove("px-4", "py-2");
          passportBtn.classList.add("p-3");
          passportBtn.classList.remove("px-4", "py-2");
          favoritesText.classList.add("hidden");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});

window.addEventListener("resize", () => {
  const formNavContainer = document.getElementById("formNavContainer");
  if (window.innerWidth < 1024) {
    formNavContainer.classList.add("hidden");
  } else {
    formNavContainer.classList.remove("hidden");
  }
});
