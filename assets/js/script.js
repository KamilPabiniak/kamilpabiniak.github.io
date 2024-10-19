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
});
