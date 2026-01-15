import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center pt-10 mb-8 border-b border-slate-800 pb-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
        <h1 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-slate-100 uppercase">
          Habit Failure Diagnostic System
        </h1>
      </div>
      <p className="text-slate-500 text-sm font-mono max-w-md text-center">
        SYSTEM STATUS: ONLINE. MOTIVATION MODULE: DISABLED.
        <br />
        ANALYSIS PROTOCOL: BEHAVIORAL SCIENCE.
      </p>
    </header>
  );
};