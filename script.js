gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const scrollSpace = document.querySelector(".scroll-space");
const audio = document.getElementById("static-audio");

// Fade in audio for autoplay compliance
gsap.to(audio, {volume:0.1, duration:3});

// ScrollTrigger scrubbing
ScrollTrigger.create({
  trigger: scrollSpace,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress; // 0 → 1
    const totalImages = images.length;
    const index = Math.min(Math.floor(progress * totalImages), totalImages-1);

    images.forEach((img, i) => {
      if(i === index){
        img.style.opacity = 1;
        // zoom from 1 → 1.30 over scroll progress of that image
        const localProgress = (progress*totalImages - index);
        const scale = 1 + 0.30 * localProgress;
        img.style.transform = `scale(${scale})`;
      } else {
        img.style.opacity = 0;
        img.style.transform = `scale(1)`; // reset
      }
    });

    // Fade to black in last 5%
    if(progress > 0.95){
      fadeOverlay.style.opacity = (progress-0.9)/0.1;
    } else {
      fadeOverlay.style.opacity = 0;
    }
  }
});
