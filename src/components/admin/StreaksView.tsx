import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, TrendingUp, Users, DollarSign } from 'lucide-react';
import CampaignCard from './streaks/CampaignCard';
import CampaignModal from './streaks/CampaignModal';
import CampaignAnalytics from './streaks/CampaignAnalytics';

export default function StreaksView() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 'campaign-1',
      name: '5-Win Hot Streak Bonus',
      type: 'win' as const,
      threshold: 5,
      rewardType: 'chips',
      rewardValue: '50',
      active: true,
      markets: ['APAC', 'EU'],
      triggersToday: 234,
      conversionRate: 87.4,
      ggrImpact: 24.7
    },
    {
      id: 'campaign-2',
      name: 'Comeback Bonus (3 Losses)',
      type: 'loss' as const,
      threshold: 3,
      rewardType: 'free-bet',
      rewardValue: '1',
      active: true,
      markets: ['All'],
      triggersToday: 189,
      conversionRate: 92.1,
      ggrImpact: 18.3
    },
    {
      id: 'campaign-3',
      name: '10-Play Marathon Reward',
      type: 'play' as const,
      threshold: 10,
      rewardType: 'multiplier',
      rewardValue: '2x',
      active: false,
      markets: ['APAC'],
      triggersToday: 67,
      conversionRate: 78.5,
      ggrImpact: 12.1
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [analyticsView, setAnalyticsView] = useState<any>(null);

  const handleSave = (campaign: any) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === campaign.id ? campaign : c));
    } else {
      setCampaigns([...campaigns, campaign]);
    }
    setEditingCampaign(null);
  };

  const handleEdit = (campaign: any) => {
    setEditingCampaign(campaign);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const handleToggle = (id: string, active: boolean) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, active } : c));
  };

  const totalTriggers = campaigns.reduce((sum, c) => sum + c.triggersToday, 0);
  const avgConversion = campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length;
  const totalGGR = campaigns.reduce((sum, c) => sum + c.ggrImpact, 0);

  if (analyticsView) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => setAnalyticsView(null)}>← Back</Button>
            <h2 className="text-3xl font-bold mt-2">{analyticsView.name}</h2>
            <p className="text-muted-foreground">Campaign Performance Analytics</p>
          </div>
        </div>
        <CampaignAnalytics campaign={analyticsView} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Streak Campaigns</h2>
          <p className="text-muted-foreground">Behavioral retention automation engine</p>
        </div>
        <Button onClick={() => { setEditingCampaign(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Triggers Today</p>
              <p className="text-3xl font-bold mt-2">{totalTriggers}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Conversion Rate</p>
              <p className="text-3xl font-bold mt-2">{avgConversion.toFixed(1)}%</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total GGR Impact</p>
              <p className="text-3xl font-bold mt-2 text-green-500">+${totalGGR.toFixed(1)}k</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Campaigns ({campaigns.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({campaigns.filter(c => c.active).length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({campaigns.filter(c => !c.active).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map(campaign => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onAnalytics={setAnalyticsView}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.filter(c => c.active).map(campaign => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onAnalytics={setAnalyticsView}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.filter(c => !c.active).map(campaign => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onAnalytics={setAnalyticsView}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CampaignModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingCampaign(null); }}
        onSave={handleSave}
        campaign={editingCampaign}
      />
    </div>
  );
}
