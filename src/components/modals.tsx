import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import { CheckIcon } from './icons';
import LoginGuide from './LoginGuide';
import type { Translation, Language } from '../data/translations';

export const PolicyModal: FC<{ title: string, content: string, isOpen: boolean, onClose: () => void, t: Translation }> = ({ title, content, isOpen, onClose, t }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-[#161b22] border border-slate-700 rounded-2xl shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                </header>
                <main className="p-6 text-slate-300 text-sm space-y-2 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }} />
                <footer className="p-4 border-t border-slate-700 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors">
                        {t.close}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export const Toast: FC<{ message: string; isVisible: boolean; onClose: () => void }> = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
            <div className="flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                <CheckIcon className="w-4 h-4" />
                <span>{message}</span>
            </div>
        </div>
    );
};


export const InstructionModal: FC<{ isOpen: boolean; onClose: () => void; t: Translation; language: Language; }> = ({ isOpen, onClose, t, language }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = useCallback(() => {
        const el = contentRef.current;
        if (el) {
            const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
            setIsAtEnd(atEnd);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
             setTimeout(checkScrollPosition, 100);
        }
    }, [isOpen, checkScrollPosition]);

    const handleNext = () => {
        const el = contentRef.current;
        if (!el) return;

        if (isAtEnd) {
            onClose();
            return;
        }
        
        const nextScrollTop = el.scrollTop + el.clientHeight * 0.8;
        el.scrollTo({ top: nextScrollTop, behavior: 'smooth' });

        if (nextScrollTop + el.clientHeight >= el.scrollHeight - 20) {
            setIsAtEnd(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
            <div className="bg-[#161b22] border border-slate-700 rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <main ref={contentRef} onScroll={checkScrollPosition} className="p-1 md:p-2 overflow-y-auto">
                   <div className="p-4 md:p-6">
                    <LoginGuide t={t} language={language} />
                   </div>
                </main>
                <footer className="p-4 border-t border-slate-700 flex justify-between items-center flex-shrink-0">
                    <button onClick={onClose} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors text-sm">
                        {t.instructionModalGotIt}
                    </button>
                    <button onClick={handleNext} className="px-5 py-2 bg-purple-500/20 backdrop-blur-md border border-purple-400/50 hover:bg-purple-500/30 rounded-lg text-white font-semibold transition-colors text-sm">
                        {isAtEnd ? t.instructionModalFinish : t.instructionModalNext}
                    </button>
                </footer>
            </div>
        </div>
    );
};
