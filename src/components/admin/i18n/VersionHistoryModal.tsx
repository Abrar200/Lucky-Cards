import React, { useState } from 'react';
import { X, History, GitBranch, RotateCcw, Eye } from 'lucide-react';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ isOpen, onClose }) => {
  const [selectedLocale, setSelectedLocale] = useState('en');
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const versions = [
    {
      version: 'v2.1',
      date: '2025-11-10',
      author: 'admin@luckycards.com',
      changes: 24,
      status: 'live',
    },
    {
      version: 'v2.0',
      date: '2025-11-05',
      author: 'translator@luckycards.com',
      changes: 18,
      status: 'archived',
    },
    {
      version: 'v1.9',
      date: '2025-10-28',
      author: 'admin@luckycards.com',
      changes: 12,
      status: 'archived',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-background border border-border rounded-xl overflow-hidden">
        <div className="bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold text-foreground">Version History</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="text-sm font-semibold text-foreground mb-2 block">Select Locale</label>
            <select
              value={selectedLocale}
              onChange={(e) => setSelectedLocale(e.target.value)}
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground"
            >
              <option value="en">English</option>
              <option value="zh-CN">Chinese Simplified</option>
              <option value="ja">Japanese</option>
              <option value="th">Thai</option>
            </select>
          </div>

          <div className="space-y-3">
            {versions.map((v) => (
              <div
                key={v.version}
                className="bg-card border border-border rounded-lg p-4 hover:border-brand-gold transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <GitBranch size={16} className="text-brand-gold" />
                    <span className="font-bold text-foreground">{v.version}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        v.status === 'live'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-background border border-border rounded-lg hover:border-brand-gold transition-all">
                      <Eye size={14} className="text-foreground" />
                    </button>
                    {v.status !== 'live' && (
                      <button className="p-2 bg-background border border-border rounded-lg hover:border-brand-gold transition-all">
                        <RotateCcw size={14} className="text-brand-gold" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Date</p>
                    <p className="text-foreground">{v.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Author</p>
                    <p className="text-foreground">{v.author}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Changes</p>
                    <p className="text-brand-gold font-semibold">{v.changes} keys</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedVersion && (
            <div className="mt-6 p-4 bg-card border border-border rounded-lg">
              <h3 className="text-sm font-bold text-foreground mb-3">Diff Viewer</h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex gap-2">
                  <span className="text-green-400">+</span>
                  <span className="text-foreground">game.new.feature: "New Feature Text"</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-red">-</span>
                  <span className="text-muted-foreground line-through">game.old.text: "Old Text"</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-yellow-400">~</span>
                  <span className="text-foreground">game.updated: "Updated Text"</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { VersionHistoryModal };
export default VersionHistoryModal;

