import React, { FC } from 'react';
import { GlowingBorderCard } from './common';
import { InfoIcon, WarningIcon } from './icons';
import type { Translation } from '../data/translations';

interface DirectDownloadCardProps {
    t: Translation;
}

const DirectDownloadCard: FC<DirectDownloadCardProps> = ({ t }) => {
    const handleAction = (url: string) => {
        window.location.href = url;
    };
    
    return (
    <GlowingBorderCard
        className="shadow-cyan-500/30"
        contentClassName="p-6"
    >
        <div className="space-y-4">
            <div>
                 <h2 className="text-xl font-bold text-slate-100 mb-4">{t.directDownloadTitle}</h2>
                 <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <InfoIcon className="w-5 h-5 flex-shrink-0 text-cyan-400" />
                    <span>{t.directDownloadNote}</span>
                 </div>
                 <div className="bg-amber-900/50 border border-amber-500/50 p-3 rounded-lg flex items-start gap-2 text-sm text-amber-300">
                    <WarningIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                    <span>{t.deleteOldAppNote}</span>
                 </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <img src="https://i.ibb.co/q322N0H9/IMG-8793.jpg" alt={t.locket} className="w-10 h-10 rounded-lg object-cover" />
                    <p className="font-semibold text-slate-200">{t.locket}</p>
                </div>
                <button 
                   onClick={() => handleAction("itms-services://?action=download-manifest&url=https://luongdz.vercel.app/Plist/Locket.plist")}
                   onContextMenu={(e) => e.preventDefault()}
                   style={{ WebkitTouchCallout: 'none', userSelect: 'none' } as React.CSSProperties}
                   className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors text-sm">
                    {t.install}
                </button>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <img src="https://i.ibb.co/dsq5Q1W3/IMG-8789.png" alt={t.shadowrocket} className="w-10 h-10 rounded-lg object-cover" />
                    <p className="font-semibold text-slate-200">{t.shadowrocket}</p>
                </div>
                <button 
                   onClick={() => handleAction("itms-services://?action=download-manifest&url=https://luongdz.vercel.app/Plist/Shadowrocket.plist")}
                   onContextMenu={(e) => e.preventDefault()}
                   style={{ WebkitTouchCallout: 'none', userSelect: 'none' } as React.CSSProperties}
                   className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors text-sm">
                    {t.install}
                </button>
            </div>
        </div>
    </GlowingBorderCard>
    );
};

export default DirectDownloadCard;
