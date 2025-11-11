import React from 'react';

interface JackpotAdvancedActionsProps {
  jackpotId: string;
  onManualTrigger: () => void;
  onClone: () => void;
  onSchedule: () => void;
  onViewAnalytics: () => void;
  onAuditTrail: () => void;
  onAlerts: () => void;
}

const JackpotAdvancedActions: React.FC<JackpotAdvancedActionsProps> = ({
  onManualTrigger,
  onClone,
  onSchedule,
  onViewAnalytics,
  onAuditTrail,
  onAlerts,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <button
        onClick={onManualTrigger}
        className="px-3 py-2 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
      >
        Force Win
      </button>
      <button
        onClick={onClone}
        className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
      >
        Clone
      </button>
      <button
        onClick={onSchedule}
        className="px-3 py-2 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-colors"
      >
        Schedule
      </button>
      <button
        onClick={onViewAnalytics}
        className="px-3 py-2 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
      >
        Analytics
      </button>
      <button
        onClick={onAuditTrail}
        className="px-3 py-2 bg-orange-600 text-white rounded text-xs font-medium hover:bg-orange-700 transition-colors"
      >
        Audit Trail
      </button>
      <button
        onClick={onAlerts}
        className="px-3 py-2 bg-yellow-600 text-white rounded text-xs font-medium hover:bg-yellow-700 transition-colors"
      >
        Alerts
      </button>
    </div>
  );
};

export default JackpotAdvancedActions;
