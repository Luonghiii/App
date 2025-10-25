import React, { FC } from 'react';
import { GlowingBorderCard } from './common';
import type { Translation } from '../data/translations';

interface ModuleConfigCardProps {
    t: Translation;
}

const ModuleConfigCard: FC<ModuleConfigCardProps> = ({ t }) => {
    const handleAction = (url: string) => {
        window.location.href = url;
    };
    
    return (
        <GlowingBorderCard
            className="shadow-purple-500/30"
            contentClassName="p-6"
        >
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-100 mb-3">{t.moduleConfigTitle}</h2>
                <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <img src="https://i.ibb.co/q322N0H9/IMG-8793.jpg" alt={t.locket} className="w-10 h-10 rounded-lg object-cover" />
                        <p className="font-semibold text-slate-200">{t.configLocket}</p>
                    </div>
                    <button
                       onClick={() => handleAction("shadowrocket://config/add/https://raw.githubusercontent.com/Luonghiii/Locket/refs/heads/main/modules/Locket_Gold.sgmodule")}
                       className="flex-shrink-0 px-4 py-2 bg-purple-500/20 backdrop-blur-md border border-purple-400/50 hover:bg-purple-500/30 rounded-lg text-white font-semibold transition-colors text-sm">
                        {t.addConfig}
                    </button>
                </div>
            </div>
        </GlowingBorderCard>
    );
};

export default ModuleConfigCard;
