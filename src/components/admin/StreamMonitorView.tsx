import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Wifi, Clock, AlertTriangle } from 'lucide-react';

interface StreamStatus {
  tableId: string;
  tableName: string;
  provider: string;
  status: 'excellent' | 'good' | 'poor' | 'offline';
  bitrate: string;
  fps: number;
  latency: string;
  lastDrop: string;
}

const StreamMonitorView: React.FC = () => {
  const streams: StreamStatus[] = [
    { tableId: 'LC-001', tableName: 'Lucky Cards Table 1', provider: 'Internal Studio', status: 'excellent', bitrate: '4.5 Mbps', fps: 60, latency: '120ms', lastDrop: 'None' },
    { tableId: 'LC-002', tableName: 'Lucky Cards Table 2', provider: 'Internal Studio', status: 'good', bitrate: '4.2 Mbps', fps: 60, latency: '145ms', lastDrop: '2 hours ago' },
    { tableId: 'BJ-001', tableName: 'Blackjack VIP', provider: 'Evolution Gaming', status: 'excellent', bitrate: '5.0 Mbps', fps: 60, latency: '95ms', lastDrop: 'None' },
    { tableId: 'BAC-001', tableName: 'Baccarat Premium', provider: 'Pragmatic Play', status: 'poor', bitrate: '2.8 Mbps', fps: 30, latency: '280ms', lastDrop: '15 min ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'poor': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brand-black">Stream Monitor</h1>
        <Badge className="bg-green-500 text-white">All Systems Operational</Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-brand-gold-mid/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Streams</p>
                <p className="text-3xl font-bold text-brand-gold-deep">4</p>
              </div>
              <Activity size={32} className="text-brand-gold-mid" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-gold-mid/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Bitrate</p>
                <p className="text-3xl font-bold text-brand-gold-deep">4.1</p>
              </div>
              <Wifi size={32} className="text-brand-gold-mid" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-gold-mid/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Latency</p>
                <p className="text-3xl font-bold text-brand-gold-deep">160ms</p>
              </div>
              <Clock size={32} className="text-brand-gold-mid" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-gold-mid/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Issues (24h)</p>
                <p className="text-3xl font-bold text-yellow-600">2</p>
              </div>
              <AlertTriangle size={32} className="text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {streams.map((stream) => (
          <Card key={stream.tableId} className="border-brand-gold-mid/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-brand-black">{stream.tableName}</CardTitle>
                <Badge className={`${getStatusColor(stream.status)} text-white`}>
                  {stream.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{stream.provider}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Bitrate</p>
                  <p className="text-lg font-semibold text-brand-black">{stream.bitrate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">FPS</p>
                  <p className="text-lg font-semibold text-brand-black">{stream.fps}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Latency</p>
                  <p className="text-lg font-semibold text-brand-black">{stream.latency}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Last Drop</p>
                  <p className="text-sm font-medium text-brand-black">{stream.lastDrop}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StreamMonitorView;
