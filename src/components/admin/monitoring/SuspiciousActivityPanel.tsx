import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SuspiciousActivity {
  id: string;
  playerId: string;
  playerName: string;
  operatorName: string;
  activityType: string;
  severity: 'critical' | 'high' | 'medium';
  description: string;
  detectedAt: Date;
  autoFlagged: boolean;
  reviewed: boolean;
}

const SuspiciousActivityPanel: React.FC = () => {
  const [activities] = useState<SuspiciousActivity[]>([
    {
      id: 'sa-1',
      playerId: 'P1001',
      playerName: 'John Doe',
      operatorName: 'BetKing Casino',
      activityType: 'Multi-Accounting',
      severity: 'critical',
      description: 'Same device ID detected across 3 different player accounts',
      detectedAt: new Date(Date.now() - 300000),
      autoFlagged: true,
      reviewed: false
    },
    {
      id: 'sa-2',
      playerId: 'P1005',
      playerName: 'Jane Smith',
      operatorName: 'Lucky Spins',
      activityType: 'Velocity Abuse',
      severity: 'high',
      description: 'Exceeded 100 bets per minute for 5 consecutive minutes',
      detectedAt: new Date(Date.now() - 600000),
      autoFlagged: true,
      reviewed: false
    },
    {
      id: 'sa-3',
      playerId: 'P1012',
      playerName: 'Mike Johnson',
      operatorName: 'Royal Gaming',
      activityType: 'Betting Pattern',
      severity: 'high',
      description: 'Consistent martingale betting pattern detected',
      detectedAt: new Date(Date.now() - 900000),
      autoFlagged: true,
      reviewed: true
    },
    {
      id: 'sa-4',
      playerId: 'P1020',
      playerName: 'Sarah Williams',
      operatorName: 'BetKing Casino',
      activityType: 'Geo-Location',
      severity: 'medium',
      description: 'IP address changed from UK to Philippines mid-session',
      detectedAt: new Date(Date.now() - 1200000),
      autoFlagged: true,
      reviewed: false
    }
  ]);

  const [reviewedItems, setReviewedItems] = useState<Set<string>>(new Set());

  const handleReview = (id: string) => {
    setReviewedItems(prev => new Set(prev).add(id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader>
            <CardTitle className="text-[#EAEAEA] text-sm">Critical Flags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {activities.filter(a => a.severity === 'critical').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader>
            <CardTitle className="text-[#EAEAEA] text-sm">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">
              {activities.filter(a => !a.reviewed && !reviewedItems.has(a.id)).length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader>
            <CardTitle className="text-[#EAEAEA] text-sm">Auto-Flagged Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {activities.filter(a => a.autoFlagged).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const isReviewed = activity.reviewed || reviewedItems.has(activity.id);
          return (
            <Card key={activity.id} className={`bg-[#1E1E1E] border-[#2B2B2B] ${isReviewed ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getSeverityColor(activity.severity)}>
                        {activity.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{activity.activityType}</Badge>
                      {activity.autoFlagged && (
                        <Badge variant="secondary">Auto-Flagged</Badge>
                      )}
                      {isReviewed && (
                        <Badge className="bg-green-500">Reviewed</Badge>
                      )}
                    </div>
                    <div className="text-[#EAEAEA]">
                      <div className="font-semibold">{activity.playerName} ({activity.playerId})</div>
                      <div className="text-sm text-gray-400 mt-1">
                        Operator: {activity.operatorName}
                      </div>
                      <div className="text-sm mt-2">{activity.description}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        Detected: {activity.detectedAt.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!isReviewed && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReview(activity.id)}
                      >
                        Mark Reviewed
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Session
                    </Button>
                    <Button size="sm" variant="destructive">
                      Suspend
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SuspiciousActivityPanel;
