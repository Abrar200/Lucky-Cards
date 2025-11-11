import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface MarketFXPanelProps {
  market: any;
  onUpdate: (field: string, value: any) => void;
}

const MarketFXPanel: React.FC<MarketFXPanelProps> = ({ market, onUpdate }) => {
  const fx = market.fx || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-[#EAEAEA]">FX Source</Label>
          <Select value={fx.source || 'openexchangerates'} onValueChange={(v) => onUpdate('fx', {...fx, source: v})}>
            <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openexchangerates">OpenExchangeRates</SelectItem>
              <SelectItem value="xe">XE API</SelectItem>
              <SelectItem value="bank">Bank Settlement Feed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-[#EAEAEA]">FX Snapshot Frequency</Label>
          <Select value={fx.frequency || '4h'} onValueChange={(v) => onUpdate('fx', {...fx, frequency: v})}>
            <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="4h">4 Hours</SelectItem>
              <SelectItem value="12h">12 Hours</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-[#EAEAEA]">Base Reporting Currency</Label>
          <Select value={fx.baseCurrency || 'USD'} onValueChange={(v) => onUpdate('fx', {...fx, baseCurrency: v})}>
            <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-[#EAEAEA]">Local Market Financial Reports</Label>
            <p className="text-xs text-[#EAEAEA]/60 mt-1">Generate reports in local currency</p>
          </div>
          <Switch 
            checked={fx.localReports !== false}
            onCheckedChange={(checked) => onUpdate('fx', {...fx, localReports: checked})}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-[#EAEAEA]">Auto-Generate Monthly Compliance Packet</Label>
            <p className="text-xs text-[#EAEAEA]/60 mt-1">Automated regulatory reporting</p>
          </div>
          <Switch 
            checked={fx.autoCompliance !== false}
            onCheckedChange={(checked) => onUpdate('fx', {...fx, autoCompliance: checked})}
          />
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6">
        <Label className="text-[#EAEAEA] mb-3 block">Current FX Rates (Last Updated: 2 hours ago)</Label>
        <div className="grid grid-cols-3 gap-4">
          {['EUR', 'GBP', 'JPY', 'CNY', 'SGD', 'AUD'].map(currency => (
            <div key={currency} className="bg-[#0F1011] p-3 rounded border border-[#2B2B2B]">
              <p className="text-[#F4C339] font-semibold">{currency}/USD</p>
              <p className="text-[#EAEAEA] text-lg">{(Math.random() * 2 + 0.5).toFixed(4)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketFXPanel;
