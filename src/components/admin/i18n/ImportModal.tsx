import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File, mode: string, dryRun: boolean) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [mode, setMode] = useState<'create' | 'update' | 'both'>('both');
  const [dryRun, setDryRun] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport(file, mode, dryRun);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Import Translations</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive ? 'border-brand-gold bg-brand-gold/10' : 'border-border'
          }`}
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText size={24} className="text-brand-gold" />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          ) : (
            <>
              <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-foreground mb-2">Drop CSV/JSON file here</p>
              <p className="text-xs text-muted-foreground mb-4">or click to browse</p>
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:border-brand-gold cursor-pointer transition-all"
              >
                Choose File
              </label>
            </>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Import Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {['create', 'update', 'both'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                    mode === m
                      ? 'bg-brand-gold text-black'
                      : 'bg-card text-muted-foreground border border-border'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-brand-gold" />
              <span className="text-sm text-foreground">Dry Run (Preview Only)</span>
            </div>
            <input
              type="checkbox"
              checked={dryRun}
              onChange={(e) => setDryRun(e.target.checked)}
              className="w-4 h-4"
            />
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
            onClick={handleImport}
            disabled={!file}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-brand-gold to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export { ImportModal };
export default ImportModal;

