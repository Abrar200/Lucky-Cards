import React, { useState } from 'react';
import { Inbox, AlertCircle, Clock, CheckCircle, Flag } from 'lucide-react';

interface Ticket {
  id: string;
  playerId: string;
  subject: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: string;
  created: string;
  operator: string;
}

const SupportInbox: React.FC = () => {
  const [queue, setQueue] = useState('all');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const tickets: Ticket[] = [
    { id: 'T-1001', playerId: 'P-45892', subject: 'Missing payout', category: 'Payment', severity: 'high', status: 'New', created: '2025-11-11 10:23', operator: 'Casino Royale' },
    { id: 'T-1002', playerId: 'P-67234', subject: 'Disputed outcome', category: 'Game', severity: 'medium', status: 'Awaiting Player', created: '2025-11-11 09:15', operator: 'Lucky Vegas' },
    { id: 'T-1003', playerId: 'P-89012', subject: 'Account locked', category: 'Account', severity: 'critical', status: 'Escalated', created: '2025-11-11 08:45', operator: 'Mega Casino' },
  ];

  const severityColors = {
    low: 'bg-blue-500/20 text-blue-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    high: 'bg-orange-500/20 text-orange-400',
    critical: 'bg-red-500/20 text-red-400'
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['all', 'new', 'awaiting-player', 'escalated', 'fraud'].map(q => (
          <button key={q} onClick={() => setQueue(q)} className={`px-4 py-2 rounded-lg text-sm font-medium ${queue === q ? 'bg-[#F4C339] text-black' : 'bg-[#2B2B2B] text-[#EAEAEA]'}`}>
            {q.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">ID</th>
              <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Player</th>
              <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Subject</th>
              <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Severity</th>
              <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-t border-[#2B2B2B] hover:bg-[#111315] cursor-pointer">
                <td className="p-4 text-[#EAEAEA] font-mono text-sm">{ticket.id}</td>
                <td className="p-4 text-[#EAEAEA]">{ticket.playerId}</td>
                <td className="p-4 text-[#EAEAEA]">{ticket.subject}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-medium ${severityColors[ticket.severity]}`}>{ticket.severity}</span></td>
                <td className="p-4 text-[#EAEAEA]">{ticket.status}</td>
                <td className="p-4 text-[#888]">{ticket.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportInbox;
