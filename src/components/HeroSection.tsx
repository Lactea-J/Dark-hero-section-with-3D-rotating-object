'use client';

import dynamic from 'next/dynamic';
import FloatingParticles from './FloatingParticles';

// Dynamic import to avoid SSR issues with Three.js
const ChromeTorusScene = dynamic(() => import('./ChromeTorusScene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-black" />
  ),
});

const NAV_ITEMS = ['Features', 'Pricing', 'Docs', 'Contact'];

const FEATURE_CARDS = [
  { icon: '⚡', label: 'Features', desc: '강력한 기능 탐색' },
  { icon: '💰', label: 'Pricing', desc: '합리적인 가격' },
  { icon: '🚀', label: 'Deploy', desc: '원클릭 배포' },
  { icon: '🔒', label: 'Security', desc: '엔터프라이즈 보안' },
];

export default function HeroSection() {
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* ─── 3D Canvas Layer ─── */}
      <ChromeTorusScene />

      {/* ─── Floating Particles ─── */}
      <FloatingParticles />

      {/* ─── UI Overlay ─── */}
      <div className="fixed inset-0 z-10 flex flex-col pointer-events-none">
        <div className="pointer-events-auto">
          {/* ─── Navbar ─── */}
          <nav className="hero-navbar flex items-center justify-between px-6 md:px-10 py-5">
            <div className="text-xl font-extrabold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              CHROMA
            </div>
            <ul className="flex gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="nav-pill">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ─── Hero Center ─── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-6">
          <div className="pointer-events-auto flex flex-col items-center">
            {/* Headline */}
            <h1
              className="headline-text mb-4"
              data-text="BUILD THE FUTURE"
            >
              BUILD THE FUTURE
            </h1>

            {/* Sub-headline */}
            <p className="text-base md:text-lg text-white/55 max-w-xl leading-relaxed mb-10">
              다음 세대의 크리에이티브 경험을 시작하세요. 하이퍼-글로시 크롬 메탈과 유리 같은 UI가 만나는 몰입형 웹의 세계로.
            </p>

            {/* Feature Glass Cards */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {FEATURE_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="glass-card rounded-xl px-8 py-5 min-w-[160px] text-center cursor-default"
                >
                  <span className="text-3xl block mb-2">{card.icon}</span>
                  <span className="text-sm font-semibold text-white/90 tracking-wide">
                    {card.label}
                  </span>
                  <span className="text-xs text-white/40 block mt-1">
                    {card.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="cta-glow"
              onClick={handleCtaClick}
            >
              Get Started
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* ─── Bottom Gradient Fade ─── */}
        <div className="bottom-fade absolute bottom-0 left-0 right-0 h-[200px] z-15 pointer-events-none" />
      </div>
    </div>
  );
}
