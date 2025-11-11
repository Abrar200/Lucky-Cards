import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AlertItem {
  id: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'velocity' | 'pattern' | 'fraud' | 'limit' | 'geo';
  playerId: string;
  playerName: string;
  operatorName: string;
  message: string;
  details: string;
  acknowledged: boolean;
}

const AlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'unacknowledged'>('unacknowledged');

  useEffect(() => {
    const generateMockAlerts = (): AlertItem[] => {
      const alertTypes = [
        { type: 'velocity' as const, message: 'Velocity rule violation detected', details: 'Player exceeded 50 bets per minute threshold' },
        { type: 'pattern' as const, message: 'Unusual betting pattern detected', details: 'Consistent max bet followed by min bet pattern' },
        { type: 'fraud' as const, message: 'Potential fraud activity', details: 'Multiple accounts from same device detected' },
        { type: 'limit' as const, message: 'Betting limit exceeded', details: 'Single bet exceeded market maximum of $1000' },
        { type: 'geo' as const, message: 'Geo-location violation', details: 'Player IP changed countries mid-session' }
      ];

      const mockData: AlertItem[] = [];
      const now = new Date();

      for (let i = 0; i < 12; i++) {
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const severity = ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as AlertItem['severity'];
        
        mockData.push({
          id: `alert-${i}`,
          timestamp: new Date(now.getTime() - Math.random() * 1800000),
          severity,
          type: alertType.type,
          playerId: `P${1000 + i}`,
          playerName: `Player ${i + 1}`,
          operatorName: ['BetKing Casino', 'Lucky Spins', 'Royal Gaming'][i % 3],
          message: alertType.message,
          details: alertType.details,
          acknowledged: Math.random() > 0.6
        });
      }

      return mockData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    setAlerts(generateMockAlerts());
    const interval = setInterval(() => {
      setAlerts(prev => {
        const newAlerts = generateMockAlerts();
        return newAlerts;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
  };

  const filteredAlerts = filter === 'unacknowledged' 
    ? alerts.filter(a => !a.acknowledged)
    : alerts;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'velocity': return '⚡';
      case 'pattern': return '📊';
      case 'fraud': return '🚨';
      case 'limit': return '⚠️';
      case 'geo': return '🌍';
      default: return '•';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Button
          variant={filter === 'unacknowledged' ? 'default' : 'outline'}
          onClick={() => setFilter('unacknowledged')}
          size="sm"
        >
          Unacknowledged ({alerts.filter(a => !a.acknowledged).length})
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All Alerts ({alerts.length})
        </Button>
        <div className="ml-auto">
          <Badge variant="destructive" className="animate-pulse">
            {alerts.filter(a => !a.acknowledged && a.severity === 'critical').length} Critical
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        {filteredAlerts.map((alert) => (
          <Alert 
            key={alert.id} 
            className={`border-l-4 ${
              alert.severity === 'critical' ? 'border-l-red-500' :
              alert.severity === 'high' ? 'border-l-orange-500' :
              alert.severity === 'medium' ? 'border-l-yellow-500' :
              'border-l-blue-500'
            } ${alert.acknowledged ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{getTypeIcon(alert.type)}</span>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{alert.type}</Badge>
                  <span className="text-xs text-gray-400">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <AlertDescription>
                  <div className="font-semibold text-[#EAEAEA]">{alert.message}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Player: {alert.playerName} ({alert.playerId}) | Operator: {alert.operatorName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{alert.details}</div>
                </AlertDescription>
              </div>
              <div className="flex gap-2">
                {!alert.acknowledged && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAcknowledge(alert.id)}
                  >
                    Acknowledge
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  Investigate
                </Button>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
