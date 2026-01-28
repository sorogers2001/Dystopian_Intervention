gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const audio = document.getElementById("static-audio");

// Start audio immediately at low volume
audio.volume = 0.05; 
audio.play().catch(() => {
  console.log("Autoplay blocked, will start after user interaction");
});

// Scroll animation
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

// Fade images in/out
images.forEach((img, i) => {
  tl.to(img, {opacity: 1, duration: 0.5}, i)
    .to(img, {opacity: 0, duration: 0.5}, i + 0.5);
});

// Fade to black at the end
tl.to(fadeOverlay, {opacity: 1, duration: 1}, images.length + 0.5);
