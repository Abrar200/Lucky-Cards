import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, Star, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BetDenomination {
  id: string;
  value: number;
  currency: string;
  enabled: boolean;
  isDefault: boolean;
  minBet: number;
  maxBet: number;
  markets: string[];
  operators: string[];
}

const BetDenominationsView: React.FC = () => {
  const { toast } = useToast();
  const [denominations, setDenominations] = useState<BetDenomination[]>([
    { id: '1', value: 0.10, currency: 'USD', enabled: true, isDefault: false, minBet: 0.10, maxBet: 10, markets: ['Global'], operators: ['All'] },
    { id: '2', value: 0.25, currency: 'USD', enabled: true, isDefault: false, minBet: 0.25, maxBet: 25, markets: ['Global'], operators: ['All'] },
    { id: '3', value: 0.50, currency: 'USD', enabled: true, isDefault: true, minBet: 0.50, maxBet: 50, markets: ['Global'], operators: ['All'] },
    { id: '4', value: 1.00, currency: 'USD', enabled: true, isDefault: false, minBet: 1.00, maxBet: 100, markets: ['Global'], operators: ['All'] },
    { id: '5', value: 2.00, currency: 'USD', enabled: true, isDefault: false, minBet: 2.00, maxBet: 200, markets: ['Global'], operators: ['All'] },
    { id: '6', value: 5.00, currency: 'USD', enabled: true, isDefault: false, minBet: 5.00, maxBet: 500, markets: ['Global'], operators: ['All'] },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDenom, setEditingDenom] = useState<BetDenomination | null>(null);
  const [formData, setFormData] = useState({
    value: '',
    currency: 'USD',
    minBet: '',
    maxBet: '',
    markets: 'Global',
    operators: 'All'
  });

  const handleCreate = () => {
    setEditingDenom(null);
    setFormData({ value: '', currency: 'USD', minBet: '', maxBet: '', markets: 'Global', operators: 'All' });
    setModalOpen(true);
  };

  const handleEdit = (denom: BetDenomination) => {
    setEditingDenom(denom);
    setFormData({
      value: denom.value.toString(),
      currency: denom.currency,
      minBet: denom.minBet.toString(),
      maxBet: denom.maxBet.toString(),
      markets: denom.markets[0],
      operators: denom.operators[0]
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingDenom) {
      setDenominations(prev => prev.map(d => 
        d.id === editingDenom.id 
          ? { ...d, value: parseFloat(formData.value), currency: formData.currency, minBet: parseFloat(formData.minBet), maxBet: parseFloat(formData.maxBet) }
          : d
      ));
      toast({ title: 'Denomination updated successfully' });
    } else {
      const newDenom: BetDenomination = {
        id: Date.now().toString(),
        value: parseFloat(formData.value),
        currency: formData.currency,
        enabled: true,
        isDefault: false,
        minBet: parseFloat(formData.minBet),
        maxBet: parseFloat(formData.maxBet),
        markets: [formData.markets],
        operators: [formData.operators]
      };
      setDenominations(prev => [...prev, newDenom]);
      toast({ title: 'Denomination created successfully' });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setDenominations(prev => prev.filter(d => d.id !== id));
    toast({ title: 'Denomination deleted' });
  };

  const handleToggle = (id: string) => {
    setDenominations(prev => prev.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d));
  };

  const handleSetDefault = (id: string) => {
    setDenominations(prev => prev.map(d => ({ ...d, isDefault: d.id === id })));
    toast({ title: 'Default denomination updated' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bet Denominations</h1>
          <p className="text-muted-foreground mt-1">Manage available bet options for players</p>
        </div>
        <Button onClick={handleCreate} className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" /> Add Denomination
        </Button>
      </div>

      <div className="grid gap-4">
        {denominations.map((denom) => (
          <Card key={denom.id} className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold text-white">{denom.value.toFixed(2)}</span>
                  <span className="text-muted-foreground">{denom.currency}</span>
                </div>
                {denom.isDefault && (
                  <Badge variant="default" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                    <Star className="mr-1 h-3 w-3" /> Default
                  </Badge>
                )}
                <Badge variant={denom.enabled ? "default" : "secondary"}>
                  {denom.enabled ? 'Active' : 'Disabled'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Min: {denom.minBet} | Max: {denom.maxBet}
                </div>
                <Switch checked={denom.enabled} onCheckedChange={() => handleToggle(denom.id)} />
                <Button variant="ghost" size="sm" onClick={() => handleSetDefault(denom.id)}>
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(denom)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(denom.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>{editingDenom ? 'Edit' : 'Create'} Bet Denomination</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Denomination Value</label>
              <Input type="number" step="0.01" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Currency</label>
              <Select value={formData.currency} onValueChange={(v) => setFormData({...formData, currency: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Min Bet</label>
                <Input type="number" step="0.01" value={formData.minBet} onChange={(e) => setFormData({...formData, minBet: e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Max Bet</label>
                <Input type="number" step="0.01" value={formData.maxBet} onChange={(e) => setFormData({...formData, maxBet: e.target.value})} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BetDenominationsView;
