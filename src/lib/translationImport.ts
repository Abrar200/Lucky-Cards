// Translation import utilities with validation

import { TranslationEntry } from './translationExport';

export interface ValidationError {
  row?: number;
  key?: string;
  field?: string;
  message: string;
  type: 'error' | 'warning';
}

export interface ImportResult {
  success: boolean;
  data?: TranslationEntry[];
  errors: ValidationError[];
}

export const parseCSV = (content: string): ImportResult => {
  const errors: ValidationError[] = [];
  const lines = content.split('\n').filter(l => l.trim());
  
  if (lines.length < 2) {
    return { success: false, errors: [{ message: 'CSV file is empty or invalid', type: 'error' }] };
  }
  
  const data: TranslationEntry[] = [];
  const keys = new Set<string>();
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length < 14) {
      errors.push({ row: i + 1, message: `Row has insufficient columns (${values.length}/14)`, type: 'error' });
      continue;
    }
    
    const [key, section, en, zh, zh_TW, ja, th, vi, ko, ms, id, es, ar, ru] = values;
    
    if (!key || !key.trim()) {
      errors.push({ row: i + 1, message: 'Missing key', type: 'error' });
      continue;
    }
    
    if (keys.has(key)) {
      errors.push({ row: i + 1, key, message: 'Duplicate key', type: 'error' });
    }
    keys.add(key);
    
    data.push({ key, section, en, zh, zh_TW, ja, th, vi, ko, ms, id, es, ar, ru });
  }
  
  return { success: errors.filter(e => e.type === 'error').length === 0, data, errors };
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];
    
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
};

export const parseJSON = (content: string): ImportResult => {
  const errors: ValidationError[] = [];
  
  try {
    const parsed = JSON.parse(content);
    
    if (!Array.isArray(parsed)) {
      return { success: false, errors: [{ message: 'JSON must be an array of translation entries', type: 'error' }] };
    }
    
    const data: TranslationEntry[] = [];
    const keys = new Set<string>();
    
    parsed.forEach((entry, idx) => {
      if (!entry.key) {
        errors.push({ row: idx + 1, message: 'Missing key', type: 'error' });
        return;
      }
      
      if (keys.has(entry.key)) {
        errors.push({ row: idx + 1, key: entry.key, message: 'Duplicate key', type: 'error' });
      }
      keys.add(entry.key);
      
      data.push(entry);
    });
    
    return { success: errors.filter(e => e.type === 'error').length === 0, data, errors };
  } catch (e) {
    return { success: false, errors: [{ message: `Invalid JSON: ${e}`, type: 'error' }] };
  }
};
