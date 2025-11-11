import { useState, useEffect } from 'react';
import { i18nService } from '@/lib/i18nService';

export function useTranslation(locale: string = 'en') {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      const data = await i18nService.getStrings(locale);
      setTranslations(data);
      setLoading(false);
    };

    loadTranslations();
  }, [locale]);

  const t = (key: string, variables?: Record<string, string | number>): string => {
    let text = translations[key] || key;

    // Replace variables like {amount}, {playerName}
    if (variables) {
      Object.entries(variables).forEach(([varKey, value]) => {
        text = text.replace(new RegExp(`\\{${varKey}\\}`, 'g'), String(value));
      });
    }

    return text;
  };

  return { t, loading, locale };
}
