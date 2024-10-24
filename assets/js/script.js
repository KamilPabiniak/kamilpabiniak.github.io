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
  const collapseBtn = document.querySelectorAll('.collapse-btn');

  collapseBtn.forEach(btn => {
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



// Popup function to show the project-specific title, description, image, and gallery
  window.openPopup = function(projectId) {
    const popup = document.querySelector(`#${projectId}`);
    const overlay = document.querySelector(".overlay");

    if (popup) {
      popup.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");
      
      const closeBtn = popup.querySelector(".popup-close");
      closeBtn.addEventListener("click", closePopup);
      overlay.addEventListener("click", closePopup);

      function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    }
  };


  
  
  // Function to update popup-image with the selected gallery image
  function updatePopupImage(src, alt) {
    const popupImage = document.querySelector(".popup-image");
    popupImage.classList.remove('visible');
    popupImage.classList.add('hidden');

    setTimeout(() => {
      popupImage.src = src;
      popupImage.alt = alt;
      popupImage.classList.remove('hidden');
      popupImage.classList.add('visible');
    }, 300);
  }


// Function to initialize the gallery
  function initGallery(popupId) {
    const popup = document.querySelector(`#${popupId}`);
    const galleryItems = popup.querySelectorAll(".gallery-item img");

    // Set the first gallery image as the popup-image by default
    if (galleryItems.length > 0) {
      const firstImage = galleryItems[0];
      updatePopupImage(firstImage.src, firstImage.alt);
    }

    // Add click event listeners to gallery images
    galleryItems.forEach(item => {
      item.addEventListener("click", function () {
        updatePopupImage(this.src, this.alt); // Update popup-image when clicked
      });
    });
  }

// Function to open the popup and initialize the gallery
  window.openPopup = function(projectId) {
    const popup = document.querySelector(`#${projectId}`);
    const overlay = document.querySelector(".overlay");

    if (popup) {
     
      popup.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");

      initGallery(projectId);

      const closeBtn = popup.querySelector(".popup-close");
      closeBtn.addEventListener("click", closePopup);
      overlay.addEventListener("click", closePopup);

      function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    }
  };


  // Function to enable image enlargement
  function enlargePopupImage(src) {
    const fullscreenOverlay = document.createElement("div");
    fullscreenOverlay.classList.add("fullscreen-overlay");

    const fullscreenImage = document.createElement("img");
    fullscreenImage.classList.add("fullscreen-popup");
    fullscreenImage.src = src;

    const closeBtn = document.createElement("span");
    closeBtn.classList.add("fullscreen-close");
    closeBtn.innerHTML = "&times;"; // Close button (X)

    // Add elements to the body
    document.body.appendChild(fullscreenOverlay);
    document.body.appendChild(fullscreenImage);
    document.body.appendChild(closeBtn);

    // Make the image and overlay visible with animations
    setTimeout(() => {
      fullscreenImage.classList.add("visible");
      fullscreenOverlay.classList.add("active");
    }, 10);

    // Close on clicking the close button or outside the image
    closeBtn.addEventListener("click", closeFullscreenImage);
    fullscreenOverlay.addEventListener("click", closeFullscreenImage);

    function closeFullscreenImage() {
      fullscreenImage.classList.remove("visible");
      fullscreenOverlay.classList.remove("active");
      setTimeout(() => {
        fullscreenImage.remove();
        fullscreenOverlay.remove();
        closeBtn.remove();
      }, 300); // Wait for the animation to finish before removing elements
    }
  }

// Add click event listener to the popup-image
  const popupImage = document.querySelector(".popup-image");
  popupImage.addEventListener("click", function () {
    enlargePopupImage(this.src); // Enlarge the clicked image
  });




});
