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




// Funkcja otwierająca popup i ustawiająca pierwszy obrazek galerii jako domyślny
  window.openPopup = function(projectId) {
    const popup = document.querySelector(`#${projectId}`);
    const overlay = document.querySelector(".overlay");

    if (popup) {
      popup.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");

      // Znajdź pierwszy obrazek z galerii i ustaw go jako domyślny w popupie
      const popupImage = popup.querySelector(".popup-image");
      const firstGalleryImage = popup.querySelector(".gallery-item img");

      if (firstGalleryImage) {
        popupImage.src = firstGalleryImage.src;
        popupImage.alt = firstGalleryImage.alt;
      }

      // Inicjalizuj kliknięcia galerii dla aktualizacji obrazka w popupie
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

// Funkcja aktualizująca obrazek popupu na podstawie wybranego obrazu z galerii (z animacją)
  function updatePopupImage(popupImage, src, alt) {
    // Ukryj obecny obrazek z animacją
    popupImage.classList.remove('visible');
    popupImage.classList.add('hidden');

    // Czekaj na zakończenie animacji przed zmianą źródła obrazu
    setTimeout(() => {
      popupImage.src = src;
      popupImage.alt = alt;

      // Pokaż nowy obrazek z animacją
      popupImage.classList.remove('hidden');
      popupImage.classList.add('visible');
    }, 300); // Dopasuj do czasu trwania animacji CSS dla płynnej zmiany
  }

// Funkcja inicjalizująca kliknięcia galerii dla danego popupu
  function initGallery(popupId) {
    const popup = document.querySelector(`#${popupId}`);
    const galleryItems = popup.querySelectorAll(".gallery-item img");
    const popupImage = popup.querySelector(".popup-image");

    // Dodaj eventy kliknięcia do obrazków w galerii
    galleryItems.forEach(item => {
      item.addEventListener("click", function () {
        updatePopupImage(popupImage, this.src, this.alt); // Aktualizuj główny obrazek w popupie po kliknięciu
      });
    });
  }

// Funkcja powiększania obrazka w trybie pełnoekranowym
  function enlargePopupImage(src) {
    const fullscreenOverlay = document.createElement("div");
    fullscreenOverlay.classList.add("fullscreen-overlay");

    const fullscreenImage = document.createElement("img");
    fullscreenImage.classList.add("fullscreen-popup");
    fullscreenImage.src = src;

    const closeBtn = document.createElement("span");
    closeBtn.classList.add("fullscreen-close");
    closeBtn.innerHTML = "&times;"; // Przycisk zamknięcia

    // Dodaj elementy do body
    document.body.appendChild(fullscreenOverlay);
    document.body.appendChild(fullscreenImage);
    document.body.appendChild(closeBtn);

    // Wyświetl obrazek i overlay z animacją
    setTimeout(() => {
      fullscreenImage.classList.add("visible");
      fullscreenOverlay.classList.add("active");
    }, 10);

    // Zamknięcie trybu pełnoekranowego po kliknięciu w overlay lub przycisk zamknięcia
    closeBtn.addEventListener("click", closeFullscreenImage);
    fullscreenOverlay.addEventListener("click", closeFullscreenImage);

    function closeFullscreenImage() {
      fullscreenImage.classList.remove("visible");
      fullscreenOverlay.classList.remove("active");
      setTimeout(() => {
        fullscreenImage.remove();
        fullscreenOverlay.remove();
        closeBtn.remove();
      }, 200); // Czekaj na zakończenie animacji przed usunięciem elementów
    }
  }

// Dodaj eventy kliknięcia do wszystkich obrazków popupów, aby umożliwić powiększanie
  document.querySelectorAll(".popup-image").forEach(popupImage => {
    popupImage.addEventListener("click", function () {
      enlargePopupImage(this.src); // Powiększ kliknięty obrazek
    });
  });



});