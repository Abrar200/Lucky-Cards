import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function CompensationSection({ formData, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-lg">Compensation / Reimbursement (Optional)</h3>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-4 mt-4">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={formData.compensationEnabled} 
            onCheckedChange={(checked) => onChange('compensationEnabled', checked)} 
          />
          <Label>Enable Compensation</Label>
        </div>

        {formData.compensationEnabled && (
          <>
            <div>
              <Label>Compensation Type *</Label>
              <Select value={formData.compensationType} onValueChange={(v) => onChange('compensationType', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="free-chips">Free Chips</SelectItem>
                  <SelectItem value="bonus-money">Bonus Money</SelectItem>
                  <SelectItem value="free-spins">Free Spins</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Amount Mode *</Label>
              <Select value={formData.amountMode} onValueChange={(v) => onChange('amountMode', v)}>
                <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="percentage">% of Loss</SelectItem>
                  <SelectItem value="tiered">Tiered (by wager size)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Max Cap Per Player *</Label>
              <Input 
                type="number" 
                value={formData.maxCap} 
                onChange={(e) => onChange('maxCap', e.target.value)} 
                placeholder="e.g., 1000" 
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                checked={formData.approvalRequired} 
                onCheckedChange={(checked) => onChange('approvalRequired', checked)} 
              />
              <Label>Approval Required</Label>
            </div>
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}