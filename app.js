// Enkel JS: smooth scroll + formulärvalidering + årtal i footer

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scroll för knappar med data-scroll-target
  document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetSelector = btn.getAttribute("data-scroll-target");
      const target = document.querySelector(targetSelector);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Smooth scroll för nav-länkar
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Formulärhantering (frontend only)
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (form && statusEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Enkel validering
      const name = form.elements["name"].value.trim();
      const company = form.elements["company"].value.trim();
      const email = form.elements["email"].value.trim();
      const message = form.elements["message"].value.trim();

      const errors = [];

      if (!name) errors.push("Ange namn.");
      if (!company) errors.push("Ange företag/organisation.");
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Ange en giltig e-postadress.");
      }
      if (!message) errors.push("Beskriv kort er situation.");

      if (errors.length > 0) {
        statusEl.textContent = errors.join(" ");
        statusEl.classList.remove("form-status--success");
        statusEl.classList.add("form-status--error");
        return;
      }

      // Här skulle man normalt skicka data till backend / Formspree / liknande
      // Just nu simulerar vi bara en lyckad skickning
      statusEl.textContent =
        "Tack! Vi har fått din förfrågan och återkommer så snart som möjligt.";
      statusEl.classList.remove("form-status--error");
      statusEl.classList.add("form-status--success");
      form.reset();
    });
  }
});
