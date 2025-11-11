import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MarketOverviewPanelProps {
  market: any;
  onUpdate: (field: string, value: any) => void;
}

const MarketOverviewPanel: React.FC<MarketOverviewPanelProps> = ({ market, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-[#EAEAEA]">Market Name</Label>
          <Input 
            value={market.name} 
            onChange={(e) => onUpdate('name', e.target.value)}
            className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
          />
        </div>
        <div>
          <Label className="text-[#EAEAEA]">Status</Label>
          <Select value={market.status} onValueChange={(v) => onUpdate('status', v)}>
            <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-[#EAEAEA]">Countries Included</Label>
        <Input 
          value={market.countries?.join(', ')} 
          onChange={(e) => onUpdate('countries', e.target.value.split(',').map((c: string) => c.trim()))}
          placeholder="USA, Canada, Mexico"
          className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-[#EAEAEA]">Primary Currency (Display Only)</Label>
          <Input 
            value={market.primaryCurrency} 
            disabled
            className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]/60"
          />
        </div>
        <div>
          <Label className="text-[#EAEAEA]">Time Zone Default</Label>
          <Select value={market.timezone} onValueChange={(v) => onUpdate('timezone', v)}>
            <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="America/New_York">EST</SelectItem>
              <SelectItem value="Europe/London">GMT</SelectItem>
              <SelectItem value="Asia/Singapore">SGT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-[#EAEAEA]">Licensed Jurisdiction ID</Label>
        <Input 
          value={market.jurisdictionId || ''} 
          onChange={(e) => onUpdate('jurisdictionId', e.target.value)}
          placeholder="e.g., MGA/B2C/123/2024"
          className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
        />
      </div>
    </div>
  );
};

export default MarketOverviewPanel;
