import React, { useState, useRef } from 'react';
import { X, Upload, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { parseCSV, parseJSON, ValidationError } from '@/lib/translationImport';
import { exportToCSV, exportToJSON, downloadFile, TranslationEntry } from '@/lib/translationExport';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: 'import' | 'export';
  currentData: TranslationEntry[];
  onImportSuccess: (data: TranslationEntry[]) => void;
}

const ImportExportModal: React.FC<Props> = ({ isOpen, onClose, mode, currentData, onImportSuccess }) => {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    if (format === 'csv') {
      const csv = exportToCSV(currentData);
      downloadFile(csv, `translations_${timestamp}.csv`, 'text/csv');
    } else {
      const json = exportToJSON(currentData);
      downloadFile(json, `translations_${timestamp}.json`, 'application/json');
    }
    onClose();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setErrors([]);

    try {
      const content = await file.text();
      const result = format === 'csv' ? parseCSV(content) : parseJSON(content);

      if (result.success && result.data) {
        onImportSuccess(result.data);
        onClose();
      } else {
        setErrors(result.errors);
      }
    } catch (err) {
      setErrors([{ message: `Failed to read file: ${err}`, type: 'error' }]);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#2B2B2B]">
          <h2 className="text-xl font-bold text-[#EAEAEA]">{mode === 'import' ? 'Import' : 'Export'} Translations</h2>
          <button onClick={onClose} className="text-[#EAEAEA]/60 hover:text-[#F4C339]">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#EAEAEA] mb-3">Format</label>
            <div className="flex gap-3">
              <button
                onClick={() => setFormat('csv')}
                className={`flex-1 p-4 rounded-lg border transition-all ${
                  format === 'csv' ? 'bg-[#F4C339]/10 border-[#F4C339]' : 'bg-[#111315] border-[#2B2B2B]'
                }`}
              >
                <FileText className={format === 'csv' ? 'text-[#F4C339]' : 'text-[#EAEAEA]/60'} size={24} />
                <div className="text-sm font-semibold text-[#EAEAEA] mt-2">CSV</div>
              </button>
              <button
                onClick={() => setFormat('json')}
                className={`flex-1 p-4 rounded-lg border transition-all ${
                  format === 'json' ? 'bg-[#F4C339]/10 border-[#F4C339]' : 'bg-[#111315] border-[#2B2B2B]'
                }`}
              >
                <FileText className={format === 'json' ? 'text-[#F4C339]' : 'text-[#EAEAEA]/60'} size={24} />
                <div className="text-sm font-semibold text-[#EAEAEA] mt-2">JSON</div>
              </button>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-[#7A0E14]/20 border border-[#7A0E14] rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-[#F4C339]" size={18} />
                <span className="font-semibold text-[#EAEAEA]">Validation Errors</span>
              </div>
              <div className="space-y-1 text-sm text-[#EAEAEA]/80">
                {errors.map((err, idx) => (
                  <div key={idx}>
                    {err.row && `Row ${err.row}: `}{err.message}
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'export' ? (
            <button
              onClick={handleExport}
              className="w-full py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download {format.toUpperCase()}
            </button>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept={format === 'csv' ? '.csv' : '.json'}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="w-full py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Upload size={18} />
                {importing ? 'Processing...' : `Select ${format.toUpperCase()} File`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportExportModal;
