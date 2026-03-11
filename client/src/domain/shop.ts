import type { Item } from '../contexts/EquipmentContext';
import { rarityMultiplier } from './items';
import type { Stage } from './stages';

const getItemPower = (item: Item) => {
  let score = item.level * 10;
  score += (rarityMultiplier[item.rarity] ?? 1) * 15;

  if (item.bonuses) {
    score += (item.bonuses.attack ?? 0) * 10;
    score += (item.bonuses.defense ?? 0) * 10;
    score += (item.bonuses.dexterity ?? 0) * 10;
  }

  if (item.effects?.heal) {
    score += Math.round(item.effects.heal / 5);
  }

  if (item.effects?.tempBuff) {
    const bonuses = item.effects.tempBuff.bonuses;
    score += (bonuses.attack ?? 0) * 8;
    score += (bonuses.defense ?? 0) * 8;
    score += (bonuses.dexterity ?? 0) * 8;
    score += Math.max(1, Math.round(item.effects.tempBuff.durationSteps / 2));
  }

  return score;
};

const weightedPickIndex = (weights: number[]) => {
  const total = weights.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return 0;
  let roll = Math.random() * total;
  for (let i = 0; i < weights.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) return i;
  }
  return weights.length - 1;
};

const pickLevelBand = (stage: Stage) => {
  const bands = stage.shop.levelBands;
  const weights = bands.map((band) => band.weight);
  const index = weightedPickIndex(weights);
  return bands[index];
};

const buildStageShopStock = (items: Item[], stage: Stage, size = 12) => {
  const pool = [...items];
  const stock: Item[] = [];

  const powerScores = pool.map(getItemPower);
  const minPower = Math.min(...powerScores, 1);
  const maxPower = Math.max(...powerScores, minPower + 1);

  const toPowerWeight = (item: Item) => {
    const score = getItemPower(item);
    const normalized = (score - minPower) / (maxPower - minPower);
    return stage.shop.powerWeighting.min + normalized * (stage.shop.powerWeighting.max - stage.shop.powerWeighting.min);
  };

  while (stock.length < size && pool.length > 0) {
    const band = pickLevelBand(stage);
    const bandItems = pool.filter((item) => item.level >= band.min && item.level <= band.max);
    const candidates = bandItems.length ? bandItems : pool;

    const weights = candidates.map((item) => {
      const rarityWeight = stage.shop.rarityWeights[item.rarity] ?? 0;
      return Math.max(0.1, rarityWeight) * toPowerWeight(item);
    });

    const pickedIndex = weightedPickIndex(weights);
    const picked = candidates[pickedIndex];
    stock.push(picked);
    const poolIndex = pool.findIndex((item) => item.id === picked.id);
    if (poolIndex >= 0) pool.splice(poolIndex, 1);
  }

  return stock;
};

export { buildStageShopStock, getItemPower };
