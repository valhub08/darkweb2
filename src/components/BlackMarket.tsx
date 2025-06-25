import React, { useState } from 'react';
import { ShoppingCart, Coins, Shield, Key, FileText, Zap, Eye } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
  details: string;
  hint?: string;
  specialCode?: string;
}

interface BlackMarketProps {
  darkCoins: number;
  purchasedItems: string[];
  onPurchase: (itemId: string, price: number) => boolean;
  gameState: any;
}

const BlackMarket: React.FC<BlackMarketProps> = ({ darkCoins, purchasedItems, onPurchase, gameState }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const items: Item[] = [
    {
      id: 'digital_id',
      name: '디지털 신분증',
      price: 45,
      description: '익명 게시판 접근 권한',
      icon: <FileText className="w-8 h-8" />,
      details: '특정 게시판에 익명으로 글을 작성할 수 있는 권한을 부여합니다. 신원 확인이 필요한 영역에서 사용됩니다.',
      hint: '깊은 곳의 게시판들은 신분 확인을 요구합니다.'
    },
    {
      id: 'anonymity_tracker',
      name: '익명 트래커',
      price: 80,
      description: 'IP 추적 방지 도구',
      icon: <Shield className="w-8 h-8" />,
      details: '당신의 디지털 발자국을 숨기고 추적자들로부터 보호합니다. 활성화 시 추적 위험이 현저히 감소합니다. whispernet.onion 접근에 필수적입니다.',
      hint: '추적자들이 가장 두려워하는 도구입니다. 이것 없이는 깊은 네트워크에 접근할 수 없습니다.'
    },
    {
      id: 'fake_passport',
      name: '가짜 여권',
      price: 120,
      description: '고급 신원 위조 도구',
      icon: <Eye className="w-8 h-8" />,
      details: '최고 수준의 신원 위조 기술로 제작된 디지털 여권입니다. 특별한 검문소 통과에 필요합니다.',
      hint: '번호 ORN-7814는 특별한 의미를 가집니다.',
      specialCode: 'ORN-7814'
    },
    {
      id: 'decrypt_key',
      name: '암호 해독 키',
      price: 60,
      description: '고급 암호 해독 도구',
      icon: <Key className="w-8 h-8" />,
      details: '복잡한 암호화된 메시지를 자동으로 해독합니다. 특정 퍼즐 해결에 필수적입니다. Base64, 이진수, Hex 코드를 즉시 변환할 수 있습니다.',
      hint: '일부 메시지는 이 키 없이는 절대 해독할 수 없습니다. 최종 단계에서 중요한 역할을 합니다.'
    },
    {
      id: 'data_scrambler',
      name: '데이터 스크램블러',
      price: 95,
      description: '추적 신호 교란 장치',
      icon: <Zap className="w-8 h-8" />,
      details: '추적 시스템의 신호를 교란하여 일시적으로 무력화시킵니다. 위험한 상황에서의 최후의 수단입니다.',
      hint: '이진수 시퀀스 101110010이 활성화 코드입니다.',
      specialCode: '101110010'
    }
  ];

  const handlePurchase = (item: Item) => {
    const success = onPurchase(item.id, item.price);
    if (success) {
      // Show purchase success effect
      const effect = document.createElement('div');
      effect.className = 'fixed inset-0 bg-green-400 opacity-10 pointer-events-none z-50';
      effect.style.animation = 'purchaseFlash 1s ease-out';
      document.body.appendChild(effect);
      
      // Add purchase animation style if not exists
      if (!document.querySelector('#purchase-style')) {
        const style = document.createElement('style');
        style.id = 'purchase-style';
        style.textContent = `
          @keyframes purchaseFlash {
            0% { opacity: 0; }
            50% { opacity: 0.2; }
            100% { opacity: 0; }
          }
          @keyframes ipMasking {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `;
        document.head.appendChild(style);
      }
      
      setTimeout(() => {
        if (document.body.contains(effect)) {
          document.body.removeChild(effect);
        }
      }, 1000);

      // Special effects for specific items
      if (item.id === 'anonymity_tracker') {
        // Show IP masking effect
        const maskingEffect = document.createElement('div');
        maskingEffect.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-900 border border-green-400 text-green-400 p-6 rounded-lg z-50 font-mono';
        maskingEffect.innerHTML = `
          <div class="text-center">
            <div class="text-lg font-bold mb-2">IP MASKING ACTIVATED</div>
            <div class="text-sm">192.168.1.1 → SCRAMBLED</div>
            <div class="text-sm">ANONYMITY LEVEL: MAXIMUM</div>
            <div class="text-xs mt-2 text-green-300">추적 위험 감소됨</div>
            <div class="text-xs mt-1 text-yellow-300">whispernet.onion 접근 가능</div>
          </div>
        `;
        document.body.appendChild(maskingEffect);
        setTimeout(() => {
          if (document.body.contains(maskingEffect)) {
            document.body.removeChild(maskingEffect);
          }
        }, 4000);
      }

      if (item.id === 'decrypt_key') {
        const decryptEffect = document.createElement('div');
        decryptEffect.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 border border-blue-400 text-blue-400 p-6 rounded-lg z-50 font-mono';
        decryptEffect.innerHTML = `
          <div class="text-center">
            <div class="text-lg font-bold mb-2">DECRYPT KEY ACTIVATED</div>
            <div class="text-sm">AUTO-DECODE: ENABLED</div>
            <div class="text-sm">SUPPORTED: BASE64, BINARY, HEX</div>
            <div class="text-xs mt-2 text-blue-300">암호화된 메시지 자동 해독 가능</div>
          </div>
        `;
        document.body.appendChild(decryptEffect);
        setTimeout(() => {
          if (document.body.contains(decryptEffect)) {
            document.body.removeChild(decryptEffect);
          }
        }, 3000);
      }

      if (item.id === 'data_scrambler') {
        const scramblerEffect = document.createElement('div');
        scramblerEffect.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-900 border border-purple-400 text-purple-400 p-6 rounded-lg z-50 font-mono';
        scramblerEffect.innerHTML = `
          <div class="text-center">
            <div class="text-lg font-bold mb-2">DATA SCRAMBLER ONLINE</div>
            <div class="text-sm">ACTIVATION CODE: 101110010</div>
            <div class="text-sm">SIGNAL JAMMING: READY</div>
            <div class="text-xs mt-2 text-purple-300">추적 신호 교란 준비 완료</div>
          </div>
        `;
        document.body.appendChild(scramblerEffect);
        setTimeout(() => {
          if (document.body.contains(scramblerEffect)) {
            document.body.removeChild(scramblerEffect);
          }
        }, 3000);
      }
      
      setSelectedItem(null);
    } else {
      // Show insufficient funds message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 border border-red-400 text-red-400 p-4 rounded-lg z-50';
      errorMsg.textContent = 'INSUFFICIENT DARK COINS';
      document.body.appendChild(errorMsg);
      setTimeout(() => {
        if (document.body.contains(errorMsg)) {
          document.body.removeChild(errorMsg);
        }
      }, 2000);
    }
  };

  return (
    <div className="bg-black bg-opacity-80 border border-purple-400 rounded-lg h-full">
      {/* Header */}
      <div className="border-b border-purple-400 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-bold text-purple-400">블랙 마켓</h1>
            <span className="text-xs text-purple-300">CRYPTOMART.ONION</span>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <Coins className="w-5 h-5" />
            <span className="font-bold">{darkCoins} DC</span>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-900 border-b border-red-400 p-2">
        <div className="text-red-400 text-xs text-center font-mono">
          ⚠️ WARNING: ALL TRANSACTIONS ARE IRREVERSIBLE ⚠️
        </div>
      </div>

      {/* Mission Progress Indicator */}
      {gameState.currentMissionStep >= 2 && !gameState.hasAnonymityTracker && (
        <div className="bg-yellow-900 border-b border-yellow-400 p-3">
          <div className="text-yellow-400 text-sm text-center font-mono animate-pulse">
            🎯 MISSION OBJECTIVE: 익명 트래커 구매 필요
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {items.map((item) => {
          const isPurchased = purchasedItems.includes(item.id);
          const canAfford = darkCoins >= item.price;
          const isMissionCritical = item.id === 'anonymity_tracker' && gameState.currentMissionStep >= 2 && !gameState.hasAnonymityTracker;
          
          return (
            <div
              key={item.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isPurchased 
                  ? 'border-green-400 bg-green-900 bg-opacity-20' 
                  : isMissionCritical
                    ? 'border-yellow-400 bg-yellow-900 bg-opacity-20 animate-pulse'
                    : canAfford 
                      ? 'border-purple-400 hover:bg-purple-900 hover:bg-opacity-20' 
                      : 'border-gray-600 opacity-50'
              }`}
              onClick={() => !isPurchased && setSelectedItem(item)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`${
                  isPurchased 
                    ? 'text-green-400' 
                    : isMissionCritical 
                      ? 'text-yellow-400' 
                      : 'text-purple-400'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    isPurchased 
                      ? 'text-green-400' 
                      : isMissionCritical 
                        ? 'text-yellow-400' 
                        : 'text-purple-300'
                  }`}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400">{item.description}</p>
                  {isMissionCritical && (
                    <p className="text-xs text-yellow-300 mt-1 animate-pulse">⚡ MISSION CRITICAL</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                  {item.price} DC
                </span>
                {isPurchased && (
                  <span className="text-green-400 text-xs font-semibold">OWNED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-purple-400 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-purple-400">
                {selectedItem.icon}
              </div>
              <h2 className="text-xl font-bold text-purple-400">{selectedItem.name}</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-green-300 text-sm leading-relaxed">
                {selectedItem.details}
              </p>
              
              {selectedItem.hint && (
                <div className="bg-yellow-900 bg-opacity-30 border border-yellow-400 p-3 rounded">
                  <div className="text-yellow-400 text-xs font-semibold mb-1">HINT:</div>
                  <div className="text-yellow-300 text-xs">{selectedItem.hint}</div>
                </div>
              )}

              {selectedItem.specialCode && (
                <div className="bg-blue-900 bg-opacity-30 border border-blue-400 p-3 rounded">
                  <div className="text-blue-400 text-xs font-semibold mb-1">SPECIAL CODE:</div>
                  <div className="text-blue-300 text-xs font-mono">{selectedItem.specialCode}</div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                <span className="text-2xl font-bold text-green-400">
                  {selectedItem.price} DC
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handlePurchase(selectedItem)}
                    disabled={darkCoins < selectedItem.price}
                    className={`px-4 py-2 rounded transition-colors ${
                      darkCoins >= selectedItem.price
                        ? 'bg-purple-400 text-black hover:bg-purple-300'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    구매
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlackMarket;