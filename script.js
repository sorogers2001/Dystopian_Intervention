const images = gsap.utils.toArray(".image");
const scrollSpace = document.querySelector(".scroll-space");

// Play audio after first click
const audio = document.getElementById("static-audio");
document.body.addEventListener("click", () => {
  audio.volume = 0.1; // subtle volume
  audio.play();
}, { once: true });

// Smooth image swap based on scroll
window.addEventListener("scroll", () => {
  const scrollPercent = window.scrollY / (scrollSpace.offsetHeight - window.innerHeight);
  const index = Math.floor(scrollPercent * images.length);

  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
});
