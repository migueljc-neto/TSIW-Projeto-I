const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const loginModal = document.getElementById("loginModal");
const modalContent = document.getElementById("modalContent");

openModalBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
  setTimeout(() => {
    modalContent.classList.remove("opacity-0", "scale-95");
    modalContent.classList.add("opacity-100", "scale-100");
  }, 10);
});

closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    closeModal();
  }
});

function closeModal() {
  modalContent.classList.remove("opacity-100", "scale-100");
  modalContent.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    loginModal.classList.add("hidden");
  }, 300);
}
