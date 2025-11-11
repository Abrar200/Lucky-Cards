import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, AlertCircle, Clock, History } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import FXRateHistoryModal from './FXRateHistoryModal';

interface FXRate {
  code: string;
  name: string;
  region: string;
  rate: number;
  lastUpdate: string;
  operators: number;
  source: string;
  isFrozen?: boolean;
}

const CurrencyView: React.FC = () => {
  const [currencies, setCurrencies] = useState<FXRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');
  const [historyModal, setHistoryModal] = useState<{ isOpen: boolean; currency: string; history: any[] }>({
    isOpen: false,
    currency: '',
    history: []
  });

  const currencyNames: Record<string, { name: string; region: string }> = {
    USD: { name: 'US Dollar', region: 'United States' },
    PHP: { name: 'Philippine Peso', region: 'Philippines' },
    MYR: { name: 'Malaysian Ringgit', region: 'Malaysia' },
    IDR: { name: 'Indonesian Rupiah', region: 'Indonesia' },
    THB: { name: 'Thai Baht', region: 'Thailand' },
    JPY: { name: 'Japanese Yen', region: 'Japan' },
    KRW: { name: 'Korean Won', region: 'South Korea' },
    CNY: { name: 'Chinese Yuan', region: 'China' },
    HKD: { name: 'Hong Kong Dollar', region: 'Hong Kong' },
    MOP: { name: 'Macanese Pataca', region: 'Macau' },
    SGD: { name: 'Singapore Dollar', region: 'Singapore' },
    AUD: { name: 'Australian Dollar', region: 'Australia' },
    EUR: { name: 'Euro', region: 'Europe' },
    GBP: { name: 'British Pound', region: 'United Kingdom' },
    CAD: { name: 'Canadian Dollar', region: 'Canada' },
    VND: { name: 'Vietnamese Dong', region: 'Vietnam' }
  };

  const fetchRates = async () => {
    try {
      const { data, error } = await supabase
        .from('fx_rates')
        .select('*')
        .order('quote_currency');

      if (error) throw error;

      if (data && data.length > 0) {
        const formatted = data.map((rate: any) => ({
          code: rate.quote_currency,
          name: currencyNames[rate.quote_currency]?.name || rate.quote_currency,
          region: currencyNames[rate.quote_currency]?.region || 'Unknown',
          rate: parseFloat(rate.rate),
          lastUpdate: new Date(rate.timestamp).toLocaleString(),
          operators: Math.floor(Math.random() * 15) + 1,
          source: rate.source,
          isFrozen: rate.is_frozen
        }));
        setCurrencies(formatted);
        setLastSync(new Date().toLocaleString());
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
    }
  };

  const refreshRates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-fx-rates');
      if (error) throw error;
      await fetchRates();
    } catch (err) {
      console.error('Error refreshing rates:', err);
    } finally {
      setLoading(false);
    }
  };

  const viewHistory = async (currency: string) => {
    try {
      const { data, error } = await supabase
        .from('fx_rate_history')
        .select('*')
        .eq('quote_currency', currency)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;

      const history = data?.map((record: any) => ({
        rate: parseFloat(record.rate),
        timestamp: new Date(record.timestamp).toLocaleString(),
        source: record.source
      })) || [];

      setHistoryModal({ isOpen: true, currency, history });
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]">Multi-Currency Management</h2>
        <button 
          onClick={refreshRates}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Syncing...' : 'Sync FX Rates Now'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
          <h3 className="text-sm font-medium text-[#EAEAEA]/60">Base Currency</h3>
          <p className="text-3xl font-bold text-[#F4C339] mt-2">USD</p>
        </div>

        <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
          <h3 className="text-sm font-medium text-[#EAEAEA]/60">FX Source</h3>
          <p className="text-lg font-semibold text-[#EAEAEA] mt-2">OpenExchangeRates API</p>
        </div>

        <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
          <div className="flex items-center gap-2 text-[#EAEAEA]/60">
            <Clock size={16} />
            <h3 className="text-sm font-medium">Last Sync</h3>
          </div>
          <p className="text-lg font-semibold text-[#EAEAEA] mt-2">{lastSync || 'Never'}</p>
        </div>
      </div>

      <div className="bg-[#181A1D] rounded-xl p-6 border border-[#7A0E14]">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-[#F4C339] mt-1" size={20} />
          <div>
            <h3 className="text-sm font-bold text-[#F4C339]">FX Snapshot System</h3>
            <p className="text-sm text-[#EAEAEA]/80 mt-1">Exchange rates are captured at transaction time and never recalculated. This ensures audit consistency and prevents disputes.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Code</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Currency</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Region</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Rate to USD</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Source</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Last Updated</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((curr, idx) => (
              <tr key={idx} className="border-t border-[#2B2B2B] hover:bg-[#111315] transition-colors">
                <td className="p-4 text-[#F4C339] font-bold text-lg">{curr.code}</td>
                <td className="p-4 text-[#EAEAEA]">{curr.name}</td>
                <td className="p-4 text-[#EAEAEA]/80 text-sm">{curr.region}</td>
                <td className="p-4 text-[#EAEAEA] font-semibold font-mono">{curr.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                <td className="p-4 text-[#EAEAEA]/60 text-sm">{curr.source}</td>
                <td className="p-4 text-[#EAEAEA]/60 text-sm">{curr.lastUpdate}</td>
                <td className="p-4">
                  <button
                    onClick={() => viewHistory(curr.code)}
                    className="text-[#F4C339] hover:text-[#E1A72B] flex items-center gap-1 text-sm"
                  >
                    <History size={16} />
                    History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FXRateHistoryModal
        isOpen={historyModal.isOpen}
        onClose={() => setHistoryModal({ ...historyModal, isOpen: false })}
        currency={historyModal.currency}
        history={historyModal.history}
      />
    </div>
  );
};

export default CurrencyView;
