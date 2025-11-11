import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface MarketLanguagesPanelProps {
  market: any;
  onUpdate: (field: string, value: any) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Chinese Simplified' },
  { code: 'zh-TW', name: 'Chinese Traditional' },
  { code: 'ja', name: 'Japanese' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ms', name: 'Malay' },
  { code: 'id', name: 'Indonesian' },
  { code: 'es', name: 'Spanish' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ru', name: 'Russian' },
];

const MarketLanguagesPanel: React.FC<MarketLanguagesPanelProps> = ({ market, onUpdate }) => {
  const availableLanguages = market.availableLanguages || ['en'];
  
  const toggleLanguage = (code: string) => {
    const updated = availableLanguages.includes(code)
      ? availableLanguages.filter((l: string) => l !== code)
      : [...availableLanguages, code];
    onUpdate('availableLanguages', updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-[#EAEAEA] mb-3 block">Default UI Language for Market</Label>
        <Select value={market.defaultLanguage || 'en'} onValueChange={(v) => onUpdate('defaultLanguage', v)}>
          <SelectTrigger className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map(lang => <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-[#EAEAEA] mb-3 block">Available Languages</Label>
        <div className="grid grid-cols-3 gap-4">
          {languages.map(lang => (
            <div key={lang.code} className="flex items-center space-x-2">
              <Checkbox 
                id={lang.code}
                checked={availableLanguages.includes(lang.code)}
                onCheckedChange={() => toggleLanguage(lang.code)}
              />
              <label htmlFor={lang.code} className="text-sm text-[#EAEAEA] cursor-pointer">{lang.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#2B2B2B] pt-6 space-y-4">
        <div>
          <Label className="text-[#EAEAEA] mb-2 block">Responsible Gaming Notice</Label>
          <Textarea 
            placeholder="Default text for responsible gaming warnings..."
            className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] min-h-24"
          />
        </div>
        <div>
          <Label className="text-[#EAEAEA] mb-2 block">Legal Disclaimer</Label>
          <Textarea 
            placeholder="Default legal disclaimer text..."
            className="bg-[#0F1011] border-[#2B2B2B] text-[#EAEAEA] min-h-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MarketLanguagesPanel;
