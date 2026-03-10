import React, { createContext, useContext, useMemo, useState } from 'react';
import { usePlayer } from './PlayerContext';
import { buildEnemyFromLevel, buildEnemyStats } from '../domain/enemies';

export interface Enemy {
  name: string;
  maxHp: number;
  hp: number;
  atk: number;
  def: number;
  dex: number;
  goldReward: number;
  expReward: number;
}

interface EnemyContextType {
  encounter: Enemy | null;
  startEncounter: () => void;
  clearEncounter: () => void;
  setEncounter: React.Dispatch<React.SetStateAction<Enemy | null>>;
  buildEnemyStats: (level: number) => { atk: number; def: number; dex: number };
}

const EnemyContext = createContext<EnemyContextType | undefined>(undefined);

export const EnemyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { level } = usePlayer();
  const [encounter, setEncounter] = useState<Enemy | null>(null);

  const startEncounter = () => {
    setEncounter(buildEnemyFromLevel(level));
  };

  const clearEncounter = () => setEncounter(null);

  const value = useMemo(() => ({
    encounter,
    startEncounter,
    clearEncounter,
    setEncounter,
    buildEnemyStats,
  }), [encounter, level]);

  return (
    <EnemyContext.Provider value={value}>
      {children}
    </EnemyContext.Provider>
  );
};

export const useEnemy = () => {
  const context = useContext(EnemyContext);
  if (!context) throw new Error('useEnemy must be used within EnemyProvider');
  return context;
};
