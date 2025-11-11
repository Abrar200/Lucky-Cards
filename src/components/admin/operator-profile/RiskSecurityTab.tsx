import React from 'react';
import { Shield, AlertTriangle, Ban, Lock } from 'lucide-react';

interface Props {
  operator: any;
}

const RiskSecurityTab: React.FC<Props> = ({ operator }) => {
  const securitySettings = [
    { setting: 'Max Accounts Per IP', value: '3', status: 'Active' },
    { setting: 'Velocity Bet Limit', value: '12 bets/sec', status: 'Active' },
    { setting: 'Country Blocks', value: 'CN, BR', status: 'Active' },
    { setting: 'Suspicious Activity Flags', value: '14 players', status: 'Warning' },
  ];

  const flaggedPlayers = [
    { id: 'PLY-2041', reason: 'Multiple accounts detected', severity: 'High', date: 'Nov 10' },
    { id: 'PLY-1889', reason: 'Unusual betting pattern', severity: 'Medium', date: 'Nov 9' },
    { id: 'PLY-3201', reason: 'Rapid deposit/withdrawal', severity: 'High', date: 'Nov 8' },
    { id: 'PLY-1456', reason: 'VPN usage detected', severity: 'Low', date: 'Nov 7' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {securitySettings.map((setting, i) => (
          <div key={i} className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
            <div className="flex items-start justify-between mb-2">
              <Shield className="text-[#F4C339]" size={20} />
              <span className={`px-2 py-1 rounded text-xs ${setting.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {setting.status}
              </span>
            </div>
            <p className="text-[#EAEAEA]/60 text-sm">{setting.setting}</p>
            <p className="text-lg font-bold text-[#EAEAEA] mt-1">{setting.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-[#F4C339] font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle size={18} />
          Flagged Players
        </h3>
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-3 text-[#F4C339]">Player ID</th>
              <th className="text-left p-3 text-[#F4C339]">Reason</th>
              <th className="text-left p-3 text-[#F4C339]">Severity</th>
              <th className="text-left p-3 text-[#F4C339]">Date</th>
              <th className="text-left p-3 text-[#F4C339]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flaggedPlayers.map((player, i) => (
              <tr key={i} className="border-t border-[#2B2B2B] hover:bg-[#111315]/50">
                <td className="p-3 text-[#EAEAEA] font-mono">{player.id}</td>
                <td className="p-3 text-[#EAEAEA]">{player.reason}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    player.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                    player.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {player.severity}
                  </span>
                </td>
                <td className="p-3 text-[#EAEAEA] text-sm">{player.date}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-red-500/20 rounded" title="Ban Player">
                      <Ban className="text-red-400" size={16} />
                    </button>
                    <button className="p-1 hover:bg-yellow-500/20 rounded" title="Freeze Account">
                      <Lock className="text-yellow-400" size={16} />
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

export default RiskSecurityTab;
