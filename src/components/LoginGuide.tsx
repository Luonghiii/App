import React, { FC } from 'react';
import { GlowingBorderCard } from './common';
import {
    WarningIcon,
    BanIcon,
    ArrowRightIcon,
    UserIcon,
    AppWindowIcon,
    ArchiveIcon,
    UsersIcon
} from './icons';
import type { Translation, Language } from '../data/translations';

interface LoginGuideProps {
    t: Translation;
    language: Language;
}

const LoginGuide: FC<LoginGuideProps> = ({t, language}) => {
    return (
        <div className="space-y-6">
            <header className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-20 h-20 rounded-3xl shadow-lg shadow-blue-500/30">
                    <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Login Guide Icon" className="w-full h-full rounded-3xl object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{t.loginGuideTitle}</h2>
                <p className="text-slate-400">{t.loginGuideSubtitle}</p>
            </header>

            <div className="bg-[#44222a] border border-red-500/50 rounded-2xl p-4 space-y-3">
                <h3 className="flex items-center gap-2 font-bold text-red-400">
                    <WarningIcon className="w-5 h-5"/>
                    {t.importantWarningTitle}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-1">
                    <li><span className="font-semibold">{t.warning1.split(' - ')[0]}</span> - {t.warning1.split(' - ')[1]}</li>
                    <li>{t.warning2}</li>
                    <li>{t.warning3}</li>
                </ul>
            </div>
            
            <div className="bg-[#292524] border border-slate-700 rounded-2xl p-4 space-y-3">
                 <h3 className="flex items-center gap-2 font-bold text-orange-400">
                    <BanIcon className="w-5 h-5"/>
                    {t.whatNotToDoTitle}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-1">
                    <li>{t.notToDo1}</li>
                    <li>{t.notToDo2}</li>
                    <li>{t.notToDo3}</li>
                </ul>
            </div>

            <div className="space-y-4">
                <GlowingBorderCard className="shadow-purple-500/30" contentClassName="p-4 relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">1</div>
                    <div className="ml-2">
                         <h3 className="font-bold text-white mb-3 ml-4">{t.step1Title}</h3>
                         <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <span>{t.step1_1}</span>
                                <img src="https://i.ibb.co/mCGLzdCP/IMG-8818.jpg" alt="App Store" className="w-5 h-5 rounded-md" />
                                <span className="font-semibold">{t.step1_2}</span>
                                {language === 'vi' && <span>lên</span>}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <ArrowRightIcon className="w-4 h-4 text-purple-400"/>
                                <span>{t.step1_3}</span>
                                <UserIcon className="w-5 h-5 text-blue-400"/>
                                <span className="font-semibold">{t.step1_4}</span>
                            </div>

                            <div className="bg-[#44222a] border border-red-500/50 rounded-lg p-3 space-y-2">
                                <h4 className="font-semibold text-red-300 text-sm flex items-center gap-2">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                    {t.step1_logout_title}
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-4">
                                    <li>{t.step1_logout_1}</li>
                                    <li>{t.step1_logout_2}</li>
                                </ul>
                            </div>
                            <div className="bg-[#164e3b] border border-green-500/50 rounded-lg p-3 space-y-2">
                                 <h4 className="font-semibold text-green-300 text-sm flex items-center gap-2">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                    {t.step1_login_title}
                                 </h4>
                                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-4">
                                    <li>{t.step1_login_1}</li>
                                    <li>{t.step1_login_2}</li>
                                    <li>{t.step1_login_3}</li>
                                    <li>{t.step1_login_4}</li>
                                </ul>
                            </div>
                         </div>
                    </div>
                </GlowingBorderCard>

                <GlowingBorderCard className="shadow-teal-500/30" contentClassName="p-4 relative">
                     <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">2</div>
                     <div className="ml-2">
                        <h3 className="font-bold text-white mb-2 ml-4">{t.step2Title}</h3>
                        <p className="text-sm text-slate-400 mb-3 ml-4">{t.step2Subtitle}</p>
                        <div className="bg-[#164e3b] border border-green-500/50 rounded-lg p-3 space-y-2 text-sm text-slate-300">
                            <p>1 <ArrowRightIcon className="w-4 h-4 inline-block mx-1 text-green-400"/> {t.step2_1}</p>
                            <p>2 <ArrowRightIcon className="w-4 h-4 inline-block mx-1 text-green-400"/> {t.step2_2}</p>
                        </div>
                     </div>
                </GlowingBorderCard>

                <GlowingBorderCard className="shadow-amber-500/30" contentClassName="p-4 relative">
                     <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">3</div>
                     <div className="ml-2">
                        <h3 className="font-bold text-white mb-2 ml-4">{t.step3Title}</h3>
                        <p className="text-sm text-slate-400 mb-3 ml-4">{t.step3Subtitle}</p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <AppWindowIcon className="w-5 h-5 text-sky-400"/>
                                <span className="font-semibold">{t.step3_iphone_high}</span>
                                <span>{t.step3_iphone_high_action}</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm text-slate-300">
                                <ArchiveIcon className="w-5 h-5 text-sky-400"/>
                                <span className="font-semibold">{t.step3_iphone_low}</span>
                                <span>{t.step3_iphone_low_action}</span>
                            </div>

                            <div className="bg-[#44222a] border border-red-500/50 rounded-lg p-3">
                                 <p className="text-sm text-red-300 flex items-start gap-2">
                                    <WarningIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>
                                    <span>{t.step3_warning}</span>
                                </p>
                            </div>

                            <div className="bg-[#164e3b] border border-green-500/50 rounded-lg p-3">
                                 <p className="text-sm text-green-300 flex items-start gap-2">
                                    <UsersIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>
                                    <span>{t.step3_tip}</span>
                                </p>
                            </div>
                        </div>
                     </div>
                </GlowingBorderCard>
            </div>
        </div>
    );
};

export default LoginGuide;
