const sideBar = document.getElementById("sidebarContent");
const openProfileDropdownBtn = document.getElementById("openLoginModalBtn");
const openFormDropdownBtn = document.getElementById("formSidebar");

openProfileDropdownBtn.addEventListener("click", function () {
  if (sideBar.querySelector("#loggedModalList")) {
    sideBar.innerHTML = "";
    console.log("existe");
  } else {
    console.log("n existe");

    sideBar.innerHTML = `<div><ul id="loggedModalList">
            <li class="hover:bg-gray-300">
              <button
                id="profileBtn"
                class="flex w-full items-center gap-3 justify-between px-4 py-2 cursor-pointer"
              >
                <span>Perfil</span>
                <img
                  src="./assets/icons/blue/profile.svg"
                  alt="Perfil"
                  class="w-4 h-4"
                />
              </button>
            </li>
            <li
              id="logoutListSection"
              class="hover:bg-gray-300"
            >
              <button
                id="logoutBtn"
                class="flex w-full items-center gap-3 justify-between px-4 py-2 cursor-pointer"
              >
                <span>Terminar Sessão</span>
                <img
                  src="./assets/icons/blue/log-out.svg"
                  alt="Perfil"
                  class="w-4 h-4"
                />
              </button>
            </li>
          </ul></div>`;
  }
});
