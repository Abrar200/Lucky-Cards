import React, { useState } from 'react';

const AuditView: React.FC = () => {
  const [filterUser, setFilterUser] = useState('all');
  const [logs] = useState([
    { timestamp: '2025-11-11 11:05:23', user: 'admin@luckcards.com', action: 'Operator Created', details: 'Casino Royale EU', ip: '192.168.1.100' },
    { timestamp: '2025-11-11 10:45:12', user: 'finance@luckcards.com', action: 'Report Exported', details: 'GGR Report - October 2025', ip: '192.168.1.105' },
    { timestamp: '2025-11-11 10:30:45', user: 'admin@luckcards.com', action: 'Jackpot Config Updated', details: 'Mega Fortune - Contribution 2.5% → 3.0%', ip: '192.168.1.100' },
    { timestamp: '2025-11-11 09:15:33', user: 'support@luckcards.com', action: 'Player Adjustment', details: 'Player #12345 - $50 bonus credit', ip: '192.168.1.110' },
    { timestamp: '2025-11-11 08:20:18', user: 'admin@luckcards.com', action: 'Market Added', details: 'Brazil - BRL', ip: '192.168.1.100' },
  ]);

  const filteredLogs = filterUser === 'all' ? logs : logs.filter(log => log.user === filterUser);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Audit Logs</h2>
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="px-4 py-2 bg-[#181A1D] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none"
        >
          <option value="all">All Users</option>
          <option value="admin@luckcards.com">Admin</option>
          <option value="finance@luckcards.com">Finance</option>
          <option value="support@luckcards.com">Support</option>
        </select>
      </div>

      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Timestamp</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">User</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Action</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Details</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, idx) => (
              <tr key={idx} className="border-t border-[#2B2B2B] hover:bg-[#111315] transition-colors">
                <td className="p-4 text-[#EAEAEA] font-mono text-xs">{log.timestamp}</td>
                <td className="p-4 text-[#EAEAEA] text-sm">{log.user}</td>
                <td className="p-4 text-[#F4C339] font-semibold text-sm">{log.action}</td>
                <td className="p-4 text-[#EAEAEA] text-sm">{log.details}</td>
                <td className="p-4 text-[#EAEAEA]/60 font-mono text-xs">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditView;
