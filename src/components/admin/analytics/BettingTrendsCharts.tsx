import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const trendData = [
  { date: 'Jan 1', totalBets: 12450, totalWagered: 245000, avgBet: 19.68, rtp: 96.2 },
  { date: 'Jan 8', totalBets: 15230, totalWagered: 298000, avgBet: 19.57, rtp: 95.8 },
  { date: 'Jan 15', totalBets: 18900, totalWagered: 367000, avgBet: 19.42, rtp: 96.5 },
  { date: 'Jan 22', totalBets: 21450, totalWagered: 421000, avgBet: 19.63, rtp: 96.1 },
  { date: 'Jan 29', totalBets: 19800, totalWagered: 389000, avgBet: 19.65, rtp: 95.9 },
  { date: 'Feb 5', totalBets: 23100, totalWagered: 456000, avgBet: 19.74, rtp: 96.3 },
];

const betSizeData = [
  { range: '$1-$10', count: 45230, percentage: 58 },
  { range: '$11-$50', count: 23450, percentage: 30 },
  { range: '$51-$100', count: 6780, percentage: 9 },
  { range: '$101-$500', count: 1890, percentage: 2.4 },
  { range: '$500+', count: 450, percentage: 0.6 },
];

const gameTypeData = [
  { game: 'Slots', bets: 45600, wagered: 892000, rtp: 96.2 },
  { game: 'Blackjack', bets: 12300, wagered: 456000, rtp: 99.5 },
  { game: 'Roulette', bets: 8900, wagered: 234000, rtp: 97.3 },
  { game: 'Poker', bets: 5600, wagered: 178000, rtp: 98.1 },
  { game: 'Baccarat', bets: 3400, wagered: 123000, rtp: 98.9 },
];

const chartConfig = {
  totalWagered: { label: 'Total Wagered', color: '#3b82f6' },
  rtp: { label: 'RTP %', color: '#10b981' },
};

export default function BettingTrendsCharts({ dateRange }: { dateRange: { from: Date; to: Date } }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Betting Volume Over Time</CardTitle>
          <CardDescription>Total wagered amount and RTP trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area type="monotone" dataKey="totalWagered" stroke="var(--color-totalWagered)" fill="var(--color-totalWagered)" fillOpacity={0.3} />
              <Area type="monotone" dataKey="rtp" stroke="var(--color-rtp)" fill="var(--color-rtp)" fillOpacity={0.3} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bet Size Distribution</CardTitle>
            <CardDescription>Distribution of bet amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={betSizeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="range" type="category" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Game Type</CardTitle>
            <CardDescription>Betting activity and RTP by game</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={gameTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="bets" fill="#3b82f6" />
                <Bar dataKey="rtp" fill="#10b981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
