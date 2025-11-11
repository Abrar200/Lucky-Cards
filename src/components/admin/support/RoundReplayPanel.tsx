import React, { useState } from 'react';
import { Play, Download, Share2, Flag, DollarSign, Shield, Smartphone } from 'lucide-react';

interface Round {
  id: string;
  playerId: string;
  timestamp: string;
  bet: number;
  payout: number;
  currency: string;
  cards: string[];
  result: string;
  serverSeedHash: string;
  clientSeed: string;
  nonce: number;
}

const RoundReplayPanel: React.FC<{ round: Round }> = ({ round }) => {
  const [activeTab, setActiveTab] = useState('replay');

  return (
    <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
      <div className="border-b border-[#2B2B2B] flex">
        {['replay', 'fairness', 'financials', 'device'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-sm font-medium ${activeTab === tab ? 'bg-[#111315] text-[#F4C339] border-b-2 border-[#F4C339]' : 'text-[#888]'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'replay' && (
          <div className="space-y-6">
            <div className="flex gap-4">
              {round.cards.map((card, idx) => (
                <div key={idx} className="w-24 h-32 bg-white rounded-lg flex items-center justify-center text-4xl font-bold shadow-lg">
                  {card}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#888]">Result:</span>
              <span className="text-[#F4C339] text-xl font-bold">{round.result}</span>
              <span className="text-[#888]">Payout:</span>
              <span className="text-green-400 text-xl font-bold">{round.currency} {round.payout}</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black flex items-center gap-2">
                <Share2 size={16} /> Share Link
              </button>
              <button className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black flex items-center gap-2">
                <Download size={16} /> Export PDF
              </button>
              <button className="px-4 py-2 bg-[#2B2B2B] text-red-400 rounded-lg hover:bg-red-500 hover:text-white flex items-center gap-2">
                <Flag size={16} /> Flag for Risk
              </button>
            </div>
          </div>
        )}

        {activeTab === 'fairness' && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-[#888]">Server Seed Hash:</span><p className="text-[#EAEAEA] font-mono text-xs break-all">{round.serverSeedHash}</p></div>
              <div><span className="text-[#888]">Client Seed:</span><p className="text-[#EAEAEA] font-mono text-xs">{round.clientSeed}</p></div>
              <div><span className="text-[#888]">Nonce:</span><p className="text-[#EAEAEA] font-mono">{round.nonce}</p></div>
              <div><span className="text-[#888]">RNG Version:</span><p className="text-[#EAEAEA]">v2.1.0</p></div>
            </div>
            <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">Verify with 3rd Party</button>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-[#888]">Bet Amount:</span><p className="text-[#EAEAEA]">{round.currency} {round.bet}</p></div>
              <div><span className="text-[#888]">Win Amount:</span><p className="text-green-400">{round.currency} {round.payout}</p></div>
              <div><span className="text-[#888]">USD Equivalent:</span><p className="text-[#EAEAEA]">$125.00</p></div>
              <div><span className="text-[#888]">FX Rate:</span><p className="text-[#EAEAEA]">1.25 (2025-11-11 10:23)</p></div>
            </div>
          </div>
        )}

        {activeTab === 'device' && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-[#888]">Device ID:</span><p className="text-[#EAEAEA] font-mono">DEV-8892</p></div>
              <div><span className="text-[#888]">OS/App:</span><p className="text-[#EAEAEA]">iOS 17.2 / v3.4.1</p></div>
              <div><span className="text-[#888]">IP Address:</span><p className="text-[#EAEAEA] font-mono">192.168.1.100</p></div>
              <div><span className="text-[#888]">Location:</span><p className="text-[#EAEAEA]">London, UK</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoundReplayPanel;
