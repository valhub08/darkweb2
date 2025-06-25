import React, { useState } from 'react';
import { Wifi, User, Search, Eye, EyeOff } from 'lucide-react';

interface WhisperNetProps {
  gameState: any;
  onOrionDiscovery: () => void;
}

const WhisperNet: React.FC<WhisperNetProps> = ({ gameState, onOrionDiscovery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDecrypted, setShowDecrypted] = useState<{[key: number]: boolean}>({});
  const [discoveredOrion, setDiscoveredOrion] = useState(false);

  const networkNodes = [
    {
      id: 1,
      username: 'ShadowRunner_42',
      lastSeen: '2 minutes ago',
      status: 'ACTIVE',
      message: '01010100 01101000 01100101 01111001 00100000 01100001 01110010 01100101 00100000 01110111 01100001 01110100 01100011 01101000 01101001 01101110 01100111',
      decrypted: 'They are watching',
      isEncrypted: true
    },
    {
      id: 2,
      username: 'VoidWalker',
      lastSeen: '15 minutes ago',
      status: 'IDLE',
      message: 'Connection unstable. Moving to backup channels.',
      decrypted: '',
      isEncrypted: false
    },
    {
      id: 3,
      username: 'User_Orion',
      lastSeen: '1 hour ago',
      status: 'HIDDEN',
      message: 'MDEwMTAwMDEgMDExMDEwMDEgMDExMDEwMDEgMDExMDAwMDEgMDEwMTAwMDAgMDExMDEwMDEgMDEwMDAwMDA=',
      decrypted: 'DIGITAL ESCAPE - Fragment: 781',
      isEncrypted: true,
      isSpecial: true
    },
    {
      id: 4,
      username: 'GhostProtocol',
      lastSeen: '3 hours ago',
      status: 'OFFLINE',
      message: 'Network compromised. Initiating emergency protocols.',
      decrypted: '',
      isEncrypted: false
    },
    {
      id: 5,
      username: 'DataPhantom',
      lastSeen: '5 hours ago',
      status: 'ACTIVE',
      message: '01000110 01101001 01101110 01100001 01101100 00100000 01110000 01101000 01100001 01110011 01100101 00100000 01100001 01110000 01110000 01110010 01101111 01100001 01100011 01101000 01101001 01101110 01100111',
      decrypted: 'Final phase approaching',
      isEncrypted: true
    }
  ];

  const filteredNodes = networkNodes.filter(node => 
    node.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDecryption = (nodeId: number) => {
    setShowDecrypted(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleOrionClick = () => {
    if (!discoveredOrion) {
      setDiscoveredOrion(true);
      onOrionDiscovery();
      
      // Show discovery effect
      const discoveryMsg = document.createElement('div');
      discoveryMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-900 border border-yellow-400 text-yellow-400 p-6 rounded-lg z-50 font-mono text-center';
      discoveryMsg.innerHTML = `
        <div class="text-xl font-bold mb-4">🔍 DISCOVERY</div>
        <div class="text-lg mb-2">User_Orion 정보 발견</div>
        <div class="text-sm">암호화된 메시지에 중요한 단서가 있습니다</div>
        <div class="text-xs mt-4 text-yellow-300">Fragment Code: 781</div>
      `;
      document.body.appendChild(discoveryMsg);
      setTimeout(() => {
        if (document.body.contains(discoveryMsg)) {
          document.body.removeChild(discoveryMsg);
        }
      }, 4000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400';
      case 'IDLE': return 'text-yellow-400';
      case 'HIDDEN': return 'text-purple-400';
      case 'OFFLINE': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black bg-opacity-80 border border-cyan-400 rounded-lg h-full">
      {/* Header */}
      <div className="border-b border-cyan-400 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Wifi className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-cyan-400">WhisperNet</h1>
            <span className="text-xs text-cyan-300">ANONYMOUS NETWORK</span>
          </div>
          <div className="text-cyan-400 text-sm">
            NODES: {filteredNodes.length}/{networkNodes.length}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-black border border-cyan-400 text-cyan-300 px-3 py-1 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
            placeholder="Search users or messages..."
          />
        </div>
      </div>

      {/* Network Status */}
      <div className="border-b border-cyan-400 p-3 bg-gray-900">
        <div className="flex items-center justify-between text-xs">
          <div className="text-cyan-400">NETWORK STATUS: SECURE</div>
          <div className="text-green-400">ANONYMITY: MAXIMUM</div>
          <div className="text-yellow-400">LATENCY: 47ms</div>
        </div>
      </div>

      {/* Network Nodes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            className={`border rounded-lg p-4 transition-all ${
              node.isSpecial 
                ? 'border-purple-400 bg-purple-900 bg-opacity-20 hover:bg-purple-900 hover:bg-opacity-30' 
                : 'border-cyan-400 hover:bg-gray-900'
            } ${node.isSpecial && !discoveredOrion ? 'cursor-pointer' : ''}`}
            onClick={node.isSpecial && !discoveredOrion ? handleOrionClick : undefined}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <User className={`w-4 h-4 ${node.isSpecial ? 'text-purple-400' : 'text-cyan-400'}`} />
                <span className={`font-semibold ${node.isSpecial ? 'text-purple-400' : 'text-cyan-300'}`}>
                  {node.username}
                </span>
                {node.isSpecial && !discoveredOrion && (
                  <span className="text-purple-300 text-xs animate-pulse">CLICK TO INVESTIGATE</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-400">{node.lastSeen}</span>
                <span className={`font-semibold ${getStatusColor(node.status)}`}>
                  {node.status}
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1 mr-2">
                <div className={`text-sm font-mono leading-relaxed ${
                  node.isEncrypted && showDecrypted[node.id] 
                    ? 'text-green-300' 
                    : node.isEncrypted 
                      ? 'text-yellow-300' 
                      : 'text-cyan-300'
                }`}>
                  {node.isEncrypted && showDecrypted[node.id] ? 
                    node.decrypted : node.message}
                </div>
                
                {node.isSpecial && discoveredOrion && (
                  <div className="mt-2 p-2 bg-purple-900 bg-opacity-30 border border-purple-400 rounded">
                    <div className="text-purple-400 text-xs font-semibold mb-1">ANALYSIS COMPLETE:</div>
                    <div className="text-purple-300 text-xs">
                      • 암호화된 메시지에 "DIGITAL ESCAPE" 키워드 발견<br/>
                      • Fragment Code: 781<br/>
                      • User_Orion은 탈출 코드의 일부를 보유하고 있음
                    </div>
                  </div>
                )}
              </div>

              {node.isEncrypted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDecryption(node.id);
                  }}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  {showDecrypted[node.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-400 p-3 bg-gray-900">
        <div className="text-cyan-400 text-xs text-center">
          ⚠️ WARNING: ALL COMMUNICATIONS ARE MONITORED ⚠️
        </div>
      </div>
    </div>
  );
};

export default WhisperNet;