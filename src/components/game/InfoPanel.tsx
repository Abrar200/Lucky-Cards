import { useTranslation } from '@/hooks/useTranslation';
import { X } from 'lucide-react';

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-red-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Red Velvet Background */}
        <div className="sticky top-0 bg-gradient-to-r from-red-900 via-red-800 to-red-900 p-4 flex justify-between items-center border-b-2 border-red-700 shadow-lg">
          <div className="flex items-center gap-4">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/691315e12fd3277b2d9f41d6_1762870962051_e3263f61.webp" 
              alt="Lucky Cards Logo" 
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-3xl font-bold text-yellow-100">{t('info.title')}</h2>
          </div>
          <button onClick={onClose} className="text-yellow-100 hover:text-white transition-colors">
            <X size={32} />
          </button>
        </div>


        {/* Content */}
        <div className="p-6 space-y-6 text-white">
          {/* Game Overview */}
          <section>
            <h3 className="text-2xl font-bold mb-3">{t('info.overview_title')}</h3>
            <p className="text-gray-300 leading-relaxed">{t('info.overview_description')}</p>
          </section>

          {/* Core Gameplay */}
          <section>
            <h3 className="text-2xl font-bold mb-3">{t('info.core_gameplay_title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-2">{t('info.core_gameplay_description')}</p>
            
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-3">{t('info.how_it_works_title')}</h4>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500">1)</span>
                  <span>{t('info.how_it_works.step1')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500">2)</span>
                  <span>{t('info.how_it_works.step2')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500">3)</span>
                  <span>{t('info.how_it_works.step3')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500">4)</span>
                  <span>{t('info.how_it_works.step4')}</span>
                </li>
                <li className="flex gap-3 flex-col">
                  <div className="flex gap-3">
                    <span className="font-bold text-yellow-500">5)</span>
                    <span>{t('info.how_it_works.step5')}</span>
                  </div>
                  <div className="ml-8 space-y-2 text-gray-400">
                    <div className="flex gap-2">
                      <span>:</span>
                      <span>{t('info.how_it_works.step5_detail1')}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>:</span>
                      <span>{t('info.how_it_works.step5_detail2')}</span>
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500">6)</span>
                  <span>{t('info.how_it_works.step6')}</span>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
