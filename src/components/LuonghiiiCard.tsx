import React, { FC } from 'react';
import { GlowingBorderCard } from './common';
import { GlobeIcon, TelegramIcon, FacebookIcon, ZaloIcon } from './icons';
import type { Translation } from '../data/translations';

interface LuonghiiiCardProps {
    t: Translation;
}

const LuonghiiiCard: FC<LuonghiiiCardProps> = ({t}) => (
    <GlowingBorderCard
        className="shadow-rose-500/30"
        contentClassName="p-6"
    >
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full">
                <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Luonghiii" className="w-full h-full rounded-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-white">Luonghiii</h2>
            <p className="text-sm text-slate-400 max-w-xs">
                {t.luonghiiiDescription}
            </p>
            <div className="flex justify-center items-center gap-3 pt-2">
                <a href="https://luonghiii.github.io/web/profile/" target="_blank" rel="noopener noreferrer" aria-label="Website" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><GlobeIcon className="w-5 h-5" /></a>
                <a href="https://t.me/luonghiii1" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><TelegramIcon className="w-5 h-5" /></a>
                <a href="https://facebook.com/luonghiii" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><FacebookIcon className="w-5 h-5" /></a>
                <a href="https://zalo.me/0916508081" target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><ZaloIcon className="w-5 h-5" /></a>
            </div>
        </div>
    </GlowingBorderCard>
);

export default LuonghiiiCard;
