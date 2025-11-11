import React, { useState } from 'react';
import { Search, User, Shield, CreditCard, MapPin, Clock } from 'lucide-react';

const PlayerLookup: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [player, setPlayer] = useState<any>(null);

  const handleSearch = () => {
    setPlayer({
      id: 'P-45892',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      nickname: 'LuckyJohn',
      operator: 'Casino Royale',
      market: 'UK',
      currency: 'GBP',
      language: 'en-GB',
      kycStatus: 'Verified',
      balance: '£1,245.50',
      rgLimits: { daily: '£500', weekly: '£2000' },
      lastLogin: '2025-11-11 10:23:45',
      lastIp: '192.168.1.100',
      deviceId: 'DEV-8892',
      status: 'Active'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Player ID, Email, Phone, Round ID, Device ID..." className="flex-1 px-4 py-3 bg-[#181A1D] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" />
        <button onClick={handleSearch} className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg flex items-center gap-2">
          <Search size={20} /> Search
        </button>
      </div>

      {player && (
        <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F4C339] flex items-center gap-2"><User size={20} /> Player Info</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#888]">ID: <span className="text-[#EAEAEA] font-mono">{player.id}</span></p>
                <p className="text-[#888]">Email: <span className="text-[#EAEAEA]">{player.email}</span></p>
                <p className="text-[#888]">Phone: <span className="text-[#EAEAEA]">{player.phone}</span></p>
                <p className="text-[#888]">Nickname: <span className="text-[#EAEAEA]">{player.nickname}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F4C339] flex items-center gap-2"><Shield size={20} /> Account Status</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#888]">KYC: <span className="text-green-400">{player.kycStatus}</span></p>
                <p className="text-[#888]">Status: <span className="text-green-400">{player.status}</span></p>
                <p className="text-[#888]">Balance: <span className="text-[#F4C339] font-semibold">{player.balance}</span></p>
                <p className="text-[#888]">Daily Limit: <span className="text-[#EAEAEA]">{player.rgLimits.daily}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F4C339] flex items-center gap-2"><MapPin size={20} /> Session Info</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#888]">Last Login: <span className="text-[#EAEAEA]">{player.lastLogin}</span></p>
                <p className="text-[#888]">IP: <span className="text-[#EAEAEA] font-mono">{player.lastIp}</span></p>
                <p className="text-[#888]">Device: <span className="text-[#EAEAEA] font-mono">{player.deviceId}</span></p>
                <p className="text-[#888]">Market: <span className="text-[#EAEAEA]">{player.market}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerLookup;
