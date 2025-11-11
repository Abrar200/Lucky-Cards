import React, { useState } from 'react';
import { X } from 'lucide-react';
import OverviewTab from './operator-profile/OverviewTab';
import MarketsTab from './operator-profile/MarketsTab';
import JackpotsTab from './operator-profile/JackpotsTab';
import PlayersTab from './operator-profile/PlayersTab';
import SessionsTab from './operator-profile/SessionsTab';
import FinancialTab from './operator-profile/FinancialTab';
import GameAnalyticsTab from './operator-profile/GameAnalyticsTab';
import RiskSecurityTab from './operator-profile/RiskSecurityTab';
import ActivityLogTab from './operator-profile/ActivityLogTab';

interface Props {
  operator: any;
  onClose: () => void;
}

const OperatorProfileModal: React.FC<Props> = ({ operator, onClose }) => {
  const [tab, setTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'markets', label: 'Markets' },
    { id: 'jackpots', label: 'Jackpots' },
    { id: 'players', label: 'Players' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'financial', label: 'Financial' },
    { id: 'analytics', label: 'Game Analytics' },
    { id: 'security', label: 'Risk & Security' },
    { id: 'activity', label: 'Activity Log' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#181A1D] rounded-xl w-full max-w-7xl max-h-[90vh] overflow-hidden border border-[#2B2B2B]" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-[#F4C339] to-[#E1A72B] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-black">{operator.name}</h2>
            <p className="text-black/70">Operator ID: {operator.id}</p>
          </div>
          <button onClick={onClose} className="text-black hover:bg-black/10 p-2 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-[#2B2B2B] overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-3 font-medium transition-colors whitespace-nowrap ${tab === t.id ? 'text-[#F4C339] border-b-2 border-[#F4C339]' : 'text-[#EAEAEA]/60 hover:text-[#EAEAEA]'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {tab === 'overview' && <OverviewTab operator={operator} />}
          {tab === 'markets' && <MarketsTab operator={operator} />}
          {tab === 'jackpots' && <JackpotsTab operator={operator} />}
          {tab === 'players' && <PlayersTab operator={operator} />}
          {tab === 'sessions' && <SessionsTab operator={operator} />}
          {tab === 'financial' && <FinancialTab operator={operator} />}
          {tab === 'analytics' && <GameAnalyticsTab operator={operator} />}
          {tab === 'security' && <RiskSecurityTab operator={operator} />}
          {tab === 'activity' && <ActivityLogTab operator={operator} />}
        </div>
      </div>
    </div>
  );
};

export default OperatorProfileModal;
