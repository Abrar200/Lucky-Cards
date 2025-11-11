import React from 'react';
import { Clock, Settings, DollarSign, Users, Shield, MapPin } from 'lucide-react';

interface Props {
  operator: any;
}

const ActivityLogTab: React.FC<Props> = ({ operator }) => {
  const activities = [
    { time: '11:42 PM', date: 'Nov 11', action: 'Operator changed RTP setting for Asia Market', type: 'config', icon: Settings },
    { time: '11:50 PM', date: 'Nov 11', action: 'Operator added 5% bonus campaign for new users', type: 'promotion', icon: DollarSign },
    { time: '12:03 AM', date: 'Nov 12', action: 'Operator account login from new location (Singapore)', type: 'security', icon: Shield },
    { time: '10:15 AM', date: 'Nov 10', action: 'Market configuration updated for Europe region', type: 'config', icon: MapPin },
    { time: '3:22 PM', date: 'Nov 9', action: 'Revenue share percentage adjusted to 4.2%', type: 'financial', icon: DollarSign },
    { time: '5:45 PM', date: 'Nov 9', action: 'New player tier "Diamond" created with custom benefits', type: 'config', icon: Users },
    { time: '8:30 AM', date: 'Nov 8', action: 'Jackpot "Mega Fortune" contribution rate changed to 2.8%', type: 'config', icon: Settings },
    { time: '2:10 PM', date: 'Nov 7', action: 'Security rule updated: Max accounts per IP set to 3', type: 'security', icon: Shield },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'config': return 'text-blue-400 bg-blue-500/10';
      case 'promotion': return 'text-green-400 bg-green-500/10';
      case 'security': return 'text-red-400 bg-red-500/10';
      case 'financial': return 'text-[#F4C339] bg-[#F4C339]/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-3">
      {activities.map((activity, i) => (
        <div key={i} className="bg-[#111315] p-4 rounded-lg border border-[#2B2B2B] hover:border-[#F4C339]/30 transition-colors">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded ${getTypeColor(activity.type)}`}>
              <activity.icon size={16} />
            </div>
            <div className="flex-1">
              <p className="text-[#EAEAEA] text-sm">{activity.action}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-[#EAEAEA]/40" />
                <span className="text-[#EAEAEA]/60 text-xs">{activity.date} at {activity.time}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${getTypeColor(activity.type)}`}>
                  {activity.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityLogTab;
