import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const operators = ['BetMax Casino', 'Lucky Stars Gaming', 'Royal Flush Network', 'Golden Dragon Asia'];
const markets = ['EU', 'APAC', 'North America', 'Middle East', 'Latin America'];
const games = ['Lucky Cards Global', 'Lucky Cards Local', 'Mystery Jackpot Version'];
const platforms = ['Web', 'iOS', 'Android', 'Desktop', 'Physical Terminal'];
const currencies = ['USD', 'EUR', 'GBP', 'THB', 'JPY', 'CNY'];
const languages = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'th', 'ko'];

export function ScopeSection({ formData, onChange }: Props) {
  const toggleItem = (field: string, item: string) => {
    const current = formData[field] || [];
    const updated = current.includes(item) ? current.filter((i: string) => i !== item) : [...current, item];
    onChange(field, updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Scope / Affected Targets</h3>
      
      <div>
        <Label>Affected Operators *</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {operators.map(op => (
            <div key={op} className="flex items-center space-x-2">
              <Checkbox checked={formData.operators?.includes(op)} onCheckedChange={() => toggleItem('operators', op)} />
              <span className="text-sm">{op}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Affected Markets</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {markets.map(m => (
            <div key={m} className="flex items-center space-x-2">
              <Checkbox checked={formData.markets?.includes(m)} onCheckedChange={() => toggleItem('markets', m)} />
              <span className="text-sm">{m}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Affected Games</Label>
        <div className="space-y-2 mt-2">
          {games.map(g => (
            <div key={g} className="flex items-center space-x-2">
              <Checkbox checked={formData.games?.includes(g)} onCheckedChange={() => toggleItem('games', g)} />
              <span className="text-sm">{g}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Platforms Impacted</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {platforms.map(p => (
            <div key={p} className="flex items-center space-x-2">
              <Checkbox checked={formData.platforms?.includes(p)} onCheckedChange={() => toggleItem('platforms', p)} />
              <span className="text-sm">{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Currencies Impacted</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {currencies.map(c => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox checked={formData.currencies?.includes(c)} onCheckedChange={() => toggleItem('currencies', c)} />
              <span className="text-sm">{c}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Languages Impacted</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {languages.map(l => (
            <div key={l} className="flex items-center space-x-2">
              <Checkbox checked={formData.languages?.includes(l)} onCheckedChange={() => toggleItem('languages', l)} />
              <span className="text-sm">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}