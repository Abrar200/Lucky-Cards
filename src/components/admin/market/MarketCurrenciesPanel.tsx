import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface MarketCurrenciesPanelProps {
  market: any;
  onUpdate: (field: string, value: any) => void;
}

const currencies = ['USD', 'EUR', 'GBP', 'PHP', 'MYR', 'IDR', 'THB', 'JPY', 'KRW', 'CNY', 'HKD', 'SGD', 'AUD'];

const MarketCurrenciesPanel: React.FC<MarketCurrenciesPanelProps> = ({ market, onUpdate }) => {
  const allowedCurrencies = market.allowedCurrencies || ['EUR'];
  
  const toggleCurrency = (currency: string) => {
    const updated = allowedCurrencies.includes(currency)
      ? allowedCurrencies.filter((c: string) => c !== currency)
      : [...allowedCurrencies, currency];
    onUpdate('allowedCurrencies', updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-[#EAEAEA] mb-3 block">Primary Market Currency</Label>
        <Select value={market.primaryCurrency} onValueChange={(v) => onUpdate('primaryCurrency', v)}>
          <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-[#EAEAEA] mb-3 block">Allowed Local Display Currencies</Label>
        <div className="grid grid-cols-4 gap-4">
          {currencies.map(currency => (
            <div key={currency} className="flex items-center space-x-2">
              <Checkbox 
                id={currency}
                checked={allowedCurrencies.includes(currency)}
                onCheckedChange={() => toggleCurrency(currency)}
              />
              <label htmlFor={currency} className="text-sm text-[#EAEAEA] cursor-pointer">{currency}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6">
        <Label className="text-[#EAEAEA] mb-4 block">Min/Max Bet Limits per Currency</Label>
        <div className="space-y-3">
          {allowedCurrencies.map((currency: string) => (
            <div key={currency} className="flex items-center gap-4">
              <span className="text-[#F4C339] font-semibold w-16">{currency}</span>
              <Input 
                placeholder="Min Bet" 
                className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] w-32"
              />
              <span className="text-[#EAEAEA]/60">to</span>
              <Input 
                placeholder="Max Bet" 
                className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] w-32"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketCurrenciesPanel;
