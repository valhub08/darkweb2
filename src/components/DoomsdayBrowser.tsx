import React, { useState } from 'react';
import { Globe, ArrowRight, AlertTriangle } from 'lucide-react';

interface DoomsdayBrowserProps {
  currentUrl: string;
  onUrlChange: (url: string) => void;
}

const DoomsdayBrowser: React.FC<DoomsdayBrowserProps> = ({ currentUrl, onUrlChange }) => {
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [showError, setShowError] = useState(false);

  const handleNavigate = () => {
    if (!inputUrl.endsWith('.onion')) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000); // App.tsx와 동일한 4000ms로 조정
      return;
    }

    onUrlChange(inputUrl);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  React.useEffect(() => {
    setInputUrl(currentUrl);
  }, [currentUrl]);

  return (
    <div className="bg-gray-900 border-b border-green-400 p-4">
      <div className="flex items-center space-x-4">
        <Globe className="text-green-400 w-6 h-6" />
        <span className="text-green-400 font-semibold">DoomsdayBrowser v2.3.1</span>
        
        <div className="flex-1 flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-black border border-green-400 text-green-400 px-3 py-2 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter .onion address..."
            />
            {showError && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 border border-red-400 text-red-400 p-6 rounded-lg z-50 font-mono text-center">
                <div className="text-2xl font-bold mb-4">⚠️ WARNING ⚠️</div>
                <div className="text-lg mb-2">YOUR ANONYMITY IS COMPROMISED</div>
                <div className="text-sm">TRACKERS DETECTED YOUR LOCATION</div>
                <div className="text-xs mt-4 text-red-300">.onion 주소만 입력하세요!</div>
              </div>
            )}
          </div>
          <button
            onClick={handleNavigate}
            className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-300 transition-colors flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>GO</span>
          </button>
        </div>
        
        <div className="text-green-400 text-sm">
          STATUS: <span className="text-yellow-400">MONITORED</span>
        </div>
      </div>
    </div>
  );
};

export default DoomsdayBrowser;