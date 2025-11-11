import React from 'react';
import { Activity, Smartphone, Monitor, MapPin, LogOut, Gift, MessageSquare } from 'lucide-react';

interface Props {
  operator: any;
}

const SessionsTab: React.FC<Props> = ({ operator }) => {
  const sessions = [
    { id: 'SES-8821', playerId: 'PLY-1003', currentBet: '$50', streak: '+5 wins', location: 'London, UK', device: 'Mobile', duration: '24 min', status: 'Active' },
    { id: 'SES-8822', playerId: 'PLY-1001', currentBet: '$25', streak: '-2 losses', location: 'Berlin, DE', device: 'Desktop', duration: '18 min', status: 'Active' },
    { id: 'SES-8823', playerId: 'PLY-1005', currentBet: '$100', streak: '+8 wins', location: 'Paris, FR', device: 'Mobile', duration: '42 min', status: 'Active' },
    { id: 'SES-8824', playerId: 'PLY-1002', currentBet: '$10', streak: 'Even', location: 'Madrid, ES', device: 'Tablet', duration: '12 min', status: 'Active' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B] flex items-center gap-4">
        <Activity className="text-[#F4C339]" size={24} />
        <div>
          <p className="text-[#EAEAEA] font-semibold">Live Sessions</p>
          <p className="text-[#EAEAEA]/60 text-sm">Real-time monitoring of active players</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-[#F4C339]">{sessions.length}</p>
          <p className="text-[#EAEAEA]/60 text-xs">Active Now</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-3 text-[#F4C339]">Session ID</th>
              <th className="text-left p-3 text-[#F4C339]">Player ID</th>
              <th className="text-left p-3 text-[#F4C339]">Current Bet</th>
              <th className="text-left p-3 text-[#F4C339]">Streak</th>
              <th className="text-left p-3 text-[#F4C339]">Location</th>
              <th className="text-left p-3 text-[#F4C339]">Device</th>
              <th className="text-left p-3 text-[#F4C339]">Duration</th>
              <th className="text-left p-3 text-[#F4C339]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, i) => (
              <tr key={i} className="border-t border-[#2B2B2B] hover:bg-[#111315]/50">
                <td className="p-3 text-[#EAEAEA] font-mono text-sm">{session.id}</td>
                <td className="p-3 text-[#F4C339] font-medium">{session.playerId}</td>
                <td className="p-3 text-[#EAEAEA] font-semibold">{session.currentBet}</td>
                <td className="p-3">
                  <span className={`text-sm ${session.streak.includes('+') ? 'text-green-400' : session.streak.includes('-') ? 'text-red-400' : 'text-gray-400'}`}>
                    {session.streak}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1 text-[#EAEAEA] text-sm">
                    <MapPin size={14} className="text-[#F4C339]" />
                    {session.location}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1 text-[#EAEAEA] text-sm">
                    {session.device === 'Mobile' ? <Smartphone size={14} /> : <Monitor size={14} />}
                    {session.device}
                  </div>
                </td>
                <td className="p-3 text-[#EAEAEA] text-sm">{session.duration}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-red-500/20 rounded" title="Force Logout">
                      <LogOut className="text-red-400" size={14} />
                    </button>
                    <button className="p-1 hover:bg-green-500/20 rounded" title="Send Bonus">
                      <Gift className="text-green-400" size={14} />
                    </button>
                    <button className="p-1 hover:bg-blue-500/20 rounded" title="Chat">
                      <MessageSquare className="text-blue-400" size={14} />
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

export default SessionsTab;
