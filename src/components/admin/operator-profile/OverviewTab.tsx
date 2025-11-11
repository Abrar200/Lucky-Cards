import React from 'react';
import { DollarSign, Users, TrendingUp, Clock, Zap, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  operator: any;
}

const OverviewTab: React.FC<Props> = ({ operator }) => {
  const kpis = [
    { label: 'Revenue (30d)', value: `$${(operator.revenue / 1000).toFixed(1)}M`, icon: DollarSign, trend: '+12.4%' },
    { label: 'Net After Revenue Share', value: '$920K', icon: TrendingUp, trend: '+8.2%' },
    { label: 'Active Players', value: '2,847', icon: Users, trend: '+5.1%' },
    { label: 'New Players (30d)', value: '382', icon: Users, trend: '+18.3%' },
    { label: 'Avg Session Length', value: '17.4 min', icon: Clock, trend: '+2.1%' },
    { label: 'Bet Volume', value: '4.5M Bets', icon: Zap, trend: '+15.7%' },
    { label: 'Average Bet Size', value: '$12.44', icon: Target, trend: '-3.2%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
            <kpi.icon className="text-[#F4C339] mb-2" size={20} />
            <p className="text-[#EAEAEA]/60 text-xs">{kpi.label}</p>
            <p className="text-xl font-bold text-[#EAEAEA] mt-1">{kpi.value}</p>
            <p className={`text-xs mt-1 ${kpi.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{kpi.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
          <h3 className="text-[#F4C339] font-semibold mb-3">Revenue Trend (30d)</h3>
          <div className="h-32 flex items-end justify-between gap-1">
            {[45, 52, 48, 61, 58, 67, 72, 69, 75, 81, 78, 85, 92, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-[#F4C339] to-[#F4C339]/50 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B]">
          <h3 className="text-[#F4C339] font-semibold mb-3">Active Players Trend</h3>
          <div className="h-32 flex items-end justify-between gap-1">
            {[55, 58, 52, 64, 61, 68, 72, 75, 71, 78, 82, 79, 85, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-[#F4C339] font-semibold">System Alerts</h3>
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-start gap-2">
          <AlertTriangle className="text-yellow-500 mt-0.5" size={18} />
          <p className="text-yellow-500 text-sm">Operator had 4 payment failures in the last 7 days.</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg flex items-start gap-2">
          <CheckCircle className="text-green-500 mt-0.5" size={18} />
          <p className="text-green-500 text-sm">Fraud checks clean.</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
