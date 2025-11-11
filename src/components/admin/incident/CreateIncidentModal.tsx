import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { IncidentDetailsSection } from './IncidentDetailsSection';
import { ScopeSection } from './ScopeSection';
import { TimeWindowSection } from './TimeWindowSection';
import { ImpactFiltersSection } from './ImpactFiltersSection';
import { CompensationSection } from './CompensationSection';
import { CommunicationSection } from './CommunicationSection';
import { AttachmentsSection } from './AttachmentsSection';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CreateIncidentModal({ open, onClose, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    severity: '',
    owner: 'Current User',
    description: '',
    operators: [],
    markets: [],
    games: [],
    platforms: [],
    currencies: [],
    languages: [],
    startTime: '',
    endTime: '',
    ongoing: false,
    playerIds: '',
    vipTier: 'all',
    minBet: '',
    roundIds: '',
    compensationEnabled: false,
    compensationType: '',
    amountMode: '',
    maxCap: '',
    approvalRequired: false,
    notifyOperators: false,
    notifyPlayers: false,
    messageText: '',
    files: [],
    links: []
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.type || !formData.severity || !formData.description || !formData.startTime) {
      alert('Please fill in all required fields (Title, Type, Severity, Description, Start Time)');
      return;
    }
    if (formData.operators.length === 0) {
      alert('Please select at least one operator');
      return;
    }
    if (!formData.ongoing && !formData.endTime) {
      alert('Please enter an end time or mark the incident as ongoing');
      return;
    }
    if (formData.compensationEnabled && (!formData.compensationType || !formData.amountMode || !formData.maxCap)) {
      alert('Please complete compensation settings (Type, Amount Mode, and Max Cap are required)');
      return;
    }
    if (formData.notifyPlayers && !formData.messageText) {
      alert('Please enter message text for player notifications');
      return;
    }


    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Incident</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <IncidentDetailsSection formData={formData} onChange={handleChange} />
            <Separator />
            <ScopeSection formData={formData} onChange={handleChange} />
            <Separator />
            <TimeWindowSection formData={formData} onChange={handleChange} />
            <Separator />
            <ImpactFiltersSection formData={formData} onChange={handleChange} />
            <Separator />
            <CompensationSection formData={formData} onChange={handleChange} />
            <Separator />
            <CommunicationSection formData={formData} onChange={handleChange} />
            <Separator />
            <AttachmentsSection formData={formData} onChange={handleChange} />
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Incident</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}