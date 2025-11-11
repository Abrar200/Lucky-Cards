import React, { useState } from 'react';
import { Settings, Search, ArrowUpDown } from 'lucide-react';
import OperatorConfigModal from './OperatorConfigModal';
import OperatorProfileModal from './OperatorProfileModal';

const EnhancedOperators: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showCreate, setShowCreate] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [operators, setOperators] = useState([
    { id: 1, name: 'Casino Royale EU', markets: ['Europe', 'North America'], currency: 'EUR', status: 'Active', revenue: 1200000, revenueShare: 4 },
    { id: 2, name: 'Lucky Vegas Global', markets: ['North America', 'Latin America'], currency: 'USD', status: 'Active', revenue: 890000, revenueShare: 5 },
    { id: 3, name: 'Golden Dragon Asia', markets: ['Asia Pacific', 'Middle East'], currency: 'CNY', status: 'Active', revenue: 2100000, revenueShare: 3.5 },
    { id: 4, name: 'Royal Flush UK', markets: ['Europe'], currency: 'GBP', status: 'Inactive', revenue: 450000, revenueShare: 4.5 },
  ]);


  const filtered = operators
    .filter(op => op.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'revenue' ? b.revenue - a.revenue : a.name.localeCompare(b.name));

  const toggle = (id: number) => {
    setOperators(operators.map(op => 
      op.id === id ? { ...op, status: op.status === 'Active' ? 'Inactive' : 'Active' } : op
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]">Operators</h2>
        <button onClick={() => setShowCreate(true)} className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg">
          + Create Operator
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-[#EAEAEA]/40" size={20} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search operators..." className="w-full pl-10 pr-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]">
          <option value="name">Sort by Name</option>
          <option value="revenue">Sort by Revenue</option>
        </select>
      </div>

      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Operator Name</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Markets</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Currency</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Revenue (30d)</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((op) => (
              <tr key={op.id} className="border-t border-[#2B2B2B] hover:bg-[#111315]">
                <td className="p-4 text-[#EAEAEA] cursor-pointer hover:text-[#F4C339] transition-colors" onClick={() => { setSelected(op); setShowProfile(true); }}>{op.name}</td>

                <td className="p-4 text-[#EAEAEA]">{op.markets.length}</td>

                <td className="p-4 text-[#EAEAEA]">{op.currency}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${op.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {op.status}
                  </span>
                </td>
                <td className="p-4 text-[#EAEAEA] font-semibold">${(op.revenue / 1000).toFixed(0)}K</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => { setSelected(op); setShowConfig(true); }} className="px-3 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black text-xs flex items-center gap-1">
                    <Settings size={14} />Config
                  </button>
                  <button onClick={() => toggle(op.id)} className="px-3 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black text-xs">
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfig && selected && <OperatorConfigModal operator={selected} onClose={() => setShowConfig(false)} onSave={() => {}} />}
      {showProfile && selected && <OperatorProfileModal operator={selected} onClose={() => setShowProfile(false)} />}

    </div>
  );
};

export default EnhancedOperators;
