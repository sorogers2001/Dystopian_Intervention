gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const scrollSpace = document.querySelector(".scroll-space");
const audio = document.getElementById("static-audio");

const introText = document.querySelector(".intro-text");
const outroText = document.querySelector(".outro-text");

// Fade in audio
gsap.to(audio, {volume:0.1, duration:3});

// ScrollTrigger
ScrollTrigger.create({
  trigger: scrollSpace,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress; // 0 → 1
    const totalImages = images.length;

    // --- Intro text: fade out quickly in first 10% of scroll ---
    if(progress < 0.1){
      introText.style.opacity = 1 - progress/0.1; // fades out from 1 → 0
    } else {
      introText.style.opacity = 0;
    }

    // --- Image zoom & crossfade ---
    const fadeStart = 0.95; // last 5% for fade
    const effectiveProgress = Math.min(progress, fadeStart);
    const index = Math.min(Math.floor(effectiveProgress * totalImages), totalImages-1);
    const localProgress = (effectiveProgress * totalImages) - index;

    images.forEach((img, i) => {
      if(i === index){
        img.style.opacity = 1;
        const scale = 1 + 0.3 * localProgress;
        img.style.transform = `scale(${scale})`;
      } else {
        img.style.opacity = 0;
        img.style.transform = `scale(1)`;
      }
    });

    // --- Fade to black + outro text in last 5% ---
    if(progress > fadeStart){
      const fadeProgress = (progress - fadeStart)/(1 - fadeStart);
      fadeOverlay.style.opacity = fadeProgress;
      images[images.length-1].style.opacity = 1;
      images[images.length-1].style.transform = `scale(1.3)`;

      outroText.style.opacity = fadeProgress; // show outro gradually
    } else {
      fadeOverlay.style.opacity = 0;
      outroText.style.opacity = 0;
    }
  }
});
