(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- 1. Харанхуй / гэрэлтэй горим ---------- */
  var themeBtn = document.getElementById("theme-btn");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function isDark() {
    var set = root.getAttribute("data-theme");
    if (set) return set === "dark";
    return systemDark.matches;
  }

  function syncThemeButton() {
    if (!themeBtn) return;
    themeBtn.setAttribute(
      "aria-label",
      isDark() ? "Гэрэлтэй горимд шилжих" : "Харанхуй горимд шилжих"
    );
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncThemeButton();
    });
  }
  systemDark.addEventListener("change", syncThemeButton);
  syncThemeButton();

  /* ---------- 2. Зураг эргүүлэх ---------- */
  var cards = document.querySelectorAll(".flip");

  function setFlipped(card, flipped) {
    var btn = card.querySelector(".flip-btn");
    var front = card.querySelector(".front");
    var back = card.querySelector(".back");
    var label = btn.querySelector("span");

    card.classList.toggle("is-flipped", flipped);
    btn.setAttribute("aria-pressed", String(flipped));
    label.textContent = flipped ? "Зураг руу буцах" : "Эргүүлэх";

    front.inert = flipped;
    back.inert = !flipped;
    front.setAttribute("aria-hidden", String(flipped));
    back.setAttribute("aria-hidden", String(!flipped));
  }

  cards.forEach(function (card) {
    setFlipped(card, false);
    card.querySelector(".flip-btn").addEventListener("click", function () {
      setFlipped(card, !card.classList.contains("is-flipped"));
    });
  });

  /* ---------- 3. SVG нарны замыг харагдахад нь хөдөлгөх ---------- */
  var arcFigure = document.querySelector(".arc-figure");
  if (arcFigure) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            arcFigure.classList.add("in-view");
            io.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(arcFigure);
    } else {
      arcFigure.classList.add("in-view");
    }
  }

  /* ---------- 4. Гар утасны цэсийг холбоос дарахад хаах ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  document.querySelectorAll(".nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (menuToggle) menuToggle.checked = false;
    });
  });
})();