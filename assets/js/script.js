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
window.openPopup = function(projectId) {
  const popup = document.querySelector(`#${projectId}`);
  const overlay = document.querySelector(".overlay");

  if (popup) {
    popup.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");

    // Initialize filter select within the popup
    initFilterSelect(popup);

    // Set the first gallery image as the default in the popup
    const popupImage = popup.querySelector(".popup-image");
    const popupVideo = popup.querySelector(".popup-video");
    const firstGalleryImage = popup.querySelector(".gallery-item img");

    if (firstGalleryImage && !firstGalleryImage.dataset.src) {
      popupImage.src = firstGalleryImage.src;
      popupImage.alt = firstGalleryImage.alt;
    } else if (firstGalleryImage && firstGalleryImage.dataset.src) {
      popupVideo.src = firstGalleryImage.dataset.src;
    }

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

function initFilterSelect(popup) {
  const select = popup.querySelector("[data-select]");
  const selectItems = popup.querySelectorAll("[data-select-item]");
  const selectValue = popup.querySelector("[data-selecct-value]");
  const portfolioItems = popup.querySelectorAll("[data-filter-item]");

  if (select) {
    filterPortfolio("all", portfolioItems);

    select.addEventListener("click", function () {
      toggleActiveClass(select);
    });

    selectItems.forEach(item => {
      item.addEventListener("click", function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        select.classList.remove("active");
        filterPortfolio(selectedValue, portfolioItems);
      });
    });
  }
}


function filterPortfolio(selectedCategory, items) {
  items.forEach(item => {
    if (selectedCategory === "all" || selectedCategory === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

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

  // Add event listeners for image gallery
  document.querySelectorAll(".popup-image").forEach(popupImage => {
    popupImage.addEventListener("click", function () {
      enlargePopupImage(this.src);
    });
  });
});

function initGallery(popupId) {
  const popup = document.querySelector(`#${popupId}`);
  const galleryItems = popup.querySelectorAll(".gallery-item img");
  const popupImage = popup.querySelector(".popup-image");
  const popupVideo = popup.querySelector(".popup-video");

  galleryItems.forEach(item => {
    item.addEventListener("click", function () {
      if (this.dataset.src) {
        updatePopupMedia(popupVideo, popupImage, this.dataset.src);
      } else {
        updatePopupImage(popupImage, this.src, this.alt);
        popupVideo.style.display = 'none';
        popupImage.style.display = 'block';
      }
    });
  });
}

function updatePopupImage(popupImage, src, alt) {
  popupImage.classList.remove('visible');
  popupImage.classList.add('hidden');

  setTimeout(() => {
    popupImage.src = src;
    popupImage.alt = alt;
    popupImage.classList.remove('hidden');
    popupImage.classList.add('visible');
  }, 1);
}

function updatePopupMedia(popupVideo, popupImage, videoSrc) {
  popupImage.style.display = 'none'; 
  popupVideo.src = videoSrc;         
  popupVideo.style.display = 'block';
}


function enlargePopupImage(src) {
  const fullscreenOverlay = document.createElement("div");
  fullscreenOverlay.classList.add("fullscreen-overlay");

  const fullscreenImage = document.createElement("img");
  fullscreenImage.classList.add("fullscreen-popup");
  fullscreenImage.src = src;

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("fullscreen-close");
  closeBtn.innerHTML = "&times;";

  document.body.appendChild(fullscreenOverlay);
  document.body.appendChild(fullscreenImage);
  document.body.appendChild(closeBtn);

  setTimeout(() => {
    fullscreenImage.classList.add("visible");
    fullscreenOverlay.classList.add("active");
  }, 10);

  closeBtn.addEventListener("click", closeFullscreenImage);
  fullscreenOverlay.addEventListener("click", closeFullscreenImage);

  function closeFullscreenImage() {
    fullscreenImage.classList.remove("visible");
    fullscreenOverlay.classList.remove("active");
    setTimeout(() => {
      fullscreenImage.remove();
      fullscreenOverlay.remove();
      closeBtn.remove();
    }, 200);
  }
}
