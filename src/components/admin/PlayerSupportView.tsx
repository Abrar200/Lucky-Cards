import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SupportInbox from './support/SupportInbox';
import PlayerLookup from './support/PlayerLookup';
import RoundReplayPanel from './support/RoundReplayPanel';
import TicketDetail from './support/TicketDetail';
import IncidentHub from './support/IncidentHub';



const PlayerSupportView: React.FC = () => {
  const [selectedRound, setSelectedRound] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const mockRound = {
    id: '1001',
    playerId: 'P-45892',
    timestamp: '2025-11-11 10:23:45',
    bet: 100,
    payout: 450,
    currency: 'GBP',
    cards: ['A♠', 'K♠', 'Q♠'],
    result: 'Flush',
    serverSeedHash: 'a3f5e8d9c2b1a0f8e7d6c5b4a3f2e1d0',
    clientSeed: 'player-seed-12345',
    nonce: 42
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Player Support & Round Replay
        </h2>
        <p className="text-[#888] mt-2">Resolve player issues with full auditability and round reconstruction</p>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="bg-[#181A1D] border border-[#2B2B2B]">
          <TabsTrigger value="inbox">Support Inbox</TabsTrigger>
          <TabsTrigger value="lookup">Player Lookup</TabsTrigger>
          <TabsTrigger value="rounds">Round Replay</TabsTrigger>
          <TabsTrigger value="ticket">Ticket Detail</TabsTrigger>
          <TabsTrigger value="incidents">Incident Hub</TabsTrigger>
        </TabsList>


        <TabsContent value="inbox" className="mt-6">
          <SupportInbox />
        </TabsContent>

        <TabsContent value="lookup" className="mt-6">
          <PlayerLookup />
        </TabsContent>

        <TabsContent value="rounds" className="mt-6">
          <div className="space-y-6">
            <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#111315]">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Round ID</th>
                    <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Player ID</th>
                    <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Timestamp</th>
                    <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Bet</th>
                    <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Payout</th>
                    <th className="p-4 text-left text-sm font-semibold text-[#F4C339]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#2B2B2B] hover:bg-[#111315]">
                    <td className="p-4 text-[#EAEAEA] font-mono">#{mockRound.id}</td>
                    <td className="p-4 text-[#EAEAEA]">{mockRound.playerId}</td>
                    <td className="p-4 text-[#EAEAEA]">{mockRound.timestamp}</td>
                    <td className="p-4 text-[#EAEAEA]">{mockRound.currency} {mockRound.bet}</td>
                    <td className="p-4 text-[#F4C339] font-semibold">{mockRound.currency} {mockRound.payout}</td>
                    <td className="p-4">
                      <button onClick={() => setSelectedRound(mockRound)} className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black">
                        Replay
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {selectedRound && <RoundReplayPanel round={selectedRound} />}
          </div>
        </TabsContent>

        <TabsContent value="ticket" className="mt-6">
          <TicketDetail ticketId="T-1001" />
        </TabsContent>

        <TabsContent value="incidents" className="mt-6">
          <IncidentHub />
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default PlayerSupportView;
