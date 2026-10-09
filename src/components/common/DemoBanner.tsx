import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, RotateCcw, X, CheckCircle2 } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { isDemoMode, user, resetDemoData } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [resetNotice, setResetNotice] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    resetDemoData();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  return (
    <aside aria-label="Demo mode notice" className="demo-banner bg-[#16382B] text-[#F3EFE6] px-4 py-2 text-xs border-b border-[#235441]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <span className="inline-flex items-center justify-center p-1 bg-[#E5A43B]/20 text-[#E5A43B] rounded">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <p className="font-medium tracking-wide">
            <strong className="text-[#E5A43B]">Demo Mode:</strong>
            <span className="text-stone-300 ml-1">
              Running with offline local persistence &amp; sample travel data.
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {resetNotice ? (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sample data reset!
            </span>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#235441] hover:bg-[#2d6b53] text-stone-100 rounded text-xs transition font-medium cursor-pointer"
              title="Reset sample trips and saved bookmarks for evaluation"
            >
              <RotateCcw className="w-3 h-3 text-[#E5A43B]" />
              Reset Demo Data
            </button>
          )}

          {user && (
            <span className="hidden md:inline-block px-2 py-0.5 bg-[#0F261D] rounded text-stone-300 border border-stone-700/60">
              Active: <strong className="text-white">{user.fullName}</strong>
            </span>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="text-stone-400 hover:text-white p-1 rounded transition"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
