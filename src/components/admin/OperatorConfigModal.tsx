import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface OperatorConfigModalProps {
  operator: any;
  onClose: () => void;
  onSave: (config: any) => void;
}

const OperatorConfigModal: React.FC<OperatorConfigModalProps> = ({ operator, onClose, onSave }) => {
  const [tab, setTab] = useState('general');
  const [config, setConfig] = useState({
    name: operator?.name || '',
    email: operator?.email || '',
    markets: operator?.markets || ['Europe'],
    currency: operator?.currency || 'USD',
    fxSource: 'ExchangeRate-API',
    rounding: 'bankers',
    minBet: 10,
    maxBet: 10000,
    maxPayout: 50000,
    autoSuspend: 100000,
    revenueShare: 4,
    billingCycle: 'monthly',
    autoInvoice: true,
    blockDuplicateIP: true,
    maxSessions: 3,
    velocityDetection: true,
    blacklistCountries: [''],
  });

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'markets', label: 'Markets' },
    { id: 'currency', label: 'Currency' },
    { id: 'limits', label: 'Limits' },
    { id: 'billing', label: 'Billing' },
    { id: 'risk', label: 'Risk' },
  ];

  const marketsList = ['Europe', 'North America', 'Asia Pacific', 'Latin America', 'Middle East'];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#181A1D] rounded-xl p-6 max-w-4xl w-full border border-[#2B2B2B]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#EAEAEA]">Operator Configuration</h3>
          <button onClick={onClose} className="text-[#EAEAEA]/60 hover:text-[#F4C339]"><X size={24} /></button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-[#2B2B2B]">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? 'text-[#F4C339] border-b-2 border-[#F4C339]' : 'text-[#EAEAEA]/60'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-h-[50vh] overflow-y-auto space-y-4">
          {tab === 'general' && (
            <>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Operator Name</label>
                <input value={config.name} onChange={(e) => setConfig({...config, name: e.target.value})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Contact Email</label>
                <input type="email" value={config.email} onChange={(e) => setConfig({...config, email: e.target.value})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Brand Logo</label>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] hover:border-[#F4C339]">
                  <Upload size={16} />Upload Logo
                </button></div>
            </>
          )}

          {tab === 'markets' && (
            <div className="space-y-2">
              {marketsList.map(m => (
                <label key={m} className="flex items-center gap-2 px-4 py-3 bg-[#111315] rounded-lg cursor-pointer">
                  <input type="checkbox" checked={config.markets.includes(m)} onChange={() => setConfig({...config, markets: config.markets.includes(m) ? config.markets.filter(x => x !== m) : [...config.markets, m]})} className="accent-[#F4C339]" />
                  <span className="text-[#EAEAEA]">{m}</span>
                </label>
              ))}
            </div>
          )}

          {tab === 'currency' && (
            <>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Primary Currency</label>
                <select value={config.currency} onChange={(e) => setConfig({...config, currency: e.target.value})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]">
                  {['USD', 'EUR', 'GBP', 'CNY', 'JPY'].map(c => <option key={c}>{c}</option>)}
                </select></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">FX Conversion Source</label>
                <input value={config.fxSource} readOnly className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]/60" /></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Rounding Format</label>
                <select value={config.rounding} onChange={(e) => setConfig({...config, rounding: e.target.value})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]">
                  <option value="up">Round Up</option>
                  <option value="down">Round Down</option>
                  <option value="bankers">Bankers Rounding</option>
                </select></div>
            </>
          )}

          {tab === 'limits' && (
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Min Bet</label>
                <input type="number" value={config.minBet} onChange={(e) => setConfig({...config, minBet: Number(e.target.value)})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Max Bet</label>
                <input type="number" value={config.maxBet} onChange={(e) => setConfig({...config, maxBet: Number(e.target.value)})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Max Payout per Round</label>
                <input type="number" value={config.maxPayout} onChange={(e) => setConfig({...config, maxPayout: Number(e.target.value)})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Auto-Suspend Threshold</label>
                <input type="number" value={config.autoSuspend} onChange={(e) => setConfig({...config, autoSuspend: Number(e.target.value)})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
            </div>
          )}

          {tab === 'billing' && (
            <>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Revenue Share %</label>
                <input type="number" value={config.revenueShare} onChange={(e) => setConfig({...config, revenueShare: Number(e.target.value)})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Billing Cycle</label>
                <select value={config.billingCycle} onChange={(e) => setConfig({...config, billingCycle: e.target.value})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select></div>
              <label className="flex items-center justify-between px-4 py-3 bg-[#111315] rounded-lg cursor-pointer">
                <span className="text-[#EAEAEA]">Auto-Invoice</span>
                <input type="checkbox" checked={config.autoInvoice} onChange={(e) => setConfig({...config, autoInvoice: e.target.checked})} className="accent-[#F4C339]" />
              </label>
            </>
          )}

          {tab === 'risk' && (
            <>
              <label className="flex items-center justify-between px-4 py-3 bg-[#111315] rounded-lg cursor-pointer">
                <span className="text-[#EAEAEA]">Block Duplicate IP Clusters</span>
                <input type="checkbox" checked={config.blockDuplicateIP} onChange={(e) => setConfig({...config, blockDuplicateIP: e.target.checked})} className="accent-[#F4C339]" />
              </label>
              <div><label className="text-sm text-[#EAEAEA]/80 mb-2 block">Max Sessions per Account</label>
                <input type="number" value={config.maxSessions} onChange={(e) => setConfig({...config, maxSessions: Number(e.target.value)})} className="w-full px-4 py-2 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" /></div>
              <label className="flex items-center justify-between px-4 py-3 bg-[#111315] rounded-lg cursor-pointer">
                <span className="text-[#EAEAEA]">Velocity Detection for Bet Spam</span>
                <input type="checkbox" checked={config.velocityDetection} onChange={(e) => setConfig({...config, velocityDetection: e.target.checked})} className="accent-[#F4C339]" />
              </label>
            </>
          )}
        </div>

        <div className="flex gap-4 mt-6 pt-6 border-t border-[#2B2B2B]">
          <button onClick={onClose} className="flex-1 px-6 py-3 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black font-semibold">Cancel</button>
          <button onClick={() => { onSave(config); onClose(); }} className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black rounded-lg font-semibold">Save Configuration</button>
        </div>
      </div>
    </div>
  );
};

export default OperatorConfigModal;
