import React, { useState } from 'react';
import { X, Globe, Type, ArrowRight, ExternalLink } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface LocaleDrawerProps {
  locale: any;
  isOpen: boolean;
  onClose: () => void;
}

const LocaleDrawer: React.FC<LocaleDrawerProps> = ({ locale, isOpen, onClose }) => {
  const [rtlEnabled, setRtlEnabled] = useState(locale?.rtl || false);
  const [operatorOverrides, setOperatorOverrides] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'draft' | 'live'>('live');

  if (!isOpen || !locale) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">{locale.name} Settings</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
              <Globe size={16} className="text-brand-gold" />
              Locale Code
            </label>
            <input
              type="text"
              value={locale.code}
              disabled
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
              <Type size={16} className="text-brand-gold" />
              Font Family
            </label>
            <input
              type="text"
              value={locale.font}
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">RTL (Right-to-Left)</p>
              <p className="text-xs text-muted-foreground">Enable for Arabic, Hebrew, etc.</p>
            </div>
            <Switch checked={rtlEnabled} onCheckedChange={setRtlEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Operator Overrides</p>
              <p className="text-xs text-muted-foreground">Allow per-operator customization</p>
            </div>
            <Switch checked={operatorOverrides} onCheckedChange={setOperatorOverrides} />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Publishing Status</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPublishStatus('draft')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  publishStatus === 'draft'
                    ? 'bg-brand-gold text-black'
                    : 'bg-card text-muted-foreground border border-border'
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => setPublishStatus('live')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  publishStatus === 'live'
                    ? 'bg-brand-gold text-black'
                    : 'bg-card text-muted-foreground border border-border'
                }`}
              >
                Live
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg hover:border-brand-gold transition-all text-foreground">
              <span className="text-sm">Live Preview (CDN)</span>
              <ExternalLink size={16} className="text-brand-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LocaleDrawer };
export default LocaleDrawer;

