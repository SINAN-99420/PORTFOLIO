const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const year = document.getElementById("year");


/* THEME */

function applyTheme(theme) {
  root.dataset.theme = theme;

  const dark = theme === "dark";

  themeIcon.textContent = dark ? "☀" : "☾";
  themeText.textContent = dark ? "Light" : "Dark";

  themeToggle.setAttribute(
    "aria-label",
    dark ? "Switch to light theme" : "Switch to dark theme"
  );

  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      dark ? "#141615" : "#f7f7f4"
    );
  }
}

const savedTheme = localStorage.getItem("sinan-theme");

const systemDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

applyTheme(
  savedTheme || (systemDark ? "dark" : "light")
);


themeToggle.addEventListener("click", () => {

  const nextTheme =
    root.dataset.theme === "dark"
      ? "light"
      : "dark";

  applyTheme(nextTheme);

  localStorage.setItem(
    "sinan-theme",
    nextTheme
  );
});


/* MOBILE MENU */

menuToggle.addEventListener("click", () => {

  const open =
    navLinks.classList.toggle("is-open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(open)
  );
});


navLinks.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});


document.addEventListener("click", (event) => {

  if (
    window.innerWidth <= 700 &&
    navLinks.classList.contains("is-open") &&
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {

    navLinks.classList.remove("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }
});


/* CONTACT FORM */

contactForm.addEventListener("submit", (event) => {

  event.preventDefault();

  formStatus.textContent =
    "Thanks! Your message is ready to be sent.";

  contactForm.reset();
});


/* YEAR */

year.textContent = new Date().getFullYear();
