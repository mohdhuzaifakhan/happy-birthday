import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas({ active = false, duration = 5000 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let startTime = Date.now();

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const colors = ['#FF6584', '#FFD700', '#A78BFA', '#38BDF8', '#F472B6', '#34D399'];

    const createFirework = (x, y) => {
      const particleCount = 60 + Math.floor(Math.random() * 40);
      const baseColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5),
          vy: Math.sin(angle) * speed + (Math.random() - 0.5),
          alpha: 1,
          decay: Math.random() * 0.015 + 0.015,
          color: baseColor,
          size: Math.random() * 3 + 1.5,
          gravity: 0.08
        });
      }
    };

    // Auto launch fireworks at intervals while active
    const launchInterval = setInterval(() => {
      if (Date.now() - startTime < duration) {
        createFirework(
          Math.random() * (width * 0.8) + width * 0.1,
          Math.random() * (height * 0.5) + height * 0.1
        );
      }
    }, 400);

    // Initial burst
    createFirework(width / 2, height / 3);

    const animate = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (Date.now() - startTime < duration || particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animate();

    return () => {
      clearInterval(launchInterval);
      cancelAnimationFrame(animationId);
    };
  }, [active, duration]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}
