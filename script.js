// Toggle Tech Stack Details
function toggleDetails(id) {
  const el = document.getElementById(id);
  if (el.style.maxHeight && el.style.maxHeight !== "0px") {
    el.style.maxHeight = "0px";
  } else {
    el.style.maxHeight = el.scrollHeight + "px";
  }
}

// Fade-in delay for multiple elements
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach((el, i) => {
    el.style.animationDelay = `${i * 0.3}s`;
  });
});

// Dark/Light Mode Toggle
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "🌙" : "🌞";
});

// Contact form submission (for testing, prevent actual submit)
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  form.reset();
});
