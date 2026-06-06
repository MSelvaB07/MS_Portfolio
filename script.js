/* =============================================
   JOHN DOE — Neon Cyberpunk Portfolio
   script.js
   ============================================= */

// ── TYPING ANIMATION ──────────────────────────
const roles = [
  "Frontend Designer",
  "QA Testing",
  "UI UX Designer",
  "Web Architect",
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const typedEl = document.getElementById("typed-text");

function typeLoop() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 55 : 95);
}

typeLoop();


// ── SCROLL REVEAL ────────────────────────────
const revealEls = document.querySelectorAll(".reveal");

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => revealObs.observe(el));


// ── SKILL BARS ───────────────────────────────
const skillsGrid = document.querySelector(".skills-grid");

const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-bar-fill")
          .forEach((bar) => {
            bar.style.width = bar.dataset.width + "%";
          });
        skillObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (skillsGrid) skillObs.observe(skillsGrid);


// ── NAV SHRINK ON SCROLL ─────────────────────
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});


// ── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ── GLITCH EFFECT ON HERO NAME ───────────────
const heroName = document.querySelector(".hero-name");

function triggerGlitch() {
  if (!heroName) return;
  heroName.style.textShadow =
    "2px 0 #ff00ff, -2px 0 #00ffff, 0 0 20px #ff00ff";
  heroName.style.transform = "skewX(-2deg)";

  setTimeout(() => {
    heroName.style.textShadow = "";
    heroName.style.transform  = "";
  }, 120);

  setTimeout(() => {
    heroName.style.textShadow =
      "1px 0 #00ffff, -1px 0 #ff00ff, 0 0 15px #00ffff";
    heroName.style.transform = "skewX(1.5deg)";
  }, 160);

  setTimeout(() => {
    heroName.style.textShadow = "";
    heroName.style.transform  = "";
  }, 250);

  // schedule next glitch
  const nextGlitch = 3000 + Math.random() * 5000;
  setTimeout(triggerGlitch, nextGlitch);
}

// Start glitch after initial animations settle
setTimeout(triggerGlitch, 3000);


// ── NEON FLICKER ON LOGO ─────────────────────
const navLogo = document.querySelector(".nav-logo");

function flickerLogo() {
  if (!navLogo) return;
  const origOpacity = navLogo.style.opacity;
  navLogo.style.opacity = "0.6";
  setTimeout(() => { navLogo.style.opacity = "1"; }, 80);
  setTimeout(() => { navLogo.style.opacity = "0.7"; }, 130);
  setTimeout(() => { navLogo.style.opacity = "1"; }, 190);

  const next = 6000 + Math.random() * 8000;
  setTimeout(flickerLogo, next);
}

setTimeout(flickerLogo, 4000);


// ── CONTACT FORM ─────────────────────────────
function handleFormSubmit(btn) {
  const original = btn.innerHTML;

  btn.innerHTML        = "[ TRANSMISSION SENT ✓ ]";
  btn.style.background = "var(--cyan)";
  btn.style.color      = "var(--bg)";
  btn.style.boxShadow  = "0 0 20px var(--cyan), 0 0 40px rgba(0,255,255,0.3)";
  btn.disabled         = true;

  setTimeout(() => {
    btn.innerHTML        = original;
    btn.style.background = "";
    btn.style.color      = "";
    btn.style.boxShadow  = "";
    btn.disabled         = false;
  }, 3500);
}


// ── CURSOR NEON TRAIL ────────────────────────
const trail = [];
const TRAIL_LENGTH = 10;

for (let i = 0; i < TRAIL_LENGTH; i++) {
  const dot = document.createElement("div");
  dot.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9000;
    width: ${6 - i * 0.4}px; height: ${6 - i * 0.4}px;
    border-radius: 50%;
    background: ${i % 2 === 0 ? "#ff00ff" : "#00ffff"};
    opacity: ${(TRAIL_LENGTH - i) / TRAIL_LENGTH * 0.6};
    transition: left ${i * 20 + 20}ms linear, top ${i * 20 + 20}ms linear;
    box-shadow: 0 0 ${4 + i}px ${i % 2 === 0 ? "#ff00ff" : "#00ffff"};
  `;
  document.body.appendChild(dot);
  trail.push(dot);
}

document.addEventListener("mousemove", (e) => {
  trail.forEach((dot) => {
    dot.style.left = e.clientX - 3 + "px";
    dot.style.top  = e.clientY - 3 + "px";
  });
});
