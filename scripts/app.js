const mainHeader = document.querySelector(".main");
const mainHeaderChildren = mainHeader.children;
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

const timeline = gsap.timeline({ duration: 1 });
timeline.fromTo(mainHeader, { y: "-100%" }, { y: "0%" });

for (let i = 0; i < slides.length; i++) {
  const pinScene = new ScrollMagic.Scene({
    triggerElement: slides[i],
    triggerHook: "onLeave",
    duration: "200%",
  });
  pinScene.setPin(slides[i], {
    pushFollowers: true,
  });
  // pinScene.addIndicators({
  //   colorStart: "white",
  //   colorEnd: "white",
  //   colorTrigger: "white",
  //   name: "pin",
  //   indent: 400,
  // });
  sceneController.addScene(pinScene);

  const covers = slides[i].querySelectorAll(".cover");
  const removeCoversTimeline = gsap.timeline({
    duration: 1,
  });
  removeCoversTimeline.fromTo(covers, { x: "0%" }, { x: "100%" });
  const coversScene = new ScrollMagic.Scene({
    triggerElement: slides[i],
    triggerHook: "onCenter",
  });
  coversScene.setTween(removeCoversTimeline);
  // coversScene.addIndicators({
  //   colorStart: "white",
  //   colorEnd: "white",
  //   colorTrigger: "white",
  //   name: "slide",
  // });
  sceneController.addScene(coversScene);

  if (i == slides.length - 1) break;

  const fadeTimeline = gsap.timeline();
  fadeTimeline.fromTo(
    slides[i],
    { scale: 1, opacity: 1, y: "0%" },
    { scale: 0, opacity: 0, duration: 1, y: "-100%" }
  );

  const fadeScene = new ScrollMagic.Scene({
    triggerElement: slides[i + 1],
    triggerHook: 0.8,
  });
  fadeScene.setTween(fadeTimeline);
  // fadeScene.addIndicators({
  //   colorStart: "white",
  //   colorEnd: "white",
  //   colorTrigger: "white",
  //   name: "fade",
  //   indent: 200,
  // });
  sceneController.addScene(fadeScene);
}
