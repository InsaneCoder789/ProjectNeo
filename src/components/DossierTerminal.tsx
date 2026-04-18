import React, { useEffect, useRef, useState } from 'react';
import { Shield } from 'lucide-react';
import { DetailStat, MetadataRow } from './UiHelpers';

export function DossierTerminal({ files = {} }: { files?: Record<string, { content: string; hidden?: boolean }> }) {
  const [history, setHistory] = useState<string[]>(['VANTAGE_OS v4.1 - SESSION_ACTIVE', 'TYPE "HELP" FOR PROTOCOLS.']);
  const [input, setInput] = useState('');
  const [lastFile, setLastFile] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const parts = cmd.split(' ');
    const mainCmd = parts[0];
    const newHistory = [...history, `> ${input}`];

    switch (mainCmd) {
      case 'help':
        newHistory.push(
          'AVAILABLE PROTOCOLS:\nLS      - LIST ARCHIVE CONTENTS\nCAT     - DECRYPT & READ FILE\nCLEAR   - PURGE BUFFER\nHELP    - LIST COMMANDS'
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'ls': {
        const showAll = parts.includes('-a') || parts.includes('-al');
        const fileList = Object.keys(files)
          .filter((name) => showAll || !files[name].hidden)
          .map((name) => `[${files[name].hidden ? 'HIDDEN' : 'FILE'}] ${name}`)
          .join('\n');
        newHistory.push(fileList || 'NO DATA FOUND.');
        break;
      }
      case 'cat': {
        const fileName = parts[1];
        if (!fileName) {
          newHistory.push('CRITICAL ERROR: SPECIFY FILENAME.');
        } else if (files[fileName]) {
          newHistory.push(`DECRYPTING ${fileName}...\n--------------------------\n${files[fileName].content}`);
          setLastFile(fileName);
        } else {
          newHistory.push(`NOT_FOUND: ${fileName}`);
        }
        break;
      }
      default:
        newHistory.push(`UNKNOWN_CMD: ${mainCmd}`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="flex flex-col gap-px bg-black/50 border border-white/10 tactical-border h-full w-full relative overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 bg-black/70 relative overflow-hidden flex-none border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_10px_rgba(255,49,49,0.6)]" />
          <span className="text-[10px] font-headline font-black text-white tracking-[0.4em] uppercase">REMOTE_CONSOLE_LINK_04</span>
        </div>
        <div className="flex gap-10 items-center">
          <DetailStat label="BAUD" value="56.7K" />
          <DetailStat label="ENCRYPTION" value="AES-4096" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
        <div className="col-span-1 md:col-span-8 bg-black/40 p-8 flex flex-col relative overflow-hidden border-r border-white/10">
          <div className="crt-overlay opacity-20 pointer-events-none" />
          <div className="scanline opacity-10 pointer-events-none" />
          <div className="flex-1 overflow-y-auto space-y-3 mb-6 custom-scrollbar relative z-10 font-mono text-[11px]">
            {history.map((line, index) => (
              <div key={index} className={line.startsWith('>') ? 'text-brand-red font-black shadow-[0_0_10px_rgba(255,49,49,0.2)]' : 'text-white/80 whitespace-pre-wrap'}>
                {line}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          <form onSubmit={handleCommand} className="flex gap-4 items-center border-t border-white/10 pt-6 relative z-10">
            <span className="text-brand-red font-black font-mono shadow-[0_0_10px_rgba(255,49,49,0.2)]">ROOT@VANTAGE:~$</span>
            <input
              autoFocus
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-white font-mono lowercase tracking-[0.2em] outline-none"
              placeholder="..."
            />
          </form>
        </div>
        <div className="col-span-1 md:col-span-4 bg-black/50 p-8 border-l border-white/10 space-y-8">
          <h4 className="text-[10px] font-headline font-black text-brand-red tracking-[0.3em] uppercase mb-8 flex items-center gap-3 shadow-[0_0_10px_rgba(255,49,49,0.2)]">
            <Shield className="w-4 h-4" /> NODE_METADATA
          </h4>
          <div className="space-y-6">
            <MetadataRow label="OBJECT_ID" value={lastFile || 'UNSELECTED'} />
            <MetadataRow
              label="SIZE"
              value={lastFile ? `${(files[lastFile]?.content.length || 0) * 8} bits` : '---'}
            />
            <MetadataRow
              label="PERMISSIONS"
              value={lastFile ? (files[lastFile]?.hidden ? 'READ_ONLY (HIDDEN)' : 'READ_ONLY') : '---'}
            />
            <MetadataRow label="CHECKSUM" value={lastFile ? 'VX-7729-ALPHA' : '---'} />
          </div>
        </div>
      </div>
    </div>
  );
}
