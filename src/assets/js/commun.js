/* commun.js – Bridge & Flow Folk */

/* ── Menu burger ── */
function toggleMenu(btn) {
  const nav = document.getElementById("navMobile");
  const ouvert = nav.classList.toggle("ouvert");
  btn.setAttribute("aria-expanded", ouvert);
  btn.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
}

function fermerMenu() {
  const nav = document.getElementById("navMobile");
  nav.classList.remove("ouvert");
  const btn = document.querySelector(".nav-burger");
  if (btn) {
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Ouvrir le menu");
  }
}

/* ── Pétales (DocumentFragment = 1 seul reflow) ── */
(function initPetales() {
  const PETALES = ["🌸", "🌺", "✿", "❀", "🌼"];
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("div");
    el.className = "petale";
    el.textContent = PETALES[Math.floor(Math.random() * PETALES.length)];
    const t = Math.random() * 0.8 + 0.6;
    el.style.cssText = [
      `left:${Math.random() * 100}%`,
      `font-size:${t}rem`,
      `animation-duration:${Math.random() * 15 + 12}s`,
      `animation-delay:${Math.random() * 15}s`,
    ].join(";");
    fragment.appendChild(el);
  }
  document.body.appendChild(fragment);
})();
