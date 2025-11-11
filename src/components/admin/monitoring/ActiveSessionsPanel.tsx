import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActiveSession {
  id: string;
  playerId: string;
  playerName: string;
  operatorId: string;
  operatorName: string;
  startTime: Date;
  lastActivity: Date;
  totalBets: number;
  totalWagered: number;
  totalWon: number;
  netPosition: number;
  currency: string;
  ipAddress: string;
  deviceId: string;
  location: string;
  riskScore: number;
  flags: string[];
}

interface ActiveSessionsPanelProps {
  onViewSession: (sessionId: string) => void;
}

const ActiveSessionsPanel: React.FC<ActiveSessionsPanelProps> = ({ onViewSession }) => {
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [filter, setFilter] = useState<'all' | 'flagged' | 'high-risk'>('all');

  useEffect(() => {
    // Simulate real-time data updates
    const generateMockSessions = (): ActiveSession[] => {
      const mockData: ActiveSession[] = [];
      const now = new Date();
      
      for (let i = 0; i < 15; i++) {
        const totalWagered = Math.random() * 10000;
        const totalWon = Math.random() * 12000;
        const riskScore = Math.random() * 100;
        
        mockData.push({
          id: `session-${i}`,
          playerId: `P${1000 + i}`,
          playerName: `Player ${i + 1}`,
          operatorId: `OP${i % 3 + 1}`,
          operatorName: ['BetKing Casino', 'Lucky Spins', 'Royal Gaming'][i % 3],
          startTime: new Date(now.getTime() - Math.random() * 3600000),
          lastActivity: new Date(now.getTime() - Math.random() * 60000),
          totalBets: Math.floor(Math.random() * 200) + 10,
          totalWagered,
          totalWon,
          netPosition: totalWon - totalWagered,
          currency: ['USD', 'EUR', 'GBP'][i % 3],
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          deviceId: `DEV-${Math.random().toString(36).substr(2, 9)}`,
          location: ['UK', 'Malta', 'Philippines', 'Thailand'][i % 4],
          riskScore,
          flags: riskScore > 70 ? ['High Velocity', 'Unusual Pattern'] : riskScore > 50 ? ['High Stakes'] : []
        });
      }
      
      return mockData;
    };

    setSessions(generateMockSessions());
    const interval = setInterval(() => {
      setSessions(generateMockSessions());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredSessions = sessions.filter(s => {
    if (filter === 'flagged') return s.flags.length > 0;
    if (filter === 'high-risk') return s.riskScore > 70;
    return true;
  });

  const getRiskBadge = (score: number) => {
    if (score > 70) return <Badge variant="destructive">High Risk</Badge>;
    if (score > 40) return <Badge className="bg-yellow-500">Medium Risk</Badge>;
    return <Badge className="bg-green-500">Low Risk</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All Sessions ({sessions.length})
        </Button>
        <Button
          variant={filter === 'flagged' ? 'default' : 'outline'}
          onClick={() => setFilter('flagged')}
          size="sm"
        >
          Flagged ({sessions.filter(s => s.flags.length > 0).length})
        </Button>
        <Button
          variant={filter === 'high-risk' ? 'default' : 'outline'}
          onClick={() => setFilter('high-risk')}
          size="sm"
        >
          High Risk ({sessions.filter(s => s.riskScore > 70).length})
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#2B2B2B] text-[#EAEAEA]">
            <tr>
              <th className="p-3 text-left">Player</th>
              <th className="p-3 text-left">Operator</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-right">Bets</th>
              <th className="p-3 text-right">Wagered</th>
              <th className="p-3 text-right">Net P/L</th>
              <th className="p-3 text-left">Risk</th>
              <th className="p-3 text-left">Flags</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#EAEAEA]">
            {filteredSessions.map((session) => {
              const duration = Math.floor((new Date().getTime() - session.startTime.getTime()) / 60000);
              return (
                <tr key={session.id} className="border-b border-[#2B2B2B] hover:bg-[#2B2B2B]/50">
                  <td className="p-3">
                    <div className="font-medium">{session.playerName}</div>
                    <div className="text-xs text-gray-400">{session.playerId}</div>
                  </td>
                  <td className="p-3">{session.operatorName}</td>
                  <td className="p-3">{duration}m</td>
                  <td className="p-3 text-right">{session.totalBets}</td>
                  <td className="p-3 text-right">{session.currency} {session.totalWagered.toFixed(2)}</td>
                  <td className={`p-3 text-right font-medium ${session.netPosition >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {session.currency} {session.netPosition.toFixed(2)}
                  </td>
                  <td className="p-3">{getRiskBadge(session.riskScore)}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {session.flags.map((flag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{flag}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewSession(session.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveSessionsPanel;
