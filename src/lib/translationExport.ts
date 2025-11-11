// Translation export utilities for CSV and JSON formats

export interface TranslationEntry {
  key: string;
  section: string;
  en: string;
  zh: string;
  zh_TW: string;
  ja: string;
  th: string;
  vi: string;
  ko: string;
  ms: string;
  id: string;
  es: string;
  ar: string;
  ru: string;
}

export const exportToCSV = (translations: TranslationEntry[]): string => {
  const headers = ['Key', 'Section', 'English', 'Chinese (Simplified)', 'Chinese (Traditional)', 
    'Japanese', 'Thai', 'Vietnamese', 'Korean', 'Malay', 'Indonesian', 'Spanish', 'Arabic', 'Russian'];
  
  const rows = translations.map(t => [
    t.key, t.section, t.en, t.zh, t.zh_TW, t.ja, t.th, t.vi, t.ko, t.ms, t.id, t.es, t.ar, t.ru
  ].map(cell => `"${(cell || '').replace(/"/g, '""')}"`));
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};

export const exportToJSON = (translations: TranslationEntry[]): string => {
  return JSON.stringify(translations, null, 2);
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
