import React, { useState } from 'react';
import { X, Save, CheckCircle, AlertTriangle, Image } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TranslationEditorDrawerProps {
  translationKey: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const TranslationEditorDrawer: React.FC<TranslationEditorDrawerProps> = ({
  translationKey,
  isOpen,
  onClose,
  onSave,
}) => {
  const [translations, setTranslations] = useState({
    en: translationKey?.en || '',
    'zh-CN': 'Lucky Cards 概览',
    ja: 'ラッキーカード概要',
    th: 'ภาพรวม Lucky Cards',
  });

  if (!isOpen || !translationKey) return null;

  const handleSave = (asDraft: boolean) => {
    onSave({ ...translations, status: asDraft ? 'pending' : 'complete' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-background border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Edit Translation</h2>
            <p className="text-xs text-brand-gold font-mono mt-1">{translationKey.key}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Image size={16} className="text-brand-gold mt-1" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Context</p>
                <p className="text-xs text-muted-foreground">
                  Used in: Game Client → Overview Section
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Character limit: 100 | Variables: none
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="en" className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-card">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="zh-CN">中文</TabsTrigger>
              <TabsTrigger value="ja">日本語</TabsTrigger>
              <TabsTrigger value="th">ไทย</TabsTrigger>
            </TabsList>

            {Object.entries(translations).map(([locale, text]) => (
              <TabsContent key={locale} value={locale} className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      Translation Text
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) =>
                        setTranslations({ ...translations, [locale]: e.target.value })
                      }
                      className="w-full h-32 px-3 py-2 bg-card border border-border rounded-lg text-foreground resize-none"
                      placeholder={`Enter ${locale} translation...`}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {text.length} / 100 characters
                      </span>
                      {text.length > 100 && (
                        <span className="text-xs text-brand-red flex items-center gap-1">
                          <AlertTriangle size={12} />
                          Exceeds limit
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-3">
                    <p className="text-xs font-semibold text-foreground mb-2">ICU MessageFormat</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {'{count, plural, one {# item} other {# items}}'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => handleSave(true)}
              className="flex-1 px-4 py-3 bg-card border border-border text-foreground rounded-lg hover:border-brand-gold transition-all"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-brand-gold to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              Approve & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TranslationEditorDrawer };
export default TranslationEditorDrawer;

