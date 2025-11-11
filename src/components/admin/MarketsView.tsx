import React, { useState } from 'react';
import MarketDetailView from './MarketDetailView';

const MarketsView: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState<any>(null);

  const markets = [
    { 
      id: 'eu', 
      name: 'Europe', 
      region: 'Europe',
      countries: ['Germany', 'France', 'Spain', 'Italy', 'Netherlands'],
      primaryCurrency: 'EUR',
      operators: 8, 
      status: 'Active',
      timezone: 'Europe/London',
      allowedCurrencies: ['EUR', 'GBP'],
      availableLanguages: ['en', 'es', 'fr'],
      defaultLanguage: 'en'
    },
    { 
      id: 'na', 
      name: 'North America', 
      region: 'North America',
      countries: ['USA', 'Canada', 'Mexico'],
      primaryCurrency: 'USD',
      operators: 5, 
      status: 'Active',
      timezone: 'America/New_York',
      allowedCurrencies: ['USD'],
      availableLanguages: ['en', 'es'],
      defaultLanguage: 'en'
    },
    { 
      id: 'apac', 
      name: 'Asia Pacific', 
      region: 'Asia Pacific',
      countries: ['Philippines', 'Malaysia', 'Singapore', 'Thailand', 'Japan'],
      primaryCurrency: 'USD',
      operators: 11, 
      status: 'Active',
      timezone: 'Asia/Singapore',
      allowedCurrencies: ['USD', 'PHP', 'MYR', 'SGD', 'THB', 'JPY'],
      availableLanguages: ['en', 'zh', 'ja', 'th'],
      defaultLanguage: 'en'
    },
  ];

  if (selectedMarket) {
    return <MarketDetailView market={selectedMarket} onBack={() => setSelectedMarket(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Markets & Jurisdictions</h2>
        <button className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
          + Add Market
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {markets.map((market) => (
          <div key={market.id} className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>{market.region}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${market.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {market.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Countries</p>
                <p className="text-2xl font-bold text-[#EAEAEA]">{market.countries.length}</p>
              </div>
              <div>
                <p className="text-xs text-[#EAEAEA]/60 mb-1">Operators</p>
                <p className="text-2xl font-bold text-[#EAEAEA]">{market.operators}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-[#EAEAEA]/60 mb-1">Primary Currency</p>
              <p className="text-sm font-semibold text-[#F4C339]">{market.primaryCurrency}</p>
            </div>

            <button 
              onClick={() => setSelectedMarket(market)}
              className="w-full px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all text-sm font-medium"
            >
              Manage Market
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketsView;

