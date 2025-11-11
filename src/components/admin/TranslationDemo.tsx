import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TranslationDemo = () => {
  const [locale, setLocale] = useState('en');
  const { t, loading } = useTranslation(locale);

  const locales = [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: 'Chinese Simplified' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
  ];

  if (loading) return <div>Loading translations...</div>;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-brand-gold">Translation Demo</CardTitle>
        <Select value={locale} onValueChange={setLocale}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locales.map(l => (
              <SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-brand-gold mb-2">Menu</h3>
          <p>{t('menu.title')}</p>
          <p>{t('menu.background_music')}</p>
          <p>{t('menu.sound')}</p>
        </div>
        <div>
          <h3 className="font-semibold text-brand-gold mb-2">Actions</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-brand-gold text-black rounded">{t('actions.save')}</button>
            <button className="px-3 py-1 bg-card border border-border rounded">{t('actions.cancel')}</button>
            <button className="px-3 py-1 bg-card border border-border rounded">{t('actions.edit')}</button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-brand-gold mb-2">Paytable</h3>
          <p>{t('table.pay.royal_flush')}: {t('table.pay.multiplier.500_to_1')}</p>
          <p>{t('table.pay.straight_flush')}: {t('table.pay.multiplier.100_to_1')}</p>
          <p>{t('table.pay.full_house')}: {t('table.pay.multiplier.50_to_1')}</p>
        </div>
      </CardContent>
    </Card>
  );
};
