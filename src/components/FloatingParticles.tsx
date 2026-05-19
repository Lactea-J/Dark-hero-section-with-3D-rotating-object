'use client';

import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 3 + 1;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${Math.random() * 12 + 8}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      p.style.opacity = `${Math.random() * 0.3 + 0.05}`;
      container.appendChild(p);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-[5] pointer-events-none" />;
}
