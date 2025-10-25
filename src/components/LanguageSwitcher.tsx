import React, { FC } from 'react';
import type { Language } from '../data/translations';

interface LanguageSwitcherProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
    const toggleLanguage = () => {
      setLanguage(language === 'vi' ? 'en' : 'vi');
    };

    return (
        <div className="absolute top-5 right-5 z-[60]">
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-slate-300 hover:bg-white/20 transition-colors backdrop-blur-md">
                {language === 'vi' ? (
                  <><span>🇻🇳</span></>
                ) : (
                  <><span>🇺🇸</span></>
                )}
            </button>
        </div>
    );
};

export default LanguageSwitcher;
