import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const sessionData = [
  { hour: '00:00', sessions: 45, avgDuration: 12 },
  { hour: '04:00', sessions: 23, avgDuration: 8 },
  { hour: '08:00', sessions: 67, avgDuration: 15 },
  { hour: '12:00', sessions: 134, avgDuration: 22 },
  { hour: '16:00', sessions: 189, avgDuration: 28 },
  { hour: '20:00', sessions: 245, avgDuration: 35 },
  { hour: '23:00', sessions: 178, avgDuration: 25 },
];

const deviceData = [
  { name: 'Desktop', value: 45, color: '#3b82f6' },
  { name: 'Mobile', value: 38, color: '#10b981' },
  { name: 'Tablet', value: 17, color: '#f59e0b' },
];

const engagementData = [
  { segment: 'High Rollers', players: 234, avgBet: 500, sessions: 1245 },
  { segment: 'Regular', players: 1456, avgBet: 50, sessions: 8934 },
  { segment: 'Casual', players: 3421, avgBet: 10, sessions: 5678 },
  { segment: 'New', players: 892, avgBet: 15, sessions: 1234 },
];

const chartConfig = {
  sessions: { label: 'Sessions', color: '#3b82f6' },
  avgDuration: { label: 'Avg Duration (min)', color: '#10b981' },
};

export default function PlayerBehaviorCharts({ dateRange }: { dateRange: { from: Date; to: Date } }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session Activity by Time</CardTitle>
            <CardDescription>Player sessions throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={2} />
                <Line type="monotone" dataKey="avgDuration" stroke="var(--color-avgDuration)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Player device preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Engagement by Segment</CardTitle>
          <CardDescription>Behavior patterns across player segments</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="players" fill="#3b82f6" />
              <Bar dataKey="sessions" fill="#10b981" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
