import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, StopCircle, UserCircle, Eye, Settings } from 'lucide-react';
import StreamViewModal from './StreamViewModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LiveTable {
  id: string;
  name: string;
  gameType: string;
  dealer: string;
  status: 'active' | 'paused' | 'offline';
  minBet: number;
  maxBet: number;
  currentPlayers: number;
  streamHealth: 'excellent' | 'good' | 'poor';
}

const LiveTablesView: React.FC = () => {
  const [tables, setTables] = useState<LiveTable[]>([
    { id: 'LC-001', name: 'Lucky Cards Table 1', gameType: 'Lucky Cards', dealer: 'Maria Santos', status: 'active', minBet: 10, maxBet: 5000, currentPlayers: 8, streamHealth: 'excellent' },
    { id: 'LC-002', name: 'Lucky Cards Table 2', gameType: 'Lucky Cards', dealer: 'John Chen', status: 'active', minBet: 25, maxBet: 10000, currentPlayers: 12, streamHealth: 'good' },
    { id: 'BJ-001', name: 'Blackjack VIP', gameType: 'Blackjack', dealer: 'Sofia Rodriguez', status: 'active', minBet: 100, maxBet: 25000, currentPlayers: 5, streamHealth: 'excellent' },
    { id: 'BAC-001', name: 'Baccarat Premium', gameType: 'Baccarat', dealer: 'Li Wei', status: 'paused', minBet: 50, maxBet: 15000, currentPlayers: 0, streamHealth: 'good' },
  ]);

  const [selectedTable, setSelectedTable] = useState<LiveTable | null>(null);
  const [isStreamModalOpen, setIsStreamModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsTable, setSettingsTable] = useState<LiveTable | null>(null);

  const handleViewStream = (table: LiveTable) => {
    setSelectedTable(table);
    setIsStreamModalOpen(true);
  };

  const handleOpenSettings = (table: LiveTable) => {
    setSettingsTable(table);
    setIsSettingsModalOpen(true);
  };

  const handleToggleStatus = (tableId: string) => {
    setTables(tables.map(t => 
      t.id === tableId 
        ? { ...t, status: t.status === 'active' ? 'paused' : 'active' as 'active' | 'paused' }
        : t
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#4BCF5A]';
      case 'paused': return 'bg-[#D9A441]';
      case 'offline': return 'bg-[#E64545]';
      default: return 'bg-gray-500';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-[#4BCF5A]';
      case 'good': return 'text-[#D9A441]';
      case 'poor': return 'text-[#E64545]';
      default: return 'text-gray-600';
    }
  };



  return (
    <div className="p-6 space-y-6 bg-[#0D0D0D] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Live Tables</h1>
        <Button className="bg-[#D9A441] hover:bg-[#E4C98F] text-[#0D0D0D] font-semibold shadow-lg">
          Add New Table
        </Button>
      </div>

      <div className="grid gap-4">
        {tables.map((table) => (
          <Card key={table.id} className="bg-[#111111] border-[#D9A441]/20 shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(table.status)} shadow-lg`} />
                    <div>
                      <h3 className="font-bold text-lg text-white">{table.name}</h3>
                      <p className="text-sm text-[#E4C98F]">{table.id}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Badge className="bg-[#D9A441]/20 border-[#D9A441] text-[#D9A441] font-semibold">{table.gameType}</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <UserCircle size={18} className="text-[#D9A441]" />
                  <span className="text-sm text-white font-medium">{table.dealer}</span>
                </div>
                
                <div className="text-sm">
                  <div className="font-bold text-white">${table.minBet} - ${table.maxBet.toLocaleString()}</div>
                  <div className="text-[#E4C98F] text-xs">Min/Max Bet</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D9A441]">{table.currentPlayers}</div>
                  <div className="text-xs text-[#E4C98F]">Players</div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button 
                    size="sm" 
                    className="bg-[#0D0D0D] border border-[#D9A441] text-[#D9A441] hover:bg-[#D9A441] hover:text-[#0D0D0D] transition-all"
                    onClick={() => handleViewStream(table)}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#0D0D0D] border border-[#D9A441] text-[#D9A441] hover:bg-[#D9A441] hover:text-[#0D0D0D] transition-all"
                    onClick={() => handleOpenSettings(table)}
                  >
                    <Settings size={16} />
                  </Button>
                  {table.status === 'active' ? (
                    <Button 
                      size="sm" 
                      className="bg-[#D9A441] hover:bg-[#E4C98F] text-[#0D0D0D] font-semibold"
                      onClick={() => handleToggleStatus(table.id)}
                    >
                      <Pause size={16} />
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-[#4BCF5A] hover:bg-[#4BCF5A]/80 text-[#0D0D0D] font-semibold"
                      onClick={() => handleToggleStatus(table.id)}
                    >
                      <Play size={16} />
                    </Button>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {selectedTable && (
        <StreamViewModal
          isOpen={isStreamModalOpen}
          onClose={() => setIsStreamModalOpen(false)}
          table={selectedTable}
        />
      )}

      {settingsTable && (
        <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
          <DialogContent className="max-w-2xl bg-[#111111] border-[#D9A441]/30">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Table Settings - {settingsTable.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#E4C98F]">Table Name</Label>
                  <Input defaultValue={settingsTable.name} className="mt-1 bg-[#0D0D0D] border-[#D9A441]/30 text-white" />
                </div>
                <div>
                  <Label className="text-[#E4C98F]">Table ID</Label>
                  <Input defaultValue={settingsTable.id} disabled className="mt-1 bg-[#0D0D0D]/50 border-[#D9A441]/20 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#E4C98F]">Game Type</Label>
                  <Select defaultValue={settingsTable.gameType}>
                    <SelectTrigger className="mt-1 bg-[#0D0D0D] border-[#D9A441]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-[#D9A441]/30">
                      <SelectItem value="Lucky Cards" className="text-white hover:bg-[#D9A441]/20">Lucky Cards</SelectItem>
                      <SelectItem value="Blackjack" className="text-white hover:bg-[#D9A441]/20">Blackjack</SelectItem>
                      <SelectItem value="Baccarat" className="text-white hover:bg-[#D9A441]/20">Baccarat</SelectItem>
                      <SelectItem value="Roulette" className="text-white hover:bg-[#D9A441]/20">Roulette</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#E4C98F]">Assigned Dealer</Label>
                  <Select defaultValue={settingsTable.dealer}>
                    <SelectTrigger className="mt-1 bg-[#0D0D0D] border-[#D9A441]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-[#D9A441]/30">
                      <SelectItem value="Maria Santos" className="text-white hover:bg-[#D9A441]/20">Maria Santos</SelectItem>
                      <SelectItem value="John Chen" className="text-white hover:bg-[#D9A441]/20">John Chen</SelectItem>
                      <SelectItem value="Sofia Rodriguez" className="text-white hover:bg-[#D9A441]/20">Sofia Rodriguez</SelectItem>
                      <SelectItem value="Li Wei" className="text-white hover:bg-[#D9A441]/20">Li Wei</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#E4C98F]">Minimum Bet ($)</Label>
                  <Input type="number" defaultValue={settingsTable.minBet} className="mt-1 bg-[#0D0D0D] border-[#D9A441]/30 text-white" />
                </div>
                <div>
                  <Label className="text-[#E4C98F]">Maximum Bet ($)</Label>
                  <Input type="number" defaultValue={settingsTable.maxBet} className="mt-1 bg-[#0D0D0D] border-[#D9A441]/30 text-white" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsSettingsModalOpen(false)} className="border-[#D9A441]/30 text-white hover:bg-[#D9A441]/10">
                  Cancel
                </Button>
                <Button className="bg-[#D9A441] hover:bg-[#E4C98F] text-[#0D0D0D] font-semibold">
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LiveTablesView;
