import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Users, Activity } from 'lucide-react';

interface StreamViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: {
    id: string;
    name: string;
    dealer: string;
    currentPlayers: number;
  };
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
}

const StreamViewModal: React.FC<StreamViewModalProps> = ({ isOpen, onClose, table }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Player_Mike', message: 'Good luck everyone!', time: '14:32' },
    { id: '2', user: 'VIP_Sarah', message: 'Dealer is great today', time: '14:33' },
    { id: '3', user: 'Lucky_Tom', message: 'Big win incoming!', time: '14:35' },
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: 'Admin',
        message: chatMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-[#0D0D0D] border-[#D9A441]/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">{table.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-2 space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden border-2 border-[#D9A441]/20">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/685afce20bfda24fc0f1d36c_1762876536316_0b60ac4f.png" 
                alt="Live Stream"
                className="w-full h-auto"
              />
              <div className="absolute top-4 left-4 bg-[#BC2036] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <Activity size={16} className="animate-pulse" />
                LIVE
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-[#111111] p-4 rounded-lg border border-[#D9A441]/30">
                <div className="text-[#E4C98F] text-xs mb-1">Dealer</div>
                <div className="font-bold text-white">{table.dealer}</div>
              </div>
              <div className="bg-[#111111] p-4 rounded-lg border border-[#D9A441]/30">
                <div className="text-[#E4C98F] text-xs mb-1">Table ID</div>
                <div className="font-bold text-white">{table.id}</div>
              </div>
              <div className="bg-[#111111] p-4 rounded-lg border border-[#D9A441]/30">
                <div className="text-[#E4C98F] text-xs mb-1 flex items-center gap-1">
                  <Users size={14} />
                  Players
                </div>
                <div className="font-bold text-[#D9A441] text-xl">{table.currentPlayers}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col border-l border-[#D9A441]/20 pl-4">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <Users size={18} className="text-[#D9A441]" />
              Live Chat
            </h3>
            
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-[#111111] rounded-lg p-3 border border-[#D9A441]/10">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-[#D9A441]">{msg.user}</span>
                      <span className="text-xs text-[#E4C98F]">{msg.time}</span>
                    </div>
                    <p className="text-sm text-white">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-[#111111] border-[#D9A441]/30 text-white placeholder:text-gray-500"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-[#D9A441] hover:bg-[#E4C98F] text-[#0D0D0D] font-semibold"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StreamViewModal;

