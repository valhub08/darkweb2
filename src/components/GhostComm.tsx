import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Eye, EyeOff } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: number;
  isEncrypted?: boolean;
  decrypted?: string;
}

interface GhostCommProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const GhostComm: React.FC<GhostCommProps> = ({ messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showDecrypted, setShowDecrypted] = useState<{[key: number]: boolean}>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleDecryption = (messageId: number) => {
    setShowDecrypted(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-black bg-opacity-80 border border-green-400 rounded-lg h-80 flex flex-col">
      {/* Header */}
      <div className="border-b border-green-400 p-3 flex items-center space-x-2">
        <Terminal className="w-5 h-5 text-green-400" />
        <span className="text-green-400 font-semibold">고스트 통신</span>
        <span className="text-xs text-green-300">ENCRYPTED</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <span className={`font-semibold ${
                message.sender === 'X' ? 'text-red-400' : 'text-blue-400'
              }`}>
                {message.sender}
              </span>
              <span className="text-gray-400">{formatTime(message.timestamp)}</span>
              {message.isEncrypted && (
                <button
                  onClick={() => toggleDecryption(message.id)}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  title="암호 해독"
                >
                  {showDecrypted[message.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              )}
            </div>
            <div className="text-green-300 text-sm font-mono leading-relaxed">
              {message.isEncrypted && showDecrypted[message.id] ? 
                message.decrypted : message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-green-400 p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-black border border-green-400 text-green-300 px-2 py-1 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-green-400"
            placeholder="메시지 입력..."
          />
          <button
            onClick={handleSend}
            className="bg-green-400 text-black px-3 py-1 rounded hover:bg-green-300 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GhostComm;