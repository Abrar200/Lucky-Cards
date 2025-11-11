import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface MarketRegulatoryPanelProps {
  market: any;
  onUpdate: (field: string, value: any) => void;
}

const MarketRegulatoryPanel: React.FC<MarketRegulatoryPanelProps> = ({ market, onUpdate }) => {
  const regulatory = market.regulatory || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-[#EAEAEA]">Required RNG Certification ID</Label>
          <Input 
            value={regulatory.rngCertId || ''} 
            onChange={(e) => onUpdate('regulatory', {...regulatory, rngCertId: e.target.value})}
            placeholder="e.g., GLI-19-123456"
            className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
          />
        </div>
        <div>
          <Label className="text-[#EAEAEA]">Game Version Certification Hash</Label>
          <Input 
            value={regulatory.certHash || ''} 
            onChange={(e) => onUpdate('regulatory', {...regulatory, certHash: e.target.value})}
            placeholder="SHA256 hash"
            className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
          />
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6">
        <Label className="text-[#EAEAEA] mb-4 block">Return-to-Player (RTP) Limits</Label>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">Min RTP %</Label>
            <Input 
              type="number"
              value={regulatory.minRTP || 92} 
              onChange={(e) => onUpdate('regulatory', {...regulatory, minRTP: parseFloat(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">Max RTP %</Label>
            <Input 
              type="number"
              value={regulatory.maxRTP || 98} 
              onChange={(e) => onUpdate('regulatory', {...regulatory, maxRTP: parseFloat(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6">
        <Label className="text-[#EAEAEA] mb-4 block">Betting Restrictions</Label>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">Max Single Bet</Label>
            <Input 
              type="number"
              value={regulatory.maxSingleBet || 10000} 
              onChange={(e) => onUpdate('regulatory', {...regulatory, maxSingleBet: parseFloat(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">Max Session Loss</Label>
            <Input 
              type="number"
              value={regulatory.maxSessionLoss || 50000} 
              onChange={(e) => onUpdate('regulatory', {...regulatory, maxSessionLoss: parseFloat(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-[#EAEAEA]">Enable Auto Self-Exclusion API Hooks</Label>
          <Switch checked={regulatory.autoSelfExclusion || false} />
        </div>
        <div>
          <Label className="text-[#EAEAEA] mb-2 block">Age Verification Mode</Label>
          <Select value={regulatory.ageVerification || 'operator'}>
            <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operator">Operator-side</SelectItem>
              <SelectItem value="market">Market-side</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MarketRegulatoryPanel;
