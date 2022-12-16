var slideDelay = 3;
var slideDuration = 1;
var snapX;

var slides = document.querySelectorAll(".slide");
var slideCont = document.querySelector(".slides-container")
var prevButton = document.querySelector("#prevButton");
var backArrow = document.getElementById("backArrow");
var nextButton = document.querySelector("#nextButton");
var progressWrap = gsap.utils.wrap(0, 1);

var numSlides = slides.length;

gsap.set(slides, {
  xPercent: i => i * 100
});

var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
var timer = gsap.delayedCall(slideDelay, autoPlay);

var animation = gsap.to(slides, {
  xPercent: "+=" + (numSlides * 100),
  duration: 1,
  ease: "none",
  paused: true,
  repeat: 1,
  modifiers: {
    xPercent: wrap
  }
});

var proxy = document.createElement("div");
var slideAnimation = gsap.to({}, {});
var slideWidth = 1360;
var wrapWidth = 10;
resize();

window.addEventListener("resize", resize);

backArrow.onmouseover = function() {
  this.src = "./assets/back-arrow-hover.svg";
}
backArrow.onmouseout = function() {
  this.src = "./assets/back-arrow.svg";
}

prevButton.addEventListener("click", function() {
  animateSlides(1);
});

nextButton.addEventListener("click", function() {
  animateSlides(-1);
});

slideCont.addEventListener("mouseenter", function() {
  timer.pause()
});

slideCont.addEventListener("mouseleave", function() {
  timer.play()
});


function animateSlides(direction) {
    
  timer.restart(true);
  slideAnimation.kill();
  
  var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
  console.log(x, direction, slideWidth);

  
  slideAnimation = gsap.to(proxy, {
    x: x,
    duration: slideDuration,
    onUpdate: updateProgress
  });  
}

function autoPlay() {  
  animateSlides(-1);
}

function updateProgress() { 
  animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
}

function resize() {
  
  var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
  
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;
  snapX = gsap.utils.snap(slideWidth);
  
  gsap.set(proxy, {
    x: norm * wrapWidth
  });
  
  animateSlides(0);
  slideAnimation.progress(1);
}


