import React, { useState, useEffect, useMemo, FC } from 'react';

// Data and Types
import { translations, Language } from './data/translations';
import { initialAccounts } from './data/accounts';
import type { Account } from './types';

// Components
import Header from './components/Header';
import AccountListSummary from './components/AccountListSummary';
import AccountCard from './components/AccountCard';
import DirectDownloadCard from './components/DirectDownloadCard';
import ModuleConfigCard from './components/ModuleConfigCard';
import LuonghiiiCard from './components/LuonghiiiCard';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import LoadingScreen from './components/LoadingScreen';
import { AnimatedSection, AnimatedGradientBackground } from './components/common';
import { PolicyModal, InstructionModal, Toast } from './components/modals';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'vi') ? savedLang : 'vi';
  });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const [accountList, setAccountList] = useState<Account[]>(initialAccounts);
  const [showInstructionModal, setShowInstructionModal] = useState(false);

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);

    const instructionsSeenInSession = sessionStorage.getItem('instructionsSeen');
    if (!instructionsSeenInSession) {
        setShowInstructionModal(true);
        sessionStorage.setItem('instructionsSeen', 'true');
    }

    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    const refreshIntervalId = setInterval(() => {
        setAccountList(currentAccounts => 
            currentAccounts.map(acc => ({...acc, lastUpdate: new Date()}))
        );
    }, 30000); 

    return () => {
        clearTimeout(loadingTimer);
        clearInterval(timerId);
        clearInterval(refreshIntervalId);
    };
  }, []);

  const showToast = (message: string) => {
      setToast({ message, isVisible: true });
  };

  const formattedDateTime = useMemo(() => {
    const locale = language === 'vi' ? 'vi-VN' : 'en-GB';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(currentTime).replace(',', ' -').replace(/\//g, '/');
  }, [currentTime, language]);

  const totalActiveAccounts = accountList.length;
  const nationStats = useMemo(() => {
    const stats: Record<string, { flag: string; count: number }> = {};
    for (const account of accountList) {
      if (!stats[account.flag]) {
        stats[account.flag] = { flag: account.flag, count: 0 };
      }
      stats[account.flag].count++;
    }
    return Object.values(stats).sort((a, b) => b.count - a.count);
  }, [accountList]);


  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="text-white min-h-screen font-sans p-4 flex flex-col items-center">
      <AnimatedGradientBackground />
      <div className="w-full max-w-md md:max-w-xl relative z-10">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <main className="w-full space-y-6">
            <AnimatedSection><Header t={t} /></AnimatedSection>
            <AnimatedSection><AccountListSummary dateTime={formattedDateTime} t={t} totalActiveAccounts={totalActiveAccounts} nationStats={nationStats} /></AnimatedSection>
            {accountList.map((acc, index) => (
              <AnimatedSection key={acc.id}>
                <AccountCard 
                  account={{...acc, id: index + 1}} 
                  t={t} 
                  language={language} 
                  onCopySuccess={showToast} 
                  currentTime={currentTime} 
                />
              </AnimatedSection>
            ))}
            <AnimatedSection><DirectDownloadCard t={t} /></AnimatedSection>
            <AnimatedSection><ModuleConfigCard t={t} /></AnimatedSection>
            <AnimatedSection><LuonghiiiCard t={t} /></AnimatedSection>
        </main>
        <AnimatedSection><Footer t={t} onPrivacyClick={() => setShowPrivacy(true)} onTermsClick={() => setShowTerms(true)} /></AnimatedSection>
      </div>
      
      <InstructionModal
        isOpen={showInstructionModal}
        onClose={() => setShowInstructionModal(false)}
        t={t}
        language={language}
      />
      <PolicyModal 
        title={t.privacyPolicyTitle} 
        content={t.privacyPolicyContent} 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
        t={t} 
      />
      <PolicyModal 
        title={t.termsOfServiceTitle} 
        content={t.termsOfServiceContent} 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
        t={t} 
      />
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default App;
