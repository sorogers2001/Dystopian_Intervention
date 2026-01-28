window.addEventListener("load", () => {

  gsap.registerPlugin(ScrollTrigger);

  const images = gsap.utils.toArray(".image");
  const fadeOverlay = document.querySelector(".fade-to-black");
  const audio = document.getElementById("static-audio");
  const introText = document.querySelector(".intro-text");
  const outroMain = document.querySelector(".outro-main");
  const outroBottom = document.querySelector(".outro-bottom");

  const numImages = images.length;
  const fadeDuration = 0.15; // last 15% of scroll

  // Show first image initially
  images.forEach((img,i) => img.style.opacity = i===0 ? 1 : 0);

  // Fade in audio automatically
  gsap.to(audio, { volume:0.1, duration:3, ease:"none" });

  ScrollTrigger.create({
    trigger: ".scroll-space",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;

      // --- Intro text fade (first 10%) ---
      introText.style.opacity = progress < 0.1 ? 1 - progress/0.1 : 0;

      // --- Image crossfade + zoom ---
      const imageProgress = Math.min(progress, 1 - fadeDuration);
      const index = Math.floor(imageProgress * numImages);
      const localProgress = (imageProgress * numImages) - index;

      images.forEach((img,i) => {
        if(i === index){
          img.style.opacity = 1;
          img.style.transform = `scale(${1 + 0.3 * localProgress})`;
        } else {
          img.style.opacity = 0;
          img.style.transform = `scale(1)`;
        }
      });

      // --- Last image fade + fade-to-black + outro ---
      if(progress >= 1 - fadeDuration){
        const fadeProgress = (progress - (1 - fadeDuration)) / fadeDuration;

        images[numImages-1].style.opacity = 1 - fadeProgress;
        images[numImages-1].style.transform = "scale(1.3)";

        fadeOverlay.style.opacity = fadeProgress;
        outroMain.style.opacity = fadeProgress;
        outroBottom.style.opacity = fadeProgress;

      } else {
        fadeOverlay.style.opacity = 0;
        outroMain.style.opacity = 0;
        outroBottom.style.opacity = 0;
        images[numImages-1].style.opacity = 1;
      }
    }
  });

});
