import React from 'react';

interface GlitchEffectProps {
  intensity?: number;
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({ intensity = 1 }) => {
  const glitchDuration = intensity * 0.1;
  const barCount = Math.min(intensity * 3, 10);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 bg-black opacity-20 animate-pulse"
        style={{ animationDuration: `${glitchDuration}s` }}
      ></div>

      {/* Color inversion bars */}
      <div className="absolute inset-0">
        {Array.from({ length: barCount }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-full bg-opacity-30 ${
              i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 80 + 10}%`,
              animation: `glitch-bars ${glitchDuration}s linear infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Screen tear effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-ping"
        style={{ animationDuration: `${glitchDuration * 2}s` }}
      ></div>

      {/* Warning text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`text-red-400 font-bold animate-pulse ${
            intensity >= 3 ? 'text-6xl' : intensity >= 2 ? 'text-4xl' : 'text-2xl'
          }`}
          style={{ animationDuration: `${glitchDuration}s` }}
        >
          {intensity >= 3 ? 'SYSTEM LOCKDOWN' : intensity >= 2 ? 'ACCESS DENIED' : 'WARNING'}
        </div>
      </div>

      {/* Additional chaos for high intensity */}
      {intensity >= 3 && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 text-red-400 text-lg font-mono animate-bounce">
            TRACE INTENSIFYING
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-red-400 text-lg font-mono animate-bounce">
            EMERGENCY PROTOCOLS
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400 text-sm font-mono animate-pulse">
            CONNECTION COMPROMISED
          </div>
        </div>
      )}
    </div>
  );
};

// 전역 스타일 추가 (Vite 환경에 맞게)
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(`
  @keyframes glitch-bars {
    0% { transform: translateX(-100%); }
    25% { transform: translateX(100%); }
    50% { transform: translateX(-100%); }
    75% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`);
document.adoptedStyleSheets = [styleSheet];

export default GlitchEffect;