gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const fadeOverlay = document.querySelector(".fade-to-black");
const scrollSpace = document.querySelector(".scroll-space");
const audio = document.getElementById("static-audio");

gsap.to(audio, {volume:0.1, duration:3});

ScrollTrigger.create({
  trigger: scrollSpace,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    let progress = self.progress; // 0 → 1
    const totalImages = images.length;
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

    if(progress > fadeStart){
      fadeOverlay.style.opacity = (progress - fadeStart)/(1 - fadeStart);
      images[images.length-1].style.opacity = 1;
      images[images.length-1].style.transform = `scale(1.3)`;
    } else {
      fadeOverlay.style.opacity = 0;
    }
  }
});
