import React from 'react';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

interface Props {
  operator: any;
}

const GameAnalyticsTab: React.FC<Props> = ({ operator }) => {
  const betTypes = [
    { name: 'Straight (200:1)', plays: 12450, revenue: '$24,800', profitability: 'High' },
    { name: 'Card Color Position 3', plays: 28900, revenue: '$52,100', profitability: 'Very High' },
    { name: 'Suit Match', plays: 15600, revenue: '$18,200', profitability: 'Medium' },
    { name: 'Number Range', plays: 22100, revenue: '$31,500', profitability: 'High' },
  ];

  const rtpByMarket = [
    { market: 'Europe', rtp: '96.41%', compliance: 'Pass', trend: '+0.12%' },
    { market: 'Asia Pacific', rtp: '94.28%', compliance: 'Pass', trend: '-0.08%' },
    { market: 'North America', rtp: '95.87%', compliance: 'Pass', trend: '+0.24%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
          <BarChart3 className="text-[#F4C339] mb-2" size={20} />
          <p className="text-[#EAEAEA]/60 text-xs">RTP (7 days)</p>
          <p className="text-2xl font-bold text-[#EAEAEA]">96.41%</p>
        </div>
        <div className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
          <Target className="text-[#F4C339] mb-2" size={20} />
          <p className="text-[#EAEAEA]/60 text-xs">Most Played Bet</p>
          <p className="text-sm font-semibold text-[#EAEAEA]">Straight 200:1</p>
        </div>
        <div className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
          <TrendingUp className="text-green-400 mb-2" size={20} />
          <p className="text-[#EAEAEA]/60 text-xs">Most Profitable</p>
          <p className="text-sm font-semibold text-[#EAEAEA]">Card Color P3</p>
        </div>
        <div className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
          <BarChart3 className="text-[#F4C339] mb-2" size={20} />
          <p className="text-[#EAEAEA]/60 text-xs">Total Rounds</p>
          <p className="text-2xl font-bold text-[#EAEAEA]">79K</p>
        </div>
      </div>

      <div>
        <h3 className="text-[#F4C339] font-semibold mb-3">Bet Type Performance</h3>
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-3 text-[#F4C339]">Bet Type</th>
              <th className="text-left p-3 text-[#F4C339]">Plays</th>
              <th className="text-left p-3 text-[#F4C339]">Revenue</th>
              <th className="text-left p-3 text-[#F4C339]">Profitability</th>
            </tr>
          </thead>
          <tbody>
            {betTypes.map((bet, i) => (
              <tr key={i} className="border-t border-[#2B2B2B]">
                <td className="p-3 text-[#EAEAEA]">{bet.name}</td>
                <td className="p-3 text-[#EAEAEA]">{bet.plays.toLocaleString()}</td>
                <td className="p-3 text-[#F4C339] font-semibold">{bet.revenue}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    bet.profitability === 'Very High' ? 'bg-green-500/20 text-green-400' :
                    bet.profitability === 'High' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {bet.profitability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-[#F4C339] font-semibold mb-3">RTP by Market</h3>
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-3 text-[#F4C339]">Market</th>
              <th className="text-left p-3 text-[#F4C339]">RTP</th>
              <th className="text-left p-3 text-[#F4C339]">Compliance</th>
              <th className="text-left p-3 text-[#F4C339]">Trend</th>
            </tr>
          </thead>
          <tbody>
            {rtpByMarket.map((m, i) => (
              <tr key={i} className="border-t border-[#2B2B2B]">
                <td className="p-3 text-[#EAEAEA]">{m.market}</td>
                <td className="p-3 text-[#EAEAEA] font-semibold">{m.rtp}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">{m.compliance}</span>
                </td>
                <td className={`p-3 text-sm ${m.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{m.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameAnalyticsTab;
