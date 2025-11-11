import React, { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const ReportsView: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  const metrics = [
    { label: 'Total GGR (USD)', value: '$2.6M', change: '+22%' },
    { label: 'Total Wagers (USD)', value: '$12.4M', change: '+15%' },
    { label: 'Jackpot Liability', value: '$450K', change: '+8%' },
    { label: 'Active Operators', value: '45', change: '+3' },
  ];

  const operatorData = [
    { name: 'Casino Royale EU', currency: 'EUR', wagers: '€3.8M', ggr: '€890K', usdGgr: '$980K', fxRate: 1.10 },
    { name: 'Lucky Vegas Global', currency: 'USD', wagers: '$3.1M', ggr: '$720K', usdGgr: '$720K', fxRate: 1.00 },
    { name: 'Golden Dragon Asia', currency: 'CNY', wagers: '¥36.8M', ggr: '¥6.5M', usdGgr: '$900K', fxRate: 7.24 },
    { name: 'Manila Casino Hub', currency: 'PHP', wagers: '₱175M', ggr: '₱28M', usdGgr: '$495K', fxRate: 56.45 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Finance & GGR Reports (USD Base)</h2>
        <div className="flex gap-3">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-4 py-2 bg-[#181A1D] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-[#181A1D] rounded-xl p-6 border border-[#7A0E14]">
        <div className="flex items-start gap-3">
          <DollarSign className="text-[#F4C339] mt-1" size={20} />
          <div>
            <h3 className="text-sm font-bold text-[#F4C339]">Multi-Currency Reporting</h3>
            <p className="text-sm text-[#EAEAEA]/80 mt-1">All operator revenues are converted to USD using FX snapshot rates captured at transaction time. Rates are never recalculated retroactively.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
            <p className="text-sm text-[#EAEAEA]/60 mb-2">{metric.label}</p>
            <p className="text-3xl font-bold text-[#EAEAEA] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{metric.value}</p>
            <span className="text-xs text-green-400 font-medium flex items-center gap-1">
              <TrendingUp size={12} />
              {metric.change}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
        <div className="p-6 border-b border-[#2B2B2B]">
          <h3 className="text-lg font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Operator Performance (Multi-Currency → USD)</h3>
        </div>
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Operator</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Currency</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Wagers (Local)</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">GGR (Local)</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">GGR (USD)</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">FX Rate</th>
            </tr>
          </thead>
          <tbody>
            {operatorData.map((op, idx) => (
              <tr key={idx} className="border-t border-[#2B2B2B] hover:bg-[#111315] transition-colors">
                <td className="p-4 text-[#EAEAEA]">{op.name}</td>
                <td className="p-4 text-[#F4C339] font-bold">{op.currency}</td>
                <td className="p-4 text-[#EAEAEA]">{op.wagers}</td>
                <td className="p-4 text-[#EAEAEA]">{op.ggr}</td>
                <td className="p-4 text-[#F4C339] font-bold">{op.usdGgr}</td>
                <td className="p-4 text-[#EAEAEA]/60 text-sm">{op.fxRate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsView;
