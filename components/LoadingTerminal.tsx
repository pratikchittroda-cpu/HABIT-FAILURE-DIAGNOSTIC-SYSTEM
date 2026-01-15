import React, { useEffect, useState } from 'react';
import { AnalysisStage } from '../types';

export const LoadingTerminal: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const stages = Object.values(AnalysisStage);

  useEffect(() => {
    let currentIndex = 0;
    
    // Initial log
    setLogs([`> ${stages[0]}...`]);

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < stages.length) {
        setLogs(prev => [...prev, `> ${stages[currentIndex]}... [OK]`]);
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [stages]);

  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-xs md:text-sm">
      <div className="bg-slate-950 border border-slate-800 rounded-t-lg p-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        <span className="ml-2 text-slate-600">diagnostic_core.exe</span>
      </div>
      <div className="bg-slate-900/80 border-x border-b border-slate-800 p-6 min-h-[300px] rounded-b-lg font-mono text-cyan-500/80 shadow-inner">
        {logs.map((log, i) => (
          <div key={i} className="mb-2 animate-in fade-in slide-in-from-left-2 duration-300">
            {log}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};