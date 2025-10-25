import React, { FC } from 'react';
import { GlowingBorderCard } from './common';
import { CheckIcon } from './icons';
import type { Translation } from '../data/translations';

interface AccountListSummaryProps {
    dateTime: string;
    t: Translation;
    totalActiveAccounts: number;
    nationStats: {flag: string, count: number}[];
}

const AccountListSummary: FC<AccountListSummaryProps> = ({ dateTime, t, totalActiveAccounts, nationStats }) => (
    <GlowingBorderCard
        className="shadow-fuchsia-500/30"
        contentClassName="p-6"
    >
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-slate-100">{t.accountListTitle}</h1>
            <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-500">
            {dateTime}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-green-300 bg-green-500/10 border border-green-500/30 rounded-full">
            <CheckIcon className="w-4 h-4" />
            <span>{totalActiveAccounts} {t.activeAccounts}</span>
            </div>
            <div className="flex justify-center items-center gap-4 pt-2 flex-wrap">
            {nationStats.map(({ flag, count }) => (
                <div key={flag} className="flex items-center gap-1.5 px-3 py-1 bg-slate-700/50 rounded-full text-sm">
                <span>{flag}</span>
                <span className="font-semibold text-slate-200">{count}</span>
                </div>
            ))}
            </div>
        </div>
    </GlowingBorderCard>
);

export default AccountListSummary;
