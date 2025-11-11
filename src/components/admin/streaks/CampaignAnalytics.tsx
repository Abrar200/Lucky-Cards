import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CampaignAnalyticsProps {
  campaign: any;
}

export default function CampaignAnalytics({ campaign }: CampaignAnalyticsProps) {
  const triggerData = [
    { date: 'Mon', triggers: 45, conversions: 38 },
    { date: 'Tue', triggers: 52, conversions: 44 },
    { date: 'Wed', triggers: 48, conversions: 41 },
    { date: 'Thu', triggers: 61, conversions: 53 },
    { date: 'Fri', triggers: 73, conversions: 65 },
    { date: 'Sat', triggers: 89, conversions: 78 },
    { date: 'Sun', triggers: 67, conversions: 59 }
  ];

  const betSizeData = [
    { period: 'Before', avgBet: 25 },
    { period: 'During', avgBet: 42 },
    { period: 'After', avgBet: 38 }
  ];

  const retentionData = [
    { name: 'Stayed & Played', value: 78, color: '#10b981' },
    { name: 'Left Session', value: 22, color: '#ef4444' }
  ];

  const ggrImpactData = [
    { week: 'Week 1', baseline: 12500, withCampaign: 15200 },
    { week: 'Week 2', baseline: 13100, withCampaign: 16800 },
    { week: 'Week 3', baseline: 12800, withCampaign: 17100 },
    { week: 'Week 4', baseline: 13400, withCampaign: 18300 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Triggers</p>
          <p className="text-2xl font-bold">435</p>
          <p className="text-xs text-green-500">+12% vs last week</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
          <p className="text-2xl font-bold">87.4%</p>
          <p className="text-xs text-green-500">+5.2% improvement</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Session Extension</p>
          <p className="text-2xl font-bold">+18min</p>
          <p className="text-xs text-muted-foreground">per triggered player</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">GGR Impact</p>
          <p className="text-2xl font-bold text-green-500">+$24.7k</p>
          <p className="text-xs text-muted-foreground">this month</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Triggers & Conversions (7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={triggerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="triggers" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Player Retention Impact</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={retentionData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {retentionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Avg Bet Size Impact</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={betSizeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgBet" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">GGR Comparison (4 Weeks)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ggrImpactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="baseline" fill="#94a3b8" name="Baseline" />
              <Bar dataKey="withCampaign" fill="#10b981" name="With Campaign" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
