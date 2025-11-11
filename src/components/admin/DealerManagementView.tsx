import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Clock, Languages, Award } from 'lucide-react';

interface Dealer {
  id: string;
  name: string;
  employeeId: string;
  status: 'on-shift' | 'break' | 'offline';
  skills: string[];
  languages: string[];
  assignedTables: string[];
}

const DealerManagementView: React.FC = () => {
  const [dealers] = useState<Dealer[]>([
    { id: '1', name: 'Maria Santos', employeeId: 'DLR-001', status: 'on-shift', skills: ['Lucky Cards', 'Blackjack'], languages: ['English', 'Spanish'], assignedTables: ['LC-001'] },
    { id: '2', name: 'John Chen', employeeId: 'DLR-002', status: 'on-shift', skills: ['Lucky Cards', 'Baccarat'], languages: ['English', 'Mandarin'], assignedTables: ['LC-002'] },
    { id: '3', name: 'Sofia Rodriguez', employeeId: 'DLR-003', status: 'on-shift', skills: ['Blackjack', 'Poker'], languages: ['English', 'Spanish', 'Portuguese'], assignedTables: ['BJ-001'] },
    { id: '4', name: 'Li Wei', employeeId: 'DLR-004', status: 'break', skills: ['Baccarat', 'Lucky Cards'], languages: ['English', 'Mandarin', 'Cantonese'], assignedTables: [] },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-shift': return 'bg-green-500';
      case 'break': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brand-black">Dealer Management</h1>
        <Button className="bg-gradient-to-r from-brand-gold-highlight via-brand-gold-mid to-brand-gold-deep text-brand-black hover:opacity-90">
          Add New Dealer
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {dealers.map((dealer) => (
          <Card key={dealer.id} className="border-brand-gold-mid/30">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <UserCircle size={48} className="text-brand-gold-deep" />
                  <div>
                    <h3 className="font-semibold text-lg text-brand-black">{dealer.name}</h3>
                    <p className="text-sm text-gray-600">{dealer.employeeId}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(dealer.status)}`}>
                  {dealer.status.toUpperCase()}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Award size={16} className="text-brand-gold-deep mt-1" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {dealer.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-brand-gold-mid text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Languages size={16} className="text-brand-gold-deep mt-1" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Languages</div>
                    <div className="flex flex-wrap gap-1">
                      {dealer.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock size={16} className="text-brand-gold-deep mt-1" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Assigned Tables</div>
                    <div className="text-sm font-semibold text-brand-black">
                      {dealer.assignedTables.length > 0 ? dealer.assignedTables.join(', ') : 'None'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1 border-brand-gold-mid hover:bg-brand-gold-highlight/10">
                  Assign Table
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-brand-gold-mid hover:bg-brand-gold-highlight/10">
                  Schedule
                </Button>
                {dealer.status === 'on-shift' && (
                  <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Break
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealerManagementView;
