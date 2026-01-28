gsap.registerPlugin(ScrollTrigger);

// Select elements
const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const audio = document.getElementById("static-audio");
const introText = document.querySelector(".intro-text");
const outroMain = document.querySelector(".outro-main");
const outroBottom = document.querySelector(".outro-bottom");

const numImages = images.length;
const fadeDuration = 0.15; // last 15% of scroll used for fade + outro

// Fade in audio automatically
gsap.to(audio, { volume: 0.1, duration: 3, ease: "none" });

// ScrollTrigger
ScrollTrigger.create({
  trigger: ".scroll-space",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress; // 0 → 1

    // --- Intro text fade (first 10%) ---
    if(progress < 0.1){
      introText.style.opacity = 1 - (progress / 0.1);
    } else {
      introText.style.opacity = 0;
    }

    // --- Images crossfade + zoom (up to fade start) ---
    const imageProgress = Math.min(progress, 1 - fadeDuration);
    const index = Math.floor(imageProgress * numImages);
    const localProgre
