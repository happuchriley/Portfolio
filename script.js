// Riley Happuch Portfolio - Main JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initMobileNavigation();
  initSmoothScrolling();
  initAnimations();
  initButtonTracking();
  initImageLoading();
  initKeyboardNavigation();
  updateCopyrightYear();
  initServiceCardEffects();
});

// Mobile navigation functionality
function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const body = document.body;

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("translate-x-0");

    // Prevent body scroll when menu is open
    if (!isExpanded) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  });

  // Close mobile menu when link is clicked
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });
}

function closeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const body = document.body;

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("translate-x-0");
  body.classList.remove("no-scroll");
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".fade-in-up");
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Button tracking and analytics
function initButtonTracking() {
  // Track email clicks
  document.querySelectorAll("a[href^='mailto:']").forEach((button) => {
    button.addEventListener("click", function (e) {
      // You can integrate with Google Analytics here
      console.log("Email link clicked:", this.href);

      // Example: gtag('event', 'email_click', { 'email_address': this.href });
    });
  });

  // Track download clicks
  document.querySelectorAll("a[download]").forEach((link) => {
    link.addEventListener("click", function (e) {
      console.log("Download clicked:", this.href);
      // Example: gtag('event', 'download', { 'file_name': this.download });
    });
  });
}

// Image loading and optimization
function initImageLoading() {
  function handleImageLoading() {
    document.querySelectorAll("img").forEach((img) => {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", function () {
          this.classList.add("loaded");
        });

        img.addEventListener("error", function () {
          console.error("Failed to load image:", this.src);
          this.alt = "Image not available";
        });
      }
    });
  }

  handleImageLoading();
}

// Keyboard navigation support
function initKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    // Close mobile menu on Escape key
    if (e.key === "Escape") {
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu && mobileMenu.classList.contains("translate-x-0")) {
        closeMobileMenu();
      }
    }

    // Skip to main content for accessibility
    if (
      e.key === "Tab" &&
      e.shiftKey &&
      document.activeElement === document.body
    ) {
      e.preventDefault();
      document.querySelector("main").setAttribute("tabindex", "-1");
      document.querySelector("main").focus();
    }
  });
}

// Update copyright year automatically
function updateCopyrightYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }
}

// Service card hover effects
function initServiceCardEffects() {
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover:-translate-y-2", "shadow-xl");
      const icon = this.querySelector(".service-icon");
      if (icon) {
        icon.classList.add("scale-110", "rotate-6");
      }
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover:-translate-y-2", "shadow-xl");
      const icon = this.querySelector(".service-icon");
      if (icon) {
        icon.classList.remove("scale-110", "rotate-6");
      }
    });
  });
}

// Performance optimization - Page visibility API
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Page is hidden, pause any heavy animations or videos
    console.log("Page is hidden - pausing heavy operations");
  } else {
    // Page is visible, resume animations
    console.log("Page is visible - resuming operations");
  }
});

// Utility function for debouncing
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Handle window resize with debouncing
window.addEventListener(
  "resize",
  debounce(() => {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  }, 250)
);

// Export functions for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initMobileNavigation,
    initSmoothScrolling,
    initAnimations,
    closeMobileMenu,
    debounce,
  };
}
