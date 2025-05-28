addEventListener("scroll", (event) => {
  h1 = document.querySelector("h1");

  h1.classList.remove("text-red-400");
  h1.classList.add("text-blue-400");
});
