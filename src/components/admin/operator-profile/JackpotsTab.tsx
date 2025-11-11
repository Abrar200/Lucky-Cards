import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

interface Props {
  operator: any;
}

const JackpotsTab: React.FC<Props> = ({ operator }) => {
  const jackpots = [
    { name: 'Mega Fortune', type: 'Global', contributionRate: '2.5%', wins: 5, lastWin: 'Oct 25', pool: 485230, status: 'Active' },
    { name: 'Royal Ace Drop', type: 'Local', contributionRate: '1.2%', wins: 2, lastWin: 'Nov 1', pool: 127450, status: 'Active' },
    { name: 'Lucky Strike', type: 'Regional', contributionRate: '1.8%', wins: 8, lastWin: 'Nov 8', pool: 234890, status: 'Active' },
    { name: 'Diamond Rush', type: 'Global', contributionRate: '3.0%', wins: 3, lastWin: 'Oct 18', pool: 678920, status: 'Active' },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-3 text-[#F4C339]">Jackpot Name</th>
              <th className="text-left p-3 text-[#F4C339]">Type</th>
              <th className="text-left p-3 text-[#F4C339]">Pool Contribution</th>
              <th className="text-left p-3 text-[#F4C339]">Current Pool</th>
              <th className="text-left p-3 text-[#F4C339]">Wins</th>
              <th className="text-left p-3 text-[#F4C339]">Last Win</th>
              <th className="text-left p-3 text-[#F4C339]">Status</th>
            </tr>
          </thead>
          <tbody>
            {jackpots.map((jackpot, i) => (
              <tr key={i} className="border-t border-[#2B2B2B] hover:bg-[#111315]/50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-[#F4C339]" size={16} />
                    <span className="text-[#EAEAEA] font-medium">{jackpot.name}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    jackpot.type === 'Global' ? 'bg-purple-500/20 text-purple-400' :
                    jackpot.type === 'Regional' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {jackpot.type}
                  </span>
                </td>
                <td className="p-3 text-[#EAEAEA]">{jackpot.contributionRate}</td>
                <td className="p-3 text-[#F4C339] font-semibold">${jackpot.pool.toLocaleString()}</td>
                <td className="p-3 text-[#EAEAEA]">{jackpot.wins}</td>
                <td className="p-3 text-[#EAEAEA]">{jackpot.lastWin}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1 w-fit">
                    <TrendingUp size={12} />
                    {jackpot.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JackpotsTab;
