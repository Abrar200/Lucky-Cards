import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

interface MarketPaytablePanelProps {
  market: any;
  onUpdate: (field: string, value: any) => void;
}

const MarketPaytablePanel: React.FC<MarketPaytablePanelProps> = ({ market, onUpdate }) => {
  const paytable = market.paytable || {};
  const allowedProfiles = paytable.allowedProfiles || ['standard'];

  const toggleProfile = (profile: string) => {
    const updated = allowedProfiles.includes(profile)
      ? allowedProfiles.filter((p: string) => p !== profile)
      : [...allowedProfiles, profile];
    onUpdate('paytable', {...paytable, allowedProfiles: updated});
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-[#EAEAEA] mb-3 block">Allowed Paytable Profiles</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="standard"
              checked={allowedProfiles.includes('standard')}
              onCheckedChange={() => toggleProfile('standard')}
            />
            <label htmlFor="standard" className="text-[#EAEAEA] cursor-pointer">Standard RTP (94-96%)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="high-variance"
              checked={allowedProfiles.includes('high-variance')}
              onCheckedChange={() => toggleProfile('high-variance')}
            />
            <label htmlFor="high-variance" className="text-[#EAEAEA] cursor-pointer">High Variance RTP (92-94%)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="vip"
              checked={allowedProfiles.includes('vip')}
              onCheckedChange={() => toggleProfile('vip')}
            />
            <label htmlFor="vip" className="text-[#EAEAEA] cursor-pointer">VIP RTP Model (96-98%)</label>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-[#EAEAEA]">Enable 3-Card Mode</Label>
          <Switch 
            checked={paytable.enable3Card !== false}
            onCheckedChange={(checked) => onUpdate('paytable', {...paytable, enable3Card: checked})}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-[#EAEAEA]">Enable 5-Card Mode</Label>
          <Switch 
            checked={paytable.enable5Card !== false}
            onCheckedChange={(checked) => onUpdate('paytable', {...paytable, enable5Card: checked})}
          />
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6">
        <Label className="text-[#EAEAEA] mb-4 block">Max Multiplier Allowed per Bet Type</Label>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">3-Card Max Multiplier</Label>
            <Input 
              type="number"
              value={paytable.max3CardMultiplier || 1000} 
              onChange={(e) => onUpdate('paytable', {...paytable, max3CardMultiplier: parseFloat(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
          <div>
            <Label className="text-[#EAEAEA]/60 text-sm">5-Card Max Multiplier</Label>
            <Input 
              type="number"
              value={paytable.max5CardMultiplier || 5000} 
              onChange={(e) => onUpdate('paytable', {...paytable, max5CardMultiplier: parseFloat(e.target.value)})}
              className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPaytablePanel;
