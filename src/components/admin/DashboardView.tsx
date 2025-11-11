import React from 'react';

const DashboardView: React.FC = () => {
  const stats = [
    { label: 'Active Operators', value: '24', change: '+3', icon: '♠' },
    { label: 'Total Markets', value: '67', change: '+8', icon: '♣' },
    { label: 'Global Jackpot Pool', value: '$2.4M', change: '+$45K', icon: '♥' },
    { label: 'Daily Active Users', value: '156K', change: '+12%', icon: '♦' },
  ];

  const recentActivity = [
    { action: 'Operator Created', details: 'Casino Royale EU', time: '5 min ago', user: 'Admin' },
    { action: 'Jackpot Won', details: '$125,000 - Global Network', time: '12 min ago', user: 'System' },
    { action: 'Config Updated', details: 'RTP adjusted to 96.5%', time: '1 hour ago', user: 'Admin' },
    { action: 'Market Added', details: 'Brazil - BRL', time: '2 hours ago', user: 'Admin' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl text-[#F4C339]">{stat.icon}</span>
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-[#EAEAEA] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{stat.value}</p>
            <p className="text-sm text-[#EAEAEA]/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
        <h2 className="text-xl font-bold text-[#EAEAEA] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-[#111315] rounded-lg">
              <div>
                <p className="text-sm font-semibold text-[#EAEAEA]">{item.action}</p>
                <p className="text-xs text-[#EAEAEA]/60">{item.details}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#F4C339]">{item.time}</p>
                <p className="text-xs text-[#EAEAEA]/60">{item.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
