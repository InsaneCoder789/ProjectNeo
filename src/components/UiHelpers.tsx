'use client';

import React from 'react';

export function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
      <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">{label}</span>
      <span className="text-[11px] font-black text-brand-red uppercase tracking-widest shadow-[0_0_8px_rgba(255,49,49,0.3)]">{value}</span>
    </div>
  );
}

export function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 flex-wrap">
      <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] font-headline">{label}</span>
      <span className="text-[10px] font-bold text-brand-red font-mono break-all text-right uppercase shadow-[0_0_8px_rgba(255,49,49,0.3)]">{value}</span>
    </div>
  );
}
