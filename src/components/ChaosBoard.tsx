import React, { useState } from 'react';
import { MessageSquare, Eye, EyeOff, Send, Lock, Unlock } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: number;
  isEncrypted: boolean;
  decrypted?: string;
  isHidden?: boolean;
  missionKey?: string;
}

interface ChaosBoardProps {
  gameState: any;
  onMissionProgress: (data: any) => void;
}

const ChaosBoard: React.FC<ChaosBoardProps> = ({ gameState, onMissionProgress }) => {
  const [posts] = useState<Post[]>([
    {
      id: 1,
      author: 'Anonymous_7743',
      title: '새로운 추적 방법 발견됨',
      content: '01001000 01100101 01101100 01110000 00100000 01101101 01100101',
      timestamp: Date.now() - 3600000,
      isEncrypted: true,
      decrypted: 'Help me'
    },
    {
      id: 2,
      author: 'DeepVoid_User',
      title: 'URGENT: 시스템 침입 감지',
      content: 'VGhleSBhcmUgY29taW5nLiBUaGUgdHJhY2tlcnMgaGF2ZSBmb3VuZCBhIG5ldyB3YXkgdG8gdHJhY2sgdXMuIEZpbmQgdGhlIGFub255bWl0eSB0b29sIGF0IGNyeXB0b21hcnQub25pb24=',
      timestamp: Date.now() - 7200000,
      isEncrypted: true,
      decrypted: 'They are coming. The trackers have found a new way to track us. Find the anonymity tool at cryptomart.onion',
      missionKey: 'mission1_key'
    },
    {
      id: 3,
      author: 'GhostInShell',
      title: '암호화 프로토콜 업데이트',
      content: '새로운 암호화 방식이 필요합니다. 기존 방법으로는 더 이상 안전하지 않습니다.',
      timestamp: Date.now() - 10800000,
      isEncrypted: false
    },
    {
      id: 4,
      author: 'User_Orion',
      title: '연결 테스트',
      content: '01001001 01100110 00100000 01111001 01101111 01110101 00100000 01100011 01100001 01101110 00100000 01110010 01100101 01100001 01100100 00100000 01110100 01101000 01101001 01110011 00101100 00100000 01110011 01100101 01101110 01100100 00100000 01101101 01100101 00100000 01100001 00100000 01101101 01100101 01110011 01110011 01100001 01100111 01100101',
      timestamp: Date.now() - 14400000,
      isEncrypted: true,
      decrypted: 'If you can read this, send me a message',
      isHidden: true
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDecrypted, setShowDecrypted] = useState<{[key: number]: boolean}>({});
  const [newPost, setNewPost] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [decryptInput, setDecryptInput] = useState('');
  const [showDecryptForm, setShowDecryptForm] = useState<number | null>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleDecryption = (postId: number) => {
    setShowDecrypted(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleDecryptAttempt = (post: Post) => {
    console.log('Decrypt Attempt for Post ID:', post.id, 'Input:', decryptInput); // 디버깅 로그 추가
    if (post.missionKey === 'mission1_key') {
      // Check if user input matches expected decryption
      const expectedAnswers = ['cryptomart.onion', 'anonymity tool', 'trackers'];
      const userInput = decryptInput.toLowerCase();
      
      if (expectedAnswers.some(answer => userInput.includes(answer))) {
        console.log('Decrypt Success for Mission 1'); // 성공 로그
        onMissionProgress({ type: 'decrypt_success', mission: 'mission1' });
        setShowDecryptForm(null);
        setDecryptInput('');
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-900 border border-green-400 text-green-400 p-4 rounded-lg z-50';
        successMsg.textContent = 'DECRYPTION SUCCESSFUL: MESSAGE DECODED';
        document.body.appendChild(successMsg);
        setTimeout(() => document.body.removeChild(successMsg), 3000);
      } else {
        // Show failure message
        const failMsg = document.createElement('div');
        failMsg.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 border border-red-400 text-red-400 p-4 rounded-lg z-50';
        failMsg.textContent = 'CONNECTION UNSTABLE: RECALIBRATING...';
        document.body.appendChild(failMsg);
        setTimeout(() => document.body.removeChild(failMsg), 3000);
      }
    }
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      // Simulate posting (in real implementation, this would add to posts array)
      setNewPost('');
      setShowNewPostForm(false);
      
      // Show posting effect
      const postEffect = document.createElement('div');
      postEffect.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 border border-blue-400 text-blue-400 p-4 rounded-lg z-50';
      postEffect.textContent = 'MESSAGE POSTED TO CHAOS BOARD';
      document.body.appendChild(postEffect);
      setTimeout(() => document.body.removeChild(postEffect), 2000);
    }
  };

  const visiblePosts = posts.filter(post => 
    !post.isHidden || gameState.currentMissionStep >= 2
  );

  return (
    <div className="bg-black bg-opacity-80 border border-green-400 rounded-lg h-full">
      {/* Header */}
      <div className="border-b border-green-400 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-green-400" />
          <h1 className="text-xl font-bold text-green-400">카오스 보드</h1>
          <span className="text-xs text-green-300">ENCRYPTED FORUM</span>
        </div>
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="bg-green-400 text-black px-3 py-1 rounded text-sm hover:bg-green-300 transition-colors"
        >
          글 작성
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="border-b border-green-400 p-4 bg-gray-900">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full bg-black border border-green-400 text-green-300 p-2 rounded text-sm font-mono resize-none"
            rows={3}
            placeholder="메시지를 입력하세요..."
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setShowNewPostForm(false)}
              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-500 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleNewPost}
              className="bg-green-400 text-black px-3 py-1 rounded text-sm hover:bg-green-300 transition-colors flex items-center space-x-1"
            >
              <Send className="w-3 h-3" />
              <span>전송</span>
            </button>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto">
        {visiblePosts.map((post) => (
          <div key={post.id} className="border-b border-gray-700 p-4 hover:bg-gray-900 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 font-semibold text-sm">{post.author}</span>
                <span className="text-gray-400 text-xs">{formatTime(post.timestamp)}</span>
                {post.isEncrypted && (
                  <div className="flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs">ENCRYPTED</span>
                  </div>
                )}
              </div>
              {post.isEncrypted && (
                <div className="flex items-center space-x-2">
                  {post.missionKey && (
                    <button
                      onClick={() => setShowDecryptForm(showDecryptForm === post.id ? null : post.id)}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors text-xs"
                    >
                      <Unlock className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => toggleDecryption(post.id)}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {showDecrypted[post.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>
            
            <h3 className="text-green-300 font-semibold mb-2">{post.title}</h3>
            
            <div className="text-green-300 text-sm font-mono leading-relaxed">
              {post.isEncrypted && showDecrypted[post.id] ? 
                post.decrypted : post.content}
            </div>

            {/* Decrypt Form */}
            {showDecryptForm === post.id && (
              <div className="mt-3 p-3 bg-gray-800 border border-yellow-400 rounded">
                <div className="text-yellow-400 text-xs mb-2">암호 해독 시도:</div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={decryptInput}
                    onChange={(e) => setDecryptInput(e.target.value)}
                    className="flex-1 bg-black border border-yellow-400 text-yellow-300 px-2 py-1 rounded text-sm font-mono"
                    placeholder="해독된 내용을 입력하세요..."
                  />
                  <button
                    onClick={() => handleDecryptAttempt(post)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded text-sm hover:bg-yellow-300 transition-colors"
                  >
                    해독
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChaosBoard;