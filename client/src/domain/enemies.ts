import type { Enemy } from '../contexts/EnemyContext';

const enemyNames = [
  'Wild Slime',
  'Angry Goblin',
  'Shadow Bat',
  'Mossy Crab',
  'Thorn Wolf',
  'Stone Beetle',
];

export const buildEnemyStats = (currentLevel: number) => {
  const points = Math.max(0, currentLevel) * 5;
  const stats = { atk: 1, def: 1, dex: 1 };

  for (let i = 0; i < points; i += 1) {
    const roll = Math.floor(Math.random() * 3);
    if (roll === 0) stats.atk += 1;
    if (roll === 1) stats.def += 1;
    if (roll === 2) stats.dex += 1;
  }

  return stats;
};

export const buildEnemyFromLevel = (level: number): Enemy => {
  const name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
  const stats = buildEnemyStats(level);
  const maxHp = 30 + level * 10 + stats.def * 2;

  return {
    name,
    maxHp,
    hp: maxHp,
    atk: stats.atk,
    def: stats.def,
    dex: stats.dex,
    goldReward: 10 + level * 5 + stats.atk * 2,
    expReward: 15 + level * 6 + stats.def * 2,
  };
};
