'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { AGENT_REGISTRY } from '../data';

export function SquadAssignment({ onSquadAssigned }: { onSquadAssigned: (agentId: string) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-block px-3 py-0.5 border border-white/10 text-brand-red text-[8px] font-black uppercase tracking-[0.5em] mb-4 shadow-[0_0_15px_rgba(255,49,49,0.4)]">
            PERSONNEL_ASSIGNMENT_REQUIRED
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white">Select_Field_Operative</h1>
          <p className="text-white/40 uppercase tracking-[0.4em] text-[10px]">Authorize investigator for deployment: PROTOCOL_ZULU</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGENT_REGISTRY.map((agent) => (
            <motion.div
              key={agent.id}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => onSquadAssigned(agent.id)}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 via-brand-red/0 to-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-px bg-white/5 group-hover:bg-brand-red/50 transition-colors">
                <div className="bg-black/50 p-6 space-y-5 relative overflow-hidden">
                  <div className="aspect-square relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10 group-hover:border-brand-red/20 shadow-[0_0_15px_rgba(255,49,49,0.2)]">
                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter leading-none text-white">{agent.name}</h3>
                      <p className="text-[8px] font-bold text-brand-red mt-2 uppercase tracking-[0.3em]">{ agent.designation}</p>
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-brand-red" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Doctrine: {agent.doctrine}</span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-white/60 font-medium italic">{agent.profile}</p>
                    </div>
                    <button className="w-full bg-white/5 group-hover:bg-brand-red group-hover:text-black text-white/40 font-black py-4 uppercase tracking-[0.3em] text-[10px] transition-all border border-white/5 group-hover:border-brand-red group-hover:shadow-[0_0_20px_rgba(255,49,49,0.4)]">
                      DEPLOY_UNIT
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
