import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { AGENT_REGISTRY, BRAND_ASSETS, CASE_FILES } from '../data';
import { CaseDossier, CaseLeadCard } from './CasePages';

export function CommandCenter({ agentId, onLogoutRequested }: { agentId: string; onLogoutRequested: () => void }) {
  const [activeDossier, setActiveDossier] = useState<any | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const agent = AGENT_REGISTRY.find((a) => a.id === agentId) || AGENT_REGISTRY[0];

  const openDossier = (dossier: any) => {
    setIsSyncing(true);
    setTimeout(() => {
      setActiveDossier(dossier);
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white font-headline flex flex-col relative overflow-hidden">
      <header className="h-20 border-b border-brand-red/30 bg-black/95 backdrop-blur-sm flex items-center justify-between px-8 relative z-40 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-8">
          <div className="bg-brand-red/10 shadow-[0_0_20px_rgba(255,49,49,0.4)] rounded p-2">
            <img src={BRAND_ASSETS.LOGO_FULL} alt="CIA Archive Terminal" className="h-8 object-contain filter brightness-0 invert" referrerPolicy="no-referrer" />
          </div>
          <div className="h-8 w-px bg-brand-red/50" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-brand-red tracking-[0.5em] uppercase">CIA_ARCHIVE_TERMINAL</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">CLASSIFIED_SYSTEM_ACTIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_rgba(255,49,49,0.8)]" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden xl:flex items-center gap-4 pr-8 border-r border-brand-red/30">
            <div className="flex flex-col items-end mr-4">
              <span className="text-[7px] font-black text-brand-red/80 uppercase tracking-[0.3em]">AUTHORIZED_ANALYST</span>
              <span className="text-[9px] font-black text-white uppercase tracking-wider leading-none mt-1">{agent.name}</span>
            </div>
            <div className="w-12 h-12 rounded border-2 border-brand-red/50 p-0.5 relative bg-black overflow-hidden shadow-[0_0_12px_rgba(255,49,49,0.4)]">
              <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay" />
            </div>
          </div>
          <button
            onClick={onLogoutRequested}
            className="p-3 bg-black border-2 border-brand-red/40 hover:border-brand-red text-brand-red hover:bg-brand-red hover:text-black transition-all group active:scale-95 shadow-[0_0_12px_rgba(255,49,49,0.3)]"
          >
            <span className="sr-only">Logout</span>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.586V7h-2v5.586L8.707 10.293l-1.414 1.414L12 16.414l4.707-4.707-1.414-1.414L13 12.586z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1800px] mx-auto w-full pt-12 pb-24 px-8 relative z-10">
        <AnimatePresence mode="wait">
          {!activeDossier && (
            <motion.div
              key="archives"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12"
            >
              <nav className="flex items-center gap-2 text-[9px] font-mono text-white/60 uppercase tracking-[0.4em]">
                <span>LANGLey://archives</span>
                <ChevronRight className="w-3 h-3 text-brand-red" />
                <span className="text-brand-red">classified_files</span>
              </nav>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-brand-red/20 pb-10">
                <div className="flex flex-col border-l-4 border-brand-red pl-6">
                  <h1 className="text-3xl font-mono uppercase italic text-white/95">Classified_Archive_Terminal</h1>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="px-3 py-1 bg-black border-2 border-brand-red/40 text-brand-red text-[7px] font-mono uppercase shadow-[0_0_12px_rgba(255,49,49,0.4)]">ACCESS_GRANTED</div>
                    <p className="text-[8px] font-mono text-white/50 uppercase tracking-[0.4em] italic">Terminal_Connection_Established...</p>
                  </div>
                </div>
                <div className="flex gap-8 items-center bg-black/70 p-4 border-2 border-brand-red/20 rounded font-mono">
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] font-mono text-brand-red/70 uppercase tracking-[0.3em]">STORAGE_CAPACITY</span>
                    <span className="text-[10px] font-mono text-brand-red tracking-wider shadow-[0_0_8px_rgba(255,49,49,0.3)]">1.47_PB</span>
                  </div>
                  <div className="h-6 w-px bg-brand-red/30" />
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] font-mono text-brand-red/70 uppercase tracking-[0.3em]">SECURITY_LEVEL</span>
                    <span className="text-[10px] font-mono text-white tracking-wider">TOP_SECRET</span>
                  </div>
                  <div className="h-6 w-px bg-brand-red/30" />
                  <div className="text-[8px] font-mono text-brand-red/60">
                    <div>TERMINAL_ID:</div>
                    <div className="text-white">CIA-001</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {CASE_FILES.map((dossier) => (
                  <CaseLeadCard key={dossier.id} dossier={dossier} onDossierSelect={() => openDossier(dossier)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeDossier && (
            <CaseDossier dossier={activeDossier} activeAgent={agent} onCloseRequested={() => setActiveDossier(null)} onLogoutRequested={onLogoutRequested} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isSyncing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-brand-red/30 animate-spin shadow-[0_0_15px_rgba(255,49,49,0.3)]" />
                <div className="absolute inset-2 rounded-full border border-brand-red animate-reverse-spin shadow-[0_0_10px_rgba(255,49,49,0.2)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_rgba(255,49,49,0.6)]" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 italic">
                <span className="text-sm font-mono text-brand-red uppercase tracking-[0.4em] animate-pulse shadow-[0_0_12px_rgba(255,49,49,0.4)]">DECRYPTING</span>
                <span className="text-[8px] font-mono text-white/50 uppercase tracking-[0.5em]">CLASSIFIED_ARCHIVE_ACCESS</span>
                <span className="text-[6px] font-mono text-brand-red/60 uppercase tracking-[0.6em] mt-1">TOP_SECRET_CLEARANCE_REQUIRED</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
