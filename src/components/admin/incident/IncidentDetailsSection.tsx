import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function IncidentDetailsSection({ formData, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Incident Details</h3>
      
      <div>
        <Label>Incident Title *</Label>
        <Input value={formData.title} onChange={(e) => onChange('title', e.target.value)} placeholder="e.g., Jackpot counter not updating" />
      </div>

      <div>
        <Label>Incident Type *</Label>
        <Select value={formData.type} onValueChange={(v) => onChange('type', v)}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            {['Game', 'Jackpot', 'Streaks', 'Payments', 'Wallet', 'FX', 'Market Config', 'Language', 'Performance', 'Security', 'Compliance', 'Other'].map(t => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Severity Level *</Label>
        <Select value={formData.severity} onValueChange={(v) => onChange('severity', v)}>
          <SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="SEV-1">SEV-1 (Critical)</SelectItem>
            <SelectItem value="SEV-2">SEV-2 (Major)</SelectItem>
            <SelectItem value="SEV-3">SEV-3 (Minor)</SelectItem>
            <SelectItem value="SEV-4">SEV-4 (Informational)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Assigned Owner *</Label>
        <Input value={formData.owner} onChange={(e) => onChange('owner', e.target.value)} placeholder="Current user" />
      </div>

      <div>
        <Label>Description *</Label>
        <Textarea value={formData.description} onChange={(e) => onChange('description', e.target.value)} placeholder="Clear explanation of the issue..." rows={4} />
      </div>
    </div>
  );
}