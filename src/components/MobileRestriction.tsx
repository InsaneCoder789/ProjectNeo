'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BRAND_ASSETS } from '../data';

export function MobileRestriction() {
  return (
    // Pure white background
    <div className="min-h-screen bg-white text-black font-mono overflow-hidden relative flex items-center justify-center p-6">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-10 max-w-sm w-full z-10"
      >
        {/* Main Logo Container - Subtle border for clean definition */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <img
            src={BRAND_ASSETS.LOGO_FULL}
            alt="Logo"
            className="h-12 object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Main Message - High contrast black text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-3"
        >
          <h1 className="text-3xl font-black uppercase tracking-[0.05em] text-black">
            ACCESS RESTRICTED
          </h1>
          <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">
            View on Desktop for best experience
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest pt-2">
            This analytical interface requires a full-sized display
          </p>
        </motion.div>

        {/* Divider - Clean black line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full h-px bg-black/10"
        />

        {/* Branding Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="p-2">
            <img
              src={BRAND_ASSETS.LOGO_RED_KITE}
              alt="Brand Logo"
              className="h-4 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em]">
            PROTOCOL_V3.11
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}