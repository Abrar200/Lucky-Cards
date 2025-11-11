import React, { useState } from 'react';
import { X, Download, FileJson, FileText, Package } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: any) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [format, setFormat] = useState<'json' | 'csv' | 'zip'>('zip');
  const [bundle, setBundle] = useState<'live' | 'draft'>('live');
  const [selectedLocales, setSelectedLocales] = useState<string[]>(['en', 'zh-CN', 'ja', 'th']);

  const locales = [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: 'Chinese Simplified' },
    { code: 'zh-TW', name: 'Chinese Traditional' },
    { code: 'ja', name: 'Japanese' },
    { code: 'th', name: 'Thai' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ms', name: 'Malay' },
  ];

  if (!isOpen) return null;

  const toggleLocale = (code: string) => {
    setSelectedLocales((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    );
  };

  const handleExport = () => {
    onExport({ format, bundle, locales: selectedLocales });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Download size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold text-foreground">Export Translations</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormat('json')}
                className={`p-4 rounded-lg border transition-all ${
                  format === 'json'
                    ? 'border-brand-gold bg-brand-gold/10'
                    : 'border-border bg-card'
                }`}
              >
                <FileJson size={24} className="mx-auto mb-2 text-brand-gold" />
                <p className="text-xs font-medium text-foreground">JSON</p>
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`p-4 rounded-lg border transition-all ${
                  format === 'csv'
                    ? 'border-brand-gold bg-brand-gold/10'
                    : 'border-border bg-card'
                }`}
              >
                <FileText size={24} className="mx-auto mb-2 text-brand-gold" />
                <p className="text-xs font-medium text-foreground">CSV</p>
              </button>
              <button
                onClick={() => setFormat('zip')}
                className={`p-4 rounded-lg border transition-all ${
                  format === 'zip'
                    ? 'border-brand-gold bg-brand-gold/10'
                    : 'border-border bg-card'
                }`}
              >
                <Package size={24} className="mx-auto mb-2 text-brand-gold" />
                <p className="text-xs font-medium text-foreground">ZIP</p>
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">Bundle Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBundle('live')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  bundle === 'live'
                    ? 'bg-brand-gold text-black'
                    : 'bg-card text-muted-foreground border border-border'
                }`}
              >
                Live Version
              </button>
              <button
                onClick={() => setBundle('draft')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  bundle === 'draft'
                    ? 'bg-brand-gold text-black'
                    : 'bg-card text-muted-foreground border border-border'
                }`}
              >
                Latest Draft
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Select Locales ({selectedLocales.length} selected)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {locales.map((locale) => (
                <label
                  key={locale.code}
                  className="flex items-center gap-2 p-2 bg-card border border-border rounded-lg hover:border-brand-gold cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocales.includes(locale.code)}
                    onChange={() => toggleLocale(locale.code)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">{locale.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-card border border-border text-foreground rounded-lg hover:border-brand-gold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={selectedLocales.length === 0}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-brand-gold to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export { ExportModal };
export default ExportModal;

