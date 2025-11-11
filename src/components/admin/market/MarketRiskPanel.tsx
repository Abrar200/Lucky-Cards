import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface MarketRiskPanelProps {
  market: any;
  onUpdate: (field: string, value: any) => void;
}

const MarketRiskPanel: React.FC<MarketRiskPanelProps> = ({ market, onUpdate }) => {
  const risk = market.risk || {};

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-[#EAEAEA]">Max Accounts Per Device</Label>
        <Input 
          type="number"
          value={risk.maxAccountsPerDevice || 3} 
          onChange={(e) => onUpdate('risk', {...risk, maxAccountsPerDevice: parseInt(e.target.value)})}
          className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] w-64"
        />
      </div>

      <div className="border-t border-[#2B2B2B] pt-6">
        <Label className="text-[#EAEAEA] mb-4 block">Velocity Rules</Label>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">Max Bets per Minute</Label>
            <Input 
              type="number"
              value={risk.maxBetsPerMinute || 30} 
              onChange={(e) => onUpdate('risk', {...risk, maxBetsPerMinute: parseInt(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">Suspicious Play Threshold</Label>
            <Input 
              type="number"
              value={risk.suspiciousThreshold || 100} 
              onChange={(e) => onUpdate('risk', {...risk, suspiciousThreshold: parseInt(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6">
        <Label className="text-[#EAEAEA] mb-3 block">IP/Geo Enforcement</Label>
        <Textarea 
          placeholder="Enter blocked countries (comma-separated): e.g., US, UK, FR"
          value={risk.blockedCountries || ''}
          onChange={(e) => onUpdate('risk', {...risk, blockedCountries: e.target.value})}
          className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] min-h-20"
        />
      </div>

      <div className="border-t border-[#2B2B2B] pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-[#EAEAEA]">Bonus/Streak Reward Suppression</Label>
            <p className="text-xs text-[#EAEAEA]/60 mt-1">Disable rewards for suspicious accounts</p>
          </div>
          <Switch 
            checked={risk.rewardSuppression || false}
            onCheckedChange={(checked) => onUpdate('risk', {...risk, rewardSuppression: checked})}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-[#EAEAEA]">Shared Blacklist Across Operators</Label>
            <p className="text-xs text-[#EAEAEA]/60 mt-1">Share fraud data within market</p>
          </div>
          <Switch 
            checked={risk.sharedBlacklist !== false}
            onCheckedChange={(checked) => onUpdate('risk', {...risk, sharedBlacklist: checked})}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketRiskPanel;
