import React from 'react';
import { Globe, Settings, Power } from 'lucide-react';

interface Props {
  operator: any;
}

const MarketsTab: React.FC<Props> = ({ operator }) => {
  const markets = [
    { name: 'Europe', countries: 12, currency: 'EUR', minBet: '€1', maxBet: '€500', rtpFloor: '96%', status: 'Active' },
    { name: 'Asia Pacific', countries: 15, currency: 'CNY', minBet: '¥5', maxBet: '¥2000', rtpFloor: '94%', status: 'Active' },
    { name: 'North America', countries: 3, currency: 'USD', minBet: '$2', maxBet: '$1000', rtpFloor: '95%', status: 'Active' },
    { name: 'Latin America', countries: 8, currency: 'USD', minBet: '$1', maxBet: '$300', rtpFloor: '94%', status: 'Pending' },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-3 text-[#F4C339]">Market</th>
              <th className="text-left p-3 text-[#F4C339]">Countries</th>
              <th className="text-left p-3 text-[#F4C339]">Currency</th>
              <th className="text-left p-3 text-[#F4C339]">Min Bet</th>
              <th className="text-left p-3 text-[#F4C339]">Max Bet</th>
              <th className="text-left p-3 text-[#F4C339]">RTP Floor</th>
              <th className="text-left p-3 text-[#F4C339]">Status</th>
              <th className="text-left p-3 text-[#F4C339]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market, i) => (
              <tr key={i} className="border-t border-[#2B2B2B] hover:bg-[#111315]/50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="text-[#F4C339]" size={16} />
                    <span className="text-[#EAEAEA] font-medium">{market.name}</span>
                  </div>
                </td>
                <td className="p-3 text-[#EAEAEA]">{market.countries}</td>
                <td className="p-3 text-[#EAEAEA]">{market.currency}</td>
                <td className="p-3 text-[#EAEAEA]">{market.minBet}</td>
                <td className="p-3 text-[#EAEAEA]">{market.maxBet}</td>
                <td className="p-3 text-[#EAEAEA]">{market.rtpFloor}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${market.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {market.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-[#F4C339]/20 rounded">
                      <Settings className="text-[#F4C339]" size={16} />
                    </button>
                    <button className="p-1 hover:bg-red-500/20 rounded">
                      <Power className="text-red-400" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketsTab;
