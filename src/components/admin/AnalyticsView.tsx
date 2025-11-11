import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import PlayerBehaviorCharts from './analytics/PlayerBehaviorCharts';
import BettingTrendsCharts from './analytics/BettingTrendsCharts';
import RiskDistributionCharts from './analytics/RiskDistributionCharts';
import OperatorPerformanceCharts from './analytics/OperatorPerformanceCharts';

export default function AnalyticsView() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const exportData = (format: 'csv' | 'pdf') => {
    console.log(`Exporting analytics data as ${format.toUpperCase()}`);
    alert(`Exporting data as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Advanced data visualization and insights</p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, 'MMM dd, yyyy')} - {format(dateRange.to, 'MMM dd, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
          <Button variant="outline" onClick={() => exportData('csv')}>
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" onClick={() => exportData('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="player-behavior" className="space-y-4">
        <TabsList>
          <TabsTrigger value="player-behavior">Player Behavior</TabsTrigger>
          <TabsTrigger value="betting-trends">Betting Trends</TabsTrigger>
          <TabsTrigger value="risk-distribution">Risk Distribution</TabsTrigger>
          <TabsTrigger value="operator-performance">Operator Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="player-behavior" className="space-y-4">
          <PlayerBehaviorCharts dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="betting-trends" className="space-y-4">
          <BettingTrendsCharts dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="risk-distribution" className="space-y-4">
          <RiskDistributionCharts dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="operator-performance" className="space-y-4">
          <OperatorPerformanceCharts dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
