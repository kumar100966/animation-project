const mainHeaderChildren = document.querySelector(".main").children;
const logo = mainHeaderChildren[0];
const navButton = mainHeaderChildren[1];
const navOverlay = mainHeaderChildren[2];

navButton.addEventListener("click", (e) => {
  console.log(e.target);
  e.target.classList.toggle("active");
  logo.classList.toggle("active");
  navOverlay.classList.toggle("active");
});
