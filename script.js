const fadeStart = 0.85; // start fading last image at 85% of scroll
const fadeEnd = 1;      // complete fade at 100%

ScrollTrigger.create({
  trigger: ".scroll-space",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;

    // --- Intro ---
    introText.style.opacity = progress < 0.1 ? 1 - progress/0.1 : 0;

    // --- Images ---
    const imageProgress = Math.min(progress, fadeStart);
    const index = Math.floor(imageProgress * images.length);
    const localProgress = (imageProgress * images.length) - index;
    images.forEach((img, i) => {
      img.style.opacity = i === index ? 1 : 0;
      if(i === index) img.style.transform = `scale(${1 + 0.3 * localProgress})`;
      else img.style.transform = `scale(1)`;
    });

    // --- Last image fade & outro ---
    if(progress >= fadeStart){
      const fadeProgress = (progress - fadeStart)/(fadeEnd - fadeStart);

      // Fade last image to black
      images[images.length-1].style.opacity = 1 - fadeProgress;

      // Fade overlay (optional)
      fadeOverlay.style.opacity = fadeProgress;

      // Fade in outro text
      outroMain.style.opacity = fadeProgress;
      outroBottom.style.opacity = fadeProgress;
    } else {
      outroMain.style.opacity = 0;
      outroBottom.style.opacity = 0;
      fadeOverlay.style.opacity = 0;
      images[images.length-1].style.opacity = 1;
    }
  }
});
