import React, { useState } from 'react';
import { Clock, User, MessageSquare, Send, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  author: string;
  visibility: 'internal' | 'player';
  body: string;
  timestamp: string;
}

const TicketDetail: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState<'internal' | 'player'>('internal');

  const ticket = {
    id: ticketId,
    playerId: 'P-45892',
    subject: 'Missing payout',
    status: 'In Progress',
    priority: 'High',
    slaRemaining: '2h 15m',
    created: '2025-11-11 10:23:45'
  };

  const messages: Message[] = [
    { id: '1', author: 'Support Agent', visibility: 'internal', body: 'Player claims payout not received for round #1001', timestamp: '10:25' },
    { id: '2', author: 'Support Agent', visibility: 'player', body: 'Hi John, we are investigating your payout issue. Please allow 24 hours.', timestamp: '10:30' },
  ];

  const handleSend = () => {
    console.log('Sending message:', message, visibility);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#EAEAEA]">{ticket.subject}</h2>
            <p className="text-[#888] text-sm mt-1">Ticket {ticket.id} • Player {ticket.playerId}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm">{ticket.priority}</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">{ticket.status}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#888] mb-6">
          <div className="flex items-center gap-2"><Clock size={16} /> SLA: <span className="text-[#F4C339]">{ticket.slaRemaining}</span></div>
          <div>Created: {ticket.created}</div>
        </div>

        <div className="space-y-4 mb-6">
          {messages.map(msg => (
            <div key={msg.id} className={`p-4 rounded-lg ${msg.visibility === 'internal' ? 'bg-[#111315] border-l-4 border-yellow-500' : 'bg-[#2B2B2B] border-l-4 border-blue-500'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#F4C339] font-medium">{msg.author}</span>
                <span className="text-[#888] text-xs">{msg.timestamp}</span>
              </div>
              <p className="text-[#EAEAEA] text-sm">{msg.body}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={() => setVisibility('internal')} className={`px-4 py-2 rounded-lg text-sm ${visibility === 'internal' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-[#2B2B2B] text-[#888]'}`}>
              Internal Note
            </button>
            <button onClick={() => setVisibility('player')} className={`px-4 py-2 rounded-lg text-sm ${visibility === 'player' ? 'bg-blue-500/20 text-blue-400' : 'bg-[#2B2B2B] text-[#888]'}`}>
              Player Message
            </button>
          </div>
          <div className="flex gap-2">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] resize-none" rows={3} />
            <button onClick={handleSend} className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
