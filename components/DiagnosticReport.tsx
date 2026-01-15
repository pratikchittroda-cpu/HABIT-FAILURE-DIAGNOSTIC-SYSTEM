import React from 'react';
import { DiagnosticResult } from '../types';

interface DiagnosticReportProps {
  result: DiagnosticResult;
  onReset: () => void;
}

export const DiagnosticReport: React.FC<DiagnosticReportProps> = ({ result, onReset }) => {
  return (
    <div className="w-full">
      <div className="bg-slate-900 border border-slate-700 rounded-sm overflow-hidden shadow-2xl relative">
        {/* Top Decorative Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-slate-800"></div>
        
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
            <div>
              <h2 className="text-xl font-mono text-slate-100 uppercase tracking-widest font-bold">Diagnostic Report</h2>
              <p className="text-xs text-slate-500 font-mono mt-1">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <div className="px-3 py-1 bg-slate-800 rounded border border-slate-700">
               <span className="text-xs font-mono text-slate-400">SEVERITY: </span>
               <span className="text-xs font-mono text-orange-400">STRUCTURAL</span>
            </div>
          </div>

          {/* 1. Habit Summary */}
          <section>
            <h3 className="text-xs font-mono text-slate-500 uppercase mb-2">01 // Subject Summary</h3>
            <p className="text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-4">
              {result.habitSummary}
            </p>
          </section>

          {/* 2. Failure Triggers */}
          <section>
             <h3 className="text-xs font-mono text-slate-500 uppercase mb-2">02 // Identified Triggers</h3>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {result.failureTriggers.map((trigger, idx) => (
                 <li key={idx} className="bg-red-950/20 border border-red-900/30 p-3 rounded flex items-start gap-3 text-sm text-red-200/80">
                   <span className="text-red-500 font-mono">!</span>
                   {trigger}
                 </li>
               ))}
             </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 3. Psychological Cause */}
            <section className="bg-slate-950/50 p-5 rounded border border-slate-800">
              <h3 className="text-xs font-mono text-blue-400 uppercase mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                03 // Psychological Vector
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {result.psychologicalCause}
              </p>
            </section>

            {/* 4. Environmental Cause */}
            <section className="bg-slate-950/50 p-5 rounded border border-slate-800">
              <h3 className="text-xs font-mono text-purple-400 uppercase mb-3 flex items-center gap-2">
                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                04 // Environmental Vector
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {result.environmentalCause}
              </p>
            </section>
          </div>

          {/* 5. Structural Adjustment */}
          <section className="mt-4">
            <div className="relative overflow-hidden rounded-lg border border-cyan-900/50 bg-cyan-950/10">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
              <div className="p-6">
                 <h3 className="text-xs font-mono text-cyan-500 uppercase mb-2">05 // Required Structural Adjustment</h3>
                 <p className="text-lg md:text-xl text-cyan-100 font-medium leading-snug">
                   {result.structuralAdjustment}
                 </p>
              </div>
            </div>
            <p className="text-xs text-center text-slate-600 font-mono mt-2">
              *Implementation of this adjustment does not require willpower. It requires logistics.
            </p>
          </section>

        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={onReset}
          className="text-slate-400 hover:text-white font-mono text-sm underline underline-offset-4 decoration-slate-700 hover:decoration-slate-400 transition-all"
        >
          [ INITIALIZE NEW DIAGNOSIS ]
        </button>
      </div>
    </div>
  );
};