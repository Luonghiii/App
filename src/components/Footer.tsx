import React, { FC } from 'react';
import type { Translation } from '../data/translations';

interface FooterProps {
    t: Translation;
    onPrivacyClick: () => void;
    onTermsClick: () => void;
}

const Footer: FC<FooterProps> = ({ t, onPrivacyClick, onTermsClick }) => (
    <footer className="w-full max-w-md md:max-w-xl text-center text-slate-500 text-xs space-y-3 mt-4 mb-8">
        <p>{t.copyright}</p>
        <p>{t.footerRights}</p>
        <div className="flex justify-center items-center gap-2 flex-wrap">
            <span>v1.0.1</span>
            <span className="text-slate-600">•</span>
            <button onClick={onPrivacyClick} className="hover:text-slate-300 underline">{t.privacyPolicy}</button>
            <span className="text-slate-600">•</span>
            <button onClick={onTermsClick} className="hover:text-slate-300 underline">{t.termOfService}</button>
        </div>
    </footer>
);

export default Footer;
