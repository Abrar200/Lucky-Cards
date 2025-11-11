import React, { useState } from 'react';

const PlayersView: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [playerData, setPlayerData] = useState<any>(null);

  const handleSearch = () => {
    setPlayerData({
      id: 'PLR-12345',
      operator: 'Casino Royale EU',
      totalBets: 245,
      totalWagered: '$12,450',
      totalWon: '$9,870',
      activeStreaks: 2,
      jackpotContributions: '$124.50',
      lastSession: '2025-11-11 10:30',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Player Sessions</h2>

      <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Player ID (hashed)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </div>
      </div>

      {playerData && (
        <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
          <h3 className="text-xl font-bold text-[#EAEAEA] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Player Details</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Player ID</p>
              <p className="text-sm font-bold text-[#F4C339]">{playerData.id}</p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Operator</p>
              <p className="text-sm font-bold text-[#EAEAEA]">{playerData.operator}</p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Bets</p>
              <p className="text-sm font-bold text-[#EAEAEA]">{playerData.totalBets}</p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Last Session</p>
              <p className="text-sm font-bold text-[#EAEAEA]">{playerData.lastSession}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Wagered</p>
              <p className="text-lg font-bold text-[#EAEAEA]">{playerData.totalWagered}</p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Won</p>
              <p className="text-lg font-bold text-[#EAEAEA]">{playerData.totalWon}</p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Active Streaks</p>
              <p className="text-lg font-bold text-[#F4C339]">{playerData.activeStreaks}</p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Jackpot Contributions</p>
              <p className="text-lg font-bold text-[#F4C339]">{playerData.jackpotContributions}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all font-medium">
              View Bet History
            </button>
            <button className="px-6 py-3 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all font-medium">
              Issue Adjustment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayersView;
