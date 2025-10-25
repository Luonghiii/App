import React, { FC, useState, useCallback, useMemo } from 'react';
import { GlowingBorderCard } from './common';
import { CheckIcon, UserIcon, KeyIcon, ClockIcon, CopyIcon } from './icons';
import { formatTimeAgo } from '../utils/time';
import type { Account } from '../types';
import type { Translation, Language } from '../data/translations';

const CopyButton: FC<{ textToCopy: string, label: string; icon: React.ReactElement; t: Translation; onCopy: () => void }> = ({ textToCopy, label, icon, t, onCopy }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            onCopy();
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [textToCopy, onCopy]);

    return (
        <button
            onClick={handleCopy}
            className={`group w-full flex items-center justify-center gap-2.5 py-3 rounded-xl transition-all duration-300 font-semibold text-sm backdrop-blur-md ${isCopied ? 'bg-emerald-500 text-white' : 'bg-white/10 border border-white/20 hover:bg-white/20 text-slate-200'}`}
        >
            {isCopied ? (
                <>
                    <CheckIcon className="w-5 h-5" />
                    <span>{t.copied}</span>
                </>
            ) : (
                <>
                    {icon}
                    <span className="flex items-center gap-1.5">
                        {label}
                        <CopyIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </span>
                </>
            )}
        </button>
    );
}

interface AccountCardProps {
    account: Account;
    t: Translation;
    language: Language;
    onCopySuccess: (message: string) => void;
    currentTime: Date;
}

const AccountCard: FC<AccountCardProps> = ({ account, t, language, onCopySuccess, currentTime }) => {
  const timeAgo = useMemo(() => {
    return formatTimeAgo(account.lastUpdate, language, currentTime);
  }, [account.lastUpdate, language, currentTime]);

  return (
    <GlowingBorderCard
      className="shadow-fuchsia-500/30"
      contentClassName="p-5 relative"
    >
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">
        {account.id}
      </div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-slate-100">{t.appleAccount}</h2>
        <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-green-300 bg-green-500/10 border border-green-500/30 rounded-full">
          <CheckIcon className="w-3 h-3" />
          <span>{t.work}</span>
        </div>
      </div>
      <p className="text-center font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-5">
        {account.email}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <CopyButton t={t} textToCopy={account.email} label={t.copyAccount} icon={<UserIcon className="w-5 h-5"/>} onCopy={() => onCopySuccess(t.copyAccountSuccess)} />
        <CopyButton t={t} textToCopy={account.password_plain} label={t.copyPassword} icon={<KeyIcon className="w-5 h-5"/>} onCopy={() => onCopySuccess(t.copyPasswordSuccess)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
            <span className="text-2xl leading-none">{account.flag}</span>
            <div>
                <p className="text-xs text-slate-400">{t.nation}</p>
                <p className="text-sm font-semibold text-slate-200">{account.nation}</p>
            </div>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
            <ClockIcon className="w-5 h-5 text-slate-400" />
            <div>
                <p className="text-xs text-slate-400">{t.update}</p>
                <p className="text-sm font-semibold text-slate-200">{timeAgo}</p>
            </div>
        </div>
      </div>
    </GlowingBorderCard>
  );
};

export default AccountCard;