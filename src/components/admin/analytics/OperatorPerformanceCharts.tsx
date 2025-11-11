import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ComposedChart, Area } from 'recharts';

const revenueData = [
  { operator: 'Operator A', revenue: 456000, players: 1234, avgRevPerPlayer: 369.53, growth: 12.5 },
  { operator: 'Operator B', revenue: 389000, players: 987, avgRevPerPlayer: 394.13, growth: 8.3 },
  { operator: 'Operator C', revenue: 567000, players: 1567, avgRevPerPlayer: 361.78, growth: 15.7 },
  { operator: 'Operator D', revenue: 234000, players: 678, avgRevPerPlayer: 345.13, growth: -3.2 },
  { operator: 'Operator E', revenue: 312000, players: 892, avgRevPerPlayer: 349.78, growth: 6.8 },
];

const performanceTrendData = [
  { month: 'Jan', operatorA: 423000, operatorB: 367000, operatorC: 512000 },
  { month: 'Feb', operatorA: 445000, operatorB: 378000, operatorC: 534000 },
  { month: 'Mar', operatorA: 456000, operatorB: 389000, operatorC: 567000 },
];

const complianceData = [
  { operator: 'Operator A', complianceScore: 98, incidents: 2, responseTime: 4.2 },
  { operator: 'Operator B', complianceScore: 95, incidents: 5, responseTime: 6.8 },
  { operator: 'Operator C', complianceScore: 99, incidents: 1, responseTime: 3.1 },
  { operator: 'Operator D', complianceScore: 92, incidents: 8, responseTime: 8.5 },
  { operator: 'Operator E', complianceScore: 96, incidents: 4, responseTime: 5.3 },
];

const playerRetentionData = [
  { operator: 'Operator A', retention: 78, churn: 22, newPlayers: 234 },
  { operator: 'Operator B', retention: 72, churn: 28, newPlayers: 189 },
  { operator: 'Operator C', retention: 82, churn: 18, newPlayers: 312 },
  { operator: 'Operator D', retention: 68, churn: 32, newPlayers: 145 },
  { operator: 'Operator E', retention: 75, churn: 25, newPlayers: 198 },
];

export default function OperatorPerformanceCharts({ dateRange }: { dateRange: { from: Date; to: Date } }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Revenue Performance</CardTitle>
          <CardDescription>Operator revenue and player metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="operator" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" />
              <Line type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={2} />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Monthly revenue comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="operatorA" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="operatorB" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="operatorC" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Scores</CardTitle>
            <CardDescription>Operator compliance and incident tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="operator" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="complianceScore" fill="#10b981" />
                <Bar dataKey="incidents" fill="#ef4444" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Player Retention</CardTitle>
            <CardDescription>Retention rates and new player acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={playerRetentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="operator" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="retention" fill="#3b82f6" />
                <Bar dataKey="newPlayers" fill="#10b981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
