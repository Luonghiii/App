import React, { FC } from 'react';
import type { Translation } from '../data/translations';

interface HeaderProps {
    t: Translation;
}

const Header: FC<HeaderProps> = ({ t }) => (
    <header className="flex flex-col items-center text-center space-y-4 mt-8 mb-4 pt-10">
        <div className="relative w-24 h-24 rounded-3xl shadow-lg shadow-blue-500/30">
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="App Logo" className="w-full h-full rounded-3xl object-cover" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Luonghiii</h1>
        <p className="text-sm text-slate-500">{t.sponsoredBy} <a href="https://luonghiii.github.io/web/profile/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-400 hover:underline">Luonghiii</a></p>
    </header>
);

export default Header;
