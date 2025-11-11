import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface CampaignModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (campaign: any) => void;
  campaign?: any;
}

export default function CampaignModal({ open, onClose, onSave, campaign }: CampaignModalProps) {
  const [formData, setFormData] = useState(campaign || {
    name: '',
    type: 'win',
    threshold: 5,
    rewardType: 'chips',
    rewardValue: '50',
    frequency: 'once-per-day',
    expiry: '5',
    markets: ['all']
  });

  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(campaign?.markets || ['all']);
  const markets = ['Asia Pacific', 'Europe', 'North America', 'Latin America', 'Middle East'];

  const handleSave = () => {
    onSave({
      ...formData,
      markets: selectedMarkets,
      id: campaign?.id || `campaign-${Date.now()}`,
      active: campaign?.active ?? true,
      triggersToday: campaign?.triggersToday || 0,
      conversionRate: campaign?.conversionRate || 0,
      ggrImpact: campaign?.ggrImpact || 0
    });
    onClose();
  };

  const toggleMarket = (market: string) => {
    if (market === 'all') {
      setSelectedMarkets(['all']);
    } else {
      const filtered = selectedMarkets.filter(m => m !== 'all');
      if (selectedMarkets.includes(market)) {
        const newMarkets = filtered.filter(m => m !== market);
        setSelectedMarkets(newMarkets.length === 0 ? ['all'] : newMarkets);
      } else {
        setSelectedMarkets([...filtered, market]);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{campaign ? 'Edit Campaign' : 'Create Streak Campaign'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Campaign Name</Label>
            <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="5-Win Hot Streak Bonus" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Streak Type</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="win">Win Streak</SelectItem>
                  <SelectItem value="loss">Loss Streak (Comeback)</SelectItem>
                  <SelectItem value="play">Play Streak (Continuous)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Threshold (Rounds)</Label>
              <Input type="number" value={formData.threshold} onChange={(e) => setFormData({...formData, threshold: parseInt(e.target.value)})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Reward Type</Label>
              <Select value={formData.rewardType} onValueChange={(v) => setFormData({...formData, rewardType: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="chips">Chips</SelectItem>
                  <SelectItem value="free-bet">Free Bet</SelectItem>
                  <SelectItem value="multiplier">Multiplier Boost</SelectItem>
                  <SelectItem value="xp">XP Points</SelectItem>
                  <SelectItem value="jackpot">Jackpot Ticket</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Reward Value</Label>
              <Input value={formData.rewardValue} onChange={(e) => setFormData({...formData, rewardValue: e.target.value})} placeholder="50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Frequency</Label>
              <Select value={formData.frequency} onValueChange={(v) => setFormData({...formData, frequency: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="once-per-day">Once Per Day</SelectItem>
                  <SelectItem value="once-per-session">Once Per Session</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Expiry (minutes)</Label>
              <Input type="number" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} />
            </div>
          </div>
          <div>
            <Label className="mb-3 block">Target Markets</Label>
            <div className="space-y-2 border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="all" checked={selectedMarkets.includes('all')} onCheckedChange={() => toggleMarket('all')} />
                <label htmlFor="all" className="text-sm font-medium">All Markets</label>
              </div>
              {markets.map(market => (
                <div key={market} className="flex items-center space-x-2">
                  <Checkbox id={market} checked={selectedMarkets.includes(market)} onCheckedChange={() => toggleMarket(market)} disabled={selectedMarkets.includes('all')} />
                  <label htmlFor={market} className="text-sm">{market}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Campaign</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
