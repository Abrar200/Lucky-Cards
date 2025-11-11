import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Plus, Users, DollarSign, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateIncidentModal } from '../incident/CreateIncidentModal';

interface Incident {
  id: string;
  title: string;
  type: string;
  severity: string;
  status: 'active' | 'resolved';
  affectedRounds: number;
  affectedPlayers: number;
  created: string;
  operator: string;
}

interface AffectedRound {
  roundId: string;
  playerId: string;
  playerName: string;
  betAmount: string;
  timestamp: string;
  status: string;
}

const IncidentHub: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [showRoundsModal, setShowRoundsModal] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 'INC-001', title: 'FX Rate Outage - EUR', type: 'Currency', severity: 'SEV-1', affectedRounds: 1247, affectedPlayers: 342, status: 'active', created: '2025-11-11 09:15', operator: 'All' },
    { id: 'INC-002', title: 'Paytable Misconfiguration', type: 'Game', severity: 'SEV-3', affectedRounds: 89, affectedPlayers: 23, status: 'resolved', created: '2025-11-10 14:22', operator: 'Casino Royale' },
  ]);
  const [processing, setProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  const mockAffectedRounds: AffectedRound[] = [
    { roundId: 'RND-12847', playerId: 'PLR-8392', playerName: 'John Smith', betAmount: '€50.00', timestamp: '2025-11-11 09:16:23', status: 'pending' },
    { roundId: 'RND-12848', playerId: 'PLR-7291', playerName: 'Emma Wilson', betAmount: '€25.00', timestamp: '2025-11-11 09:17:45', status: 'pending' },
    { roundId: 'RND-12849', playerId: 'PLR-5673', playerName: 'Michael Brown', betAmount: '€100.00', timestamp: '2025-11-11 09:18:12', status: 'pending' },
  ];

  const handleViewRounds = (incidentId: string) => {
    setSelectedIncident(incidentId);
    setShowRoundsModal(true);
  };

  const handleAutoCompensate = async (incidentId: string) => {
    setProcessing(incidentId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: "Compensation Processed",
      description: `Auto-compensation completed for ${incidents.find(i => i.id === incidentId)?.affectedPlayers} players. Total: €12,450.00`,
    });
    setProcessing(null);
  };

  const handleMarkResolved = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId ? { ...inc, status: 'resolved' as const } : inc
    ));
    toast({
      title: "Incident Resolved",
      description: `Incident ${incidentId} marked as resolved.`,
    });
  };

  const handleCreateIncident = (formData: any) => {
    const newId = `INC-${String(incidents.length + 1).padStart(3, '0')}`;
    
    // Calculate time window duration in hours
    const startTime = new Date(formData.startTime);
    const endTime = formData.ongoing ? new Date() : new Date(formData.endTime);
    const durationHours = Math.abs(endTime.getTime() - startTime.getTime()) / 36e5;
    
    // Simulate automatic calculation based on time window and scope
    const baseRoundsPerHour = 150;
    const operatorMultiplier = formData.operators.length || 1;
    const affectedRounds = Math.floor(durationHours * baseRoundsPerHour * operatorMultiplier);
    const affectedPlayers = Math.floor(affectedRounds * 0.28); // ~28% unique players
    
    const newIncident: Incident = {
      id: newId,
      title: formData.title,
      type: formData.type,
      severity: formData.severity,
      affectedRounds,
      affectedPlayers,
      status: 'active',
      created: new Date().toLocaleString('en-US', { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit', hour12: false 
      }).replace(',', ''),
      operator: formData.operators.length > 0 ? formData.operators.join(', ') : 'All',
    };

    setIncidents(prev => [newIncident, ...prev]);
    
    toast({
      title: "Incident Created Successfully",
      description: (
        <div className="mt-2 space-y-1">
          <p><strong>{newId}</strong> - {formData.title}</p>
          <p>Affected: {affectedRounds} rounds, {affectedPlayers} players</p>
          <p className="text-xs text-muted-foreground mt-2">
            System has automatically identified affected rounds, players, and linked to game logs.
          </p>
        </div>
      ),
    });
    setShowCreateModal(false);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-[#EAEAEA]">Incident Hub</h3>
          <p className="text-[#888] text-sm mt-1">Manage bulk incidents affecting multiple rounds</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={20} /> Create Incident
        </button>
      </div>

      <div className="grid gap-4">
        {incidents.map(incident => (
          <div key={incident.id} className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${incident.status === 'active' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                  {incident.status === 'active' ? <AlertTriangle className="text-red-400" size={24} /> : <CheckCircle className="text-green-400" size={24} />}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#EAEAEA]">{incident.title}</h4>
                  <p className="text-[#888] text-sm">{incident.id} • {incident.type} • {incident.severity}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${incident.status === 'active' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {incident.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-[#111315] rounded-lg p-3">
                <div className="flex items-center gap-2 text-[#888] text-sm mb-1">
                  <Users size={16} /> Affected Players
                </div>
                <p className="text-2xl font-bold text-[#F4C339]">{incident.affectedPlayers}</p>
              </div>
              <div className="bg-[#111315] rounded-lg p-3">
                <div className="text-[#888] text-sm mb-1">Affected Rounds</div>
                <p className="text-2xl font-bold text-[#F4C339]">{incident.affectedRounds}</p>
              </div>
              <div className="bg-[#111315] rounded-lg p-3">
                <div className="flex items-center gap-2 text-[#888] text-sm mb-1">
                  <Clock size={16} /> Created
                </div>
                <p className="text-sm text-[#EAEAEA]">{incident.created}</p>
              </div>
              <div className="bg-[#111315] rounded-lg p-3">
                <div className="text-[#888] text-sm mb-1">Operator</div>
                <p className="text-sm text-[#EAEAEA]">{incident.operator}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleViewRounds(incident.id)}
                className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black text-sm transition-colors"
              >
                View Affected Rounds
              </button>
              <button 
                onClick={() => handleAutoCompensate(incident.id)}
                disabled={processing === incident.id || incident.status === 'resolved'}
                className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {processing === incident.id ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign size={16} />
                    Auto-Compensate
                  </>
                )}
              </button>
              {incident.status === 'active' && (
                <button 
                  onClick={() => handleMarkResolved(incident.id)}
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 hover:text-white text-sm transition-colors"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showRoundsModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-[#2B2B2B]">
              <div>
                <h3 className="text-xl font-bold text-[#EAEAEA]">Affected Rounds</h3>
                <p className="text-[#888] text-sm mt-1">{selectedIncident} - Showing {mockAffectedRounds.length} of {incidents.find(i => i.id === selectedIncident)?.affectedRounds} rounds</p>
              </div>
              <button onClick={() => setShowRoundsModal(false)} className="text-[#888] hover:text-[#EAEAEA]">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-auto p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2B2B2B]">
                    <th className="text-left text-[#888] text-sm font-medium pb-3">Round ID</th>
                    <th className="text-left text-[#888] text-sm font-medium pb-3">Player</th>
                    <th className="text-left text-[#888] text-sm font-medium pb-3">Bet Amount</th>
                    <th className="text-left text-[#888] text-sm font-medium pb-3">Timestamp</th>
                    <th className="text-left text-[#888] text-sm font-medium pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAffectedRounds.map(round => (
                    <tr key={round.roundId} className="border-b border-[#2B2B2B]/50">
                      <td className="py-3 text-[#F4C339] font-mono text-sm">{round.roundId}</td>
                      <td className="py-3 text-[#EAEAEA] text-sm">
                        <div>{round.playerName}</div>
                        <div className="text-[#888] text-xs">{round.playerId}</div>
                      </td>
                      <td className="py-3 text-[#EAEAEA] text-sm">{round.betAmount}</td>
                      <td className="py-3 text-[#888] text-sm">{round.timestamp}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${round.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                          {round.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <CreateIncidentModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateIncident}
      />
    </div>
  );
};

export default IncidentHub;