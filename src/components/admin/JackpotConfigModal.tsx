import React, { useState } from 'react';
import { X } from 'lucide-react';

interface JackpotConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  jackpot: any;
}

const JackpotConfigModal: React.FC<JackpotConfigModalProps> = ({ isOpen, onClose, jackpot }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: jackpot?.name || '',
    type: jackpot?.type || 'global',
    description: '',
    status: 'active',
    seedAmount: jackpot?.seed || 1000000,
    contributionRate: jackpot?.contribution || 2.5,
    contributionSource: 'main',
    triggerType: 'probability',
    triggerValue: '0.0001',
    winnerPayout: 90,
    houseRetained: 10,
    markets: [] as string[],
    operators: 'all',
    currencyDisplay: 'localized'
  });

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'seed', label: 'Seed & Growth' },
    { id: 'triggers', label: 'Win Triggers' },
    { id: 'distribution', label: 'Distribution' },
    { id: 'assignment', label: 'Assignment' },
    { id: 'currency', label: 'Currency' }
  ];

  const handleSave = () => {
    console.log('Saving jackpot config:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181A1D] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#2B2B2B]">
          <h2 className="text-2xl font-bold text-[#EAEAEA]">Configure Jackpot</h2>
          <button onClick={onClose} className="text-[#EAEAEA] hover:text-[#F4C339]">
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-[#2B2B2B] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#F4C339] border-b-2 border-[#F4C339]'
                  : 'text-[#EAEAEA]/60 hover:text-[#EAEAEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Jackpot Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Jackpot Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                >
                  <option value="global">Global</option>
                  <option value="local">Local</option>
                  <option value="mystery">Mystery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'seed' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Seed Amount ($)</label>
                <input
                  type="number"
                  value={formData.seedAmount}
                  onChange={(e) => setFormData({ ...formData, seedAmount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Contribution Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.contributionRate}
                  onChange={(e) => setFormData({ ...formData, contributionRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Contribution Source</label>
                <select
                  value={formData.contributionSource}
                  onChange={(e) => setFormData({ ...formData, contributionSource: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                >
                  <option value="main">Only main bets</option>
                  <option value="all">Main bets + side bets</option>
                  <option value="jackpot">Only jackpot split area</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'triggers' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Trigger Type</label>
                <select
                  value={formData.triggerType}
                  onChange={(e) => setFormData({ ...formData, triggerType: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                >
                  <option value="event">Specific Event (Royal Flush, etc.)</option>
                  <option value="probability">Probability Trigger</option>
                  <option value="streak">Streak Trigger</option>
                  <option value="time">Time Trigger (Must-Hit-By)</option>
                  <option value="progressive">Progressive Tier</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Trigger Value</label>
                <input
                  type="text"
                  value={formData.triggerValue}
                  onChange={(e) => setFormData({ ...formData, triggerValue: e.target.value })}
                  placeholder="e.g., 0.0001 for probability"
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'distribution' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Winner Payout (%)</label>
                <input
                  type="number"
                  value={formData.winnerPayout}
                  onChange={(e) => setFormData({ ...formData, winnerPayout: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">House Retained (%)</label>
                <input
                  type="number"
                  value={formData.houseRetained}
                  onChange={(e) => setFormData({ ...formData, houseRetained: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'assignment' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Operator Assignment</label>
                <select
                  value={formData.operators}
                  onChange={(e) => setFormData({ ...formData, operators: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                >
                  <option value="all">All Operators (Global)</option>
                  <option value="single">One Operator Only (Local)</option>
                  <option value="custom">Custom List</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'currency' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Currency Display</label>
                <select
                  value={formData.currencyDisplay}
                  onChange={(e) => setFormData({ ...formData, currencyDisplay: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
                >
                  <option value="localized">Localized (Operator Currency)</option>
                  <option value="usd">USD Only</option>
                </select>
              </div>
              <div className="p-4 bg-[#2B2B2B] rounded-lg">
                <p className="text-sm text-[#EAEAEA]/80">
                  Jackpot growth is stored in Base Currency (USD). Each operator sees their localized display amount using real-time FX conversion from ExchangeRate-API.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-[#2B2B2B]">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg hover:bg-[#3B3B3B] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default JackpotConfigModal;
