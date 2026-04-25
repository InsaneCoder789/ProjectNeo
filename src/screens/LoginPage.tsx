'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Terminal } from 'lucide-react';
import { BRAND_ASSETS } from '../data';

export function UplinkGate({ onUplinkInitiated }: { onUplinkInitiated: () => void }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white overflow-hidden">
      <div className="relative hidden lg:flex lg:w-7/12 overflow-hidden bg-black">
        <img
          src={BRAND_ASSETS.HERO}
          alt="Field Agents"
          className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-110"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8 sm:px-12 bg-black relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl opacity-10 animate-pulse" />
        </div>

        <div className="w-full max-w-md rounded-[2rem] border-2 border-brand-red/50 bg-black/80 p-8 shadow-[0_0_60px_rgba(255,49,49,0.5),0_0_120px_rgba(255,49,49,0.2),0_40px_120px_rgba(15,23,42,0.55)] backdrop-blur-2xl relative z-10 overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-brand-red/20 to-brand-red/5 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="mb-6 text-center">
              <div className="inline-block p-4 rounded-lg bg-gradient-to-br from-brand-red to-red-700 shadow-[0_0_20px_rgba(255,49,49,0.6),0_0_40px_rgba(255,49,49,0.3)] mb-4 transform transition-transform hover:scale-105 duration-300">
                <img src={BRAND_ASSETS.LOGO_FULL} alt="Vantage Logo" className="h-24" referrerPolicy="no-referrer" />
              </div>
              <div className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.4em] text-brand-red shadow-[0_0_15px_rgba(255,49,49,0.4)] border border-brand-red/30">
                FIELD ACCESS
              </div>
              <h2 className="mt-6 text-3xl font-black uppercase tracking-tight italic text-white drop-shadow-[0_0_10px_rgba(255,49,49,0.3)]">Secure Node Login</h2>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-brand-red to-transparent mx-auto" />
              <p className="mt-4 text-xs text-white/60 leading-relaxed">
                Enter your operative credentials and pass the validation protocol to continue.
              </p>
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-6">
            <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); onUplinkInitiated(); }}>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">Field Operative ID</label>
                <input
                  autoFocus
                  className="w-full rounded-2xl border-2 border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder:text-white/30 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30"
                  placeholder="RED_KITE_O1"
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">Encryption Passcode</label>
                <input
                  className="w-full rounded-2xl border-2 border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder:text-white/30 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-brand-red hover:bg-[#ff5252] text-black font-black py-3 uppercase tracking-[0.3em] text-xs transition-all border border-brand-red hover:border-[#ff5252] shadow-[0_0_20px_rgba(255,49,49,0.4)]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Terminal className="w-3 h-3" />
                  COMMAND CENTRE
                </span>
              </button>
            </form>

            <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60">
              <p className="font-semibold text-white">Welcome back, operative.</p>
              <p className="mt-1 leading-relaxed">
                Your session will be validated before the uplink is established. Keep your token secure and follow the protocol briefing.
              </p>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </div>
  );
}
