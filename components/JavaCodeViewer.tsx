
import React, { useState, useEffect } from 'react';
import { generateJavaBackendCode } from '../services/geminiService';

const JavaCodeViewer: React.FC = () => {
  const [code, setCode] = useState<string>('Initializing source generation...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      setLoading(true);
      const res = await generateJavaBackendCode();
      setCode(res || 'Failed to generate code.');
      setLoading(false);
    };
    fetchCode();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
        <div className="flex items-start gap-3">
          <span className="text-2xl">☕</span>
          <div>
            <h3 className="text-sm font-bold text-emerald-800">Backend Architecture Overview</h3>
            <p className="text-xs text-emerald-700 mt-1">
              Below is the "Eco-Station Hub" backend implementation logic using Java, JDBC, and MySQL. 
              This demonstrates how the frontend data is persisted in a relational database system.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-slate-500 uppercase tracking-widest">EcoStationHub_Backend.java</span>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="text-emerald-400 hover:text-emerald-300 text-xs font-medium"
          >
            Regenerate Logic
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-mono text-sm animate-pulse">Compiling Backend Source via Gemini...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none font-mono text-xs leading-relaxed whitespace-pre-wrap text-slate-300">
              {code}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JavaCodeViewer;
