import React from 'react';

const EnhancedDashboard: React.FC = () => {
  const stats = [
    { label: 'Active Players', value: '156,432', change: '+12.3%', trend: 'up' },
    { label: 'Bets / Minute', value: '8,945', change: '+5.2%', trend: 'up' },
    { label: 'GGR Today', value: '$342K', change: '+18.7%', trend: 'up' },
    { label: 'Global Jackpot', value: '$2.4M', change: '+$45K', trend: 'up' },
  ];

  const operators = [
    { name: 'Casino Royale EU', players: 45231, ggr: '$125K', status: 'online', latency: '12ms' },
    { name: 'Lucky Vegas Global', players: 38920, ggr: '$98K', status: 'online', latency: '18ms' },
    { name: 'Golden Dragon Asia', players: 52104, ggr: '$156K', status: 'online', latency: '45ms' },
    { name: 'Royal Flush UK', players: 20177, ggr: '$67K', status: 'warning', latency: '89ms' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
            <p className="text-sm text-[#EAEAEA]/60 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-[#EAEAEA] mb-2">{stat.value}</p>
            <p className="text-xs text-green-400 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
        <h3 className="text-xl font-bold text-[#EAEAEA] mb-4">Live Operator Performance</h3>
        <div className="space-y-3 overflow-x-auto">
          {operators.map((op, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-[#111315] rounded-lg gap-3 min-w-[280px]">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${op.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse flex-shrink-0`}></div>
                <div>
                  <p className="text-sm font-semibold text-[#EAEAEA]">{op.name}</p>
                  <p className="text-xs text-[#EAEAEA]/60">{op.players.toLocaleString()} players</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 ml-7 sm:ml-0">
                <div className="text-left sm:text-right">
                  <p className="text-xs text-[#EAEAEA]/60">GGR Today</p>
                  <p className="text-sm font-semibold text-[#F4C339]">{op.ggr}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-[#EAEAEA]/60">Latency</p>
                  <p className={`text-sm font-semibold ${op.status === 'online' ? 'text-green-400' : 'text-yellow-400'}`}>{op.latency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default EnhancedDashboard;
