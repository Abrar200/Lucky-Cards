import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BetRecord {
  id: string;
  timestamp: Date;
  betType: string;
  amount: number;
  result: 'win' | 'loss';
  payout: number;
  multiplier: number;
  hand: string;
}

interface SessionDetail {
  sessionId: string;
  playerId: string;
  playerName: string;
  operatorName: string;
  startTime: Date;
  duration: number;
  totalBets: number;
  totalWagered: number;
  totalWon: number;
  netPosition: number;
  currency: string;
  riskScore: number;
  flags: string[];
  bets: BetRecord[];
  ipAddress: string;
  deviceId: string;
  location: string;
}

interface PlayerSessionDetailProps {
  sessionId: string;
  onBack: () => void;
}

const PlayerSessionDetail: React.FC<PlayerSessionDetailProps> = ({ sessionId, onBack }) => {
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [autoFlag, setAutoFlag] = useState(false);

  useEffect(() => {
    // Generate mock session detail
    const generateMockSession = (): SessionDetail => {
      const bets: BetRecord[] = [];
      const now = new Date();
      
      for (let i = 0; i < 50; i++) {
        const amount = Math.random() * 100 + 10;
        const isWin = Math.random() > 0.5;
        const multiplier = isWin ? Math.random() * 5 + 1 : 0;
        
        bets.push({
          id: `bet-${i}`,
          timestamp: new Date(now.getTime() - (50 - i) * 60000),
          betType: ['Ante', 'Pair Plus', 'Six Card Bonus'][Math.floor(Math.random() * 3)],
          amount,
          result: isWin ? 'win' : 'loss',
          payout: isWin ? amount * multiplier : 0,
          multiplier,
          hand: isWin ? ['Straight Flush', 'Three of a Kind', 'Straight', 'Flush', 'Pair'][Math.floor(Math.random() * 5)] : 'High Card'
        });
      }

      const totalWagered = bets.reduce((sum, b) => sum + b.amount, 0);
      const totalWon = bets.reduce((sum, b) => sum + b.payout, 0);

      return {
        sessionId,
        playerId: 'P1001',
        playerName: 'John Doe',
        operatorName: 'BetKing Casino',
        startTime: new Date(now.getTime() - 3000000),
        duration: 50,
        totalBets: bets.length,
        totalWagered,
        totalWon,
        netPosition: totalWon - totalWagered,
        currency: 'USD',
        riskScore: 75,
        flags: ['High Velocity', 'Unusual Pattern'],
        bets,
        ipAddress: '192.168.1.100',
        deviceId: 'DEV-ABC123',
        location: 'United Kingdom'
      };
    };

    setSession(generateMockSession());
  }, [sessionId]);

  if (!session) return <div>Loading...</div>;

  const handleFlagSession = () => {
    setAutoFlag(true);
    // In real implementation, this would call an API
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>← Back to Sessions</Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleFlagSession}>
            {autoFlag ? 'Flagged' : 'Flag Session'}
          </Button>
          <Button variant="destructive">Suspend Player</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader>
            <CardTitle className="text-[#EAEAEA] text-sm">Session Info</CardTitle>
          </CardHeader>
          <CardContent className="text-[#EAEAEA]">
            <div className="space-y-2 text-sm">
              <div><strong>Player:</strong> {session.playerName}</div>
              <div><strong>ID:</strong> {session.playerId}</div>
              <div><strong>Operator:</strong> {session.operatorName}</div>
              <div><strong>Duration:</strong> {session.duration}m</div>
              <div><strong>Location:</strong> {session.location}</div>
              <div><strong>IP:</strong> {session.ipAddress}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader>
            <CardTitle className="text-[#EAEAEA] text-sm">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-[#EAEAEA]">
            <div className="space-y-2 text-sm">
              <div><strong>Total Bets:</strong> {session.totalBets}</div>
              <div><strong>Wagered:</strong> {session.currency} {session.totalWagered.toFixed(2)}</div>
              <div><strong>Won:</strong> {session.currency} {session.totalWon.toFixed(2)}</div>
              <div className={session.netPosition >= 0 ? 'text-green-400' : 'text-red-400'}>
                <strong>Net P/L:</strong> {session.currency} {session.netPosition.toFixed(2)}
              </div>
              <div><strong>Avg Bet:</strong> {session.currency} {(session.totalWagered / session.totalBets).toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader>
            <CardTitle className="text-[#EAEAEA] text-sm">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="text-[#EAEAEA]">
            <div className="space-y-2 text-sm">
              <div><strong>Risk Score:</strong> {session.riskScore}/100</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {session.flags.map((flag, idx) => (
                  <Badge key={idx} variant="destructive">{flag}</Badge>
                ))}
                {autoFlag && <Badge variant="destructive">Manually Flagged</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
        <CardHeader>
          <CardTitle className="text-[#EAEAEA]">Bet Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#2B2B2B] text-[#EAEAEA]">
                <tr>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-left">Bet Type</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-left">Result</th>
                  <th className="p-2 text-left">Hand</th>
                  <th className="p-2 text-right">Multiplier</th>
                  <th className="p-2 text-right">Payout</th>
                </tr>
              </thead>
              <tbody className="text-[#EAEAEA]">
                {session.bets.map((bet) => (
                  <tr key={bet.id} className="border-b border-[#2B2B2B]">
                    <td className="p-2">{bet.timestamp.toLocaleTimeString()}</td>
                    <td className="p-2">{bet.betType}</td>
                    <td className="p-2 text-right">{session.currency} {bet.amount.toFixed(2)}</td>
                    <td className="p-2">
                      <Badge variant={bet.result === 'win' ? 'default' : 'secondary'}>
                        {bet.result}
                      </Badge>
                    </td>
                    <td className="p-2">{bet.hand}</td>
                    <td className="p-2 text-right">{bet.multiplier.toFixed(2)}x</td>
                    <td className={`p-2 text-right ${bet.result === 'win' ? 'text-green-400' : 'text-gray-400'}`}>
                      {session.currency} {bet.payout.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerSessionDetail;
