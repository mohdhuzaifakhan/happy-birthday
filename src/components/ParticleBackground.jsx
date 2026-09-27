import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: glowing stars, ambient dust, floating hearts
    const particleCount = Math.min(width < 768 ? 40 : 80, 100);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2, // Drifting upwards
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: ['#FF6584', '#FFD700', '#A78BFA', '#F472B6', '#FFFFFF'][Math.floor(Math.random() * 5)],
        isHeart: Math.random() < 0.15
      });
    }

    const drawHeart = (ctx, x, y, size, opacity, color) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const d = size * 3;
      ctx.moveTo(x, y + d / 4);
      ctx.quadraticCurveTo(x, y, x + d / 4, y);
      ctx.quadraticCurveTo(x + d / 2, y, x + d / 2, y + d / 4);
      ctx.quadraticCurveTo(x + d / 2, y, x + d * 3 / 4, y);
      ctx.quadraticCurveTo(x + d, y, x + d, y + d / 4);
      ctx.quadraticCurveTo(x + d, y + d / 2, x + d * 3 / 4, y + d * 3 / 4);
      ctx.lineTo(x + d / 2, y + d);
      ctx.lineTo(x + d / 4, y + d * 3 / 4);
      ctx.quadraticCurveTo(x, y + d / 2, x, y + d / 4);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Twinkle effect
        p.opacity += p.twinkleSpeed;
        if (p.opacity > 0.8 || p.opacity < 0.2) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }

        // Wrap around screens
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = p.size * 4;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
