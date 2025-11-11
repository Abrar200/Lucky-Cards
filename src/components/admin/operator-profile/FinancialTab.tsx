import React from 'react';
import { DollarSign, Download, CheckCircle, Clock } from 'lucide-react';

interface Props {
  operator: any;
}

const FinancialTab: React.FC<Props> = ({ operator }) => {
  const invoices = [
    { date: 'Nov 1, 2024', type: 'Monthly Settlement', amount: '$48,000', status: 'Paid', invoice: 'INV-2024-11' },
    { date: 'Oct 1, 2024', type: 'Monthly Settlement', amount: '$45,900', status: 'Paid', invoice: 'INV-2024-10' },
    { date: 'Sep 1, 2024', type: 'Monthly Settlement', amount: '$42,300', status: 'Paid', invoice: 'INV-2024-09' },
    { date: 'Aug 1, 2024', type: 'Monthly Settlement', amount: '$39,800', status: 'Paid', invoice: 'INV-2024-08' },
  ];

  const totalGross = 1200000;
  const lcShare = totalGross * 0.04;
  const operatorNet = totalGross - lcShare;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#F4C339]/10 to-[#F4C339]/5 p-6 rounded-lg border border-[#F4C339]/30">
        <h3 className="text-[#F4C339] font-semibold mb-4 flex items-center gap-2">
          <DollarSign size={20} />
          Revenue Share Breakdown
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[#EAEAEA]/60 text-sm mb-1">Total Gross Revenue</p>
            <p className="text-2xl font-bold text-[#EAEAEA]">${totalGross.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[#EAEAEA]/60 text-sm mb-1">Lucky Cards Share (4%)</p>
            <p className="text-2xl font-bold text-red-400">${lcShare.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[#EAEAEA]/60 text-sm mb-1">Operator Net Revenue</p>
            <p className="text-2xl font-bold text-[#F4C339]">${operatorNet.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[#F4C339] font-semibold mb-3">Invoice & Payout Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#111315]">
              <tr>
                <th className="text-left p-3 text-[#F4C339]">Date</th>
                <th className="text-left p-3 text-[#F4C339]">Type</th>
                <th className="text-left p-3 text-[#F4C339]">Amount</th>
                <th className="text-left p-3 text-[#F4C339]">Status</th>
                <th className="text-left p-3 text-[#F4C339]">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={i} className="border-t border-[#2B2B2B] hover:bg-[#111315]/50">
                  <td className="p-3 text-[#EAEAEA]">{inv.date}</td>
                  <td className="p-3 text-[#EAEAEA]">{inv.type}</td>
                  <td className="p-3 text-[#F4C339] font-semibold">{inv.amount}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1 w-fit">
                      <CheckCircle size={12} />
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="flex items-center gap-1 text-[#F4C339] hover:text-[#F4C339]/80 text-sm">
                      <Download size={14} />
                      {inv.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialTab;
