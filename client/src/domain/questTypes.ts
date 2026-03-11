export type QuestType = 'steps' | 'gold' | 'damage' | 'enemies';

export type Quest = {
  id: string;
  label: string;
  type: QuestType;
  target: number;
  reward: {
    gold: number;
    exp: number;
  };
};

export type QuestProgressInput = {
  stepsTaken: number;
  totalGoldEarned: number;
  totalDamageDealt: number;
  totalEnemiesDefeated: number;
};
