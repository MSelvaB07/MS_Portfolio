/* ─────────────────────────────────────────
   John Doe — Fresher Frontend Developer
   script.js
───────────────────────────────────────── */

// ─── TYPING ANIMATION ───────────────────
const roles = [
  "Frontend Developer",
  "React Developer",
  "UI Enthusiast",
  "Web Creator"
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const typeEl = document.getElementById("typeText");

function type() {
  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    typeEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting   = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();


// ─── SCROLL REVEAL ──────────────────────
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));


// ─── SKILL BARS ─────────────────────────
const skillGrid = document.querySelector(".skills-grid");

const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-bar-fill")
          .forEach((bar) => {
            bar.style.width = bar.dataset.width + "%";
          });
        skillBarObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (skillGrid) skillBarObserver.observe(skillGrid);


// ─── NAV SHRINK ON SCROLL ───────────────
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.padding    = "0.7rem 5%";
    navbar.style.boxShadow  = "0 4px 30px rgba(0,0,0,0.4)";
  } else {
    navbar.style.padding    = "1.2rem 5%";
    navbar.style.boxShadow  = "none";
  }
});


// ─── SMOOTH SCROLL (nav links) ──────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document?.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ─── CONTACT FORM SUBMIT ────────────────
function handleFormSubmit(btn) {
  const originalHTML = btn.innerHTML;

  btn.innerHTML         = "✅ Message Sent!";
  btn.style.background  = "var(--green)";
  btn.disabled          = true;

  setTimeout(() => {
    btn.innerHTML        = originalHTML;
    btn.style.background = "";
    btn.disabled         = false;
  }, 3000);
}
