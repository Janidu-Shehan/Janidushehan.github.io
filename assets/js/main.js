// Theme: respect a saved choice, otherwise follow the OS setting.
(function () {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    const themeBtn = document.querySelector("[data-theme-toggle]");
    const syncIcon = function () {
      if (!themeBtn) return;
      const dark = root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      themeBtn.innerHTML = dark ? '<i class="uil uil-sun"></i>' : '<i class="uil uil-moon"></i>';
      themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      return dark;
    };
    syncIcon();
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        const next = syncIcon() ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        syncIcon();
      });
    }

    // Mobile menu
    const menuBtn = document.querySelector("[data-menu-toggle]");
    const links = document.querySelector(".nav-links");
    if (menuBtn && links) {
      menuBtn.addEventListener("click", function () {
        const open = links.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open);
        menuBtn.innerHTML = open ? '<i class="uil uil-times"></i>' : '<i class="uil uil-bars"></i>';
      });
    }

    // Highlight the current page in the nav
    const page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
    });

    // Project filters
    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll("[data-category]");
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const f = btn.dataset.filter;
        projects.forEach(function (p) {
          p.hidden = f !== "all" && !p.dataset.category.split(" ").includes(f);
        });
      });
    });

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
