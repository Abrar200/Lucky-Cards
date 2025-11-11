import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function ImpactFiltersSection({ formData, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-lg">Impact Filters (Optional)</h3>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-4 mt-4">
        <div>
          <Label>Filter by Player IDs</Label>
          <Input 
            value={formData.playerIds} 
            onChange={(e) => onChange('playerIds', e.target.value)} 
            placeholder="Comma-separated player IDs or paste CSV" 
          />
        </div>

        <div>
          <Label>Filter by VIP Tier</Label>
          <Select value={formData.vipTier} onValueChange={(v) => onChange('vipTier', v)}>
            <SelectTrigger><SelectValue placeholder="All tiers" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="new">New Player</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Minimum Bet Amount</Label>
          <Input 
            type="number" 
            value={formData.minBet} 
            onChange={(e) => onChange('minBet', e.target.value)} 
            placeholder="0.00" 
          />
        </div>

        <div>
          <Label>Round ID Filter</Label>
          <Input 
            value={formData.roundIds} 
            onChange={(e) => onChange('roundIds', e.target.value)} 
            placeholder="Comma-separated round IDs" 
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}