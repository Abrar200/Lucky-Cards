import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface FXRateHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  history: Array<{
    rate: number;
    timestamp: string;
    source: string;
  }>;
}

const FXRateHistoryModal: React.FC<FXRateHistoryModalProps> = ({ isOpen, onClose, currency, history }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-[#2B2B2B] flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#EAEAEA]">FX Rate History - {currency}/USD</h2>
          <button onClick={onClose} className="text-[#EAEAEA]/60 hover:text-[#EAEAEA]">
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1">
          <table className="w-full">
            <thead className="bg-[#111315] sticky top-0">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Timestamp</th>
                <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Rate</th>
                <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Change</th>
                <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Source</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, idx) => {
                const prevRate = idx < history.length - 1 ? history[idx + 1].rate : record.rate;
                const change = ((record.rate - prevRate) / prevRate) * 100;
                
                return (
                  <tr key={idx} className="border-t border-[#2B2B2B] hover:bg-[#111315]">
                    <td className="p-4 text-[#EAEAEA] text-sm">{record.timestamp}</td>
                    <td className="p-4 text-[#EAEAEA] font-mono font-semibold">{record.rate.toFixed(4)}</td>
                    <td className="p-4">
                      {change !== 0 && (
                        <span className={`flex items-center gap-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {Math.abs(change).toFixed(2)}%
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[#EAEAEA]/60 text-sm">{record.source}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FXRateHistoryModal;
