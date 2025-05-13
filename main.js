document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburger.addEventListener("click", function () {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
});

// Loading screen animation
const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loaderProgress");

// Simulate loading progress
let progress = 0;
const loadingInterval = setInterval(() => {
  progress += Math.random() * 10;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingInterval);
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 300);
  }
  loaderProgress.style.width = `${progress}%`;
}, 200);

// LED Animation
const ledContainer = document.getElementById("ledAnimation");
const colors = ["#00f0ff", "#ff00f0", "#b400ff", "#ffffff"];

// Create initial LED dots
for (let i = 0; i < 80; i++) {
  createLEDDot();
}

function createLEDDot() {
  const dot = document.createElement("div");
  dot.className = "led-dot";
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100 + 100}%`;
  const color = colors[Math.floor(Math.random() * colors.length)];
  dot.style.background = color;
  dot.style.color = color;
  dot.style.animationDelay = `${Math.random() * 10}s`;
  dot.style.animationDuration = `${5 + Math.random() * 10}s`;
  dot.style.width = `${4 + Math.random() * 4}px`;
  dot.style.height = dot.style.width;
  ledContainer.appendChild(dot);
}

// Mouse trail effect
document.addEventListener("mousemove", (e) => {
  const cursorDot = document.createElement("div");
  cursorDot.className = "led-dot";
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
  const color = colors[Math.floor(Math.random() * colors.length)];
  cursorDot.style.background = color;
  cursorDot.style.color = color;
  cursorDot.style.opacity = "0.8";
  cursorDot.style.width = "8px";
  cursorDot.style.height = "8px";
  cursorDot.style.animation = "none";
  cursorDot.style.filter = "drop-shadow(0 0 8px currentColor)";
  ledContainer.appendChild(cursorDot);

  setTimeout(() => {
    cursorDot.style.transition = "all 0.5s";
    cursorDot.style.opacity = "0";
    cursorDot.style.transform = "scale(1.5)";
    setTimeout(() => {
      cursorDot.remove();
    }, 500);
  }, 50);
});

// Add random color rotation to card glows
document.querySelectorAll(".card-glow").forEach((glow) => {
  const colors = [
    "linear-gradient(45deg, #00f0ff, #ff00f0, #b400ff)",
    "linear-gradient(45deg, #ff00f0, #b400ff, #00f0ff)",
    "linear-gradient(45deg, #b400ff, #00f0ff, #ff00f0)",
  ];

  // Set initial random gradient
  glow.style.background = colors[Math.floor(Math.random() * colors.length)];

  // Add hover effect to parent card
  glow.parentElement.addEventListener("mouseenter", () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    glow.style.background = randomColor;
  });
});

// Smooth hover effects for all cards
document.querySelectorAll(".content-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".content-section").forEach((section) => {
  observer.observe(section);
});

// testimonial
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".content-grid");
  const cards = document.querySelectorAll(".content-card");
  const prevBtn = document.querySelector(".slider-nav.prev");
  const nextBtn = document.querySelector(".slider-nav.next");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentIndex = 0;
  let autoSlideInterval;
  const cardCount = cards.length;

  // Create dots
  for (let i = 0; i < cardCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".slider-dot");

  // Determine how many cards to show based on screen width
  function getCardsToShow() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateSlider() {
    const cardsToShow = getCardsToShow();
    const translateValue = -currentIndex * (100 / cardsToShow);
    slider.style.transform = `translateX(${translateValue}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    const cardsToShow = getCardsToShow();
    currentIndex = (currentIndex + 1) % (cardCount - cardsToShow + 1);
    updateSlider();
  }

  function prevSlide() {
    const cardsToShow = getCardsToShow();
    currentIndex =
      (currentIndex - 1 + (cardCount - cardsToShow + 1)) %
      (cardCount - cardsToShow + 1);
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    stopAutoSlide();
    startAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Initialize slider
  updateSlider();
  startAutoSlide();

  // Event listeners
  nextBtn.addEventListener("click", function () {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", function () {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  // Pause on hover
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Handle window resize
  window.addEventListener("resize", function () {
    updateSlider();
  });
});

// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Optionally open first item by default
  // faqItems[0].classList.add('active');
});

// Add this script for interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for footer links
  const footerLinks = document.querySelectorAll(".footer-links a");

  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-input");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput.value) {
        alert("Thank you for subscribing to our newsletter!");
        emailInput.value = "";
      }
    });
  }
});

// Popup Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get all elements that should trigger the popup
  const enquiryTriggers = document.querySelectorAll(
    ".send-inquiry-btn, .enquire-btn, .enquiry, .learn-more, .journey-btn, .explore-btn, .cta-button"
  );
  const popup = document.getElementById("enquiryPopup");
  const closePopup = document.getElementById("closePopup");
  const enquiryForm = document.querySelector(".enquiry-form");
  const productSelect = document.getElementById("interest");
  const locationSelect = document.getElementById("location");

  // Open popup when any trigger is clicked
  enquiryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Set context based on which button was clicked
      const card = this.closest(".service-card, .led-system-card");
      if (card) {
        // For service cards or LED system cards
        const product = card.querySelector("h3").textContent.toLowerCase();
        if (productSelect) productSelect.value = product.includes("indoor") ? "indoor" :
                                                product.includes("outdoor") ? "outdoor" :
                                                product.includes("finepitch") ? "finepitch" :
                                                product.includes("creative") ? "creative" : "general";
      } else {
        // For other buttons (Get Quote, Start Journey, Explore)
        if (productSelect) productSelect.value = "general";
      }
      if (locationSelect) locationSelect.value = "";

      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Close popup when X is clicked
  if (closePopup) {
    closePopup.addEventListener("click", function () {
      popup.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Close popup when clicking outside content
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Form submission
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: this.querySelector("#name").value,
        email: this.querySelector("#email").value,
        phone: this.querySelector("#phone").value,
        interest: this.querySelector("#interest").value,
        location: this.querySelector("#location").value,
        message: this.querySelector("#message").value
      };

      // Here you would typically send the form data to your server
      console.log("Form submitted:", formData);
      alert("Thank you for your enquiry! We will contact you soon.");
      
      // Close popup and reset form
      popup.style.display = "none";
      document.body.style.overflow = "auto";
      this.reset();
    });
  }

  // Prevent card click when inner elements are clicked
  document.querySelectorAll(".service-card, .led-system-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".enquire-btn, .enquiry")) {
        e.preventDefault();
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const industries = document.querySelectorAll(".industry");
  const carouselSlides = document.querySelectorAll(".carousel-slide");

  industries.forEach((industry) => {
    industry.addEventListener("click", function () {
      // Remove active class from all
      industries.forEach((i) => i.classList.remove("active"));
      carouselSlides.forEach((slide) => slide.classList.remove("active"));

      // Add active class to clicked industry
      this.classList.add("active");

      // Find matching slide and activate it
      const industryType = this.querySelector("img")
        .alt.toLowerCase()
        .replace(" ", "-");
      const matchingSlide = document.querySelector(
        `.carousel-slide[data-industry="${industryType}"]`
      );
      if (matchingSlide) {
        matchingSlide.classList.add("active");
      }
    });
  });

  // Activate first industry by default
  if (industries.length > 0) {
    industries[0].click();
  }
});
