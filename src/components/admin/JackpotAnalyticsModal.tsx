import React from 'react';

interface JackpotAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jackpot: any;
}

const JackpotAnalyticsModal: React.FC<JackpotAnalyticsModalProps> = ({ isOpen, onClose, jackpot }) => {
  if (!isOpen) return null;

  const analytics = {
    avgGrowthPerDay: 12500,
    avgTimeToWin: '14.5 days',
    totalContributed: 5678900,
    totalPaidOut: 4123000,
    winFrequency: '2.3 wins/month',
    playerEngagement: '87%',
    peakHours: '8PM - 11PM',
    topOperators: ['Casino A', 'Casino B', 'Casino C'],
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181A1D] rounded-xl p-6 max-w-3xl w-full border border-[#F4C339] max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-[#F4C339] mb-6">{jackpot.name} - Analytics</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#2B2B2B] p-4 rounded">
            <p className="text-xs text-[#EAEAEA]/60 mb-1">Avg Growth/Day</p>
            <p className="text-xl font-bold text-[#F4C339]">${analytics.avgGrowthPerDay.toLocaleString()}</p>
          </div>
          <div className="bg-[#2B2B2B] p-4 rounded">
            <p className="text-xs text-[#EAEAEA]/60 mb-1">Avg Time to Win</p>
            <p className="text-xl font-bold text-[#F4C339]">{analytics.avgTimeToWin}</p>
          </div>
          <div className="bg-[#2B2B2B] p-4 rounded">
            <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Contributed</p>
            <p className="text-xl font-bold text-green-400">${analytics.totalContributed.toLocaleString()}</p>
          </div>
          <div className="bg-[#2B2B2B] p-4 rounded">
            <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Paid Out</p>
            <p className="text-xl font-bold text-red-400">${analytics.totalPaidOut.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#2B2B2B] p-4 rounded">
            <p className="text-sm text-[#EAEAEA] mb-2">Win Frequency: <span className="text-[#F4C339] font-semibold">{analytics.winFrequency}</span></p>
            <p className="text-sm text-[#EAEAEA] mb-2">Player Engagement: <span className="text-[#F4C339] font-semibold">{analytics.playerEngagement}</span></p>
            <p className="text-sm text-[#EAEAEA]">Peak Hours: <span className="text-[#F4C339] font-semibold">{analytics.peakHours}</span></p>
          </div>
        </div>

        <button onClick={onClose} className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded">Close</button>
      </div>
    </div>
  );
};

export default JackpotAnalyticsModal;
