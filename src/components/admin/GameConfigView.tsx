import React, { useState } from 'react';

const GameConfigView: React.FC = () => {
  const [configs] = useState([
    { version: 'v2.1.5', rtp: 96.5, volatility: 'Medium', status: 'Live', rollout: 100 },
    { version: 'v2.2.0-beta', rtp: 97.0, volatility: 'High', status: 'Canary', rollout: 15 },
    { version: 'v2.0.8', rtp: 95.8, volatility: 'Low', status: 'Deprecated', rollout: 0 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Game Configuration</h2>
        <button className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
          + New Version
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {configs.map((config, idx) => (
          <div key={idx} className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#EAEAEA] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{config.version}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  config.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                  config.status === 'Canary' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {config.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Rollout</p>
                <p className="text-2xl font-bold text-[#F4C339]">{config.rollout}%</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">RTP</p>
                <p className="text-lg font-bold text-[#EAEAEA]">{config.rtp}%</p>
              </div>
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Volatility</p>
                <p className="text-lg font-bold text-[#EAEAEA]">{config.volatility}</p>
              </div>
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Status</p>
                <p className="text-lg font-bold text-[#EAEAEA]">{config.status}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all text-sm font-medium">
                Edit Config
              </button>
              <button className="flex-1 px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all text-sm font-medium">
                View JSON
              </button>
              {config.status !== 'Live' && (
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold">
                  Rollback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameConfigView;
