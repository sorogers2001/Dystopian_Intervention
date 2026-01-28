gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const audio = document.getElementById("static-audio");

// Fade in audio after short delay for browsers that allow muted autoplay
gsap.to(audio, {volume: 0.1, duration: 3});

// Invisible scroll space triggers scrubbing
const scrollSpace = document.createElement("div");
scrollSpace.classList.add("scroll-space");
document.body.appendChild(scrollSpace);

// Scroll-driven image scrubbing
ScrollTrigger.create({
  trigger: scrollSpace,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress; // 0 -> 1
    const totalImages = images.length;
    const index = Math.floor(progress * totalImages);
    
    images.forEach((img, i) => {
      img.style.opacity = i === index ? 1 : 0;
    });

    // Fade to black in last 10% of scroll
    if(progress > 0.9){
      fadeOverlay.style.opacity = (progress-0.9)/0.1;
    } else {
      fadeOverlay.style.opacity = 0;
    }
  }
});
