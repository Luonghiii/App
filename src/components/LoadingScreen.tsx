import React, { FC } from 'react';

const LoadingScreen: FC = () => (
    <div className="bg-[#0d1117] text-white min-h-screen flex flex-col items-center justify-center">
        <style>{`
            @keyframes pulse-rocket {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-10px) scale(1.05); }
            }
            .animate-pulse-rocket { animation: pulse-rocket 2s ease-in-out infinite; }
        `}</style>
        <div className="relative w-24 h-24 rounded-3xl shadow-lg shadow-blue-500/30 animate-pulse-rocket">
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Loading Logo" className="w-full h-full rounded-3xl object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-6">Luonghiii</h1>
    </div>
);

export default LoadingScreen;
