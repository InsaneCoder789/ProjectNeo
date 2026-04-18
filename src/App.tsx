import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TacticalFrame } from './components/TacticalFrame';
import { UplinkGate } from './pages/LoginPage';
import { SquadAssignment } from './pages/AgentSelectionPage';
import { CommandCenter } from './pages/TerminalPage';

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
          <motion.div
            key="uplink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <UplinkGate onUplinkInitiated={handleUplink} />
          </motion.div>
        )}
        {stage === 'SQUAD_ALLOCATION' && (
          <motion.div
            key="allocation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <SquadAssignment onSquadAssigned={handleSquadDeployment} />
          </motion.div>
        )}
        {stage === 'COMMAND_CONTROL' && deployedAgentId && (
          <motion.div
            key="control"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <CommandCenter agentId={deployedAgentId} onLogoutRequested={handleEmergencyPurge} />
          </motion.div>
        )}
      </AnimatePresence>
    </TacticalFrame>
  );
}
