import * as User from "../models/userModel.js";

const openLoginModalBtn = document.getElementById("openLoginModalBtn");

const closeModalBtn = document.getElementById("closeModalBtn");
const closeRegisterModalBtn = document.getElementById("closeRegisterModalBtn");

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

const modalContent = document.getElementById("modalContent");
const modalRegisterContent = document.getElementById("modalRegisterContent");

const reopenRegisterBtn = document.getElementById("signUpText");
const reopenLoginBtn = document.getElementById("signInText");

const profileBtn = document.getElementById("profileBtn");
const logoutBtn = document.getElementById("logoutBtn");

const logoutListSection = document.getElementById("logoutListSection");
const loggedModalList = document.getElementById("loggedModalList");

/* Login */

openLoginModalBtn.addEventListener("click", () => {
  if (User.isLogged()) {
    const adminModalSection = document.getElementById("adminModalSection");

    if (User.isAdmin(User.getUserLogged())) {
      logoutListSection.classList.remove("last:rounded-b-xl");
      if (!adminModalSection) {
        loggedModalList.insertAdjacentHTML(
          "beforeend",
          `<li id="adminModalSection" class="hover:bg-gray-300 first:rounded-t-xl last:rounded-b-xl">
            <button id="adminBtn" class="flex w-full items-center gap-3 justify-between px-4 py-2 cursor-pointer">
              <span>Admin</span>
              <img src="./img/icons/blue/users.svg" alt="Admin" class="w-4 h-4"/>
            </button>
          </li>`
        );

        const adminBtn = document.getElementById("adminBtn");

        adminBtn.addEventListener("click", () => {
          location.href = "./html/admin.html";
        });
      }
    } else if (adminModalSection) {
      adminModalSection.remove();
      logoutListSection.classList.add("last:rounded-b-xl");
    }

    // Toggle modal visibility
    loggedModal.classList.toggle("hidden");
  } else {
    loginModal.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("opacity-0", "scale-95");
      modalContent.classList.add("opacity-100", "scale-100");
    }, 10);
  }
});

profileBtn.addEventListener("click", () => {
  location.href = "./html/profile.html";
});

logoutBtn.addEventListener("click", () => {
  User.logout();
  loggedModal.classList.add("hidden");
});

/* Register */

reopenRegisterBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
  registerModal.classList.remove("hidden");
  setTimeout(() => {
    modalContent.classList.remove("opacity-100", "scale-100");
    modalContent.classList.add("opacity-0", "scale-95");
    modalRegisterContent.classList.remove("opacity-0", "scale-95");
    modalRegisterContent.classList.add("opacity-100", "scale-100");
  }, 10);
});

reopenLoginBtn.addEventListener("click", () => {
  registerModal.classList.add("hidden");
  loginModal.classList.remove("hidden");
  setTimeout(() => {
    modalRegisterContent.classList.remove("opacity-100", "scale-100");
    modalRegisterContent.classList.add("opacity-0", "scale-95");
    modalContent.classList.remove("opacity-0", "scale-95");
    modalContent.classList.add("opacity-100", "scale-100");
  }, 10);
});

/* Both */

closeModalBtn.addEventListener("click", closeLoginModal);
closeRegisterModalBtn.addEventListener("click", closeRegisterModal);

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    closeLoginModal();
  } else if (e.target === registerModal) {
    closeRegisterModal();
  }
});

function closeLoginModal() {
  modalContent.classList.remove("opacity-100", "scale-100");
  modalContent.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    loginModal.classList.add("hidden");
  }, 300);
}

function closeRegisterModal() {
  modalRegisterContent.classList.remove("opacity-100", "scale-100");
  modalRegisterContent.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    registerModal.classList.add("hidden");
  }, 300);
}

/* Sidebar */

const sideBar = document.getElementById("sidebar");
const navButtons = document.getElementById("navButtons");
const openProfileDropdownBtn = document.getElementById("profileSidebar");
const openFormDropdownBtn = document.getElementById("formSidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");

let currentSidebarContent = null;

function openSidebar(contentType) {
  sidebarBackdrop.classList.remove("hidden");
  sidebarBackdrop.classList.add("block");
  sideBar.classList.remove("translate-x-full");
  navButtons.style.right = "14rem";
  currentSidebarContent = contentType;
}

function closeSidebar() {
  sideBar.classList.add("translate-x-full");
  navButtons.style.right = "0";
  currentSidebarContent = null;
  sideBar.innerHTML = "";
  openProfileDropdownBtn.classList.remove("border-r-0!");
  openFormDropdownBtn.classList.remove("border-r-0!");

  sidebarBackdrop.classList.add("hidden");
  sidebarBackdrop.classList.remove("block");
}

function populateProfileContent() {
  sideBar.innerHTML = `
    <div id="anchorDiv" class="right-0 transition">
      <ul id="loggedModalList">
        <li class="hover:bg-gray-300">
          <button onclick="location.href='./html/profile.html'" class="flex w-full items-center justify-between px-4 py-2 cursor-pointer">
            <span class="color-primary">Perfil</span>
            <img src="./img/icons/blue/profile.svg" alt="Perfil" class="w-4 h-4" />
          </button>
        </li>
        <li id="logoutListSection" class="hover:bg-gray-300">
          <button id="logoutBtn" class="flex w-full items-center justify-between px-4 py-2 cursor-pointer">
            <span class="color-primary">Terminar Sessão</span>
            <img src="./img/icons/blue/log-out.svg" alt="Perfil" class="w-4 h-4" />
          </button>
        </li>
      </ul>
    </div>
  `;
  openProfileDropdownBtn.classList.add("border-r-0!");
  openFormDropdownBtn.classList.remove("border-r-0!");
}

function populateFormContent() {
  sideBar.innerHTML = `
    <div class="bg-blue-900 w-full h-fit p-2 text-white">Procurar Viagens</div>
    <ul>
      <li class="flex gap-1 p-2">
        <input
          datepicker
          datepicker-autohide
          id="navbar-datepicker"
          type="text"
          placeholder="Selecionar Data"
          datepicker-format="dd-mm-yyyy"
          datepicker-orientation="left"
          class="cursor-pointer"
        />
        <img src="./img/icons/blue/calendar.svg" alt="calendarIcon" class="w-4" />
      </li>
    </ul>`;

  openFormDropdownBtn.classList.add("border-r-0!");
  openProfileDropdownBtn.classList.remove("border-r-0!");

  const input = document.getElementById("navbar-datepicker");
  if (input) {
    new Datepicker(input);
  }
}

openProfileDropdownBtn.addEventListener("click", () => {
  if (currentSidebarContent === "profile") {
    closeSidebar();
  } else {
    populateProfileContent();
    openSidebar("profile");
  }
});

openFormDropdownBtn.addEventListener("click", () => {
  if (currentSidebarContent === "form") {
    closeSidebar();
  } else {
    populateFormContent();
    openSidebar("form");
  }
});

sidebarBackdrop.addEventListener("click", () => {
  if (currentSidebarContent === "form" || currentSidebarContent === "profile") {
    closeSidebar();
  }
});
