import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

interface LocaleTileProps {
  locale: {
    code: string;
    name: string;
    font: string;
    complete: number;
    opsCount: number;
    status: 'complete' | 'pending' | 'issues';
    rtl?: boolean;
  };
  onClick: () => void;
}

const LocaleTile: React.FC<LocaleTileProps> = ({ locale, onClick }) => {
  const getStatusIcon = () => {
    switch (locale.status) {
      case 'complete':
        return <CheckCircle size={18} className="text-green-400" />;
      case 'pending':
        return <AlertCircle size={18} className="text-yellow-400" />;
      case 'issues':
        return <AlertTriangle size={18} className="text-brand-red" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-4 border border-border hover:border-brand-gold cursor-pointer transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-foreground group-hover:text-brand-gold transition-colors">
            {locale.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {locale.code} {locale.rtl && '(RTL)'}
          </p>
        </div>
        {getStatusIcon()}
      </div>
      
      <p className="text-xs text-muted-foreground mb-3">Font: {locale.font}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Completion</span>
          <span className="text-foreground font-semibold">{locale.complete}%</span>
        </div>
        <div className="w-full bg-background rounded-full h-1.5">
          <div
            className="bg-brand-gold h-1.5 rounded-full transition-all"
            style={{ width: `${locale.complete}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-muted-foreground">Open Actions</span>
          <span className={`font-semibold ${locale.opsCount > 0 ? 'text-brand-red' : 'text-green-400'}`}>
            {locale.opsCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export { LocaleTile };
export default LocaleTile;

