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
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const body = document.body;

  if (!hamburger || !mobileMenu) return;

  // Toggle mobile menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close menu when overlay is clicked
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", () => {
      closeMobileMenu();
    });
  }

  // Close mobile menu when link is clicked
  document.querySelectorAll(".mobile-menu-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Prevent menu from closing when clicking inside it
  mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

function toggleMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const body = document.body;
  const html = document.documentElement;

  if (!hamburger || !mobileMenu) return;

  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  const willBeOpen = !isExpanded;

  hamburger.setAttribute("aria-expanded", willBeOpen.toString());
  hamburger.classList.toggle("active");

  if (willBeOpen) {
    // Get current scroll position
    const scrollY = window.scrollY;
    
    // Open menu
    mobileMenu.classList.add("active");
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add("active");
    }
    
    // Prevent body scroll
    body.classList.add("menu-open");
    body.style.top = `-${scrollY}px`;
    html.style.overflow = "hidden";
    
    // Store scroll position for restoration
    body.setAttribute("data-scroll-y", scrollY.toString());
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const body = document.body;
  const html = document.documentElement;

  if (!hamburger || !mobileMenu) return;

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  
  if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove("active");
  }
  
  // Restore body scroll
  body.classList.remove("menu-open");
  html.style.overflow = "";
  
  // Restore scroll position
  const scrollY = body.getAttribute("data-scroll-y");
  if (scrollY !== null) {
    body.style.top = "";
    body.removeAttribute("data-scroll-y");
    window.scrollTo({
      top: parseInt(scrollY),
      behavior: "instant"
    });
  } else {
    body.style.top = "";
  }
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
      if (mobileMenu && mobileMenu.classList.contains("active")) {
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
      const main = document.querySelector("main");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus();
      }
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
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      }
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
