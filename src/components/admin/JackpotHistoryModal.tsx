import React, { useState } from 'react';
import { X, Download } from 'lucide-react';

interface JackpotHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  jackpot: any;
}

const JackpotHistoryModal: React.FC<JackpotHistoryModalProps> = ({ isOpen, onClose, jackpot }) => {
  const [filters, setFilters] = useState({
    operator: 'all',
    dateRange: '30',
    minAmount: ''
  });

  const winHistory = [
    { id: 'WIN-001', playerId: 'PLR-****3421', operator: 'BetKing Casino', date: '2025-11-10 14:32', trigger: 'Royal Flush', amount: 2456789, resetValue: 1000000 },
    { id: 'WIN-002', playerId: 'PLR-****8765', operator: 'Lucky Spin', date: '2025-11-08 09:15', trigger: 'Probability', amount: 1987654, resetValue: 1000000 },
    { id: 'WIN-003', playerId: 'PLR-****2109', operator: 'Casino Royal', date: '2025-11-05 18:45', trigger: 'Streak (10x)', amount: 1654321, resetValue: 1000000 },
    { id: 'WIN-004', playerId: 'PLR-****5432', operator: 'BetKing Casino', date: '2025-11-02 22:10', trigger: 'Progressive Tier', amount: 1432100, resetValue: 1000000 },
    { id: 'WIN-005', playerId: 'PLR-****9876', operator: 'Golden Palace', date: '2025-10-28 11:30', trigger: 'Time Trigger', amount: 1234567, resetValue: 1000000 }
  ];

  if (!isOpen) return null;

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting history as ${format.toUpperCase()}`);
    // Export logic here
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181A1D] rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#2B2B2B]">
          <div>
            <h2 className="text-2xl font-bold text-[#EAEAEA]">Jackpot Win History</h2>
            <p className="text-sm text-[#EAEAEA]/60 mt-1">{jackpot?.name}</p>
          </div>
          <button onClick={onClose} className="text-[#EAEAEA] hover:text-[#F4C339]">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-[#2B2B2B]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Operator</label>
              <select
                value={filters.operator}
                onChange={(e) => setFilters({ ...filters, operator: e.target.value })}
                className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
              >
                <option value="all">All Operators</option>
                <option value="betking">BetKing Casino</option>
                <option value="lucky">Lucky Spin</option>
                <option value="royal">Casino Royal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#EAEAEA] mb-2">Min Amount</label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                placeholder="e.g., 1000000"
                className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded-lg border border-[#3B3B3B] focus:border-[#F4C339] focus:outline-none"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={() => handleExport('csv')}
                className="flex-1 px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all flex items-center justify-center gap-2"
              >
                <Download size={16} />
                CSV
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="flex-1 px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all flex items-center justify-center gap-2"
              >
                <Download size={16} />
                PDF
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2B2B2B]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#EAEAEA]/60 uppercase">Win ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#EAEAEA]/60 uppercase">Player ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#EAEAEA]/60 uppercase">Operator</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#EAEAEA]/60 uppercase">Date/Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#EAEAEA]/60 uppercase">Trigger</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#EAEAEA]/60 uppercase">Amount Paid</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#EAEAEA]/60 uppercase">Reset Value</th>
              </tr>
            </thead>
            <tbody>
              {winHistory.map((win) => (
                <tr key={win.id} className="border-b border-[#2B2B2B] hover:bg-[#2B2B2B]/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-[#EAEAEA]">{win.id}</td>
                  <td className="px-6 py-4 text-sm text-[#EAEAEA]">{win.playerId}</td>
                  <td className="px-6 py-4 text-sm text-[#EAEAEA]">{win.operator}</td>
                  <td className="px-6 py-4 text-sm text-[#EAEAEA]">{win.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-[#F4C339]/20 text-[#F4C339] rounded text-xs font-medium">
                      {win.trigger}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-400">${win.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-[#EAEAEA]/60">${win.resetValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-[#2B2B2B] bg-[#2B2B2B]/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Wins</p>
              <p className="text-2xl font-bold text-[#EAEAEA]">{winHistory.length}</p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Total Paid Out</p>
              <p className="text-2xl font-bold text-green-400">
                ${winHistory.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Avg Win Amount</p>
              <p className="text-2xl font-bold text-[#F4C339]">
                ${Math.round(winHistory.reduce((sum, w) => sum + w.amount, 0) / winHistory.length).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JackpotHistoryModal;
