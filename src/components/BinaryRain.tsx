import React, { useEffect, useRef } from 'react';

const BinaryRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01';
    const charSize = 14;
    const columns = Math.floor(canvas.width / charSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const draw = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39FF14';
      ctx.font = `${charSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * charSize;
        const y = drops[i];

        // Vary the opacity for depth effect
        const opacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(57, 255, 20, ${opacity})`;
        ctx.fillText(char, x, y);

        // Random reset with varying speeds
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Variable falling speed
        drops[i] += Math.random() * 2 + 1;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default BinaryRain;