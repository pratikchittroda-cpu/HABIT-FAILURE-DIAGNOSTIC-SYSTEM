import React, { useState } from 'react';

interface DiagnosticFormProps {
  onSubmit: (description: string) => void;
}

export const DiagnosticForm: React.FC<DiagnosticFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length > 10) {
      onSubmit(input);
    }
  };

  return (
    <section className="bg-slate-900/50 border border-slate-800 p-1 rounded-xl backdrop-blur-sm shadow-2xl">
      <div className="bg-slate-950 border border-slate-800/50 rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="habitInput" className="block text-cyan-500 font-mono text-xs uppercase tracking-widest mb-3">
              Input Failed Habit Data
            </label>
            <textarea
              id="habitInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the habit you failed to build and what happened. e.g., 'I tried to go to the gym every morning at 6 AM, but I kept snoozing my alarm because it was cold and I felt too tired.'"
              className="w-full h-40 bg-slate-900 border border-slate-700 text-slate-200 p-4 rounded-md focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm placeholder:text-slate-600 resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              MIN_CHARS: 10 | CUR_CHARS: {input.length}
            </span>
            <button
              type="submit"
              disabled={input.trim().length <= 10}
              className="group relative px-6 py-3 bg-cyan-950 text-cyan-400 font-mono text-sm uppercase tracking-wider border border-cyan-800 rounded hover:bg-cyan-900 hover:text-cyan-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Run Diagnostics
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};