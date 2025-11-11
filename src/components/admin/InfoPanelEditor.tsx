import React, { useState } from 'react';
import { Save, Download, Upload, Eye, AlertTriangle, History, CheckCircle } from 'lucide-react';
import { TranslationEntry } from '@/lib/translationExport';
import { saveVersion, TranslationVersion } from '@/lib/translationVersioning';
import ImportExportModal from './ImportExportModal';
import VersionHistoryModal from './VersionHistoryModal';

const InfoPanelEditor: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('overview');
  const [showImportExport, setShowImportExport] = useState(false);
  const [importExportMode, setImportExportMode] = useState<'import' | 'export'>('export');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const languages = [
    { code: 'en', name: 'English', complete: 100 },
    { code: 'zh-CN', name: 'Chinese (Simplified)', complete: 98 },
    { code: 'zh-TW', name: 'Chinese (Traditional)', complete: 95 },
    { code: 'ja', name: 'Japanese', complete: 100 },
    { code: 'th', name: 'Thai', complete: 92 },
    { code: 'vi', name: 'Vietnamese', complete: 88 },
    { code: 'ko', name: 'Korean', complete: 97 },
    { code: 'ms', name: 'Malay', complete: 85 },
    { code: 'id', name: 'Indonesian', complete: 90 },
    { code: 'es', name: 'Spanish', complete: 100 },
    { code: 'ar', name: 'Arabic', complete: 75 },
    { code: 'ru', name: 'Russian', complete: 82 },
  ];

  const sections = [
    { id: 'overview', name: 'Game Overview', key: 'game.overview.text' },
    { id: 'howtoplay', name: 'How to Play', key: 'game.howtoplay.steps' },
    { id: 'payouts', name: 'Payout Chart', key: 'game.paytable.description' },
    { id: 'jackpots', name: 'Jackpot System', key: 'game.jackpot.explanation' },
    { id: 'rules', name: 'Betting Rules', key: 'game.rules.betting' },
    { id: 'disclaimer', name: 'Disclaimer', key: 'game.disclaimer.text' },
  ];

  const contentSamples: any = {
    overview: 'Lucky Cards is an exciting casino table game where players bet on card outcomes. Choose between 3-Card and 5-Card modes for different gameplay experiences.',
    howtoplay: '1. Select your chip denomination\n2. Place bets on the grid\n3. Cards are revealed one by one\n4. Winning bets are paid according to the paytable',
    payouts: 'Pair: 2:1\nTwo Pair: 5:1\nThree of a Kind: 10:1\nStraight: 45:1\n5 of Chosen Color: 200:1',
    jackpots: 'Progressive jackpots grow with every bet. Win the jackpot by hitting the special combination. Three levels: Local, Regional, and Global.',
    rules: 'Suit Betting: Bet on how many cards of a specific suit will appear.\nColor Betting: Bet on red or black card outcomes.\nRank Betting: Bet on specific card ranks.',
    disclaimer: 'Please play responsibly. This game is for entertainment purposes only. If you feel you have a gambling problem, please seek help.',
  };

  const [translationData, setTranslationData] = useState<TranslationEntry[]>([
    { key: 'game.overview.text', section: 'overview', en: contentSamples.overview, zh: '', zh_TW: '', ja: '', th: '', vi: '', ko: '', ms: '', id: '', es: '', ar: '', ru: '' },
    { key: 'game.howtoplay.steps', section: 'howtoplay', en: contentSamples.howtoplay, zh: '', zh_TW: '', ja: '', th: '', vi: '', ko: '', ms: '', id: '', es: '', ar: '', ru: '' },
    { key: 'game.paytable.description', section: 'payouts', en: contentSamples.payouts, zh: '', zh_TW: '', ja: '', th: '', vi: '', ko: '', ms: '', id: '', es: '', ar: '', ru: '' },
    { key: 'game.jackpot.explanation', section: 'jackpots', en: contentSamples.jackpots, zh: '', zh_TW: '', ja: '', th: '', vi: '', ko: '', ms: '', id: '', es: '', ar: '', ru: '' },
    { key: 'game.rules.betting', section: 'rules', en: contentSamples.rules, zh: '', zh_TW: '', ja: '', th: '', vi: '', ko: '', ms: '', id: '', es: '', ar: '', ru: '' },
    { key: 'game.disclaimer.text', section: 'disclaimer', en: contentSamples.disclaimer, zh: '', zh_TW: '', ja: '', th: '', vi: '', ko: '', ms: '', id: '', es: '', ar: '', ru: '' },
  ]);

  const currentLang = languages.find(l => l.code === selectedLanguage);

  const handleSave = () => {
    saveVersion(translationData, 'Admin User', 'Manual save from editor');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleImportSuccess = (data: TranslationEntry[]) => {
    setTranslationData(data);
    saveVersion(data, 'Admin User', 'Imported from file');
  };

  const handleRestore = (version: TranslationVersion) => {
    setTranslationData(version.data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>INFO Panel Editor (Multi-Language)</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowVersionHistory(true)}
            className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all flex items-center gap-2"
          >
            <History size={16} />
            History
          </button>
          <button 
            onClick={() => { setImportExportMode('import'); setShowImportExport(true); }}
            className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all flex items-center gap-2"
          >
            <Upload size={16} />
            Import
          </button>
          <button 
            onClick={() => { setImportExportMode('export'); setShowImportExport(true); }}
            className="px-4 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {saveSuccess ? <CheckCircle size={16} /> : <Save size={16} />}
            {saveSuccess ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {languages.slice(0, 8).map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
            className={`p-3 rounded-lg border transition-all ${
              selectedLanguage === lang.code
                ? 'bg-gradient-to-r from-[#F4C339] to-[#E1A72B] border-[#F4C339] text-black'
                : 'bg-[#181A1D] border-[#2B2B2B] text-[#EAEAEA] hover:border-[#F4C339]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold">{lang.name}</span>
              {lang.complete < 100 && <AlertTriangle size={14} className="text-yellow-400" />}
            </div>
            <div className="text-xs opacity-80">{lang.complete}% Complete</div>
          </button>
        ))}
      </div>

      {currentLang && currentLang.complete < 100 && (
        <div className="bg-[#7A0E14]/20 border border-[#7A0E14] rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-[#F4C339] mt-1" size={20} />
          <div>
            <h3 className="text-sm font-bold text-[#F4C339]">Translation Incomplete</h3>
            <p className="text-sm text-[#EAEAEA]/80 mt-1">This language is {currentLang.complete}% complete. Some sections may be missing translations.</p>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black'
                : 'bg-[#2B2B2B] text-[#F4C339] hover:bg-[#F4C339] hover:text-black'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      <div className="bg-[#181A1D] rounded-xl p-6 border border-[#2B2B2B]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#EAEAEA]">{sections.find(s => s.id === activeSection)?.name} Content</h3>
            <p className="text-xs text-[#EAEAEA]/60 mt-1">Key: {sections.find(s => s.id === activeSection)?.key}</p>
          </div>
          <button className="px-3 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all flex items-center gap-2 text-sm">
            <Eye size={14} />
            Preview
          </button>
        </div>
        <textarea
          className="w-full h-64 px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] resize-none focus:border-[#F4C339] outline-none"
          placeholder={`Enter ${selectedLanguage.toUpperCase()} content here...`}
          defaultValue={contentSamples[activeSection] || ''}
        ></textarea>
      </div>

      <ImportExportModal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        mode={importExportMode}
        currentData={translationData}
        onImportSuccess={handleImportSuccess}
      />

      <VersionHistoryModal
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        onRestore={handleRestore}
      />
    </div>
  );
};

export default InfoPanelEditor;
