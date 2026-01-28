gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const scrollSpace = document.querySelector(".scroll-space");
const audio = document.getElementById("static-audio");

// fade in audio (muted required for autoplay)
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
      img.style.opacity = i === index ? 1 : 0;
    });

    // fade to black in last 10%
    if(progress > 0.9){
      fadeOverlay.style.opacity = (progress-0.9)/0.1;
    } else {
      fadeOverlay.style.opacity = 0;
    }
  }
});
