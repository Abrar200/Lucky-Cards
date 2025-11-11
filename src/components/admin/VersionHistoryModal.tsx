import React from 'react';
import { X, RotateCcw, Trash2, Clock } from 'lucide-react';
import { TranslationVersion, getVersionHistory, deleteVersion } from '@/lib/translationVersioning';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (version: TranslationVersion) => void;
}

const VersionHistoryModal: React.FC<Props> = ({ isOpen, onClose, onRestore }) => {
  const [versions, setVersions] = React.useState<TranslationVersion[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setVersions(getVersionHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    if (confirm('Delete this version?')) {
      deleteVersion(id);
      setVersions(getVersionHistory());
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#2B2B2B]">
          <div className="flex items-center gap-3">
            <Clock className="text-[#F4C339]" size={24} />
            <h2 className="text-xl font-bold text-[#EAEAEA]">Version History</h2>
          </div>
          <button onClick={onClose} className="text-[#EAEAEA]/60 hover:text-[#F4C339]">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {versions.length === 0 ? (
            <div className="text-center py-12 text-[#EAEAEA]/60">
              No version history available
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version) => (
                <div key={version.id} className="bg-[#111315] border border-[#2B2B2B] rounded-lg p-4 hover:border-[#F4C339]/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-[#F4C339]">{version.id}</span>
                        <span className="text-xs text-[#EAEAEA]/60">{formatDate(version.timestamp)}</span>
                      </div>
                      <div className="text-sm text-[#EAEAEA] mb-1">{version.description}</div>
                      <div className="text-xs text-[#EAEAEA]/60">
                        By {version.author} • {version.changeCount} entries
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (confirm('Restore this version? Current changes will be lost.')) {
                            onRestore(version);
                            onClose();
                          }
                        }}
                        className="px-3 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all flex items-center gap-2 text-sm"
                      >
                        <RotateCcw size={14} />
                        Restore
                      </button>
                      <button
                        onClick={() => handleDelete(version.id)}
                        className="px-3 py-2 bg-[#7A0E14]/20 text-[#EAEAEA]/60 rounded-lg hover:bg-[#7A0E14] hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryModal;
