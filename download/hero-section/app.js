/* ═══════════════════════════════════════════════
   App Logic — Particles + CTA Button Ripple
   ═══════════════════════════════════════════════ */

// ─── Ambient Particles ───
(function createParticles() {
  const container = document.getElementById('particles');
  const count = 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.3 + 0.05;

    container.appendChild(p);
  }
})();

// ─── CTA Button Ripple Effect ───
document.getElementById('cta-btn').addEventListener('click', function (e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);

  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    width: ${diameter}px;
    height: ${diameter}px;
    left: ${e.clientX - rect.left - diameter / 2}px;
    top: ${e.clientY - rect.top - diameter / 2}px;
    background: rgba(0, 0, 0, 0.15);
    transform: scale(0);
    animation: ripple-out 0.6s ease-out forwards;
    pointer-events: none;
  `;

  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
});
