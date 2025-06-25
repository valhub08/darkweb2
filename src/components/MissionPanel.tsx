import React from 'react';
import { Target, Clock } from 'lucide-react';

interface MissionPanelProps {
  mission: string;
}

const MissionPanel: React.FC<MissionPanelProps> = ({ mission }) => {
  return (
    <div className="bg-black bg-opacity-80 border border-yellow-400 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Target className="w-5 h-5 text-yellow-400" />
        <span className="text-yellow-400 font-semibold">현재 미션</span>
      </div>
      
      <div className="space-y-2">
        <div className="text-green-300 text-sm font-mono">
          {mission}
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>진행 중...</span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-red-400">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span>추적 상태: 활성</span>
        </div>
      </div>
    </div>
  );
};

export default MissionPanel;