import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const riskScoreData = [
  { score: '0-20', players: 3421, percentage: 68.4, color: '#10b981' },
  { score: '21-40', players: 892, percentage: 17.8, color: '#3b82f6' },
  { score: '41-60', players: 456, percentage: 9.1, color: '#f59e0b' },
  { score: '61-80', players: 178, percentage: 3.6, color: '#ef4444' },
  { score: '81-100', players: 53, percentage: 1.1, color: '#dc2626' },
];

const flaggedActivityData = [
  { date: 'Week 1', velocityViolations: 12, unusualPatterns: 8, fraudAlerts: 3 },
  { date: 'Week 2', velocityViolations: 15, unusualPatterns: 11, fraudAlerts: 5 },
  { date: 'Week 3', velocityViolations: 9, unusualPatterns: 6, fraudAlerts: 2 },
  { date: 'Week 4', velocityViolations: 18, unusualPatterns: 14, fraudAlerts: 7 },
];

const riskFactorsData = [
  { factor: 'Velocity', score: 65 },
  { factor: 'Pattern', score: 45 },
  { factor: 'Fraud', score: 30 },
  { factor: 'Limits', score: 55 },
  { factor: 'Behavior', score: 40 },
];

const operatorRiskData = [
  { operator: 'Operator A', lowRisk: 890, mediumRisk: 123, highRisk: 34 },
  { operator: 'Operator B', lowRisk: 756, mediumRisk: 98, highRisk: 21 },
  { operator: 'Operator C', lowRisk: 1234, mediumRisk: 156, highRisk: 45 },
  { operator: 'Operator D', lowRisk: 567, mediumRisk: 87, highRisk: 19 },
];

export default function RiskDistributionCharts({ dateRange }: { dateRange: { from: Date; to: Date } }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk Score Distribution</CardTitle>
            <CardDescription>Player risk levels across platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <PieChart>
                <Pie data={riskScoreData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.score}: ${entry.percentage}%`} outerRadius={80} fill="#8884d8" dataKey="players">
                  {riskScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Factor Analysis</CardTitle>
            <CardDescription>Contributing risk factors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <RadarChart data={riskFactorsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis />
                <Radar name="Risk Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flagged Activity Trends</CardTitle>
          <CardDescription>Weekly alerts and violations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <LineChart data={flaggedActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="velocityViolations" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="unusualPatterns" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="fraudAlerts" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution by Operator</CardTitle>
          <CardDescription>Player risk levels per operator</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <BarChart data={operatorRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="operator" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="lowRisk" stackId="a" fill="#10b981" />
              <Bar dataKey="mediumRisk" stackId="a" fill="#f59e0b" />
              <Bar dataKey="highRisk" stackId="a" fill="#ef4444" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
