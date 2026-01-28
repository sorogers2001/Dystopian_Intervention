gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".image");
const panels = gsap.utils.toArray(".panel");

images.forEach((image, i) => {
  gsap.to(image, {
    opacity: 1,
    scrollTrigger: {
      trigger: panels[i],
      start: "top center",
      end: "bottom center",
      scrub: true,
      onEnter: () => setActive(image),
      onEnterBack: () => setActive(image)
    }
  });
});

function setActive(activeImage) {
  images.forEach(img => {
    img.classList.remove("active");
    gsap.to(img, { opacity: 0, duration: 0.5 });
  });

  activeImage.classList.add("active");
  gsap.to(activeImage, { opacity: 1, duration: 0.8 });
}
