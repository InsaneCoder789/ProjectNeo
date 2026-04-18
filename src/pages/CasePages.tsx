import React from 'react';
import { motion } from 'motion/react';
import { FolderOpen, Ghost, Power, Shield } from 'lucide-react';
import { CaseFile, BRAND_ASSETS } from '../data';
import { DossierTerminal } from '../components/DossierTerminal';
import { DetailStat } from '../components/UiHelpers';

export function CaseDossier({
  dossier,
  activeAgent,
  onCloseRequested,
  onLogoutRequested,
}: {
  dossier: CaseFile;
  activeAgent: any;
  onCloseRequested: () => void;
  onLogoutRequested: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden"
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
        <div className="scanline opacity-[0.03] pointer-events-none" />
        <div className="crt-overlay opacity-[0.05] pointer-events-none" />
        <div className="lg:col-span-8 overflow-y-auto p-12 custom-scrollbar relative z-10 border-r border-white/10 bg-black">
          <section className="space-y-10 h-full flex flex-col pt-12">
            <div className="flex items-center gap-10 mb-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-brand-red text-black text-[8px] font-mono px-2 py-0.5 tracking-[0.2em] uppercase shadow-[0_0_10px_rgba(255,49,49,0.3)]">CLASSIFIED</span>
                  <span className="text-[9px] font-mono text-brand-red tracking-[0.4em] uppercase opacity-60">CENTRAL_INTELLIGENCE_NODE</span>
                </div>
                <h2 className="text-3xl font-mono uppercase tracking-tighter text-white">{dossier.name.replace(/_/g, ' ')}</h2>
              </div>
              <div className="h-12 w-px bg-white/10 mx-4" />
              <div className="hidden xl:flex items-center gap-6">
                <div className="w-10 h-10 rounded-sm border border-brand-red/30 p-1 bg-brand-red/5 shadow-[0_0_10px_rgba(255,49,49,0.2)]">
                  <img src={activeAgent.image} alt={activeAgent.name} className="w-full h-full object-cover rounded-sm grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-brand-red/60 uppercase tracking-[0.2em]">DEPLO_DOCTRINE: {activeAgent.doctrine}</span>
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest leading-none mt-1">OPERATIVE_{activeAgent.name.toUpperCase()}</span>
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 mx-4" />
              <img
                src={BRAND_ASSETS.HERO}
                alt="Tactical Context"
                className="h-12 w-24 object-cover opacity-40 rounded-sm border border-white/10 grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-6">
              <h3 className="text-[11px] font-mono text-brand-red tracking-[0.6em] uppercase flex items-center gap-4">
                <Shield className="w-4 h-4" /> NEURAL_TERMINAL_UPLINK
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-brand-red/40 to-transparent" />
              <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">ENCRYPTION: AES_4096_GCM</div>
            </div>
            <div className="flex-1 min-h-[550px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10">
              <DossierTerminal files={dossier.terminalFiles} />
            </div>
          </section>
        </div>
        <div className="lg:col-span-4 bg-black overflow-y-auto p-12 space-y-16 custom-scrollbar relative z-10 border-l border-brand-red/20 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]">
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] italic">Session_Navigation</span>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_rgba(255,49,49,0.6)]" />
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Uplink_Solid</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 border-b border-white/10">
              <DetailStat label="SECURITY" value="LVL_7" />
              <DetailStat label="STATUS" value={dossier.status} />
              <DetailStat label="THREAT" value={dossier.status === 'RESTRICTED' ? 'CRITICAL' : 'B-CLASS'} />
            </div>
            <button
              onClick={onCloseRequested}
              className="w-full py-4 bg-brand-red/10 hover:bg-brand-red border border-brand-red/30 text-brand-red hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-2 group active:scale-95 hover:shadow-[0_0_20px_rgba(255,49,49,0.4)]"
            >
              <span>TERMINATE_SESH</span>
              <Power className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </button>
          </section>
          <section className="space-y-10 relative">
            <div className="flex items-center justify-between border-b border-brand-red/30 pb-6">
              <h3 className="text-[12px] font-mono text-brand-red tracking-[0.5em] uppercase flex items-center gap-4 italic">
                <FolderOpen className="w-5 h-5" /> INTEL_BRIEFING
              </h3>
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest bg-white/5 px-3 py-1">FILE_ID: {dossier.id}</span>
            </div>
            <div className="p-10 bg-black/40 border border-white/10 tactical-border relative group">
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-brand-red" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-brand-red" />
              <div className="space-y-6">
                <div className="flex gap-2">
                  <span className="bg-brand-red text-white text-[7px] font-mono px-1.5 py-0.5 h-fit shadow-[0_0_10px_rgba(255,49,49,0.3)]">REDACTED</span>
                  <div className="h-4 w-24 bg-brand-red/10 animate-pulse" />
                </div>
                <p className="text-lg font-mono text-white/90 italic">\"{ dossier.description}\"</p>
              </div>
            </div>
          </section>
          <section className="space-y-10 relative">
            <h3 className="text-[11px] font-mono text-brand-red tracking-[0.5em] uppercase">VALIDATED_ASSETS_COLLECTION</h3>
            <div className="space-y-6">
              {dossier.clues.map((clue, index) => (
                <div key={index} className="group flex gap-8 p-6 bg-white/[0.01] border-l-2 border-white/5 hover:border-brand-red hover:shadow-[0_0_15px_rgba(255,49,49,0.2)]">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/10 text-white/30 font-mono text-sm group-hover:text-brand-red group-hover:border-brand-red/30">
                    0{index + 1}
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="h-px w-8 bg-brand-red/30 group-hover:w-full transition-all" />
                    <p className="text-white/70 text-sm italic uppercase tracking-wide">{clue}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseLeadCard({ dossier, onDossierSelect }: { dossier: CaseFile; onDossierSelect: () => void }) {
  const isSpecial = dossier.status === 'RESTRICTED';
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onDossierSelect}
      className={`group bg-black/70 border-2 ${
        isSpecial ? 'border-brand-red/50 shadow-[0_0_25px_rgba(255,49,49,0.25)]' : 'border-brand-red/30'
      } p-5 relative overflow-hidden cursor-pointer h-full flex flex-col backdrop-blur-sm`}
    >
      <div
        className={`absolute top-0 right-0 px-2 py-0.5 text-[6px] font-mono uppercase tracking-[0.3em] z-10 ${
          dossier.status === 'RESTRICTED'
            ? 'bg-brand-red text-black shadow-[0_0_12px_rgba(255,49,49,0.5)]'
            : dossier.status === 'ENCRYPTED'
            ? 'bg-black text-brand-red border-2 border-brand-red/40'
            : 'bg-black/50 text-white/70 border-2 border-brand-red/20'
        }`}
      >
        {dossier.status}
      </div>
      <div className="mb-6 relative z-10">
        <div className="w-10 h-10 rounded border-2 border-brand-red/40 bg-black/50 flex items-center justify-center group-hover:border-brand-red/60 group-hover:shadow-[0_0_10px_rgba(255,49,49,0.3)]">
          <Ghost className={`w-5 h-5 ${isSpecial ? 'text-brand-red' : 'text-white/40 group-hover:text-brand-red'}`} />
        </div>
      </div>
      <div className="relative z-10 flex-1">
        <h3 className="text-[10px] font-mono text-white/95 uppercase italic group-hover:text-brand-red leading-tight">{dossier.name.replace(/_/g, ' ')}</h3>
        <div className="flex flex-col mt-2">
          <span className="text-[6px] font-mono text-brand-red/70 uppercase tracking-[0.2em]">FILE_CLASS</span>
          <span className="text-[7px] font-mono text-white uppercase tracking-wider">{ dossier.type}</span>
        </div>
      </div>
      {dossier.progress !== undefined && (
        <div className="mt-6 space-y-1.5 relative z-10">
          <div className="flex justify-between items-end">
            <span className="text-[6px] font-mono text-white/40 uppercase">DECRYPTION</span>
            <span className="text-[8px] font-mono text-brand-red shadow-[0_0_6px_rgba(255,49,49,0.4)]">{dossier.progress}%</span>
          </div>
          <div className="h-0.5 w-full bg-black/60 border border-brand-red/20 overflow-hidden">
            <div
              className="h-full bg-brand-red shadow-[0_0_8px_rgba(255,49,49,0.5)]"
              style={{ width: `${dossier.progress}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
