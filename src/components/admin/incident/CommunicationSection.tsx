import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function CommunicationSection({ formData, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-lg">Communication Strategy (Optional)</h3>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-4 mt-4">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={formData.notifyOperators} 
            onCheckedChange={(checked) => onChange('notifyOperators', checked)} 
          />
          <Label>Notify Operators</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={formData.notifyPlayers} 
            onCheckedChange={(checked) => onChange('notifyPlayers', checked)} 
          />
          <Label>Notify Players</Label>
        </div>

        {formData.notifyPlayers && (
          <div>
            <Label>Message Text (English) *</Label>
            <Textarea 
              value={formData.messageText} 
              onChange={(e) => onChange('messageText', e.target.value)} 
              placeholder="Enter notification message for players..." 
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              System will pull translations for other languages from the Multi-Language System
            </p>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}