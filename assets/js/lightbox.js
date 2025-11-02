// Lightbox Script by DaDon

document.addEventListener("DOMContentLoaded", function() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  const portfolioImages = document.querySelectorAll(".portfolio-item img");
  let currentIndex = 0;

  // Show image in lightbox
  portfolioImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      captionText.innerHTML = img.alt || "Portfolio Image";
      currentIndex = index;
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Navigate with keyboard arrows
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") lightbox.style.display = "none";
    }
  });

  // Next and previous functions
  function showNext() {
    currentIndex = (currentIndex + 1) % portfolioImages.length;
    lightboxImg.src = portfolioImages[currentIndex].src;
    captionText.innerHTML = portfolioImages[currentIndex].alt;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    lightboxImg.src = portfolioImages[currentIndex].src;
    captionText.innerHTML = portfolioImages[currentIndex].alt;
  }
});
