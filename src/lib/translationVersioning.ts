// Translation version control system

import { TranslationEntry } from './translationExport';

export interface TranslationVersion {
  id: string;
  timestamp: Date;
  author: string;
  description: string;
  data: TranslationEntry[];
  changeCount: number;
}

const STORAGE_KEY = 'translation_versions';
const MAX_VERSIONS = 50;

export const saveVersion = (
  data: TranslationEntry[], 
  author: string, 
  description: string
): TranslationVersion => {
  const versions = getVersionHistory();
  
  const version: TranslationVersion = {
    id: `v${Date.now()}`,
    timestamp: new Date(),
    author,
    description,
    data: JSON.parse(JSON.stringify(data)),
    changeCount: data.length
  };
  
  versions.unshift(version);
  
  if (versions.length > MAX_VERSIONS) {
    versions.splice(MAX_VERSIONS);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(versions));
  return version;
};

export const getVersionHistory = (): TranslationVersion[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((v: any) => ({
      ...v,
      timestamp: new Date(v.timestamp)
    }));
  } catch {
    return [];
  }
};

export const getVersion = (id: string): TranslationVersion | null => {
  const versions = getVersionHistory();
  return versions.find(v => v.id === id) || null;
};

export const deleteVersion = (id: string): void => {
  const versions = getVersionHistory().filter(v => v.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(versions));
};
