// Get the elements we need from the page
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const navLinks = document.querySelectorAll(".nav-list a");

/* ---------- Dark / light mode ---------- */

// Updates the button text so it shows the mode the user can switch to
function updateThemeButton() {
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Light mode";
  } else {
    themeToggle.textContent = "Dark mode";
  }
}

// Turns dark mode on or off and saves the choice in the browser
function toggleTheme() {
  document.body.classList.toggle("dark");
  updateThemeButton();

  try {
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
  } catch (error) {
    // Storage may be blocked; the toggle still works without saving
    console.log("Could not save theme:", error);
  }
}

// Loads the saved theme when the page opens
function loadSavedTheme() {
  try {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }
  } catch (error) {
    console.log("Could not read saved theme:", error);
  }
  updateThemeButton();
}

/* ---------- Hamburger menu ---------- */

// Shows or hides the navigation menu on small screens
function toggleMenu() {
  const isOpen = mainNav.classList.toggle("open");
  // Tell screen readers whether the menu is expanded
  menuToggle.setAttribute("aria-expanded", isOpen);
}

// Closes the menu after a link is clicked (so it doesn't cover the page)
function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

/* ---------- Event listeners ---------- */

themeToggle.addEventListener("click", toggleTheme);
menuToggle.addEventListener("click", toggleMenu);

// Close the menu whenever a navigation link is clicked
navLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Run once when the page loads
loadSavedTheme();
