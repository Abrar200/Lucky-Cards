import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function TimeWindowSection({ formData, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Time Window</h3>
      
      <div>
        <Label>Start Time (UTC) *</Label>
        <Input 
          type="datetime-local" 
          value={formData.startTime} 
          onChange={(e) => onChange('startTime', e.target.value)} 
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch 
          checked={formData.ongoing} 
          onCheckedChange={(checked) => onChange('ongoing', checked)} 
        />
        <Label>Incident is Ongoing</Label>
      </div>

      {!formData.ongoing && (
        <div>
          <Label>End Time (UTC) *</Label>
          <Input 
            type="datetime-local" 
            value={formData.endTime} 
            onChange={(e) => onChange('endTime', e.target.value)} 
          />
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        System will automatically identify affected rounds, players, jackpots, and streak counters within this window.
      </p>
    </div>
  );
}