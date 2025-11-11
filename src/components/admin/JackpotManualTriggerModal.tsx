import React, { useState } from 'react';

interface JackpotManualTriggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  jackpot: any;
  onTrigger: (playerId: string, reason: string) => void;
}

const JackpotManualTriggerModal: React.FC<JackpotManualTriggerModalProps> = ({ isOpen, onClose, jackpot, onTrigger }) => {
  const [playerId, setPlayerId] = useState('');
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onTrigger(playerId, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#181A1D] rounded-xl p-6 max-w-md w-full border border-[#F4C339]">
        <h3 className="text-xl font-bold text-[#F4C339] mb-4">Manual Jackpot Trigger</h3>
        <p className="text-[#EAEAEA] mb-4">Force win for: {jackpot.name}</p>
        <p className="text-2xl font-bold text-[#F4C339] mb-6">${jackpot.pool.toLocaleString()}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#EAEAEA] mb-2">Player ID</label>
            <input
              type="text"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded border border-[#F4C339]/30"
              placeholder="Enter player ID"
            />
          </div>
          <div>
            <label className="block text-sm text-[#EAEAEA] mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded border border-[#F4C339]/30"
              rows={3}
              placeholder="Reason for manual trigger"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-[#2B2B2B] text-[#EAEAEA] rounded">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-semibold">Trigger Win</button>
        </div>
      </div>
    </div>
  );
};

export default JackpotManualTriggerModal;
