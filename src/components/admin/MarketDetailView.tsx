import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketOverviewPanel from './market/MarketOverviewPanel';
import MarketOperatorsPanel from './market/MarketOperatorsPanel';
import MarketCurrenciesPanel from './market/MarketCurrenciesPanel';
import MarketLanguagesPanel from './market/MarketLanguagesPanel';
import MarketRegulatoryPanel from './market/MarketRegulatoryPanel';
import MarketPaytablePanel from './market/MarketPaytablePanel';
import MarketFXPanel from './market/MarketFXPanel';
import MarketRiskPanel from './market/MarketRiskPanel';

interface MarketDetailViewProps {
  market: any;
  onBack: () => void;
}

const MarketDetailView: React.FC<MarketDetailViewProps> = ({ market: initialMarket, onBack }) => {
  const [market, setMarket] = useState(initialMarket);

  const updateMarket = (field: string, value: any) => {
    setMarket({ ...market, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving market:', market);
    // TODO: Save to backend
    alert('Market settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" className="border-[#2B2B2B] text-[#EAEAEA]">
            ← Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Market Settings: {market.name}
            </h2>
            <p className="text-sm text-[#EAEAEA]/60">Configure market-level rules and compliance</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black hover:opacity-90">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#181A1D] border-b border-[#2B2B2B] w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="operators">Operators</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="paytable">Paytable</TabsTrigger>
          <TabsTrigger value="fx">FX & Reports</TabsTrigger>
          <TabsTrigger value="risk">Risk Controls</TabsTrigger>
        </TabsList>

        <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B] mt-4">
          <TabsContent value="overview"><MarketOverviewPanel market={market} onUpdate={updateMarket} /></TabsContent>
          <TabsContent value="operators"><MarketOperatorsPanel marketId={market.id} /></TabsContent>
          <TabsContent value="currencies"><MarketCurrenciesPanel market={market} onUpdate={updateMarket} /></TabsContent>
          <TabsContent value="languages"><MarketLanguagesPanel market={market} onUpdate={updateMarket} /></TabsContent>
          <TabsContent value="regulatory"><MarketRegulatoryPanel market={market} onUpdate={updateMarket} /></TabsContent>
          <TabsContent value="paytable"><MarketPaytablePanel market={market} onUpdate={updateMarket} /></TabsContent>
          <TabsContent value="fx"><MarketFXPanel market={market} onUpdate={updateMarket} /></TabsContent>
          <TabsContent value="risk"><MarketRiskPanel market={market} onUpdate={updateMarket} /></TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MarketDetailView;
