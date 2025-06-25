import React, { useState, useEffect } from 'react';
import { Terminal, Globe, AlertTriangle } from 'lucide-react';
import BinaryRain from './components/BinaryRain';
import DoomsdayBrowser from './components/DoomsdayBrowser';
import GhostComm from './components/GhostComm';
import MissionPanel from './components/MissionPanel';
import GlitchEffect from './components/GlitchEffect';
import ChaosBoard from './components/ChaosBoard';
import BlackMarket from './components/BlackMarket';
import WhisperNet from './components/WhisperNet';
import SoundManager from './components/SoundManager';
import EndingSequence from './components/EndingSequence';

interface GameState {
  darkCoins: number;
  purchasedItems: string[];
  completedMissions: string[];
  currentMissionStep: number;
  hasAnonymityTracker: boolean;
  discoveredOrionHint: boolean;
  finalCodeRevealed: boolean;
  escapeAttempts: number;
  gameCompleted: boolean;
  showEnding: boolean;
}

function App() {
  const [currentUrl, setCurrentUrl] = useState('welcome.onion');
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(1);
  const [gameState, setGameState] = useState<GameState>({
    darkCoins: 150,
    purchasedItems: [],
    completedMissions: [],
    currentMissionStep: 0,
    hasAnonymityTracker: false,
    discoveredOrionHint: false,
    finalCodeRevealed: false,
    escapeAttempts: 0,
    gameCompleted: false,
    showEnding: false
  });
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'X',
      text: 'nfbdpcp lfbsbg wdcj jygtjjc pfk drrthcrs. jxefiym qyrd wgeg wy lfbakyz. ccmf jxc gqgfi xybz gqg.',
      timestamp: Date.now(),
      isEncrypted: true,
      decrypted: '누군가 당신의 접속을 감지했습니다. 서둘러 이곳을 벗어나야 합니다. 내가 도와줄 수 있습니다.'
    }
  ]);
  
  const [currentMission, setCurrentMission] = useState("'X'와 대화하기");
  const [showMarket, setShowMarket] = useState(false);
  const [showWhisperNet, setShowWhisperNet] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const validUrls = ['welcome.onion', 'echoesofvoid.onion', 'cryptomart.onion', 'whispernet.onion'];

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('darkdive_gamestate', JSON.stringify(gameState));
  }, [gameState]);

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('darkdive_gamestate');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (!parsedState.gameCompleted) {
          setGameState(parsedState);
        }
      } catch (error) {
        console.log('Failed to load saved game state');
      }
    }
  }, []);

  const triggerGlitch = (intensity = 1) => {
    setGlitchIntensity(intensity);
    setShowGlitch(true);
    setTimeout(() => setShowGlitch(false), intensity * 2000);
  };

  const handleUrlChange = (url: string) => {
    if (url.includes('.onion')) {
      if (validUrls.includes(url)) {
        // Special access control for whispernet.onion
        if (url === 'whispernet.onion') {
          if (!gameState.hasAnonymityTracker) {
            triggerGlitch(3);
            // Show warning message
            const warningMsg = document.createElement('div');
            warningMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 border border-red-400 text-red-400 p-6 rounded-lg z-50 font-mono text-center';
            warningMsg.innerHTML = `
              <div class="text-2xl font-bold mb-4">⚠️ WARNING ⚠️</div>
              <div class="text-lg mb-2">YOUR ANONYMITY IS COMPROMISED</div>
              <div class="text-sm">TRACKERS DETECTED YOUR LOCATION</div>
              <div class="text-xs mt-4 text-red-300">익명 트래커가 필요합니다</div>
            `;
            document.body.appendChild(warningMsg);
            setTimeout(() => {
              if (document.body.contains(warningMsg)) {
                document.body.removeChild(warningMsg);
              }
            }, 4000);

            // X sends warning message
            setTimeout(() => {
              const xWarning = {
                id: messages.length + 1,
                sender: 'X',
                text: 'qgqgfi wy gqgfi cqgqxrqjrf. jjfbzj \'ccmfqymmqg jqgmrqj\'wy xrqykxgeg xgeg.',
                timestamp: Date.now(),
                isEncrypted: true,
                decrypted: '당신은 아직 추적자들에게 노출되어 있습니다. 먼저 \'익명 트래커\'를 확보해야 합니다.'
              };
              setMessages(prev => [...prev, xWarning]);
            }, 2000);
            return;
          }
        }

        setCurrentUrl(url);
        if (url === 'cryptomart.onion') {
          setShowMarket(true);
          setShowWhisperNet(false);
        } else if (url === 'whispernet.onion') {
          setShowWhisperNet(true);
          setShowMarket(false);
        } else {
          setShowMarket(false);
          setShowWhisperNet(false);
        }
      } else {
        // Invalid URL - trigger glitch effect
        triggerGlitch(2);
      }
    } else {
      triggerGlitch(2);
    }
  };

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'User',
      text: message,
      timestamp: Date.now(),
      isEncrypted: false
    };
    setMessages([...messages, newMessage]);

    // Auto-response from X based on mission progress
    if (gameState.currentMissionStep === 0 && message.toLowerCase().includes('도움')) {
      setTimeout(() => {
        const xResponse = {
          id: messages.length + 2,
          sender: 'X',
          text: 'rqxfrjsyeqzk.ynzyn lfbsbgpf jxrfzrg crjjrfl wy xrqyk. lqyl lfbakyz wy nyzqf \'cqgqxrqj\'rf brqr zyqmrczs zj jjfbzj.',
          timestamp: Date.now() + 1000,
          isEncrypted: true,
          decrypted: 'echoesofvoid.onion 게시판에 숨겨진 메시지를 해독하세요. 그곳에 당신을 노리는 \'추적자\'에 대한 정보가 있습니다.'
        };
        setMessages(prev => [...prev, xResponse]);
        setCurrentMission("echoesofvoid.onion에서 암호화된 메시지 해독하기");
        setGameState(prev => ({ ...prev, currentMissionStep: 1 }));
      }, 2000);
    }

    // Mission 3 logic - User_Orion message
    if (gameState.currentMissionStep === 2 && gameState.discoveredOrionHint) {
      const messageText = message.toLowerCase().trim();
      if (messageText === 'orion 781' || messageText === 'orion781') {
        setTimeout(() => {
          const dataMsg = document.createElement('div');
          dataMsg.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900 border border-blue-400 text-blue-400 p-4 rounded-lg z-50 font-mono';
          dataMsg.textContent = 'INCOMING DATA PACKET. ANALYZING...';
          document.body.appendChild(dataMsg);
          setTimeout(() => {
            if (document.body.contains(dataMsg)) {
              document.body.removeChild(dataMsg);
            }
          }, 3000);

          // X sends final encrypted code
          setTimeout(() => {
            const finalCode = {
              id: messages.length + 2,
              sender: 'X',
              text: 'MDEwMDEwMDEgMDExMDEwMDEgMDExMDExMTAgMDExMDAwMDEgMDEwMTAwMDAgMDExMDEwMDEgMDEwMDAwMDAgMDExMDEwMDEgMDExMDEwMDEgMDExMDAwMDEgMDExMDAxMDAgMDExMDEwMDEgMDEwMDAwMDA=',
              timestamp: Date.now() + 3000,
              isEncrypted: true,
              decrypted: 'DIGITAL ESCAPE'
            };
            setMessages(prev => [...prev, finalCode]);
            setCurrentMission("최종 코드 해독 및 입력");
            setGameState(prev => ({ 
              ...prev, 
              currentMissionStep: 3,
              finalCodeRevealed: true,
              completedMissions: [...prev.completedMissions, 'mission3']
            }));
          }, 4000);
        }, 1000);
      } else {
        setTimeout(() => {
          const failMsg = document.createElement('div');
          failMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 border border-red-400 text-red-400 p-4 rounded-lg z-50';
          failMsg.textContent = 'MESSAGE FAILED: RECIPIENT NOT FOUND';
          document.body.appendChild(failMsg);
          setTimeout(() => {
            if (document.body.contains(failMsg)) {
              document.body.removeChild(failMsg);
            }
          }, 3000);

          const xHint = {
            id: messages.length + 2,
            sender: 'X',
            text: 'yzqfyn zj lqzmy xybz gqg. mqyr 781rf jxrfzrg.',
            timestamp: Date.now() + 1000,
            isEncrypted: true,
            decrypted: '오리온이 기다리는 코드는 781입니다.'
          };
          setMessages(prev => [...prev, xHint]);
        }, 2000);
      }
    }

    // Final escape code check - ENHANCED FOR STAGE 4
    if (gameState.currentMissionStep === 3 && gameState.finalCodeRevealed) {
      const messageText = message.toLowerCase().replace(/\s/g, '');
      if (messageText === 'digitalescape' || messageText === 'digital_escape') {
        // Successful escape - STAGE 4 COMPLETION
        setGameState(prev => ({ 
          ...prev, 
          gameCompleted: true,
          showEnding: true
        }));
        
        // Clear all intervals and effects
        setTimeout(() => {
          // Final success sequence will be handled by EndingSequence component
        }, 1000);
        
      } else {
        // Wrong code - intensify tracking (ENHANCED)
        const newAttempts = gameState.escapeAttempts + 1;
        setGameState(prev => ({ ...prev, escapeAttempts: newAttempts }));
        
        triggerGlitch(Math.min(newAttempts + 1, 5));
        
        const warnings = [
          'SYSTEM LOCKDOWN INITIATED!',
          'TRACE INTENSIFYING!',
          'FINAL WARNING: DO NOT PROCEED!',
          'EMERGENCY PROTOCOLS ACTIVATED!',
          'COMPLETE SYSTEM SHUTDOWN IMMINENT!'
        ];
        
        const warningMsg = document.createElement('div');
        warningMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 border border-red-400 text-red-400 p-6 rounded-lg z-50 font-mono text-center animate-pulse';
        warningMsg.innerHTML = `
          <div class="text-2xl font-bold mb-4">⚠️ ${warnings[Math.min(newAttempts - 1, warnings.length - 1)]} ⚠️</div>
          <div class="text-lg">INCORRECT ESCAPE CODE</div>
          <div class="text-sm mt-2">ATTEMPTS: ${newAttempts}/5</div>
          ${newAttempts >= 3 ? '<div class="text-xs mt-4 text-red-300 animate-pulse">시스템이 불안정해지고 있습니다...</div>' : ''}
          ${newAttempts >= 4 ? '<div class="text-xs mt-2 text-red-300 animate-pulse">최종 경고: 한 번 더 실패하면...</div>' : ''}
        `;
        document.body.appendChild(warningMsg);
        setTimeout(() => {
          if (document.body.contains(warningMsg)) {
            document.body.removeChild(warningMsg);
          }
        }, 4000);

        // Game Over condition
        if (newAttempts >= 5) {
          setTimeout(() => {
            const gameOverMsg = document.createElement('div');
            gameOverMsg.className = 'fixed inset-0 bg-red-900 flex items-center justify-center z-50';
            gameOverMsg.innerHTML = `
              <div class="text-center">
                <div class="text-red-400 text-6xl font-bold mb-8 animate-pulse">GAME OVER</div>
                <div class="text-red-400 text-2xl mb-4">SYSTEM COMPROMISED</div>
                <div class="text-white text-lg mb-8">추적자들이 당신을 찾았습니다.</div>
                <button onclick="location.reload()" class="bg-red-400 text-black px-6 py-3 rounded font-bold hover:bg-red-300 transition-colors">
                  다시 시작
                </button>
              </div>
            `;
            document.body.appendChild(gameOverMsg);
          }, 2000);
        }
      }
    }
  };

  const handlePurchaseItem = (itemId: string, price: number) => {
    if (gameState.darkCoins >= price && !gameState.purchasedItems.includes(itemId)) {
      setGameState(prev => ({
        ...prev,
        darkCoins: prev.darkCoins - price,
        purchasedItems: [...prev.purchasedItems, itemId],
        hasAnonymityTracker: itemId === 'anonymity_tracker' ? true : prev.hasAnonymityTracker
      }));
      
      // Show purchase effect
      const purchaseEffect = document.createElement('div');
      purchaseEffect.className = 'fixed inset-0 bg-green-400 opacity-20 pointer-events-none z-50';
      purchaseEffect.style.animation = 'flash 0.5s ease-out';
      document.body.appendChild(purchaseEffect);
      setTimeout(() => document.body.removeChild(purchaseEffect), 500);
      
      // Special effects for anonymity tracker
      if (itemId === 'anonymity_tracker') {
        setTimeout(() => {
          const xResponse = {
            id: messages.length + 1,
            sender: 'X',
            text: 'cqgqxrqj wy ccmfqymmqg. wzjbrqnrc.ynzyn rjrq cqgr zyqm wy xrqykxgeg xgeg.',
            timestamp: Date.now(),
            isEncrypted: true,
            decrypted: '추적자는 잠시 물러났습니다. whispernet.onion에서 추가 정보를 찾아야 합니다.'
          };
          setMessages(prev => [...prev, xResponse]);
          setCurrentMission("whispernet.onion에서 User_Orion 정보 찾기");
        }, 2000);
      }
      
      return true;
    }
    return false;
  };

  const handleMissionProgress = (missionData: any) => {
    if (missionData.type === 'decrypt_success' && gameState.currentMissionStep === 1) {
      // Mission 1 completed - unlock cryptomart.onion
      const xResponse = {
        id: messages.length + 1,
        sender: 'X',
        text: 'cqgqxrqj wy ccmfqymmqg. qjzecymrqc.ynzyn rjrq lqzmy jqzmy xf zyqm wy cqgr jqgr jjfbzj.',
        timestamp: Date.now(),
        isEncrypted: true,
        decrypted: '추적자를 따돌려라. cryptomart.onion에서 그림자를 사라지게 할 도구를 찾아라. 익명 트래커만이 너를 보호할 수 있다.'
      };
      setMessages(prev => [...prev, xResponse]);
      setCurrentMission("블랙 마켓에서 '익명 트래커' 구매하기");
      setGameState(prev => ({ 
        ...prev, 
        currentMissionStep: 2,
        completedMissions: [...prev.completedMissions, 'mission1']
      }));
    }
  };

  const handleOrionDiscovery = () => {
    if (!gameState.discoveredOrionHint) {
      setGameState(prev => ({ ...prev, discoveredOrionHint: true }));
      setCurrentMission("'카오스 보드'에서 User_Orion에게 메시지 보내기");
      
      // X provides hint about Orion code
      setTimeout(() => {
        const xHint = {
          id: messages.length + 1,
          sender: 'X',
          text: 'yzqfyn zj lqzmy xybz gqg. mqyr 781rf jxrfzrg.',
          timestamp: Date.now(),
          isEncrypted: true,
          decrypted: '오리온이 기다리는 코드는 781입니다.'
        };
        setMessages(prev => [...prev, xHint]);
      }, 3000);
    }
  };

  const resetGame = () => {
    localStorage.removeItem('darkdive_gamestate');
    window.location.reload();
  };

  useEffect(() => {
    // Auto-load welcome.onion on startup
    setCurrentUrl('welcome.onion');
    
    // Add flash animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flash {
        0% { opacity: 0; }
        50% { opacity: 0.3; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const renderContent = () => {
    if (showMarket) {
      return (
        <BlackMarket 
          darkCoins={gameState.darkCoins}
          purchasedItems={gameState.purchasedItems}
          onPurchase={handlePurchaseItem}
          gameState={gameState}
        />
      );
    }

    if (showWhisperNet) {
      return (
        <WhisperNet 
          gameState={gameState}
          onOrionDiscovery={handleOrionDiscovery}
        />
      );
    }

    switch (currentUrl) {
      case 'welcome.onion':
        return (
          <div className="bg-black bg-opacity-80 border border-green-400 p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-green-400 mb-4 text-center">
              DarkDive: Enter the Void
            </h1>
            <div className="text-green-300 leading-relaxed space-y-4">
              <p className="text-center text-lg">환영합니다. 당신은 이제 어둠의 깊은 곳에 있습니다.</p>
              
              <div className="border-t border-green-400 pt-4">
                <h2 className="text-xl font-semibold mb-2">브라우저 사용법:</h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>상단 주소창에 .onion 주소를 입력하여 이동</li>
                  <li>잘못된 주소 입력 시 추적 위험 발생</li>
                  <li>좌측 하단 통신창에서 익명 사용자들과 대화</li>
                  <li>모든 통신은 암호화되어 있습니다</li>
                </ul>
              </div>
              
              <div className="border-t border-green-400 pt-4">
                <h2 className="text-xl font-semibold mb-2">주의사항:</h2>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-400">
                  <li>당신의 모든 활동이 감시되고 있습니다</li>
                  <li>추적자들이 당신을 찾고 있습니다</li>
                  <li>신뢰할 수 있는 사람은 'X' 뿐입니다</li>
                  <li>서둘러 탈출 방법을 찾아야 합니다</li>
                </ul>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-yellow-400 font-semibold">
                  좌측 하단 통신창을 확인하세요. 'X'가 당신을 기다리고 있습니다.
                </p>
              </div>

              {/* Game Controls */}
              <div className="border-t border-green-400 pt-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="bg-green-400 text-black px-3 py-1 rounded text-sm hover:bg-green-300 transition-colors"
                  >
                    사운드: {soundEnabled ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={resetGame}
                    className="bg-red-400 text-black px-3 py-1 rounded text-sm hover:bg-red-300 transition-colors"
                  >
                    게임 리셋
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'echoesofvoid.onion':
        return (
          <ChaosBoard 
            gameState={gameState}
            onMissionProgress={handleMissionProgress}
          />
        );
      
      default:
        return (
          <div className="bg-black bg-opacity-80 border border-red-400 p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-red-400 mb-4 text-center">
              ACCESS DENIED
            </h1>
            <p className="text-red-300 text-center">
              이 페이지에 접근할 권한이 없습니다.
            </p>
          </div>
        );
    }
  };

  if (gameState.showEnding) {
    return <EndingSequence onRestart={resetGame} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <BinaryRain />
      <SoundManager enabled={soundEnabled} gameState={gameState} />
      
      {showGlitch && <GlitchEffect intensity={glitchIntensity} />}
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Doomsday Browser */}
        <DoomsdayBrowser 
          currentUrl={currentUrl}
          onUrlChange={handleUrlChange}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 p-4 flex">
          {/* Main Content */}
          <div className="flex-1 mr-4">
            {renderContent()}
          </div>
          
          {/* Right Sidebar */}
          <div className="w-80 space-y-4">
            <div className="bg-black bg-opacity-80 border border-blue-400 rounded-lg p-3">
              <div className="text-blue-400 text-sm font-semibold mb-2">다크코인 잔액</div>
              <div className="text-green-400 text-xl font-bold">{gameState.darkCoins} DC</div>
              {gameState.hasAnonymityTracker && (
                <div className="text-green-400 text-xs mt-2 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  익명 트래커 활성
                </div>
              )}
              {gameState.escapeAttempts > 0 && (
                <div className="text-red-400 text-xs mt-2 flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                  탈출 시도: {gameState.escapeAttempts}/5
                </div>
              )}
            </div>
            
            <MissionPanel mission={currentMission} />
            <GhostComm 
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;