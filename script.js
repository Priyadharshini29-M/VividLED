document.addEventListener("DOMContentLoaded", function () {
  // Enhanced Auto-Sliding Carousel with Industry Sync
  const carousel = {
    elements: {
      slides: document.querySelectorAll(".carousel-slide"),
      industries: document.querySelectorAll(".industry"),
      industryContainer: document.querySelector(".industries"),
      carouselContainer: document.querySelector(".industry-carousel"),
    },
    state: {
      currentIndex: 0,
      slideInterval: null,
      isUserInteracting: false,
      interactionTimeout: null,
      isMobile: window.innerWidth <= 768,
    },

    init: function () {
      this.setupEventListeners();
      this.showSlide(0);
      this.startAutoSlide();
    },

    showSlide: function (index) {
      // Boundary check
      if (index < 0) index = this.elements.slides.length - 1;
      if (index >= this.elements.slides.length) index = 0;

      this.state.currentIndex = index;

      // Update active states
      this.elements.slides.forEach((slide) => slide.classList.remove("active"));
      this.elements.industries.forEach((ind) => ind.classList.remove("active"));

      this.elements.slides[index].classList.add("active");
      this.elements.industries[index].classList.add("active");

      // Scroll to center active industry on mobile
      if (this.state.isMobile && this.elements.industryContainer) {
        const activeIndustry = this.elements.industries[index];
        const containerWidth = this.elements.industryContainer.offsetWidth;
        const scrollPos =
          activeIndustry.offsetLeft -
          containerWidth / 2 +
          activeIndustry.offsetWidth / 2;

        this.elements.industryContainer.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }
    },

    nextSlide: function () {
      if (!this.state.isUserInteracting) {
        const nextIndex =
          (this.state.currentIndex + 1) % this.elements.slides.length;
        this.showSlide(nextIndex);
      }
    },

    startAutoSlide: function () {
      if (this.state.isMobile && !this.state.slideInterval) {
        this.state.slideInterval = setInterval(() => this.nextSlide(), 3000);
      }
    },

    stopAutoSlide: function () {
      clearInterval(this.state.slideInterval);
      this.state.slideInterval = null;
    },

    handleUserInteraction: function () {
      this.state.isUserInteracting = true;
      this.stopAutoSlide();

      // Clear any existing timeout
      if (this.state.interactionTimeout) {
        clearTimeout(this.state.interactionTimeout);
      }

      // Resume auto-slide after period of inactivity
      this.state.interactionTimeout = setTimeout(() => {
        this.state.isUserInteracting = false;
        this.startAutoSlide();
      }, 5000);
    },

    setupEventListeners: function () {
      // Window resize handler
      window.addEventListener("resize", () => {
        this.state.isMobile = window.innerWidth <= 768;
        this.stopAutoSlide();
        this.startAutoSlide();
        this.showSlide(this.state.currentIndex);
      });

      // Industry click handlers
      this.elements.industries.forEach((industry, index) => {
        industry.addEventListener("click", () => {
          this.handleUserInteraction();
          this.showSlide(index);
        });

        // Keyboard accessibility
        industry.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.handleUserInteraction();
            this.showSlide(index);
          }
        });
      });

      // Interaction detection
      const interactionElements = [
        this.elements.industryContainer,
        this.elements.carouselContainer,
      ];

      interactionElements.forEach((el) => {
        if (el) {
          el.addEventListener("touchstart", () => this.handleUserInteraction());
          el.addEventListener("mousedown", () => this.handleUserInteraction());
          el.addEventListener("wheel", () => this.handleUserInteraction());
        }
      });

      // Window focus/blur handling
      window.addEventListener("blur", () => this.stopAutoSlide());
      window.addEventListener("focus", () => {
        if (!this.state.isUserInteracting) {
          this.startAutoSlide();
        }
      });
    },

    destroy: function () {
      this.stopAutoSlide();
      if (this.state.interactionTimeout) {
        clearTimeout(this.state.interactionTimeout);
      }
      // Remove all event listeners here in a real implementation
    },
  };

  // Initialize the carousel
  carousel.init();

  // For Single Page Applications (optional cleanup):
  // window.addEventListener('beforeunload', () => carousel.destroy());
});
