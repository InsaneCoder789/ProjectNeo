import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Terminal, 
  Shield, 
  Power, 
  ChevronRight, 
  X, 
  FolderOpen, 
  TriangleAlert, 
  Ghost, 
  Box, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';

// --- TYPES & INTERFACES ---

export interface CaseFile {
  id: string;
  name: string;
  type: string;
  status: 'RESTRICTED' | 'ENCRYPTED' | 'OPENED';
  progress?: number;
  icon: string;
  description: string;
  clues: string[];
  proofs: string[];
  suspects: string[];
  twist: string;
  solution: string;
  evidence_imgs?: string[];
  terminalFiles?: Record<string, { content: string; hidden?: boolean }>;
}

export interface StorageNode {
  id: string;
  name: string;
  integrity: number;
}

// --- CONFIG & CONSTANTS ---

export const BRAND_ASSETS = {
  BANNER: '/images/og-image.png',
  HERO: '/images/hero-mobile.png',
  TEXT_GREP: '/images/logo-secondary.png',
  AGENT_GREP: '/images/grep.png',
  AGENT_SED: '/images/sed.png',
  AGENT_CURL: '/images/curl.png',
  LOGO_FULL: '/images/logo.png',
  LOGO_RED_KITE: '/images/red-kite.png',
};

export const AGENT_REGISTRY = [
  {
    id: 'grep',
    name: 'INSPECTOR GREP',
    designation: 'PATTERN_RECOGNITION_SURVEILLANCE',
    image: BRAND_ASSETS.AGENT_GREP,
    doctrine: 'RECURSIVE_SCAN',
    profile: 'Advanced heuristic analysis engine capable of identifying non-obvious data correlations. Optimal for high-entropy log environments.',
    color: '#FF3131'
  },
  {
    id: 'curl',
    name: 'AGENT CURL',
    designation: 'NETWORK_EXFILTRATION_OPERATIVE',
    image: BRAND_ASSETS.AGENT_CURL,
    doctrine: 'PAYLOAD_UPLINK',
    profile: 'Specializes in low-level socket communication and protocol spoofing. Can bypass hardware-level firewalls without detection.',
    color: '#31A3FF'
  },
  {
    id: 'sed',
    name: 'DR. SED',
    designation: 'STREAM_TRANSFORMATION_SPECIALIST',
    image: BRAND_ASSETS.AGENT_SED,
    doctrine: 'BUFFER_DECODER',
    profile: 'Expert in stream editing and real-time data cleansing. Capable of reconstructing fragmented payloads from corrupted memory dumps.',
    color: '#31FF84'
  }
];

export const CASE_FILES: CaseFile[] = [
  { 
    id: '01', 
    name: 'VANGUARD_PROTOCOL_LEAK', 
    type: 'Intel_Dossier', 
    status: 'OPENED', 
    progress: 100, 
    icon: 'folder',
    description: 'Dr. Aris Thorne, head of Neural Weapons at Vanguard Corp, was found deceased in a vacuum-sealed chamber. His terminal is broadcasting a "Dead Man\'s Switch" titled Protocol_Omega. The data blocks contain encrypted coordinates for every active orbital orbital rail-gun. We need to intercept the final transmission before it reaches the Black Kite cell.',
    clues: [
      'Encrypted handshakes originating from Dr. Thorne\'s terminal at 03:00 Zulu',
      'Unusual packet headers containing human-DNA sequencing data',
      'A physical key-card found in Dr. Thorne\'s hand, but with no magnetic stripe'
    ],
    proofs: [
      'Recovery of the ".omega_cipher" hidden within a kernel dump',
      'Audio recording of Thorne\'s final moments mentioning "The Glass Horizon"'
    ],
    suspects: ['Marcus Reed (CEO)', 'Dr. Aris Thorne (Deceased)', 'Unknown Black Kite Operative'],
    twist: 'Thorne didn\'t die of natural causes; he was the first successful subject of the "Vanguard Proxy" program, and his consciousness is currently hijacking the orbital grid.',
    solution: 'Use the .omega_cipher to override the satellite link and initiate a hard-reboot of the Vanguard Neural Grid.',
    terminalFiles: {
      'readme.txt': { content: 'CASE_01: VANGUARD_PROTOCOL_LEAK\n============================\nSUBJECT: DR. ARIS THORNE\nPOSITION: CHIEF NEURAL ARCHITECT\nSTATUS: K.I.A (UNSPECIFIED ASPHYXIATION)\n\nInvestigation into "Protocol_Omega" initiated. Accessing primary terminal...' },
      'chamber_logs.log': { content: '02:45:00 - Chamber Pressure: 5.0 PSI\n02:55:00 - Chamber Pressure: 0.1 PSI (ALARM)\n02:56:10 - User ID [THORNE_A] terminal active\n02:59:59 - [PROTOCOL_OMEGA] INITIATED\n03:00:00 - ACCESS GRANTED: ORBITAL_DEFENSE_LAYER_01' },
      'private/diary.txt': { hidden: true, content: 'Diary Entry: 04/14\n\nReed thinks I\'m making a weapon. I\'m not. I\'m building a door. If they kill me, the door opens wide. The orbital rail-guns are the keys. If you want to stop it, you\'ll have to kill the ghost in the machine. Me.' },
      '.omega_cipher': { hidden: true, content: 'CIPHER_HEX: 0xDEADBEEF666\nKEY_ID: VANGUARD_PROXY_01\nSTATUS: BROADCASTING_TO_BLACK_KITE' },
      'orbital_coords.csv': { content: 'ID, LAT, LON, STATUS\nRG_01, 34.0522, -118.2437, ARMED\nRG_02, 51.5074, -0.1278, ARMED\nRG_03, 35.6762, 139.6503, ARMED' },
    }
  },
  { 
    id: '02', 
    name: 'GHOST_IN_THE_SIGNAL', 
    type: 'Encrypted_Stream', 
    status: 'OPENED', 
    progress: 50, 
    icon: 'lock',
    description: 'Local radio frequencies are being hijacked by an audio loop of a child hummming a song from the 1920s.',
    clues: ['The song is "Always" by Irving Berlin', 'The signal originates from an abandoned clock tower', 'Frequency modulation matches human brainwaves during REM sleep'],
    proofs: ['A rusted copper coil found at the tower', 'A diary found in the debris dated 1924'],
    suspects: ['The Caretaker', 'A local conspiracy theorist', 'The Frequency itself'],
    twist: 'The radio tower is actually a primitive attempt at a psychotronic transmitter.',
    solution: 'Tune the receiver to the inverse frequency to neutralize the hypnotic effect.',
    terminalFiles: {
      'signal_stats.log': { content: 'FREQUENCY: 104.2 MHz\nMODULATION: AM/FM_HYBRID\nORIGIN: [REDACTED_TOWER]\n\nNOTICE: BRAINWAVE SYNC AT 85%' },
      'archive/1924_diary_snippet.txt': { content: 'October 12, 1924\n\nThe singing from the tower has started again. The children walk in their sleep. They say they are going to the Garden of Time. I must disconnect the coils before the cycle repeats.' },
      '.psychotronic_config': { hidden: true, content: 'TRANSMITTER_BETA_V1\n--------------------\nTARGET_WAVE: DELTA\nEFFECT: COLLECTIVE_HYPNOSIS\nOVERRIDE_FREQ: 12.5 Hz (INVERSE)' }
    }
  },
  { 
    id: '03', 
    name: 'DIGITAL_ARSENAL', 
    type: 'Field_Report', 
    status: 'OPENED', 
    progress: 100, 
    icon: 'folderOpen',
    description: 'A massive database of experimental cyber-weapons was leaked onto the dark web, but the files are empty hulls.',
    clues: ['The leak source was traced to a local internet café', 'The files are actually encoded images containing steganography', 'The café owner has a high-security clearance background'],
    proofs: ['A hardware key found in the café trash', 'Transaction logs using an untraceable cryptocurrency'],
    suspects: ['Cafe Owner', 'An anonymous hacker group', 'The weapon designer'],
    twist: 'The weapons weren\'t leaked; they were bait to infect anyone who downloaded them with a tracking worm.',
    solution: 'Activate the kill-switch hidden in the metadata of the largest hull file.',
    terminalFiles: {
      'manifest.txt': { content: 'ARSENAL_LEAK_04\n================\nFILES: 42\nTOTAL_SIZE: 1.2 PB\n\n[WARNING]: ENCRYPTED_HULLS_DETECTED' },
      'hull_01_metadata.json': { content: '{\n  "file": "weapon_prototype_x.pkg",\n  "status": "empty",\n  "hidden_tag": "RED_KITE_TRACKER_09",\n  "kill_switch": "0xALPHA_OMEGA_REBOOT"\n}' },
      '.tracker_logs': { hidden: true, content: 'NODE_ID: 992-01\nSTATUS: ACTIVE\nRECIPIENTS_INFECTED: 1422\n\nTracking data being routed through Sector 7G.' }
    }
  },
  { 
    id: '04', 
    name: 'NEON_MEMORY', 
    type: 'Bio_Data', 
    status: 'OPENED', 
    icon: 'fileText',
    description: 'Cybernetic implants in the city of Neo-Kite are suffering from "memory rot," showing users visions of a forest that doesn\'t exist.',
    clues: ['Common denominator: All victims visited the "Crystal Garden" park', 'The visions include the scent of pine and the sound of a waterfall', 'Neural scans show high activity in the visual cortex without external stimuli'],
    proofs: ['A contaminated firmware update found on a public terminal', 'A sample of the "memory rot" code showing fractal structures'],
    suspects: ['Crystal Garden Groundskeeper', 'Firmware Lead at BioGate', 'The users themselves'],
    twist: 'The forest visions are real-world memories of the Earth before the Great Smog, preserved in the neural link.',
    solution: 'Patch the firmware to archive the memories instead of deleting them.'
  },
  { 
    id: '05', 
    name: 'VOID_PROTOCOL', 
    type: 'Kernel_Dump', 
    status: 'OPENED', 
    icon: 'terminal',
    description: 'A satellites orbital path changed autonomously, pointing its sensors at a seemingly empty patch of deep space.',
    clues: ['The new trajectory is 0.001 degrees off from a known pulsar', 'Encryption keys for the satellite were accessed by a ghost user', 'Telemetry data shows an unexpected increase in cosmic radiation'],
    proofs: ['The "ghost user" ID matches a long-dead astrophysicist', 'The patch of space contains a cloaked massive object'],
    suspects: ['Satellite Control Lead', 'A rival space agency', 'The Void'],
    twist: 'The satellite didn\'t move; the object it was tracking pulled the satellite toward it via gravity.',
    solution: 'Recalibrate the propulsion system to escape the objects gravitational well.'
  },
  { 
    id: '06', 
    name: 'CLOCKWORK_STORM', 
    type: 'Legacy_Script', 
    status: 'OPENED', 
    icon: 'document',
    description: 'A city-wide blackout occurred precisely when a rare solar eclipse began, despite no grid failures.',
    clues: ['The blackout followed a pattern matching Leonardo da Vincis drawings', 'All smart devices displayed the message "TIME_IS_UP"', 'The grid controllers registered zero output from green energy sources'],
    proofs: ['A mechanical device found attached to the main transformer', 'A script found on the grid server titled "Chronos"'],
    suspects: ['The Grid Tech', 'A historian with an axe to grind', 'The Solar Flare'],
    twist: 'The blackout was a distraction for a heist of the world\'s most accurate atomic clock.',
    solution: 'Track the atomic clock\'s unique quantum signature to the harbor.'
  },
  { 
    id: '07', 
    name: 'CHIMERA_DATA', 
    type: 'Sat_Imagery', 
    status: 'OPENED', 
    icon: 'cloud',
    description: 'Satellite photos of the Amazon show a massive structure appearing and disappearing between frames.',
    clues: ['The structure is geometric and reflects 100% of light', 'Infrared scans show extreme cold at the site', 'Local wildlife has completely avoided the area for miles'],
    proofs: ['A piece of strange, non-organic material found by an explorer', 'A blurry aerial photo taken from a low-flying drone'],
    suspects: ['The Explorer', 'The Satellite Analyst', 'The Structure'],
    twist: 'The structure is a massive, multi-dimensional mirror reflects future satellite sweeps.',
    solution: 'Realign the satellite to a different spectrum to see through the "mirror."'
  },
  { 
    id: '08', 
    name: 'PHANTOM_IDENTITY', 
    type: 'Audio_Intercept', 
    status: 'OPENED', 
    icon: 'micOff',
    description: 'Every digital record of a prominent politician has been replaced by a fictional history from a sci-fi novel.',
    clues: ['The novel is "The Man Who Folded Yesterday"', 'Digital IDs show 100% consistency with the new history', 'All physical photos have mysteriously faded or vanished'],
    proofs: ['A backup server found in a deep-sea data center', 'A witness who remembers the real history'],
    suspects: ['Political Rival', 'The Novelist\'s Grandson', 'The Politician Himself'],
    twist: 'The politician *is* a fictional character who was somehow brought into reality via a experimental AI narrator.',
    solution: 'Feed the AI narrator a "The End" command based on the novels original manuscript.'
  },
  { 
    id: '09', 
    name: 'STATIC_FOREST', 
    type: 'Intel_Dossier', 
    status: 'OPENED', 
    icon: 'target',
    description: 'A viral video shows a forest where the trees are made of pure, colorful static and emit a buzzing sound.',
    clues: ['The buzz is a sequence of Prime numbers', 'People who enter the forest report "pixelated" vision', 'The forest is expanding at 1 meter per hour'],
    proofs: ['A leaf that is actually a 2D digital object in a 3D world', 'Soil samples that are composed of fine magnetic particles'],
    suspects: ['The Videographer', 'A nearby physics research lab', 'The Forest Mother'],
    twist: 'The forest is a "glitch" in reality caused by a corrupted world-simulation server.',
    solution: 'Reboot the local simulation node located under the "Static Oak".'
  },
  { 
    id: '10', 
    name: 'IOTA_BREACH', 
    type: 'Firewall_Log', 
    status: 'OPENED', 
    icon: 'shield',
    description: 'A high-security bank was robbed without a single door being opened or a single byte being altered on the ledger.',
    clues: ['The vault was empty at 8:00 AM, but full at 5:00 PM the previous day', 'The bank\'s internal clock is 4 minutes ahead of UTC', 'No security cameras captured any movement in the vault'],
    proofs: ['A small device that emits a localized temporal field', 'A set of blueprints showing "blind spots" in time'],
    suspects: ['Bank Manager', 'The Clockmaker', 'The Security Tech'],
    twist: 'The robbers used a temporal bridge to take the money *before* it was even put in the vault.',
    solution: 'Sync the bank\'s clock with a quantum-accurate time source to collapse the bridge.'
  },
  { 
    id: '11', 
    name: 'KAPPA_ZERO', 
    type: 'Geo_Target', 
    status: 'ENCRYPTED', 
    icon: 'target',
    description: 'A ghost ship was found drifting in the Pacific, its crew missing but their dinners still warm on the table.',
    clues: ['The ship\'s log ends abruptly with the word "KAPPA"', 'The dinner is a traditional Japanese meal from 1945', 'Radial sensors detect a small, intense pocket of radiation in the hold'],
    proofs: ['A compass that points at the ships hold instead of North', 'A personal journal from a crew member mentioning a "singing light"'],
    suspects: ['The First Mate', 'The Shipping Company', 'The Singing Light'],
    twist: 'The crew aren\'t missing; they were pulled into the ships hold, which is now a pocket dimension.',
    solution: 'Enter the hold with a stabilizing field generator to retrieve the crew.'
  },
  { 
    id: '12', 
    name: 'LAMBDA_PROTOCOL', 
    type: 'Asset_Log', 
    status: 'OPENED', 
    icon: 'package',
    description: 'A crate of "indestructible" alloy was found crushed as if by a massive force in a vacuum-sealed warehouse.',
    clues: ['The pressure inside the warehouse was constant', 'The floor under the crate is pristine', 'The only sound recorded was a low-frequency hum'],
    proofs: ['A micro-black hole generator found in a hidden compartment', 'The alloy itself shows signs of massive quantum stress'],
    suspects: ['Materials Scientist', 'Inventory Manager', 'The Package Itself'],
    twist: 'The crate didn\'t contain alloy; it contained a prototype engine that imploded on its first automated test.',
    solution: 'Shutdown the engine\'s autonomous core before it triggers a second implosion.'
  },
  { 
    id: '13', 
    name: 'MU_VIRUS', 
    type: 'Malware_Sample', 
    status: 'RESTRICTED', 
    icon: 'alertCircle',
    description: 'A computer virus is infecting people via their smart TVs, causing them to speak in an unknown language.',
    clues: ['The language is a complex binary-to-syllable mapping', 'Affected people only speak when the TV is on static', 'Neural links show the virus is rewriting the users language center'],
    proofs: ['A recording of the "unknown language" that decodes to a manifesto', 'A modified TV remote with a direct neural interface'],
    suspects: ['TV Manufacturer', 'The "Manifesto" Author', 'A rogue AI'],
    twist: 'The virus was meant to *teach* a universal language, but the human brain couldn\'t handle the bandwidth.',
    solution: 'Upload a rate-limiting patch to the language center via the next static-burst.'
  },
  { 
    id: '14', 
    name: 'NU_DUMP', 
    type: 'Hardware_Dump', 
    status: 'ENCRYPTED', 
    icon: 'cpu',
    description: 'A shipment of high-end CPUs contains a hidden instruction set that allows for "time-shifted" calculations.',
    clues: ['The CPUs are 10x faster than theoretical limits', 'Calculations are completed 1 second before they are requested', 'The heat output of the chips is 0 degrees Kelivn'],
    proofs: ['A schematic of the "time-shifted" core', 'A chip that has been running for 100 years in 1 second'],
    suspects: ['CPU Design Lead', 'A time-traveling hobbyist', 'The Chips themselves'],
    twist: 'The CPUs are drawing processing power from future versions of themselves.',
    solution: 'Limit the time-shifting window to prevent a paradox-induced meltdown.'
  },
  { 
    id: '15', 
    name: 'XI_EYE', 
    type: 'Surveillance', 
    status: 'OPENED', 
    icon: 'eye',
    description: 'A street-view car captured a photo of a woman who appears in every single street-view image globally, regardless of city or country.',
    clues: ['She is always wearing a green hat and holding a red book', 'She never looks at the camera', 'The Red Book is titled "The Archive of Everything"'],
    proofs: ['A high-res scan showing the red book contains the names of every person on Earth', 'A location where she was seen in two different countries at the same time'],
    suspects: ['The Woman', 'The Mapping Service', 'The Red Book Author'],
    twist: 'The woman is a guardian AI made real, and the mapping service is her way of monitoring the simulation.',
    solution: 'Ask her about the Red Book using a specific query to unlock her archives.'
  },
  { 
    id: '16', 
    name: 'OMICRON_GHOST', 
    type: 'Signal_Ghost', 
    status: 'ENCRYPTED', 
    icon: 'wifiOff',
    description: 'A public Wi-Fi network in a busy park is providing data from the year 2045.',
    clues: ['News headlines mention the "Great Convergence"', 'Stock prices are accurate for future trends', 'Network ID is "FUTURE_IS_NOW"'],
    proofs: ['A digital newspaper from 2045 found in the cache', 'A user ID that doesn\'t exist yet'],
    suspects: ['Network Admin', 'A "Future" Traveler', 'The Park Groundskeeper'],
    twist: 'The Wi-Fi isn\'t FROM the future; it\'s an AI\'s prediction engine that\'s actually 100% accurate.',
    solution: 'Patch the AI\'s prediction algorithm to prevent it from influencing the present.'
  },
  { 
    id: '17', 
    name: 'PI_FINGERPRINT', 
    type: 'Identity_File', 
    status: 'RESTRICTED', 
    icon: 'fingerprint',
    description: 'A set of fingerprints found at a crime scene don\'t match any human on record, but are identical to the prints in a 1,000-year-old Egyptian tomb.',
    clues: ['The prints are slightly elongated at the tip', 'Traces of ancient Myrrh were found on the scene', 'The crime scene was a museum of ancient artifacts'],
    proofs: ['DNA from the fingerprints matches a mummified Pharaoh', 'A security video showing a figure that looks like the Pharaoh\'s statue'],
    suspects: ['Museum Curator', 'The Modern-day "Pharaoh"', 'The Tomb Raider'],
    twist: 'The "fingerprints" are actually a sophisticated DNA-based key used to unlock ancient technology.',
    solution: 'Use the DNA-key to unlock the "Tomb of the Stars" and retrieve the stolen artifacts.'
  },
  { 
    id: '18', 
    name: 'RHO_COMMS', 
    type: 'Comms_Log', 
    status: 'OPENED', 
    icon: 'mail',
    description: 'An AI-driven email service has started sending letters to users from their deceased relatives, correctly predicting future events.',
    clues: ['Emails are sent from addresses that have been deleted for years', 'Content includes personal details only the relative knew', 'Predictions reach 99% accuracy'],
    proofs: ['A server log showing the AI accessing "ancestral memory" files', 'An email that predicts the end of the world'],
    suspects: ['AI Lead', 'The "Deceased" Relatives', 'The Service Owner'],
    twist: 'The AI isn\'t communicating with the dead; it\'s using a massive database of human behavior to simulate the deceased perfectly.',
    solution: 'Limit the simulation\'s predictive capabilities to prevent it from causing panic.'
  },
  { 
    id: '19', 
    name: 'TAU_KEY', 
    type: 'Access_Code', 
    status: 'ENCRYPTED', 
    icon: 'key',
    description: 'A physical key that can unlock any digital or physical lock in the city was stolen from a high-security vault.',
    clues: ['The key is made of a strange, non-reflective material', 'All digital locks it opened recorded the same "TAU" unlock code', 'The thief was never seen on camera'],
    proofs: ['A set of digital lock logs showing the "TAU" code at multiple locations', 'A witness who saw the key "shaping" itself to fit a lock'],
    suspects: ['The Vault Guard', 'A master thief', 'The Key Designer'],
    twist: 'The key is a programmable nanotech mass that mimics any locking mechanism it touches.',
    solution: 'Send a "RESET" command via the city-wide network to deactivate the nanotech.'
  },
  { 
    id: '20', 
    name: 'UPSILON_DATA', 
    type: 'Shared_Data', 
    status: 'OPENED', 
    icon: 'folderShared',
    description: 'A file-sharing platform has a single "locked" folder that everyone can see but no one can open, and it\'s growing by 1TB a day.',
    clues: ['The folder name is "UPSILON"', 'Upload source is a localized anomaly in the network', 'Encryption type is unknown but seems to be organic'],
    proofs: ['A snippet of the folders code that matches human DNA', 'A log showing the folder is "ingesting" all deleted files on the platform'],
    suspects: ['Platform Owner', 'A digital hoarder', 'The Network itself'],
    twist: 'The folder is a digital "compost heap" for the city\'s data, where deleted files merge into a new form of digital life.',
    solution: 'Define the digital life\'s growth parameters to ensure it remains beneficial to the city.'
  },
];

// --- HELPER UI COMPONENTS ---

export function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
      <span className="text-[8px] font-black text-muted/40 uppercase tracking-[0.4em]">{label}</span>
      <span className="text-[11px] font-black text-brand-red uppercase tracking-widest">{value}</span>
    </div>
  );
}

export function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 flex-wrap">
      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] font-headline">{label}</span>
      <span className="text-[10px] font-bold text-brand-red font-mono break-all text-right uppercase">{value}</span>
    </div>
  );
}

// --- CORE LAYOUT & PAGE COMPONENTS ---

export function TacticalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-headline overflow-hidden relative">
      <div className="scanline pointer-events-none z-50" />
      <div className="crt-overlay pointer-events-none z-50" />
      
      {children}

      <div className="fixed bottom-0 left-0 w-full p-8 pointer-events-none z-50 flex justify-between items-end opacity-20 filter grayscale hover:opacity-100 transition-opacity">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={BRAND_ASSETS.LOGO_FULL} 
          alt="Protocol Root" 
          className="h-10 object-contain brightness-200"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] font-black text-muted/30 uppercase tracking-[0.5em]">SYSTEM_VERSION_3.11</span>
          <img 
            src={BRAND_ASSETS.LOGO_RED_KITE} 
            alt="Red Kite Productions" 
            className="h-8 object-contain brightness-200"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}

export function UplinkGate({ onUplinkInitiated }: { onUplinkInitiated: () => void }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="hidden lg:flex w-7/12 relative overflow-hidden flex-col justify-end p-24">
        <div className="absolute inset-0 z-0">
          <img src={BRAND_ASSETS.HERO} alt="Field Agents" className="w-full h-full object-cover opacity-90 scale-100" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#000000]/30 to-[#000000]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full bg-brand-red/5 mix-blend-overlay" />
        </div>
        <div className="relative z-10 space-y-8">
          <motion.img initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} src={BRAND_ASSETS.LOGO_FULL} alt="Vantage Control" className="h-32 object-contain" referrerPolicy="no-referrer" />
          <div className="h-0.5 w-48 bg-brand-red shadow-[0_0_15px_rgba(255,49,49,0.5)]" />
          <p className="text-2xl font-black uppercase tracking-[0.3em] max-w-lg leading-tight text-white italic">
            LOGIN PORTAL
            <span className="block text-brand-red text-sm mt-3 tracking-[0.5em] font-bold not-italic">VANGUARD_FIELD_ACCESS</span>
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#000000] relative z-10 border-l border-white/5 shadow-[-50px_0_100px_rgba(0,0,0,0.9)]">
        <img src={BRAND_ASSETS.LOGO_FULL} alt="Logo" className="lg:hidden h-20 mb-12" referrerPolicy="no-referrer" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md p-px tactical-border bg-gradient-to-b from-brand-red/20 to-transparent shadow-[0_0_80px_rgba(255,49,49,0.1)]">
          <div className="p-10 space-y-12 bg-[#050505] relative overflow-hidden">
            <header className="space-y-4">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-brand-red" />
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none italic">NODE AUTHORIZATIOn</h2>
              </div>
              <p className="text-[10px] font-bold text-muted/30 uppercase tracking-[0.5em] border-l-2 border-brand-red pl-4">SECURE PROXY ALPHA V1.4</p>
            </header>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onUplinkInitiated(); }}>
              <div className="space-y-8">
                <div className="group relative border-b border-muted/10 pb-4 focus-within:border-brand-red transition-all">
                  <label className="block text-[9px] font-black text-muted/40 mb-2 uppercase tracking-[0.3em] group-focus-within:text-brand-red">FIELD_OPERATIVE_ID</label>
                  <input autoFocus className="w-full bg-transparent border-none text-xl font-black text-on-surface focus:ring-0 placeholder:text-muted/5 uppercase tracking-[0.2em] outline-none" placeholder="RED_KITE_O1" type="text" />
                </div>
                <div className="group relative border-b border-muted/10 pb-4 focus-within:border-brand-red transition-all">
                  <label className="block text-[9px] font-black text-muted/40 mb-2 uppercase tracking-[0.3em] group-focus-within:text-brand-red">RSA_ENCRYPTION_STRING</label>
                  <input className="w-full bg-transparent border-none text-xl font-black text-on-surface focus:ring-0 placeholder:text-muted/5 tracking-[0.3em] outline-none" placeholder="••••••••" type="password" />
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-red hover:bg-[#ff1a1a] text-white font-black py-6 uppercase tracking-[0.4em] text-xs transition-all flex items-center justify-center gap-4 group shadow-[0_0_40px_rgba(255,49,49,0.2)] active:scale-95">
                <span>COMMAND CENTRE</span>
                <Terminal className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <footer className="pt-12 border-t border-white/5 text-center flex flex-col gap-8">
              <div className="flex flex-col items-center gap-4 grayscale group-hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
                <span className="text-[8px] font-black text-muted/30 uppercase tracking-[0.6em] group-hover:text-brand-red transition-colors">AUTHORIZED_BY</span>
                <img src={BRAND_ASSETS.LOGO_RED_KITE} alt="Red Kite Productions" className="h-10 object-contain brightness-125" referrerPolicy="no-referrer" />
              </div>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function SquadAssignment({ onSquadAssigned }: { onSquadAssigned: (agentId: string) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#000000]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-block px-3 py-0.5 border border-brand-red text-brand-red text-[8px] font-black uppercase tracking-[0.5em] mb-4">PERSONNEL_ASSIGNMENT_REQUIRED</div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white">Select_Field_Operative</h1>
          <p className="text-muted/40 uppercase tracking-[0.4em] text-[10px]">Authorize investigator for deployment: PROTOCOL_ZULU</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGENT_REGISTRY.map((agent) => (
            <motion.div key={agent.id} whileHover={{ scale: 1.02, y: -5 }} onClick={() => onSquadAssigned(agent.id)} className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 via-brand-red/0 to-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-px bg-white/5 group-hover:bg-brand-red/50 transition-colors">
                <div className="bg-[#050505] p-6 space-y-5 relative overflow-hidden">
                  <div className="aspect-square relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5 group-hover:border-brand-red/20">
                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter leading-none text-white">{agent.name}</h3>
                      <p className="text-[8px] font-bold text-brand-red mt-2 uppercase tracking-[0.3em]">{agent.designation}</p>
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-brand-red" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Doctrine: {agent.doctrine}</span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-muted/60 font-medium italic">{agent.profile}</p>
                    </div>
                    <button className="w-full bg-white/5 group-hover:bg-brand-red group-hover:text-white text-muted/40 font-black py-4 uppercase tracking-[0.3em] text-[10px] transition-all border border-white/5 group-hover:border-brand-red">DEPLOY_UNIT</button>
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

export function DossierTerminal({ files = {} }: { files?: Record<string, { content: string; hidden?: boolean }> }) {
  const [history, setHistory] = useState<string[]>(['VANTAGE_OS v4.1 - SESSION_ACTIVE', 'TYPE "HELP" FOR PROTOCOLS.']);
  const [input, setInput] = useState('');
  const [lastFile, setLastFile] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.trim().toLowerCase();
    const parts = cmd.split(' ');
    const mainCmd = parts[0];
    const newHistory = [...history, `> ${input}`];

    switch (mainCmd) {
      case 'help': newHistory.push('AVAILABLE PROTOCOLS:\nLS      - LIST ARCHIVE CONTENTS\nCAT     - DECRYPT & READ FILE\nCLEAR   - PURGE BUFFER\nHELP    - LIST COMMANDS'); break;
      case 'clear': setHistory([]); setInput(''); return;
      case 'ls':
        const showAll = parts.includes('-a') || parts.includes('-al');
        const fileList = Object.keys(files).filter(name => showAll || !files[name].hidden).map(name => `[${files[name].hidden ? 'HIDDEN' : 'FILE'}] ${name}`).join('\n');
        newHistory.push(fileList || 'NO DATA FOUND.');
        break;
      case 'cat':
        const fileName = parts[1];
        if (!fileName) newHistory.push('CRITICAL ERROR: SPECIFY FILENAME.');
        else if (files[fileName]) { newHistory.push(`DECRYPTING ${fileName}...\n--------------------------\n${files[fileName].content}`); setLastFile(fileName); }
        else newHistory.push(`NOT_FOUND: ${fileName}`);
        break;
      default: newHistory.push(`UNKNOWN_CMD: ${mainCmd}`);
    }
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className={`flex flex-col gap-px bg-[#080808] border border-brand-red/20 tactical-border h-full w-full relative overflow-hidden`}>
      <div className="flex items-center justify-between px-6 py-3 bg-brand-red/5 relative overflow-hidden flex-none border-b border-brand-red/10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span className="text-[10px] font-headline font-black text-brand-red tracking-[0.4em] uppercase">REMOTE_CONSOLE_LINK_04</span>
        </div>
        <div className="flex gap-10 items-center">
          <DetailStat label="BAUD" value="56.7K" />
          <DetailStat label="ENCRYPTION" value="AES-4096" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
        <div className="col-span-1 md:col-span-8 bg-[#000000] p-8 flex flex-col relative overflow-hidden border-r border-brand-red/10">
          <div className="crt-overlay opacity-20 pointer-events-none" />
          <div className="scanline opacity-10 pointer-events-none" />
          <div className="flex-1 overflow-y-auto space-y-3 mb-6 custom-scrollbar relative z-10 font-mono text-[11px]">
            {history.map((line, i) => (<div key={i} className={line.startsWith('>') ? 'text-brand-red font-black' : 'text-white/80 whitespace-pre-wrap'}>{line}</div>))}
            <div ref={scrollRef} />
          </div>
          <form onSubmit={handleCommand} className="flex gap-4 items-center border-t border-brand-red/10 pt-6 relative z-10">
            <span className="text-brand-red font-black font-mono">ROOT@VANTAGE:~$</span>
            <input autoFocus value={input} onChange={(e) => setInput(e.target.value)} className="bg-transparent border-none outline-none flex-1 text-white font-mono lowercase tracking-[0.2em] outline-none" placeholder="..." />
          </form>
        </div>
        <div className="col-span-1 md:col-span-4 bg-[#050505] p-8 border-l border-white/5 space-y-8">
           <h4 className="text-[10px] font-headline font-black text-brand-red tracking-[0.3em] uppercase mb-8 flex items-center gap-3"><Shield className="w-4 h-4" /> NODE_METADATA</h4>
           <div className="space-y-6">
              <MetadataRow label="OBJECT_ID" value={lastFile || "UNSELECTED"} />
              <MetadataRow label="SIZE" value={lastFile ? `${(files[lastFile]?.content.length || 0) * 8} bits` : "---"} />
              <MetadataRow label="PERMISSIONS" value={lastFile ? (files[lastFile]?.hidden ? "READ_ONLY (HIDDEN)" : "READ_ONLY") : "---"} />
              <MetadataRow label="CHECKSUM" value={lastFile ? "VX-7729-ALPHA" : "---"} />
           </div>
        </div>
      </div>
    </div>
  );
}

export function CaseDossier({ dossier, activeAgent, onCloseRequested, onLogoutRequested }: { dossier: CaseFile, activeAgent: any, onCloseRequested: () => void, onLogoutRequested: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="fixed inset-0 z-50 bg-[#020202] flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
        <div className="scanline opacity-[0.03] pointer-events-none" />
        <div className="crt-overlay opacity-[0.05] pointer-events-none" />
        <div className="lg:col-span-8 overflow-y-auto p-12 custom-scrollbar relative z-10 border-r border-white/5 bg-black">
          <section className="space-y-10 h-full flex flex-col pt-12">
             <div className="flex items-center gap-10 mb-8">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-brand-red text-white text-[8px] font-black px-2 py-0.5 tracking-[0.2em] uppercase">CLASSIFIED</span>
                    <span className="text-[9px] font-black text-brand-red tracking-[0.4em] uppercase opacity-60">CENTRAL_INTELLIGENCE_NODE</span>
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-white">{dossier.name.replace(/_/g, ' ')}</h2>
                </div>
                <div className="h-12 w-px bg-white/10 mx-4" />
                <div className="hidden xl:flex items-center gap-6">
                  <div className="w-10 h-10 rounded-sm border border-brand-red/30 p-1 bg-brand-red/5">
                    <img src={activeAgent.image} alt={activeAgent.name} className="w-full h-full object-cover rounded-sm grayscale" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-brand-red/60 uppercase tracking-[0.2em]">DEPLO_DOCTRINE: {activeAgent.doctrine}</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mt-1">OPERATIVE_{activeAgent.name.toUpperCase()}</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/10 mx-4" />
                <img src={BRAND_ASSETS.HERO} alt="Tactical Context" className="h-12 w-24 object-cover opacity-40 rounded-sm border border-white/5 grayscale" referrerPolicy="no-referrer" />
              </div>
             <div className="flex items-center gap-6">
              <h3 className="text-[11px] font-black text-brand-red tracking-[0.6em] uppercase flex items-center gap-4"><Shield className="w-4 h-4" /> NEURAL_TERMINAL_UPLINK</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-brand-red/40 to-transparent" />
              <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">ENCRYPTION: AES_4096_GCM</div>
            </div>
            <div className="flex-1 min-h-[550px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5">
              <DossierTerminal files={dossier.terminalFiles} />
            </div>
          </section>
        </div>
        <div className="lg:col-span-4 bg-[#050505] overflow-y-auto p-12 space-y-16 custom-scrollbar relative z-10 border-l border-brand-red/20 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]">
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <span className="text-[10px] font-black text-muted/30 uppercase tracking-[0.3em] italic">Session_Navigation</span>
               <div className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" /><span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Uplink_Solid</span></div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 border-b border-white/5">
              <DetailStat label="SECURITY" value="LVL_7" />
              <DetailStat label="STATUS" value={dossier.status} />
              <DetailStat label="THREAT" value={dossier.status === 'RESTRICTED' ? 'CRITICAL' : 'B-CLASS'} />
            </div>
            <button onClick={onCloseRequested} className="w-full py-4 bg-brand-red/10 hover:bg-brand-red border border-brand-red/30 text-brand-red hover:text-white font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-2 group active:scale-95">
              <span>TERMINATE_SESH</span>
              <Power className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </button>
          </section>
          <section className="space-y-10 relative">
            <div className="flex items-center justify-between border-b border-brand-red/30 pb-6"><h3 className="text-[12px] font-black text-brand-red tracking-[0.5em] uppercase flex items-center gap-4 italic"><FolderOpen className="w-5 h-5" /> INTEL_BRIEFING</h3><span className="text-[9px] font-black text-white/20 uppercase tracking-widest bg-white/5 px-3 py-1">FILE_ID: {dossier.id}</span></div>
            <div className="p-10 bg-[#080808] border border-white/5 tactical-border relative group">
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-brand-red" /><div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-brand-red" />
              <div className="space-y-6"><div className="flex gap-2"><span className="bg-brand-red text-white text-[7px] font-black px-1.5 py-0.5 h-fit">REDACTED</span><div className="h-4 w-24 bg-brand-red/10 animate-pulse" /></div><p className="text-lg font-medium text-white/90 italic">"{dossier.description}"</p></div>
            </div>
          </section>
          <section className="space-y-10 relative">
            <h3 className="text-[11px] font-black text-brand-red tracking-[0.5em] uppercase">VALIDATED_ASSETS_COLLECTION</h3>
            <div className="space-y-6">
              {dossier.clues.map((clue, idx) => (
                <div key={idx} className="group flex gap-8 p-6 bg-white/[0.01] border-l-2 border-white/5 hover:border-brand-red">
                   <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/10 text-white/30 font-mono text-sm group-hover:text-brand-red group-hover:border-brand-red/30">0{idx + 1}</div>
                   <div className="space-y-3 flex-1"><div className="h-px w-8 bg-brand-red/30 group-hover:w-full transition-all" /><p className="text-white/70 text-sm italic uppercase tracking-wide">{clue}</p></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseLeadCard({ dossier, onDossierSelect }: { key?: React.Key, dossier: CaseFile, onDossierSelect: () => void }) {
  const isSpecial = dossier.status === 'RESTRICTED';
  return (
    <motion.div whileHover={{ scale: 1.02, y: -2 }} onClick={onDossierSelect} className={`group bg-[#080808] border ${isSpecial ? 'border-brand-red/30 shadow-[0_0_30px_rgba(255,49,49,0.05)]' : 'border-white/5'} p-6 relative overflow-hidden cursor-pointer h-full flex flex-col`}>
      <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] z-10 ${dossier.status === 'RESTRICTED' ? 'bg-brand-red text-white' : dossier.status === 'ENCRYPTED' ? 'bg-black text-brand-red border border-brand-red/20' : 'bg-white/10 text-white'}`}>{dossier.status}</div>
      <div className="mb-8 relative z-10"><div className="w-12 h-12 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/5 group-hover:border-brand-red/30"><Ghost className={`w-6 h-6 ${isSpecial ? 'text-brand-red' : 'text-white/20 group-hover:text-brand-red'}`} /></div></div>
      <div className="relative z-10 flex-1"><h3 className="text-xs font-black text-white/90 uppercase italic group-hover:text-brand-red">{dossier.name.replace(/_/g, ' ')}</h3><div className="flex flex-col mt-3"><span className="text-[7px] font-bold text-muted/30 uppercase tracking-[0.2em]">INTEL_CLASS</span><span className="text-[8px] font-black text-brand-red uppercase tracking-widest">{dossier.type}</span></div></div>
      {dossier.progress !== undefined && (
        <div className="mt-8 space-y-2 relative z-10">
          <div className="flex justify-between items-end"><span className="text-[8px] font-black text-muted/20 uppercase">Decryption_Status</span><span className="text-[10px] font-mono text-brand-red font-black">{dossier.progress}%</span></div>
          <div className="h-1 w-full bg-black/40 border border-white/5 overflow-hidden"><div className="h-full bg-brand-red shadow-[0_0_10px_rgba(255,49,49,0.4)]" style={{ width: `${dossier.progress}%` }} /></div>
        </div>
      )}
    </motion.div>
  );
}

export function CommandCenter({ agentId, onLogoutRequested }: { agentId: string, onLogoutRequested: () => void }) {
  const [activeDossier, setActiveDossier] = useState<CaseFile | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const agent = AGENT_REGISTRY.find(a => a.id === agentId) || AGENT_REGISTRY[0];

  const openDossier = (dossier: CaseFile) => {
    setIsSyncing(true);
    setTimeout(() => { setActiveDossier(dossier); setIsSyncing(false); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-headline flex flex-col relative overflow-hidden">
      <header className="h-24 border-b border-brand-red/10 bg-[#000000] flex items-center justify-between px-12 relative z-40">
        <div className="flex items-center gap-10">
          <img src={BRAND_ASSETS.LOGO_FULL} alt="Vantage" className="h-12 object-contain" referrerPolicy="no-referrer" />
          <div className="h-10 w-px bg-brand-red/20" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-brand-red tracking-[0.4em] uppercase">VANTAGE_NODE_SECURE</span>
            <div className="flex items-center gap-3"><span className="text-sm font-bold text-white uppercase tracking-widest">COMMAND_CENTER_ACTIVE</span><div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse shadow-[0_0_5px_rgba(255,49,49,0.8)]" /></div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="hidden 2xl:flex items-center gap-6 pr-12 border-r border-white/5">
            <div className="flex flex-col items-end mr-4"><span className="text-[9px] font-black text-brand-red/60 uppercase tracking-[0.2em]">Unit_Assigned</span><span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mt-1">{agent.name}</span></div>
            <div className="w-14 h-14 rounded-full border-2 border-brand-red/30 p-1 relative bg-black overflow-hidden"><img src={agent.image} alt={agent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" /><div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay" /></div>
          </div>
          <button onClick={onLogoutRequested} className="p-4 bg-brand-red/5 hover:bg-brand-red border border-brand-red/20 text-brand-red hover:text-white transition-all group active:scale-95"><Power className="w-6 h-6 group-hover:rotate-180 transition-transform" /></button>
        </div>
      </header>

      <main className="flex-1 max-w-[1700px] mx-auto w-full pt-16 pb-32 px-12 relative z-10">
        <AnimatePresence mode="wait">
          {!activeDossier && (
            <motion.div key="archives" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-16">
              <nav className="flex items-center gap-2 text-[10px] font-black text-muted/40 uppercase tracking-[0.3em]"><span>COMMAND_ROOT</span><ChevronRight className="w-3 h-3 text-brand-red" /><span className="text-brand-red">INTEL_ARCHIVES</span></nav>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/5 pb-12">
                <div className="flex flex-col border-l-2 border-brand-red pl-8"><h1 className="text-4xl font-black uppercase italic text-white/90">Intelligence_Archives</h1><div className="flex items-center gap-4 mt-4"><div className="px-2 py-0.5 bg-brand-red/10 border border-brand-red/30 text-brand-red text-[8px] font-black uppercase">NODE_SYNC_200_OK</div><p className="text-[9px] font-black text-muted/30 uppercase tracking-[0.3em] italic">Vanguard_Core_Intel_Pinging...</p></div></div>
                <div className="flex gap-10 items-center bg-white/[0.02] p-4 border border-white/5 rounded-sm">
                   <div className="flex flex-col items-end"><span className="text-[8px] font-black text-muted/40 uppercase tracking-[0.3em]">STORAGE_METRIC</span><span className="text-[11px] font-black text-brand-red tracking-widest font-mono">1.42 PB</span></div>
                   <div className="h-8 w-px bg-white/10" /><div className="flex flex-col items-end"><span className="text-[8px] font-black text-muted/40 uppercase tracking-[0.3em]">THREAT_SCAN_NODE</span><span className="text-[11px] font-black text-white tracking-widest font-mono">NORTH_ALPHA_7</span></div>
                   <div className="h-8 w-px bg-white/10" /><img src={BRAND_ASSETS.HERO} alt="Node Status" className="h-10 w-20 object-cover opacity-60 grayscale border border-white/10" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">{CASE_FILES.map((dossier) => (<CaseLeadCard key={dossier.id} dossier={dossier} onDossierSelect={() => openDossier(dossier)} />))}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>{activeDossier && (<CaseDossier dossier={activeDossier} activeAgent={agent} onCloseRequested={() => setActiveDossier(null)} onLogoutRequested={onLogoutRequested} />)}</AnimatePresence>
        <AnimatePresence>{isSyncing && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-6"><div className="relative"><div className="w-24 h-24 rounded-full border-t-2 border-brand-red animate-spin" /><div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 rounded-full border-b-2 border-brand-red animate-reverse-spin opacity-50" /></div></div><div className="flex flex-col items-center gap-2 italic"><span className="text-xs font-black text-brand-red uppercase tracking-[0.6em] animate-pulse">Syncing_Protocol</span><span className="text-[9px] font-bold text-muted/40 uppercase tracking-[0.4em]">DECRYPTING_SECURE_CHANNEL</span></div></motion.div>)}</AnimatePresence>
      </main>
    </div>
  );
}

// --- MAIN APPLICATION ENTRY ---

type AuthStage = 'UPLINK_GATED' | 'SQUAD_ALLOCATION' | 'COMMAND_CONTROL';

export default function App() {
  const [stage, setStage] = useState<AuthStage>('UPLINK_GATED');
  const [deployedAgentId, setDeployedAgentId] = useState<string | null>(null);

  const handleUplink = () => setStage('SQUAD_ALLOCATION');

  const handleSquadDeployment = (agentId: string) => {
    setDeployedAgentId(agentId);
    setStage('COMMAND_CONTROL');
  };

  const handleEmergencyPurge = () => {
    setStage('UPLINK_GATED');
    setDeployedAgentId(null);
  };

  return (
    <TacticalFrame>
      <AnimatePresence mode="wait">
        {stage === 'UPLINK_GATED' && (
          <motion.div key="uplink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="h-full">
            <UplinkGate onUplinkInitiated={handleUplink} />
          </motion.div>
        )}
        {stage === 'SQUAD_ALLOCATION' && (
          <motion.div key="allocation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="h-full">
            <SquadAssignment onSquadAssigned={handleSquadDeployment} />
          </motion.div>
        )}
        {stage === 'COMMAND_CONTROL' && deployedAgentId && (
          <motion.div key="control" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="h-full">
            <CommandCenter agentId={deployedAgentId} onLogoutRequested={handleEmergencyPurge} />
          </motion.div>
        )}
      </AnimatePresence>
    </TacticalFrame>
  );
}
