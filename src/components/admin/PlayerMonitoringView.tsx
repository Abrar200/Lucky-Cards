import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ActiveSessionsPanel from './monitoring/ActiveSessionsPanel';
import AlertsPanel from './monitoring/AlertsPanel';
import PlayerSessionDetail from './monitoring/PlayerSessionDetail';
import SuspiciousActivityPanel from './monitoring/SuspiciousActivityPanel';

const PlayerMonitoringView: React.FC = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  if (selectedSessionId) {
    return (
      <PlayerSessionDetail 
        sessionId={selectedSessionId} 
        onBack={() => setSelectedSessionId(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F4C339] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Real-Time Player Monitoring
        </h1>
        <p className="text-[#EAEAEA]">
          Monitor active sessions, detect suspicious activity, and track betting patterns in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#EAEAEA]">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#F4C339]">247</div>
            <div className="text-xs text-gray-400 mt-1">+12 in last 5 min</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#EAEAEA]">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">8</div>
            <div className="text-xs text-gray-400 mt-1">3 critical</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#EAEAEA]">Flagged Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">15</div>
            <div className="text-xs text-gray-400 mt-1">Pending review</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#EAEAEA]">Total Bets/Min</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">1,247</div>
            <div className="text-xs text-gray-400 mt-1">Across all operators</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="bg-[#2B2B2B]">
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
          <TabsTrigger value="suspicious">Suspicious Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
            <CardHeader>
              <CardTitle className="text-[#EAEAEA]">Live Player Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <ActiveSessionsPanel onViewSession={setSelectedSessionId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
            <CardHeader>
              <CardTitle className="text-[#EAEAEA]">Real-Time Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertsPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspicious" className="mt-4">
          <Card className="bg-[#1E1E1E] border-[#2B2B2B]">
            <CardHeader>
              <CardTitle className="text-[#EAEAEA]">Suspicious Activity Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <SuspiciousActivityPanel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerMonitoringView;
