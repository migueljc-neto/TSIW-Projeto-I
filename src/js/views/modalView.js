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
              <img src="./assets/icons/blue/users.svg" alt="Admin" class="w-4 h-4"/>
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
