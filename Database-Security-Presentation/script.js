
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;
const totalSlides = slides.length;

// Create navigation on every slide
slides.forEach((slide, index) => {
  const footer = document.createElement("div");
  footer.className = "slide-footer";

  footer.innerHTML = `
    <button class="nav-btn previous" type="button">
      ← Previous
    </button>

    <div class="slide-page-number">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <span class="divider">/</span>
      <span>${String(totalSlides).padStart(2, "0")}</span>
    </div>

    <button class="nav-btn next" type="button">
      Next →
    </button>
  `;

  slide.appendChild(footer);

  footer.querySelector(".previous").addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  footer.querySelector(".next").addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });
});

// Show selected slide
function showSlide(index) {
  if (index < 0 || index >= totalSlides) {
    return;
  }

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  currentSlide = index;
  slides[currentSlide].classList.add("active");

  // Disable Previous on first slide
  // Disable Next on last slide
  slides.forEach((slide, i) => {
    slide.querySelector(".previous").disabled = (i === 0);
    slide.querySelector(".next").disabled = (i === totalSlides - 1);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    showSlide(currentSlide + 1);
  }

  if (event.key === "ArrowLeft") {
    showSlide(currentSlide - 1);
  }
});

// Start presentation
showSlide(0);
