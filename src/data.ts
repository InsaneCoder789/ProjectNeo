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
    profile:
      'Advanced heuristic analysis engine capable of identifying non-obvious data correlations. Optimal for high-entropy log environments.',
    color: '#FF3131',
  },
  {
    id: 'curl',
    name: 'AGENT CURL',
    designation: 'NETWORK_EXFILTRATION_OPERATIVE',
    image: BRAND_ASSETS.AGENT_CURL,
    doctrine: 'PAYLOAD_UPLINK',
    profile:
      'Specializes in low-level socket communication and protocol spoofing. Can bypass hardware-level firewalls without detection.',
    color: '#31A3FF',
  },
  {
    id: 'sed',
    name: 'DR. SED',
    designation: 'STREAM_TRANSFORMATION_SPECIALIST',
    image: BRAND_ASSETS.AGENT_SED,
    doctrine: 'BUFFER_DECODER',
    profile:
      'Expert in stream editing and real-time data cleansing. Capable of reconstructing fragmented payloads from corrupted memory dumps.',
    color: '#31FF84',
  },
];

export const CASE_FILES: CaseFile[] = [
  {
    id: '01',
    name: 'VANGUARD_PROTOCOL_LEAK',
    type: 'Intel_Dossier',
    status: 'OPENED',
    progress: 100,
    icon: 'folder',
    description:
      'Dr. Aris Thorne, head of Neural Weapons at Vanguard Corp, was found deceased in a vacuum-sealed chamber. His terminal is broadcasting a "Dead Man\'s Switch" titled Protocol_Omega. The data blocks contain encrypted coordinates for every active orbital orbital rail-gun. We need to intercept the final transmission before it reaches the Black Kite cell.',
    clues: [
      'Encrypted handshakes originating from Dr. Thorne\'s terminal at 03:00 Zulu',
      'Unusual packet headers containing human-DNA sequencing data',
      'A physical key-card found in Dr. Thorne\'s hand, but with no magnetic stripe',
    ],
    proofs: [
      'Recovery of the ".omega_cipher" hidden within a kernel dump',
      'Audio recording of Thorne\'s final moments mentioning "The Glass Horizon"',
    ],
    suspects: ['Marcus Reed (CEO)', 'Dr. Aris Thorne (Deceased)', 'Unknown Black Kite Operative'],
    twist:
      'Thorne didn\'t die of natural causes; he was the first successful subject of the "Vanguard Proxy" program, and his consciousness is currently hijacking the orbital grid.',
    solution:
      'Use the .omega_cipher to override the satellite link and initiate a hard-reboot of the Vanguard Neural Grid.',
    terminalFiles: {
      'readme.txt': {
        content:
          'CASE_01: VANGUARD_PROTOCOL_LEAK\n============================\nSUBJECT: DR. ARIS THORNE\nPOSITION: CHIEF NEURAL ARCHITECT\nSTATUS: K.I.A (UNSPECIFIED ASPHYXIATION)\n\nInvestigation into "Protocol_Omega" initiated. Accessing primary terminal...',
      },
      'chamber_logs.log': {
        content:
          '02:45:00 - Chamber Pressure: 5.0 PSI\n02:55:00 - Chamber Pressure: 0.1 PSI (ALARM)\n02:56:10 - User ID [THORNE_A] terminal active\n02:59:59 - [PROTOCOL_OMEGA] INITIATED\n03:00:00 - ACCESS GRANTED: ORBITAL_DEFENSE_LAYER_01',
      },
      'private/diary.txt': {
        hidden: true,
        content:
          'Diary Entry: 04/14\n\nReed thinks I\'m making a weapon. I\'m not. I\'m building a door. If they kill me, the door opens wide. The orbital rail-guns are the keys. If you want to stop it, you\'ll have to kill the ghost in the machine. Me.',
      },
      '.omega_cipher': {
        hidden: true,
        content:
          'CIPHER_HEX: 0xDEADBEEF666\nKEY_ID: VANGUARD_PROXY_01\nSTATUS: BROADCASTING_TO_BLACK_KITE',
      },
      'orbital_coords.csv': {
        content:
          'ID, LAT, LON, STATUS\nRG_01, 34.0522, -118.2437, ARMED\nRG_02, 51.5074, -0.1278, ARMED\nRG_03, 35.6762, 139.6503, ARMED',
      },
    },
  },
  {
    id: '02',
    name: 'GHOST_IN_THE_SIGNAL',
    type: 'Encrypted_Stream',
    status: 'OPENED',
    progress: 50,
    icon: 'lock',
    description:
      'Local radio frequencies are being hijacked by an audio loop of a child hummming a song from the 1920s.',
    clues: [
      'The song is "Always" by Irving Berlin',
      'The signal originates from an abandoned clock tower',
      'Frequency modulation matches human brainwaves during REM sleep',
    ],
    proofs: ['A rusted copper coil found at the tower', 'A diary found in the debris dated 1924'],
    suspects: ['The Caretaker', 'A local conspiracy theorist', 'The Frequency itself'],
    twist: 'The radio tower is actually a primitive attempt at a psychotronic transmitter.',
    solution: 'Tune the receiver to the inverse frequency to neutralize the hypnotic effect.',
    terminalFiles: {
      'signal_stats.log': {
        content:
          'FREQUENCY: 104.2 MHz\nMODULATION: AM/FM_HYBRID\nORIGIN: [REDACTED_TOWER]\n\nNOTICE: BRAINWAVE SYNC AT 85%',
      },
      'archive/1924_diary_snippet.txt': {
        content:
          'October 12, 1924\n\nThe singing from the tower has started again. The children walk in their sleep. They say they are going to the Garden of Time. I must disconnect the coils before the cycle repeats.',
      },
      '.psychotronic_config': {
        hidden: true,
        content:
          'TRANSMITTER_BETA_V1\n--------------------\nTARGET_WAVE: DELTA\nEFFECT: COLLECTIVE_HYPNOSIS\nOVERRIDE_FREQ: 12.5 Hz (INVERSE)',
      },
    },
  },
  {
    id: '03',
    name: 'DIGITAL_ARSENAL',
    type: 'Field_Report',
    status: 'OPENED',
    progress: 100,
    icon: 'folderOpen',
    description:
      'A massive database of experimental cyber-weapons was leaked onto the dark web, but the files are empty hulls.',
    clues: [
      'The leak source was traced to a local internet café',
      'The files are actually encoded images containing steganography',
      'The café owner has a high-security clearance background',
    ],
    proofs: ['A hardware key found in the café trash', 'Transaction logs using an untraceable cryptocurrency'],
    suspects: ['Cafe Owner', 'An anonymous hacker group', 'The weapon designer'],
    twist:
      'The weapons weren\'t leaked; they were bait to infect anyone who downloaded them with a tracking worm.',
    solution: 'Activate the kill-switch hidden in the metadata of the largest hull file.',
    terminalFiles: {
      'manifest.txt': {
        content:
          'ARSENAL_LEAK_04\n================\nFILES: 42\nTOTAL_SIZE: 1.2 PB\n\n[WARNING]: ENCRYPTED_HULLS_DETECTED',
      },
      'hull_01_metadata.json': {
        content:
          '{\n  "file": "weapon_prototype_x.pkg",\n  "status": "empty",\n  "hidden_tag": "RED_KITE_TRACKER_09",\n  "kill_switch": "0xALPHA_OMEGA_REBOOT"\n}',
      },
      '.tracker_logs': {
        hidden: true,
        content:
          'NODE_ID: 992-01\nSTATUS: ACTIVE\nRECIPIENTS_INFECTED: 1422\n\nTracking data being routed through Sector 7G.',
      },
    },
  },
  {
    id: '04',
    name: 'NEON_MEMORY',
    type: 'Bio_Data',
    status: 'OPENED',
    icon: 'fileText',
    description:
      'Cybernetic implants in the city of Neo-Kite are suffering from "memory rot," showing users visions of a forest that doesn\'t exist.',
    clues: [
      'Common denominator: All victims visited the "Crystal Garden" park',
      'The visions include the scent of pine and the sound of a waterfall',
      'Neural scans show high activity in the visual cortex without external stimuli',
    ],
    proofs: ['A contaminated firmware update found on a public terminal', 'A sample of the "memory rot" code showing fractal structures'],
    suspects: ['Crystal Garden Groundskeeper', 'Firmware Lead at BioGate', 'The users themselves'],
    twist:
      'The forest visions are real-world memories of the Earth before the Great Smog, preserved in the neural link.',
    solution: 'Patch the firmware to archive the memories instead of deleting them.',
  },
  {
    id: '05',
    name: 'VOID_PROTOCOL',
    type: 'Kernel_Dump',
    status: 'OPENED',
    icon: 'terminal',
    description:
      'A satellites orbital path changed autonomously, pointing its sensors at a seemingly empty patch of deep space.',
    clues: [
      'The new trajectory is 0.001 degrees off from a known pulsar',
      'Encryption keys for the satellite were accessed by a ghost user',
      'Telemetry data shows an unexpected increase in cosmic radiation',
    ],
    proofs: ['The "ghost user" ID matches a long-dead astrophysicist', 'The patch of space contains a cloaked massive object'],
    suspects: ['Satellite Control Lead', 'A rival space agency', 'The Void'],
    twist:
      'The satellite didn\'t move; the object it was tracking pulled the satellite toward it via gravity.',
    solution: 'Recalibrate the propulsion system to escape the objects gravitational well.',
  },
  {
    id: '06',
    name: 'CLOCKWORK_STORM',
    type: 'Legacy_Script',
    status: 'OPENED',
    icon: 'document',
    description:
      'A city-wide blackout occurred precisely when a rare solar eclipse began, despite no grid failures.',
    clues: [
      'The blackout followed a pattern matching Leonardo da Vincis drawings',
      'All smart devices displayed the message "TIME_IS_UP"',
      'The grid controllers registered zero output from green energy sources',
    ],
    proofs: ['A mechanical device found attached to the main transformer', 'A script found on the grid server titled "Chronos"'],
    suspects: ['The Grid Tech', 'A historian with an axe to grind', 'The Solar Flare'],
    twist:
      'The blackout was a distraction for a heist of the world\'s most accurate atomic clock.',
    solution: 'Track the atomic clock\'s unique quantum signature to the harbor.',
  },
  {
    id: '07',
    name: 'CHIMERA_DATA',
    type: 'Sat_Imagery',
    status: 'OPENED',
    icon: 'cloud',
    description:
      'Satellite photos of the Amazon show a massive structure appearing and disappearing between frames.',
    clues: [
      'The structure is geometric and reflects 100% of light',
      'Infrared scans show extreme cold at the site',
      'Local wildlife has completely avoided the area for miles',
    ],
    proofs: ['A piece of strange, non-organic material found by an explorer', 'A blurry aerial photo taken from a low-flying drone'],
    suspects: ['The Explorer', 'The Satellite Analyst', 'The Structure'],
    twist:
      'The structure is a massive, multi-dimensional mirror reflects future satellite sweeps.',
    solution: 'Realign the satellite to a different spectrum to see through the "mirror."',
  },
  {
    id: '08',
    name: 'PHANTOM_IDENTITY',
    type: 'Audio_Intercept',
    status: 'OPENED',
    icon: 'micOff',
    description:
      'Every digital record of a prominent politician has been replaced by a fictional history from a sci-fi novel.',
    clues: [
      'The novel is "The Man Who Folded Yesterday"',
      'Digital IDs show 100% consistency with the new history',
      'All physical photos have mysteriously faded or vanished',
    ],
    proofs: ['A backup server found in a deep-sea data center', 'A witness who remembers the real history'],
    suspects: ['Political Rival', 'The Novelist\'s Grandson', 'The Politician Himself'],
    twist:
      'The politician *is* a fictional character who was somehow brought into reality via a experimental AI narrator.',
    solution:
      'Feed the AI narrator a "The End" command based on the novels original manuscript.',
  },
  {
    id: '09',
    name: 'STATIC_FOREST',
    type: 'Intel_Dossier',
    status: 'OPENED',
    icon: 'target',
    description:
      'A viral video shows a forest where the trees are made of pure, colorful static and emit a buzzing sound.',
    clues: [
      'The buzz is a sequence of Prime numbers',
      'People who enter the forest report "pixelated" vision',
      'The forest is expanding at 1 meter per hour',
    ],
    proofs: ['A leaf that is actually a 2D digital object in a 3D world', 'Soil samples that are composed of fine magnetic particles'],
    suspects: ['The Videographer', 'A nearby physics research lab', 'The Forest Mother'],
    twist:
      'The forest is a "glitch" in reality caused by a corrupted world-simulation server.',
    solution: 'Reboot the local simulation node located under the "Static Oak".',
  },
  {
    id: '10',
    name: 'IOTA_BREACH',
    type: 'Firewall_Log',
    status: 'OPENED',
    icon: 'shield',
    description:
      'A high-security bank was robbed without a single door being opened or a single byte being altered on the ledger.',
    clues: [
      'The vault was empty at 8:00 AM, but full at 5:00 PM the previous day',
      'The bank\'s internal clock is 4 minutes ahead of UTC',
      'No security cameras captured any movement in the vault',
    ],
    proofs: ['A small device that emits a localized temporal field', 'A set of blueprints showing "blind spots" in time'],
    suspects: ['Bank Manager', 'The Clockmaker', 'The Security Tech'],
    twist:
      'The robbers used a temporal bridge to take the money *before* it was even put in the vault.',
    solution: 'Sync the bank\'s clock with a quantum-accurate time source to collapse the bridge.',
  },
  {
    id: '11',
    name: 'KAPPA_ZERO',
    type: 'Geo_Target',
    status: 'ENCRYPTED',
    icon: 'target',
    description:
      'A ghost ship was found drifting in the Pacific, its crew missing but their dinners still warm on the table.',
    clues: [
      'The ship\'s log ends abruptly with the word "KAPPA"',
      'The dinner is a traditional Japanese meal from 1945',
      'Radial sensors detect a small, intense pocket of radiation in the hold',
    ],
    proofs: ['A compass that points at the ships hold instead of North', 'A personal journal from a crew member mentioning a "singing light"'],
    suspects: ['The First Mate', 'The Shipping Company', 'The Singing Light'],
    twist:
      'The crew aren\'t missing; they were pulled into the ships hold, which is now a pocket dimension.',
    solution: 'Enter the hold with a stabilizing field generator to retrieve the crew.',
  },
  {
    id: '12',
    name: 'LAMBDA_PROTOCOL',
    type: 'Asset_Log',
    status: 'OPENED',
    icon: 'package',
    description:
      'A crate of "indestructible" alloy was found crushed as if by a massive force in a vacuum-sealed warehouse.',
    clues: [
      'The pressure inside the warehouse was constant',
      'The floor under the crate is pristine',
      'The only sound recorded was a low-frequency hum',
    ],
    proofs: ['A micro-black hole generator found in a hidden compartment', 'The alloy itself shows signs of massive quantum stress'],
    suspects: ['Materials Scientist', 'Inventory Manager', 'The Package Itself'],
    twist:
      'The crate didn\'t contain alloy; it contained a prototype engine that imploded on its first automated test.',
    solution: 'Shutdown the engine\'s autonomous core before it triggers a second implosion.',
  },
  {
    id: '13',
    name: 'MU_VIRUS',
    type: 'Malware_Sample',
    status: 'RESTRICTED',
    icon: 'alertCircle',
    description:
      'A computer virus is infecting people via their smart TVs, causing them to speak in an unknown language.',
    clues: [
      'The language is a complex binary-to-syllable mapping',
      'Affected people only speak when the TV is on static',
      'Neural links show the virus is rewriting the users language center',
    ],
    proofs: ['A recording of the "unknown language" that decodes to a manifesto', 'A modified TV remote with a direct neural interface'],
    suspects: ['TV Manufacturer', 'The "Manifesto" Author', 'A rogue AI'],
    twist:
      'The virus was meant to *teach* a universal language, but the human brain couldn\'t handle the bandwidth.',
    solution: 'Upload a rate-limiting patch to the language center via the next static-burst.',
  },
  {
    id: '14',
    name: 'NU_DUMP',
    type: 'Hardware_Dump',
    status: 'ENCRYPTED',
    icon: 'cpu',
    description:
      'A shipment of high-end CPUs contains a hidden instruction set that allows for "time-shifted" calculations.',
    clues: [
      'The CPUs are 10x faster than theoretical limits',
      'Calculations are completed 1 second before they are requested',
      'The heat output of the chips is 0 degrees Kelivn',
    ],
    proofs: ['A schematic of the "time-shifted" core', 'A chip that has been running for 100 years in 1 second'],
    suspects: ['CPU Design Lead', 'A time-traveling hobbyist', 'The Chips themselves'],
    twist: 'The CPUs are drawing processing power from future versions of themselves.',
    solution: 'Limit the time-shifting window to prevent a paradox-induced meltdown.',
  },
  {
    id: '15',
    name: 'XI_EYE',
    type: 'Surveillance',
    status: 'OPENED',
    icon: 'eye',
    description:
      'A street-view car captured a photo of a woman who appears in every single street-view image globally, regardless of city or country.',
    clues: [
      'She is always wearing a green hat and holding a red book',
      'She never looks at the camera',
      'The Red Book is titled "The Archive of Everything"',
    ],
    proofs: ['A high-res scan showing the red book contains the names of every person on Earth', 'A location where she was seen in two different countries at the same time'],
    suspects: ['The Woman', 'The Mapping Service', 'The Red Book Author'],
    twist:
      'The woman is a guardian AI made real, and the mapping service is her way of monitoring the simulation.',
    solution:
      'Ask her about the Red Book using a specific query to unlock her archives.',
  },
  {
    id: '16',
    name: 'OMICRON_GHOST',
    type: 'Signal_Ghost',
    status: 'ENCRYPTED',
    icon: 'wifiOff',
    description:
      'A public Wi-Fi network in a busy park is providing data from the year 2045.',
    clues: [
      'News headlines mention the "Great Convergence"',
      'Stock prices are accurate for future trends',
      'Network ID is "FUTURE_IS_NOW"',
    ],
    proofs: ['A digital newspaper from 2045 found in the cache', 'A user ID that doesn\'t exist yet'],
    suspects: ['Network Admin', 'A "Future" Traveler', 'The Park Groundskeeper'],
    twist:
      'The Wi-Fi isn\'t FROM the future; it\'s an AI\'s prediction engine that\'s actually 100% accurate.',
    solution:
      'Patch the AI\'s prediction algorithm to prevent it from influencing the present.',
  },
  {
    id: '17',
    name: 'PI_FINGERPRINT',
    type: 'Identity_File',
    status: 'RESTRICTED',
    icon: 'fingerprint',
    description:
      'A set of fingerprints found at a crime scene don\'t match any human on record, but are identical to the prints in a 1,000-year-old Egyptian tomb.',
    clues: [
      'The prints are slightly elongated at the tip',
      'Traces of ancient Myrrh were found on the scene',
      'The crime scene was a museum of ancient artifacts',
    ],
    proofs: ['DNA from the fingerprints matches a mummified Pharaoh', 'A security video showing a figure that looks like the Pharaoh\'s statue'],
    suspects: ['Museum Curator', 'The Modern-day "Pharaoh"', 'The Tomb Raider'],
    twist:
      'The "fingerprints" are actually a sophisticated DNA-based key used to unlock ancient technology.',
    solution:
      'Use the DNA-key to unlock the "Tomb of the Stars" and retrieve the stolen artifacts.',
  },
  {
    id: '18',
    name: 'RHO_COMMS',
    type: 'Comms_Log',
    status: 'OPENED',
    icon: 'mail',
    description:
      'An AI-driven email service has started sending letters to users from their deceased relatives, correctly predicting future events.',
    clues: [
      'Emails are sent from addresses that have been deleted for years',
      'Content includes personal details only the relative knew',
      'Predictions reach 99% accuracy',
    ],
    proofs: ['A server log showing the AI accessing "ancestral memory" files', 'An email that predicts the end of the world'],
    suspects: ['AI Lead', 'The "Deceased" Relatives', 'The Service Owner'],
    twist:
      'The AI isn\'t communicating with the dead; it\'s using a massive database of human behavior to simulate the deceased perfectly.',
    solution:
      'Limit the simulation\'s predictive capabilities to prevent it from causing panic.',
  },
  {
    id: '19',
    name: 'TAU_KEY',
    type: 'Access_Code',
    status: 'ENCRYPTED',
    icon: 'key',
    description:
      'A physical key that can unlock any digital or physical lock in the city was stolen from a high-security vault.',
    clues: [
      'The key is made of a strange, non-reflective material',
      'All digital locks it opened recorded the same "TAU" unlock code',
      'The thief was never seen on camera',
    ],
    proofs: ['A set of digital lock logs showing the "TAU" code at multiple locations', 'A witness who saw the key "shaping" itself to fit a lock'],
    suspects: ['The Vault Guard', 'A master thief', 'The Key Designer'],
    twist:
      'The key is a programmable nanotech mass that mimics any locking mechanism it touches.',
    solution:
      'Send a "RESET" command via the city-wide network to deactivate the nanotech.',
  },
  {
    id: '20',
    name: 'UPSILON_DATA',
    type: 'Shared_Data',
    status: 'OPENED',
    icon: 'folderShared',
    description:
      'A file-sharing platform has a single "locked" folder that everyone can see but no one can open, and it\'s growing by 1TB a day.',
    clues: [
      'The folder name is "UPSILON"',
      'Upload source is a localized anomaly in the network',
      'Encryption type is unknown but seems to be organic',
    ],
    proofs: ['A snippet of the folders code that matches human DNA', 'A log showing the folder is "ingesting" all deleted files on the platform'],
    suspects: ['Platform Owner', 'A digital hoarder', 'The Network itself'],
    twist:
      'The folder is a digital "compost heap" for the city\'s data, where deleted files merge into a new form of digital life.',
    solution: 'Define the digital life\'s growth parameters to ensure it remains beneficial to the city.',
  },
];
