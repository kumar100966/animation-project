const mainHeaderChildren = document.querySelector(".main").children;
const logo = mainHeaderChildren[0];
const navButton = mainHeaderChildren[1];
const navOverlay = mainHeaderChildren[2];
const slides = document.querySelectorAll(".body");

let sceneController = new ScrollMagic.Controller();

navButton.addEventListener("click", function () {
  const activeClass = "active";
  this.classList.toggle(activeClass);
  logo.classList.toggle(activeClass);
  navOverlay.classList.toggle(activeClass);
});

slides.forEach((slide, i) => {
  const covers = slide.querySelectorAll(".cover");
  const timeline = gsap.timeline();
  timeline.fromTo(covers, { x: "0%" }, { duration: 1, x: "100%" });
  const scene = new ScrollMagic.Scene({
    triggerElement: slide,
    triggerHook: "onCenter",
  });
  scene.setTween(timeline);
  scene.addIndicators({
    colorStart: "white",
    colorEnd: "white",
    colorTrigger: "white",
    name: "slide",
  });
  sceneController.addScene(scene);
});
