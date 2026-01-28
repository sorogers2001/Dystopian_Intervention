gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");

// Total scroll height
const scrollHeight = document.body.scrollHeight - window.innerHeight;

window.addEventListener("scroll", () => {
  const scrollPercent = window.scrollY / scrollHeight;
  const index = Math.floor(scrollPercent * images.length);

  images.forEach((img, i) => {
    img.style.opacity = i === index ? 1 : 0;
  });
});

