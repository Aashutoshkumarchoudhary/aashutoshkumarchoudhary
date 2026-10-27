/**
 * script.js
 * Core UI interactions, Theme switcher, Counter animations,
 * Navigation observer, Resume Modal, Contact validation, and Clipboard copy.
 */

function initAll() {
  initNavbar();
  initThemeToggle();
  initAnimatedCounters();
  initDomainCardClicks();
  initResumeModal();
  initContactForm();
  initQuotePills();
  initCopyButtons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}

// 1. Navbar and Mobile Menu
function initNavbar() {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("#nav");
  const navLinks = document.querySelectorAll("#nav a");
  const sections = document.querySelectorAll("section[id]");

  if (!menuBtn || !nav) return;

  function closeMenu() {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
    if (window.innerWidth <= 900) {
      nav.style.display = "none";
    }
  }

  function openMenu() {
    nav.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.textContent = "✕";
    nav.style.display = "flex";
  }

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (nav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Ensure initial closed state on mobile
  if (window.innerWidth <= 900) {
    nav.classList.remove("open");
    nav.style.display = "none";
    menuBtn.textContent = "☰";
  }

  // Bind click on hamburger button
  menuBtn.removeEventListener("click", toggleMenu);
  menuBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close when clicking anywhere outside of navbar or nav
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open")) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    }
  });

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
    }
  });

  // Synchronize on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      nav.style.display = "";
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    } else if (!nav.classList.contains("open")) {
      nav.style.display = "none";
    }
  });

  // Active Link IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const id = entry.target.id;
        const matchingLink = document.querySelector(`#nav a[href="#${id}"]`);
        if (matchingLink) matchingLink.classList.add("active");
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px" });

  sections.forEach(sec => observer.observe(sec));
}

// 2. Cyber Dark / High Contrast Tech Light Theme
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem("aashutosh_theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("aashutosh_theme", nextTheme);
    updateThemeIcon(nextTheme);
    window.showToast && window.showToast(`Switched to ${nextTheme === 'dark' ? 'Cyber Dark' : 'High Contrast Light'} mode`);
  });

  function updateThemeIcon(theme) {
    themeToggleBtn.innerHTML = theme === "dark" ? "🌙" : "☀️";
    themeToggleBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`);
  }
}

// 3. Animated Metric Counters
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll(".counter-val");
  if (counterElements.length === 0) return;

  let hasAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(el => {
          const target = parseInt(el.getAttribute("data-target"), 10);
          const suffix = el.getAttribute("data-suffix") || "";
          if (isNaN(target)) return;

          let count = 0;
          const duration = 1600;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              el.textContent = `${target}${suffix}`;
              clearInterval(timer);
            } else {
              el.textContent = `${Math.floor(count)}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector(".achievement-box") || document.querySelector(".stats");
  if (statsSection) counterObserver.observe(statsSection);
}

// 4. Domain Card Click Interactions
function initDomainCardClicks() {
  const domainCards = document.querySelectorAll(".domain-card");
  domainCards.forEach(card => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      const demoTarget = card.getAttribute("data-demo");

      // Filter projects section
      const filterBtn = document.querySelector(`.project-filter-btn[data-filter="${category}"]`);
      if (filterBtn) {
        filterBtn.click();
      }

      // If domain maps to a live demo, activate that demo tab
      if (demoTarget) {
        const demoTabBtn = document.querySelector(`.demo-nav-btn[data-demo-target="${demoTarget}"]`);
        if (demoTabBtn) demoTabBtn.click();
        
        const demoSection = document.getElementById("live-demos");
        if (demoSection) {
          demoSection.scrollIntoView({ behavior: "smooth" });
          window.showToast && window.showToast(`Viewing Live Demo for ${card.querySelector("h3").textContent}`);
          return;
        }
      }

      const projectsSec = document.getElementById("projects");
      if (projectsSec) {
        projectsSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// 5. Resume Modal & Quick View
function initResumeModal() {
  const resumeBtns = document.querySelectorAll(".open-resume-modal-btn");
  let modal = document.getElementById("resume-viewer-modal");

  resumeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  function openResumeModal() {
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeResumeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (modal) {
    const closeBtn = modal.querySelector(".modal-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeResumeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeResumeModal();
    });

    // Print button inside modal
    const printBtn = modal.querySelector(".resume-print-btn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }
}

// 6. Contact Form Validation & Simulated Submission
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn.innerHTML;
    submitBtn.innerHTML = "⚡ Sending message...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = "✓ Message Sent!";
      submitBtn.style.background = "linear-gradient(135deg, #00d9ff, #00f0cf)";
      submitBtn.style.color = "#020a12";

      window.showToast && window.showToast("Thank you, " + name + "! Your message has been prepared.");

      // Open mailto fallback client
      const mailtoUrl = `mailto:aashutosha262@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio: ' + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      window.open(mailtoUrl, "_blank");

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        submitBtn.style.color = "";
      }, 3000);
    }, 800);
  });
}

// 7. Interactive Philosophy Quote Pills
function initQuotePills() {
  const pills = document.querySelectorAll(".quote-pill");
  const quoteText = document.getElementById("quote-dynamic-text");
  if (!quoteText) return;

  const QUOTES = {
    innovate: "“Turning Ideas into Intelligent Solutions by questioning constraints and discovering new frontiers in AI.”",
    build: "“Code and hardware are tangible expressions of thought. Build scalable, real-world systems that solve human needs.”",
    learn: "“Stay curious, embrace continuous learning, and view every complex problem as an opportunity to master new paradigms.”",
    repeat: "“Excellence is an iterative loop: measure, refine, optimize, and consistently execute at the highest standard.”"
  };

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const key = pill.getAttribute("data-quote-key");
      if (QUOTES[key]) {
        quoteText.style.opacity = 0;
        setTimeout(() => {
          quoteText.textContent = QUOTES[key];
          quoteText.style.opacity = 1;
        }, 180);
      }
    });
  });
}

// 8. 1-Click Clipboard Copy
function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy-text");
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          window.showToast && window.showToast(`Copied "${textToCopy}" to clipboard!`);
          const origText = btn.innerHTML;
          btn.innerHTML = "✓ Copied!";
          setTimeout(() => btn.innerHTML = origText, 2000);
        }).catch(err => {
          console.error("Copy failed:", err);
        });
      }
    });
  });
}
