const mainHeader = document.querySelector(".main");
const mainHeaderChildren = mainHeader.children;
const logo = mainHeaderChildren[0];
const navButton = mainHeaderChildren[1];
const navOverlay = mainHeaderChildren[2];
const slides = document.querySelectorAll(".body");
const exploreButtons = [...slides].map((slide) =>
  slide.querySelector("button")
);
const mouseCursor = document.querySelector(".mouse-cursor");
// const colorOverlays = document.querySelector(".color-swipe");

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
    reverse: false,
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
    { scale: 1, opacity: 1 },
    { scale: 0, opacity: 0, duration: 1 }
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

window.addEventListener("mousemove", cursor);

function cursor(e) {
  mouseCursor.style.top = `${e.pageY}px`;
  mouseCursor.style.left = `${e.pageX}px`;
}

logo.addEventListener("mouseover", () => {
  logo.classList.add("active");
});

logo.addEventListener("mouseleave", () => {
  logo.classList.remove("active");
});

navButton.addEventListener("mouseover", () => {
  navButton.classList.add("hover");
});

navButton.addEventListener("mouseleave", () => {
  navButton.classList.remove("hover");
});

exploreButtons.forEach((button, i) => {
  let colorOverlayTween;
  button.addEventListener("mouseover", () => {
    mouseCursor.style.color = "black";
    colorOverlay = slides[i].querySelector(".color-swipe");
    colorOverlayTween = gsap.to(colorOverlay, { y: "-100%", duration: 1 });
  });
  button.addEventListener("mouseleave", () => {
    mouseCursor.style.color = "white";
    colorOverlayTween.reverse();
  });
});
