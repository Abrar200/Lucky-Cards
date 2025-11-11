import React, { useState } from 'react';
import { Users, Filter, TrendingUp, AlertTriangle } from 'lucide-react';

interface Props {
  operator: any;
}

const PlayersTab: React.FC<Props> = ({ operator }) => {
  const [filter, setFilter] = useState('all');

  const players = [
    { id: 'PLY-1001', country: 'UK', balance: '$2,450', lastActive: '2 min ago', lifetimeBets: '$125,000', vipTier: 'Platinum', status: 'Active', risk: 'low' },
    { id: 'PLY-1002', country: 'DE', balance: '$890', lastActive: '15 min ago', lifetimeBets: '$45,200', vipTier: 'Gold', status: 'Active', risk: 'low' },
    { id: 'PLY-1003', country: 'FR', balance: '$15,230', lastActive: '1 min ago', lifetimeBets: '$580,000', vipTier: 'Diamond', status: 'Active', risk: 'medium' },
    { id: 'PLY-1004', country: 'ES', balance: '$120', lastActive: '3 days ago', lifetimeBets: '$8,500', vipTier: 'Silver', status: 'Dormant', risk: 'low' },
    { id: 'PLY-1005', country: 'IT', balance: '$4,200', lastActive: '5 min ago', lifetimeBets: '$220,000', vipTier: 'Platinum', status: 'Active', risk: 'high' },
  ];

  const filters = ['all', 'high-rollers', 'new-users', 'dormant', 'whales', 'flagged'];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded text-sm transition-colors ${filter === f ? 'bg-[#F4C339] text-black font-medium' : 'bg-[#111315] text-[#EAEAEA] hover:bg-[#2B2B2B]'}`}>
            {f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-3 text-[#F4C339]">Player ID</th>
              <th className="text-left p-3 text-[#F4C339]">Country</th>
              <th className="text-left p-3 text-[#F4C339]">Balance</th>
              <th className="text-left p-3 text-[#F4C339]">Last Active</th>
              <th className="text-left p-3 text-[#F4C339]">Lifetime Bets</th>
              <th className="text-left p-3 text-[#F4C339]">VIP Tier</th>
              <th className="text-left p-3 text-[#F4C339]">Status</th>
              <th className="text-left p-3 text-[#F4C339]">Risk</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr key={i} className="border-t border-[#2B2B2B] hover:bg-[#111315]/50">
                <td className="p-3 text-[#EAEAEA] font-mono">{player.id}</td>
                <td className="p-3 text-[#EAEAEA]">{player.country}</td>
                <td className="p-3 text-[#F4C339] font-semibold">{player.balance}</td>
                <td className="p-3 text-[#EAEAEA] text-sm">{player.lastActive}</td>
                <td className="p-3 text-[#EAEAEA]">{player.lifetimeBets}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    player.vipTier === 'Diamond' ? 'bg-cyan-500/20 text-cyan-400' :
                    player.vipTier === 'Platinum' ? 'bg-purple-500/20 text-purple-400' :
                    player.vipTier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {player.vipTier}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${player.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {player.status}
                  </span>
                </td>
                <td className="p-3">
                  {player.risk === 'high' && <AlertTriangle className="text-red-400" size={16} />}
                  {player.risk === 'medium' && <AlertTriangle className="text-yellow-400" size={16} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersTab;
