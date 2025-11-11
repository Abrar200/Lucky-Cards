import React, { useState } from 'react';
import JackpotConfigModal from './JackpotConfigModal';
import JackpotHistoryModal from './JackpotHistoryModal';
import JackpotAdvancedActions from './JackpotAdvancedActions';
import JackpotManualTriggerModal from './JackpotManualTriggerModal';
import JackpotAnalyticsModal from './JackpotAnalyticsModal';


interface Jackpot {
  id: string;
  name: string;
  type: 'global' | 'local' | 'mystery';
  pool: number;
  seed: number;
  contribution: number;
  wins: number;
  status: 'active' | 'inactive';
}

const JackpotsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'local' | 'mystery'>('global');
  const [selectedJackpot, setSelectedJackpot] = useState<Jackpot | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [manualTriggerModalOpen, setManualTriggerModalOpen] = useState(false);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


  const [jackpots, setJackpots] = useState<Record<string, Jackpot[]>>({
    global: [
      { id: 'JP-001', name: 'Mega Fortune', type: 'global', pool: 2456789, seed: 1000000, contribution: 2.5, wins: 12, status: 'active' },
      { id: 'JP-002', name: 'Grand Jackpot', type: 'global', pool: 1234567, seed: 500000, contribution: 3.0, wins: 8, status: 'active' },
    ],
    local: [
      { id: 'JP-003', name: 'Casino Royale Jackpot', type: 'local', pool: 125000, seed: 50000, contribution: 1.5, wins: 45, status: 'active' },
      { id: 'JP-004', name: 'Lucky Vegas Special', type: 'local', pool: 89000, seed: 25000, contribution: 2.0, wins: 32, status: 'active' },
    ],
    mystery: [
      { id: 'JP-005', name: 'Mystery Drop', type: 'mystery', pool: 45678, seed: 10000, contribution: 1.0, wins: 156, status: 'active' },
    ],
  });

  const handleToggleStatus = (jackpotId: string, currentTab: 'global' | 'local' | 'mystery') => {
    setJackpots(prev => ({
      ...prev,
      [currentTab]: prev[currentTab].map(jp =>
        jp.id === jackpotId
          ? { ...jp, status: jp.status === 'active' ? 'inactive' : 'active' }
          : jp
      )
    }));
  };

  const openConfigModal = (jackpot: Jackpot) => {
    setSelectedJackpot(jackpot);
    setConfigModalOpen(true);
  };

  const openHistoryModal = (jackpot: Jackpot) => {
    setSelectedJackpot(jackpot);
    setHistoryModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Jackpot Control Center</h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + Create Jackpot
        </button>
      </div>

      <div className="flex gap-4">
        {(['global', 'local', 'mystery'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black'
                : 'bg-[#2B2B2B] text-[#F4C339] hover:bg-[#F4C339] hover:text-black'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jackpots[activeTab].map((jp) => (
          <div key={jp.id} className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>{jp.name}</h3>
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${jp.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jp.status === 'active'}
                    onChange={() => handleToggleStatus(jp.id, activeTab)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#2B2B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F4C339] peer-checked:to-[#E1A72B]"></div>
                </label>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#F4C339] to-[#E1A72B] rounded-lg p-6 mb-4">
              <p className="text-sm text-black/70 mb-1">Current Pool</p>
              <p className="text-4xl font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ${jp.pool.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Seed Amount</p>
                <p className="text-sm font-semibold text-[#EAEAEA]">${jp.seed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Contribution</p>
                <p className="text-sm font-semibold text-[#EAEAEA]">{jp.contribution}%</p>
              </div>
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Wins</p>
                <p className="text-sm font-semibold text-[#EAEAEA]">{jp.wins}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <button 
                onClick={() => openConfigModal(jp)}
                className="flex-1 px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all text-sm font-medium"
              >
                Configure
              </button>
              <button 
                onClick={() => openHistoryModal(jp)}
                className="flex-1 px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all text-sm font-medium"
              >
                History
              </button>
            </div>

            <JackpotAdvancedActions
              jackpotId={jp.id}
              onManualTrigger={() => { setSelectedJackpot(jp); setManualTriggerModalOpen(true); }}
              onClone={() => alert(`Cloning ${jp.name}...`)}
              onSchedule={() => alert(`Scheduling ${jp.name}...`)}
              onViewAnalytics={() => { setSelectedJackpot(jp); setAnalyticsModalOpen(true); }}
              onAuditTrail={() => alert(`Viewing audit trail for ${jp.name}...`)}
              onAlerts={() => alert(`Setting alerts for ${jp.name}...`)}
            />

          </div>
        ))}
      </div>

      {configModalOpen && selectedJackpot && (
        <JackpotConfigModal
          isOpen={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          jackpot={selectedJackpot}
        />
      )}

      {historyModalOpen && selectedJackpot && (
        <JackpotHistoryModal
          isOpen={historyModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          jackpot={selectedJackpot}
        />
      )}

      {showCreateModal && (
        <JackpotConfigModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          jackpot={{ name: '', type: 'global', seed: 1000000, contribution: 2.5 }}
        />
      )}

      {manualTriggerModalOpen && selectedJackpot && (
        <JackpotManualTriggerModal
          isOpen={manualTriggerModalOpen}
          onClose={() => setManualTriggerModalOpen(false)}
          jackpot={selectedJackpot}
          onTrigger={(playerId, reason) => {
            console.log(`Manual trigger for ${selectedJackpot.name}: Player ${playerId}, Reason: ${reason}`);
            alert(`Jackpot ${selectedJackpot.name} triggered for player ${playerId}!`);
          }}
        />
      )}

      {analyticsModalOpen && selectedJackpot && (
        <JackpotAnalyticsModal
          isOpen={analyticsModalOpen}
          onClose={() => setAnalyticsModalOpen(false)}
          jackpot={selectedJackpot}
        />
      )}

    </div>
  );
};

export default JackpotsView;

