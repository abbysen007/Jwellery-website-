import React, { useEffect, useRef } from 'react';

interface ProductRealtimeShimmerProps {
  isHovered: boolean;
  className?: string;
}

export const ProductRealtimeShimmer: React.FC<ProductRealtimeShimmerProps> = ({
  isHovered,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 280);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const sparkles = Array.from({ length: 6 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1.2,
      maxAlpha: Math.random() * 0.7 + 0.3,
      alpha: 0,
      speed: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      if (!isHovered) {
        return;
      }

      t += 0.03;

      // Draw dynamic real-time light sweep ray across the jewellery
      const sweepX = ((Math.sin(t * 0.8) + 1) / 2) * (width + 100) - 50;
      const grad = ctx.createLinearGradient(sweepX - 60, 0, sweepX + 60, height);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.5, 'rgba(255, 248, 220, 0.18)');
      grad.addColorStop(1, 'rgba(201, 168, 106, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw twinkling facet sparkles
      sparkles.forEach((s) => {
        s.alpha = Math.sin(t * 2 + s.phase) * s.maxAlpha;
        if (s.alpha > 0.05) {
          ctx.save();
          ctx.translate(s.x, s.y);

          // 4-point diamond sparkle star
          ctx.strokeStyle = `rgba(255, 250, 235, ${s.alpha})`;
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-s.size * 2, 0);
          ctx.lineTo(s.size * 2, 0);
          ctx.moveTo(0, -s.size * 2);
          ctx.lineTo(0, s.size * 2);
          ctx.stroke();

          ctx.restore();
        }
      });
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
};
