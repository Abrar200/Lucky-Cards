import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScheduleSlot {
  time: string;
  table: string;
  dealer: string;
  status: 'scheduled' | 'active' | 'break';
}

const DealerScheduleView: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState('Nov 11-17, 2025');
  
  const schedule: { [key: string]: ScheduleSlot[] } = {
    'Monday': [
      { time: '08:00-16:00', table: 'LC-001', dealer: 'Maria Santos', status: 'scheduled' },
      { time: '08:00-16:00', table: 'LC-002', dealer: 'John Chen', status: 'scheduled' },
      { time: '16:00-00:00', table: 'LC-001', dealer: 'Sofia Rodriguez', status: 'scheduled' },
    ],
    'Tuesday': [
      { time: '08:00-16:00', table: 'LC-001', dealer: 'Maria Santos', status: 'active' },
      { time: '08:00-16:00', table: 'LC-002', dealer: 'John Chen', status: 'active' },
      { time: '12:00-13:00', table: 'LC-001', dealer: 'Maria Santos', status: 'break' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'break': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brand-black">Dealer Schedule</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => {}}>
            <ChevronLeft size={16} />
          </Button>
          <span className="font-semibold text-brand-black">{currentWeek}</span>
          <Button variant="outline" size="sm" onClick={() => {}}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {Object.entries(schedule).map(([day, slots]) => (
          <Card key={day} className="border-brand-gold-mid/30">
            <CardHeader className="bg-gradient-to-r from-brand-gold-highlight/10 to-brand-gold-mid/10">
              <CardTitle className="text-lg text-brand-black">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {slots.map((slot, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(slot.status)} text-white`}>
                        {slot.status}
                      </Badge>
                      <div className="text-sm font-semibold text-brand-black">{slot.time}</div>
                      <div className="text-sm text-gray-600">{slot.table}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-brand-black">{slot.dealer}</span>
                      <Button size="sm" variant="ghost" className="text-brand-gold-deep hover:text-brand-gold-highlight">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-brand-gold-mid/30">
        <CardHeader>
          <CardTitle className="text-brand-black">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-brand-gold-highlight via-brand-gold-mid to-brand-gold-deep text-brand-black hover:opacity-90">
              Auto-Schedule Week
            </Button>
            <Button variant="outline" className="border-brand-gold-mid hover:bg-brand-gold-highlight/10">
              Export Schedule
            </Button>
            <Button variant="outline" className="border-brand-gold-mid hover:bg-brand-gold-highlight/10">
              Import Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerScheduleView;
