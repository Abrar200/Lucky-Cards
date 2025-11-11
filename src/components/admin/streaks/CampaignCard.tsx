import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TrendingUp, TrendingDown, Play, BarChart3, Edit, Trash2 } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'win' | 'loss' | 'play';
  threshold: number;
  rewardType: string;
  rewardValue: string;
  active: boolean;
  markets: string[];
  triggersToday: number;
  conversionRate: number;
  ggrImpact: number;
}

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, active: boolean) => void;
  onAnalytics: (campaign: Campaign) => void;
}

export default function CampaignCard({ campaign, onEdit, onDelete, onToggle, onAnalytics }: CampaignCardProps) {
  const typeIcons = {
    win: <TrendingUp className="h-5 w-5" />,
    loss: <TrendingDown className="h-5 w-5" />,
    play: <Play className="h-5 w-5" />
  };

  const typeColors = {
    win: 'bg-green-500/10 text-green-500',
    loss: 'bg-red-500/10 text-red-500',
    play: 'bg-blue-500/10 text-blue-500'
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${typeColors[campaign.type]}`}>
            {typeIcons[campaign.type]}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{campaign.name}</h3>
            <p className="text-sm text-muted-foreground">
              Trigger: {campaign.threshold} {campaign.type}s in a row
            </p>
          </div>
        </div>
        <Switch checked={campaign.active} onCheckedChange={(checked) => onToggle(campaign.id, checked)} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Reward</p>
          <p className="font-semibold">{campaign.rewardValue} {campaign.rewardType}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Markets</p>
          <p className="font-semibold">{campaign.markets.join(', ')}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground">Triggers Today</p>
          <p className="text-lg font-bold">{campaign.triggersToday}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Conversion</p>
          <p className="text-lg font-bold">{campaign.conversionRate}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">GGR Impact</p>
          <p className="text-lg font-bold text-green-500">+${campaign.ggrImpact}k</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onAnalytics(campaign)} className="flex-1">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(campaign)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(campaign.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
