// ================================
// Fade-in delay for multiple elements
// ================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach((el, i) => {
    el.style.animationDelay = `${i * 0.3}s`;
  });

  // Log page load
  logEvent("PAGE_LOAD");
});

// ================================
// Dark / Light Mode Toggle + Logging
// ================================
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const mode = document.body.classList.contains("light")
      ? "LIGHT"
      : "DARK";

    themeBtn.textContent = mode === "LIGHT" ? "🌙" : "🌞";

    logEvent("THEME_TOGGLE", { mode });
  });
}

// ================================
// Safe Contact Form Handling
// ================================
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    logEvent("CONTACT_FORM_SUBMIT");
    form.reset();
  });
}

// ================================
// Event Logger (Backend)
// ================================
function logEvent(eventType, extra = {}) {
  fetch("/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventType,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      time: new Date().toISOString(),
      ...extra
    })
  }).catch(() => {
    // fail silently (never break UI)
  });
}
