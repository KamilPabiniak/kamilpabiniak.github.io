'use strict';

// Utility function to toggle active class on elements
const toggleActiveClass = function (element) {
  element.classList.toggle("active");
}

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  toggleActiveClass(sidebar);
});

// Custom select functionality (for filtering portfolio)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");

select.addEventListener("click", function () {
  toggleActiveClass(this);
});

// Add event listener to all select items for filtering
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    toggleActiveClass(select);
    filterPortfolio(selectedValue); 
  });
});

// Portfolio filter functionality
const portfolioItems = document.querySelectorAll("[data-filter-item]");
const filterButtons = document.querySelectorAll("[data-filter-btn]");

const filterPortfolio = function (selectedCategory) {
  portfolioItems.forEach(item => {
    if (selectedCategory === "all" || selectedCategory === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Add event listener to filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    const selectedCategory = this.innerText.toLowerCase();
    filterPortfolio(selectedCategory);

    filterButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

// Initialize portfolio with all items visible
filterPortfolio("all");

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page navigation functionality for switching between sections (About, Resume, Portfolio)
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetSection = this.innerHTML.toLowerCase();

    // Switch active section
    sections.forEach(section => {
      if (section.dataset.page === targetSection) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Update active link
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");

    // Scroll to top after switching
    window.scrollTo(0, 0);
  });
});

// Functionality for collapsible elements (Show/Hide buttons)
document.addEventListener('DOMContentLoaded', function() {
  const collapseBtns = document.querySelectorAll('.collapse-btn');

  collapseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const collapseContent = this.nextElementSibling;
      if (collapseContent.style.display === 'none' || collapseContent.style.display === '') {
        collapseContent.style.display = 'block';
        this.textContent = 'Hide';
      } else {
        collapseContent.style.display = 'none';
        this.textContent = 'Show info';
      }
    });
  });


  // Popup function with dynamic gallery and info content
  window.openPopup = function(title, description, imageUrl, galleryImages) {
    document.querySelector(".popup-title").textContent = title;
    document.querySelector(".popup-description").textContent = description;

    // Set main image
    const popupImage = document.querySelector(".popup-image");
    if (imageUrl) {
      popupImage.src = imageUrl;
    }

    // Set gallery images with optional captions
    const galleryContainer = document.querySelector(".popup-gallery");
    galleryContainer.innerHTML = ''; // Clear existing gallery
    galleryImages.forEach(imageObj => {
      // Create image element
      const imgElement = document.createElement('img');
      imgElement.src = imageObj.src;
      imgElement.alt = imageObj.alt || "Gallery Image";

      // Create image wrapper
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('gallery-item');

      imgWrapper.appendChild(imgElement);

      if (imageObj.caption) {
        const captionElement = document.createElement('p');
        captionElement.textContent = imageObj.caption;
        captionElement.classList.add('gallery-caption');
        imgWrapper.appendChild(captionElement);
      }

      galleryContainer.appendChild(imgWrapper);
    });

    // Show popup with overlay
    const popup = document.getElementById("project-popup");
    const overlay = document.querySelector(".overlay");

    popup.classList.add("active");
    popup.classList.add("fade-in");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");

    // Remove fade-in after animation
    setTimeout(() => popup.classList.remove("fade-in"), 300);
  }

// Close popup on click 'X'
  const popup = document.getElementById("project-popup");
  const closeBtn = document.getElementById("popup-close");
  const overlay = document.querySelector(".overlay");

  closeBtn.addEventListener("click", function () {
    popup.classList.add("fade-out");
    overlay.classList.remove("active"); // Hide overlay
    document.body.classList.remove("no-scroll");

    // After fade-out, hide popup
    setTimeout(() => {
      popup.classList.remove("active");
      popup.classList.remove("fade-out");
    }, 300);
  });

// Close popup if clicked outside
  overlay.addEventListener("click", function () {
    popup.classList.add("fade-out");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      popup.classList.remove("active");
      popup.classList.remove("fade-out");
    }, 300);
  });




});
