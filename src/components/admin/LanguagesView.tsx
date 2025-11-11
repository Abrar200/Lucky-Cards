import { useState, useEffect } from 'react';
import { Search, Download, Upload, History, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { LocaleTile } from './i18n/LocaleTile';
import { LocaleDrawer } from './i18n/LocaleDrawer';
import { TranslationEditorDrawer } from './i18n/TranslationEditorDrawer';
import { ImportModal } from './i18n/ImportModal';
import { VersionHistoryModal } from './i18n/VersionHistoryModal';
import { ExportModal } from './i18n/ExportModal';
import { Edit, CheckSquare } from 'lucide-react';
import { i18nService, Locale } from '@/lib/i18nService';

const LanguagesView = () => {
  const [searchKey, setSearchKey] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [componentFilter, setComponentFilter] = useState<string>('all');
  const [selectedLocale, setSelectedLocale] = useState<any>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<any>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [locales, setLocales] = useState<any[]>([]);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    // Initialize string keys from seed data
    await i18nService.initializeStringKeys();
    await loadLocales();
  };

  const loadLocales = async () => {
    try {
      const data = await i18nService.getLocales();
      const formatted = data.map(l => ({
        code: l.locale_code,
        name: l.name,
        font: l.font_family,
        complete: Math.floor(Math.random() * 30) + 70,
        opsCount: Math.floor(Math.random() * 40),
        status: l.is_live ? 'complete' : 'pending',
        rtl: l.rtl
      }));
      setLocales(formatted);
    } catch (error) {
      console.error('Failed to load locales:', error);
    }
  };



  const translationKeys = [
    { key: 'game.overview.title', en: 'Lucky Cards Overview', status: 'complete', version: 'v2.1', component: 'game' },
    { key: 'game.overview.description', en: 'Lucky Cards is a casino table game...', status: 'complete', version: 'v2.1', component: 'game' },
    { key: 'game.howtoplay.step1', en: 'Place your bets on the grid', status: 'complete', version: 'v2.1', component: 'game' },
    { key: 'game.howtoplay.step2', en: 'Cards are revealed one by one', status: 'missing', version: 'v2.0', component: 'game' },
    { key: 'game.paytable.title', en: 'Payout Chart', status: 'complete', version: 'v2.1', component: 'game' },
    { key: 'game.jackpot.explanation', en: 'Progressive Jackpot System', status: 'pending', version: 'v2.1', component: 'game' },
    { key: 'admin.dashboard.title', en: 'Admin Dashboard', status: 'complete', version: 'v2.1', component: 'admin' },
    { key: 'admin.operators.list', en: 'Operator List', status: 'pending', version: 'v2.1', component: 'admin' },
    { key: 'admin.reports.generate', en: 'Generate Report', status: 'missing', version: 'v1.9', component: 'admin' },
    { key: 'paytable.straight.name', en: 'Straight Bet', status: 'complete', version: 'v2.1', component: 'paytable' },
  ];

  const filteredKeys = translationKeys.filter((t) => {
    const matchesSearch = t.key.toLowerCase().includes(searchKey.toLowerCase()) || 
                         t.en.toLowerCase().includes(searchKey.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesComponent = componentFilter === 'all' || t.component === componentFilter;
    return matchesSearch && matchesStatus && matchesComponent;
  });

  const toggleKeySelection = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Multi-Language System</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-card text-brand-gold rounded-lg hover:bg-brand-gold hover:text-black transition-all flex items-center gap-2 border border-border"
          >
            <Upload size={16} />
            Import
          </button>
          <button
            onClick={() => setShowVersionModal(true)}
            className="px-4 py-2 bg-card text-brand-gold rounded-lg hover:bg-brand-gold hover:text-black transition-all flex items-center gap-2 border border-border"
          >
            <History size={16} />
            Versions
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-brand-gold to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Download size={16} />
            Export All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {locales.map((locale) => (
          <LocaleTile
            key={locale.code}
            locale={locale}
            onClick={() => setSelectedLocale(locale)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-card rounded-lg p-3 border border-border flex items-center gap-3">
          <Search size={20} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by key or text..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="flex-1 bg-transparent text-foreground outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-card border border-border rounded-lg text-foreground"
        >
          <option value="all">All Status</option>
          <option value="complete">Complete</option>
          <option value="pending">Pending</option>
          <option value="missing">Missing</option>
        </select>
        <select
          value={componentFilter}
          onChange={(e) => setComponentFilter(e.target.value)}
          className="px-4 py-2 bg-card border border-border rounded-lg text-foreground"
        >
          <option value="all">All Components</option>
          <option value="game">Game</option>
          <option value="admin">Admin</option>
          <option value="paytable">Paytable</option>
        </select>
      </div>

      {selectedKeys.length > 0 && (
        <div className="bg-card border border-brand-gold rounded-lg p-4 flex items-center justify-between">
          <span className="text-foreground font-semibold">{selectedKeys.length} keys selected</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-background border border-border rounded text-sm text-foreground hover:border-brand-gold transition-all">
              Bulk Export
            </button>
            <button className="px-3 py-1.5 bg-background border border-border rounded text-sm text-foreground hover:border-brand-gold transition-all">
              Change Status
            </button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="p-4 text-left">
                <CheckSquare size={16} className="text-brand-gold" />
              </th>
              <th className="text-left p-4 text-sm font-semibold text-brand-gold">Translation Key</th>
              <th className="text-left p-4 text-sm font-semibold text-brand-gold">English Text</th>
              <th className="text-left p-4 text-sm font-semibold text-brand-gold">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-brand-gold">Version</th>
              <th className="text-left p-4 text-sm font-semibold text-brand-gold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map((t) => (
              <tr key={t.key} className="border-t border-border hover:bg-background transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(t.key)}
                    onChange={() => toggleKeySelection(t.key)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-4 text-brand-gold font-mono text-xs">{t.key}</td>
                <td className="p-4 text-foreground">{t.en}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.status === 'complete'
                        ? 'bg-green-500/20 text-green-400'
                        : t.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground text-sm">{t.version}</td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedTranslation(t)}
                    className="px-3 py-1 bg-background border border-border text-brand-gold rounded text-xs hover:bg-brand-gold hover:text-black transition-all flex items-center gap-1"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LocaleDrawer
        locale={selectedLocale}
        isOpen={!!selectedLocale}
        onClose={() => setSelectedLocale(null)}
      />

      <TranslationEditorDrawer
        translationKey={selectedTranslation}
        isOpen={!!selectedTranslation}
        onClose={() => setSelectedTranslation(null)}
        onSave={(data) => console.log('Save translation:', data)}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={(file, mode, dryRun) => console.log('Import:', file, mode, dryRun)}
      />

      <VersionHistoryModal
        isOpen={showVersionModal}
        onClose={() => setShowVersionModal(false)}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={(options) => console.log('Export:', options)}
      />
    </div>
  );
};

export default LanguagesView;
