import React, { useState } from 'react';

const PaytableEditor: React.FC = () => {
  const [selectedOperator, setSelectedOperator] = useState('all');
  const [selectedMode, setSelectedMode] = useState('3-card');
  const [showPreview, setShowPreview] = useState(false);

  const payouts = [
    { id: 1, name: '1 of a Chosen Card', threeCard: '2:1', fiveCard: '2:1' },
    { id: 2, name: '3 of a Chosen Suit', threeCard: '5:1', fiveCard: '5:1' },
    { id: 3, name: '4 of a Chosen Suit', threeCard: '-', fiveCard: '15:1' },
    { id: 4, name: '5 of a Chosen Colour', threeCard: '-', fiveCard: '25:1' },
    { id: 5, name: 'Pair', threeCard: '3:1', fiveCard: '3:1' },
    { id: 6, name: 'Two Pair', threeCard: '-', fiveCard: '8:1' },
    { id: 7, name: 'Three of a Kind', threeCard: '10:1', fiveCard: '10:1' },
    { id: 8, name: 'Straight', threeCard: '45:1', fiveCard: '200:1' },
    { id: 9, name: 'Flush', threeCard: '30:1', fiveCard: '150:1' },
    { id: 10, name: 'Full House', threeCard: '-', fiveCard: '100:1' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Paytable Editor</h2>
        <div className="flex gap-3">
          <button onClick={() => setShowPreview(!showPreview)} className="px-6 py-3 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all font-semibold">
            {showPreview ? 'Hide' : 'Preview'}
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select value={selectedOperator} onChange={(e) => setSelectedOperator(e.target.value)} className="px-4 py-3 bg-[#181A1D] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]">
          <option value="all">All Operators</option>
          <option value="casino-royale">Casino Royale EU</option>
          <option value="lucky-vegas">Lucky Vegas Global</option>
        </select>
        <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} className="px-4 py-3 bg-[#181A1D] border border-[#2B2B2B] rounded-lg text-[#EAEAEA]">
          <option value="3-card">3-Card Mode</option>
          <option value="5-card">5-Card Mode</option>
        </select>
      </div>

      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Hand Type</th>
              <th className="text-center p-4 text-sm font-semibold text-[#F4C339]">3-Card Payout</th>
              <th className="text-center p-4 text-sm font-semibold text-[#F4C339]">5-Card Payout</th>
              <th className="text-center p-4 text-sm font-semibold text-[#F4C339]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id} className="border-t border-[#2B2B2B] hover:bg-[#111315]">
                <td className="p-4 text-[#EAEAEA]">{payout.name}</td>
                <td className="p-4 text-center">
                  <input type="text" defaultValue={payout.threeCard} className="w-20 px-3 py-2 bg-[#111315] border border-[#2B2B2B] rounded text-[#EAEAEA] text-center" />
                </td>
                <td className="p-4 text-center">
                  <input type="text" defaultValue={payout.fiveCard} className="w-20 px-3 py-2 bg-[#111315] border border-[#2B2B2B] rounded text-[#EAEAEA] text-center" />
                </td>
                <td className="p-4 text-center">
                  <button className="px-3 py-1 bg-[#2B2B2B] text-[#F4C339] rounded text-xs hover:bg-[#F4C339] hover:text-black">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaytableEditor;
