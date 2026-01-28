gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const audio = document.getElementById("static-audio");
const introText = document.querySelector(".intro-text");
const outroText = document.querySelector(".outro-text");

// fade in audio
gsap.to(audio, {volume:0.1, duration:3});

// Total scroll
const numImages = images.length;
const fadeDuration = 0.05; // last 5% for fade

ScrollTrigger.create({
  trigger: ".scroll-space",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;

    // --- Intro: fade out in first 10% ---
    if(progress < 0.1){
      introText.style.opacity = 1 - (progress / 0.1);
    } else {
      introText.style.opacity = 0;
    }

    // --- Images crossfade + zoom ---
    const imageProgress = Math.min(progress, 1 - fadeDuration);
    const index = Math.floor(imageProgress * numImages);
    const localProgress = (imageProgress * numImages) - index;

    images.forEach((img, i) => {
      if(i === index){
        img.style.opacity = 1;
        img.style.transform = `scale(${1 + 0.3 * localProgress})`;
      } else {
        img.style.opacity = 0;
        img.style.transform = `scale(1)`;
      }
    });

    // --- Fade to black + outro ---
    if(progress > 1 - fadeDuration){
      const fadeProgress = (progress - (1 - fadeDuration)) / fadeDuration;
      fadeOverlay.style.opacity = fadeProgress;
      images[numImages-1].style.opacity = 1;
      images[numImages-1].style.transform = `scale(1.3)`;
      outroText.style.opacity = fadeProgress;
    } else {
      fadeOverlay.style.opacity = 0;
      outroText.style.opacity = 0;
    }
  }
});
