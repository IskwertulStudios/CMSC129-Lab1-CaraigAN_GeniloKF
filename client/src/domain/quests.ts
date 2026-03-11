import type { Quest, QuestProgressInput } from './questTypes';
import { getStageForLevel } from './stages';

const getStageQuestSet = (level: number) => {
  const stage = getStageForLevel(level);
  return { stage, quests: stage.quests };
};

const getQuestProgress = (quest: Quest, stats: QuestProgressInput) => {
  switch (quest.type) {
    case 'steps':
      return stats.stepsTaken;
    case 'gold':
      return stats.totalGoldEarned;
    case 'damage':
      return stats.totalDamageDealt;
    case 'enemies':
      return stats.totalEnemiesDefeated;
    default:
      return 0;
  }
};

export { getStageQuestSet, getQuestProgress };
