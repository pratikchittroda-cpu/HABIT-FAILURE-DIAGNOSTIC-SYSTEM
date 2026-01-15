import React, { useState } from 'react';
import { Header } from './components/Header';
import { DiagnosticForm } from './components/DiagnosticForm';
import { DiagnosticReport } from './components/DiagnosticReport';
import { LoadingTerminal } from './components/LoadingTerminal';
import { runDiagnostic } from './services/geminiService';
import { DiagnosticResult } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete' | 'error'>('idle');
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRunDiagnostic = async (habitDescription: string) => {
    setStatus('analyzing');
    setErrorMsg('');
    
    try {
      const data = await runDiagnostic(habitDescription);
      setResult(data);
      setStatus('complete');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || "System failure. Unable to complete diagnosis.");
    }
  };

  const resetSystem = () => {
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col items-center pb-20">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10" 
           style={{
             backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="z-10 w-full max-w-4xl px-4 md:px-6">
        <Header />

        <main className="mt-8">
          {status === 'idle' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DiagnosticForm onSubmit={handleRunDiagnostic} />
            </div>
          )}

          {status === 'analyzing' && (
            <LoadingTerminal />
          )}

          {status === 'complete' && result && (
            <div className="animate-in fade-in scale-95 duration-300">
               <DiagnosticReport result={result} onReset={resetSystem} />
            </div>
          )}

          {status === 'error' && (
            <div className="border border-red-800/50 bg-red-950/20 p-6 rounded-lg text-center backdrop-blur-sm animate-in fade-in">
              <h3 className="text-red-400 font-mono text-lg mb-2">CRITICAL FAILURE</h3>
              <p className="text-slate-400 mb-4">{errorMsg}</p>
              <button 
                onClick={resetSystem}
                className="px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 border border-red-800 rounded transition-colors font-mono text-sm"
              >
                REBOOT SYSTEM
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;