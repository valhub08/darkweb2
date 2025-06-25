import React, { useState, useEffect } from 'react';

interface EndingSequenceProps {
  onRestart: () => void;
}

const EndingSequence: React.FC<EndingSequenceProps> = ({ onRestart }) => {
  const [phase, setPhase] = useState(0);
  const [showHiddenEnding, setShowHiddenEnding] = useState(false);

  useEffect(() => {
    const sequence = [
      () => setPhase(1), // Connection severed
      () => setPhase(2), // Escape successful
      () => setPhase(3), // Fade to white
      () => setPhase(4), // Success message
      () => setShowHiddenEnding(true), // Hidden ending
      () => setPhase(5) // Final phase
    ];

    const timeouts = [
      setTimeout(sequence[0], 1000),
      setTimeout(sequence[1], 3000),
      setTimeout(sequence[2], 6000),
      setTimeout(sequence[3], 9000),
      setTimeout(sequence[4], 12000),
      setTimeout(sequence[5], 17000)
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const getBackgroundStyle = () => {
    if (phase >= 3) {
      return {
        background: phase >= 4 ? 'white' : 'linear-gradient(to bottom, #000000, #ffffff)',
        transition: 'background 3s ease'
      };
    }
    return { background: 'black' };
  };

  const getTextColor = () => {
    return phase >= 4 ? 'text-black' : 'text-green-400';
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-3000"
      style={getBackgroundStyle()}
    >
      <div className="text-center max-w-2xl px-8">
        {phase >= 1 && (
          <div className={`text-4xl font-bold mb-8 transition-colors duration-3000 ${getTextColor()}`}>
            {phase === 1 && (
              <div className="animate-pulse">CONNECTION SEVERED</div>
            )}
            {phase >= 2 && phase < 4 && (
              <div>
                <div className="mb-4">CONNECTION SEVERED</div>
                <div className="text-2xl animate-pulse">ESCAPE SUCCESSFUL</div>
              </div>
            )}
            {phase >= 4 && !showHiddenEnding && (
              <div className="space-y-6">
                <div className="text-3xl">탈출 성공</div>
                <div className="text-xl leading-relaxed">
                  당신은 디지털 미로에서 벗어났습니다.<br/>
                  현실로 돌아오세요.
                </div>
                <div className="text-lg text-gray-600">
                  DarkDive는 당신의 안전한 디지털 탐험을 응원합니다.
                </div>
                <button
                  onClick={onRestart}
                  className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800 transition-colors mt-8"
                >
                  다시 시작
                </button>
              </div>
            )}
          </div>
        )}

        {showHiddenEnding && phase < 5 && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-60 animate-fade-in">
            <div className="text-center text-red-400 font-mono">
              <div className="text-2xl mb-6 animate-pulse">
                우리는 다시 만날 것입니다...
              </div>
              <div className="text-lg leading-relaxed space-y-2">
                <div>당신은 그들의 흔적을 따라왔지만,</div>
                <div>당신 또한 이제 그들의 일부입니다.</div>
              </div>
              <div className="text-xl mt-8 animate-pulse">
                - X
              </div>
            </div>
          </div>
        )}

        {phase >= 5 && (
          <div className="text-center">
            <div className="text-black text-3xl mb-8">
              게임 완료
            </div>
            <div className="space-y-4 text-black">
              <p>모든 미션을 성공적으로 완료했습니다.</p>
              <p>DarkDive의 세계에서 탈출하신 것을 축하합니다!</p>
            </div>
            <button
              onClick={onRestart}
              className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800 transition-colors mt-8"
            >
              새 게임 시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndingSequence;