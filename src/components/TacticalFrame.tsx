'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BRAND_ASSETS } from '../data';

export function TacticalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white font-headline overflow-hidden relative">
      <div className="scanline pointer-events-none z-50" />
      <div className="crt-overlay pointer-events-none z-50" />
      {children}
      <div className="fixed bottom-0 left-0 w-full p-8 pointer-events-none z-50 flex justify-between items-end opacity-20 filter grayscale hover:opacity-100 transition-opacity">
        <motion.div className="p-2 rounded-lg shadow-[0_0_15px_rgba(255,49,49,0.3)]">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={BRAND_ASSETS.LOGO_FULL}
            alt="Protocol Root"
            className="h-8 object-contain brightness-200"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.5em]">SYSTEM_VERSION_3.11</span>
          <div className="p-1 rounded shadow-[0_0_15px_rgba(255,49,49,0.3)]">
            <img
              src={BRAND_ASSETS.LOGO_RED_KITE}
              alt="Red Kite Productions"
              className="h-6 object-contain brightness-200"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
