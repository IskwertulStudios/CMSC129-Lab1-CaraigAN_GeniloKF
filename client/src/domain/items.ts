import type { Item, Rarity } from '../contexts/EquipmentContext';

export const rarityMultiplier: Record<Rarity, number> = {
  Common: 1,
  Uncommon: 1.5,
  Rare: 2.5,
  Epic: 4,
  Legendary: 6,
};

export const itemBank: Item[] = [
  { id: 1001, name: 'Traveler Dagger', type: 'Weapon', level: 1, rarity: 'Common', stat: '+3 ATK', flavorText: 'Lightweight and reliable for long roads.', bonuses: { attack: 3 } },
  { id: 1002, name: 'Worn Shortsword', type: 'Weapon', level: 2, rarity: 'Uncommon', stat: '+6 ATK', flavorText: 'A blade with nicks from many skirmishes.', bonuses: { attack: 6 } },
  { id: 1003, name: 'Knight Longsword', type: 'Weapon', level: 4, rarity: 'Rare', stat: '+12 ATK', flavorText: 'Balanced steel for serious combat.', bonuses: { attack: 12 } },
  { id: 1004, name: 'Moonsteel Saber', type: 'Weapon', level: 7, rarity: 'Epic', stat: '+20 ATK', flavorText: 'It hums under starlight.', bonuses: { attack: 20 } },
  { id: 1005, name: 'Phoenix Blade', type: 'Weapon', level: 10, rarity: 'Legendary', stat: '+30 ATK', flavorText: 'Forged in flame and legend.', bonuses: { attack: 30 } },

  { id: 1011, name: 'Leather Cap', type: 'Head Wear', level: 1, rarity: 'Common', stat: '+2 DEF', flavorText: 'Keeps the rain and blades off your head.', bonuses: { defense: 2 } },
  { id: 1012, name: 'Iron Visor', type: 'Head Wear', level: 3, rarity: 'Uncommon', stat: '+5 DEF', flavorText: 'A sturdy visor with a dull shine.', bonuses: { defense: 5 } },
  { id: 1013, name: 'Ranger Hood', type: 'Head Wear', level: 5, rarity: 'Rare', stat: '+8 DEF', flavorText: 'Silent and shadow-friendly.', bonuses: { defense: 8 } },

  { id: 1021, name: 'Traveler Vest', type: 'Body Armor', level: 1, rarity: 'Common', stat: '+3 DEF', flavorText: 'Simple padding for long trips.', bonuses: { defense: 3 } },
  { id: 1022, name: 'Chain Vest', type: 'Body Armor', level: 3, rarity: 'Uncommon', stat: '+6 DEF', flavorText: 'The links rattle softly as you move.', bonuses: { defense: 6 } },
  { id: 1023, name: 'Guardian Mail', type: 'Body Armor', level: 6, rarity: 'Rare', stat: '+10 DEF', flavorText: 'A mail that has seen many sieges.', bonuses: { defense: 10 } },

  { id: 1031, name: 'Sturdy Pants', type: 'Pants', level: 1, rarity: 'Common', stat: '+2 DEF', flavorText: 'Tough fabric for rough roads.', bonuses: { defense: 2 } },
  { id: 1032, name: 'Scout Trousers', type: 'Pants', level: 4, rarity: 'Uncommon', stat: '+4 DEF', flavorText: 'Lightweight with deep pockets.', bonuses: { defense: 4 } },
  { id: 1033, name: 'Shadow Greaves', type: 'Pants', level: 7, rarity: 'Rare', stat: '+7 DEF', flavorText: 'Quiet steps, quiet thoughts.', bonuses: { defense: 7 } },

  { id: 1041, name: 'Minor Healing Potion', type: 'Consumable', level: 1, rarity: 'Common', stat: '+50 HP', flavorText: 'Bitter, but it works.', effects: { heal: 50 } },
  { id: 1042, name: 'Lesser Remedy', type: 'Consumable', level: 3, rarity: 'Uncommon', stat: '+80 HP', flavorText: 'A calming glow in a glass bottle.', effects: { heal: 80 } },
  { id: 1043, name: 'Faded Elixir', type: 'Consumable', level: 6, rarity: 'Rare', stat: '+120 HP', flavorText: 'A relic from an old apothecary.', effects: { heal: 120 } },
  { id: 1044, name: 'Elixir of Strength', type: 'Consumable', level: 5, rarity: 'Epic', stat: '+5 ATK (5 steps)', flavorText: 'A rush of power in your veins.', effects: { tempBuff: { name: 'Strength Surge', bonuses: { attack: 5 }, durationSteps: 5 } } },

  { id: 1101, name: 'Wayfarer Sabre', type: 'Weapon', level: 3, rarity: 'Uncommon', stat: '+7 ATK', flavorText: 'Balanced steel for dusty roads.', bonuses: { attack: 7 } },
  { id: 1102, name: 'Dunebreaker Axe', type: 'Weapon', level: 6, rarity: 'Rare', stat: '+14 ATK', flavorText: 'Chips stone as easily as bone.', bonuses: { attack: 14 } },
  { id: 1103, name: 'Stormglass Rapier', type: 'Weapon', level: 9, rarity: 'Rare', stat: '+18 ATK', flavorText: 'A thin blade that sings in the rain.', bonuses: { attack: 18 } },
  { id: 1104, name: 'Griffon Pike', type: 'Weapon', level: 14, rarity: 'Epic', stat: '+26 ATK', flavorText: 'Carries the weight of legend.', bonuses: { attack: 26 } },
  { id: 1105, name: 'Sunforge Greatsword', type: 'Weapon', level: 22, rarity: 'Legendary', stat: '+38 ATK', flavorText: 'Forged in a blaze that never cooled.', bonuses: { attack: 38 } },

  { id: 1111, name: 'Scout Bandana', type: 'Head Wear', level: 2, rarity: 'Common', stat: '+1 DEX', flavorText: 'Keeps sweat from your eyes.', bonuses: { dexterity: 1 } },
  { id: 1112, name: 'Waykeeper Circlet', type: 'Head Wear', level: 5, rarity: 'Uncommon', stat: '+3 DEF', flavorText: 'A thin guard for unexpected blows.', bonuses: { defense: 3 } },
  { id: 1113, name: 'Ranger Visor', type: 'Head Wear', level: 8, rarity: 'Rare', stat: '+3 DEX', flavorText: 'Sharpens your gaze and your aim.', bonuses: { dexterity: 3 } },
  { id: 1114, name: 'Warden Helm', type: 'Head Wear', level: 12, rarity: 'Epic', stat: '+8 DEF', flavorText: 'Worn by those who never yield.', bonuses: { defense: 8 } },
  { id: 1115, name: 'Crown of Echoes', type: 'Head Wear', level: 20, rarity: 'Legendary', stat: '+6 DEF, +4 DEX', flavorText: 'It remembers every footstep.', bonuses: { defense: 6, dexterity: 4 } },

  { id: 1121, name: 'Bronze Hauberk', type: 'Body Armor', level: 4, rarity: 'Uncommon', stat: '+7 DEF', flavorText: 'Heavy, but trustworthy.', bonuses: { defense: 7 } },
  { id: 1122, name: 'Traveler Cuirass', type: 'Body Armor', level: 7, rarity: 'Rare', stat: '+10 DEF', flavorText: 'Built for long marches and hard blows.', bonuses: { defense: 10 } },
  { id: 1123, name: 'Sentinel Plate', type: 'Body Armor', level: 12, rarity: 'Rare', stat: '+16 DEF', flavorText: 'Stands firm against the storm.', bonuses: { defense: 16 } },
  { id: 1124, name: 'Dawnforged Chestguard', type: 'Body Armor', level: 18, rarity: 'Epic', stat: '+22 DEF', flavorText: 'Glows faintly at sunrise.', bonuses: { defense: 22 } },
  { id: 1125, name: 'Lionheart Aegis', type: 'Body Armor', level: 25, rarity: 'Legendary', stat: '+30 DEF', flavorText: 'The courage of a whole caravan.', bonuses: { defense: 30 } },

  { id: 1131, name: 'Ranger Slacks', type: 'Pants', level: 3, rarity: 'Common', stat: '+2 DEX', flavorText: 'Light fabric for quick steps.', bonuses: { dexterity: 2 } },
  { id: 1132, name: 'Stonestep Greaves', type: 'Pants', level: 6, rarity: 'Uncommon', stat: '+4 DEF', flavorText: 'Steady footing on rough trails.', bonuses: { defense: 4 } },
  { id: 1133, name: 'Silkshadow Leggings', type: 'Pants', level: 9, rarity: 'Rare', stat: '+4 DEX', flavorText: 'Soft to the touch, silent in motion.', bonuses: { dexterity: 4 } },
  { id: 1134, name: 'Ironstride Trousers', type: 'Pants', level: 14, rarity: 'Epic', stat: '+8 DEF', flavorText: 'Each step lands like a vow.', bonuses: { defense: 8 } },
  { id: 1135, name: 'Windrunner Greaves', type: 'Pants', level: 20, rarity: 'Legendary', stat: '+6 DEF, +6 DEX', flavorText: 'Boots made for the endless road.', bonuses: { defense: 6, dexterity: 6 } },

  { id: 1141, name: 'Guarding Tonic', type: 'Consumable', level: 4, rarity: 'Uncommon', stat: '+5 DEF (5 steps)', flavorText: 'A steadying brew for the wary.', effects: { tempBuff: { name: 'Guarded Stance', bonuses: { defense: 5 }, durationSteps: 5 } } },
  { id: 1142, name: 'Evasion Tonic', type: 'Consumable', level: 7, rarity: 'Rare', stat: '+5 DEX (5 steps)', flavorText: 'Light as mist, quick as breath.', effects: { tempBuff: { name: 'Miststep', bonuses: { dexterity: 5 }, durationSteps: 5 } } },
  { id: 1143, name: 'Fortify Draught', type: 'Consumable', level: 10, rarity: 'Rare', stat: '+80 HP, +3 DEF (4 steps)', flavorText: 'Warmth spreads through your ribs.', effects: { heal: 80, tempBuff: { name: 'Fortify', bonuses: { defense: 3 }, durationSteps: 4 } } },
  { id: 1144, name: 'Battle Focus', type: 'Consumable', level: 12, rarity: 'Epic', stat: '+6 ATK (5 steps)', flavorText: 'Your heartbeat becomes a drum.', effects: { tempBuff: { name: 'Battle Focus', bonuses: { attack: 6 }, durationSteps: 5 } } },
];

export const defaultStartingItems: Item[] = [
  { id: 1, name: 'Rusty Broadsword', type: 'Weapon', level: 1, rarity: 'Common', stat: '+2 ATK', flavorText: 'It\'s seen better days, but the pointy end still hurts.', bonuses: { attack: 2 } },
  { id: 2, name: 'Lesser Health Potion', type: 'Consumable', level: 1, rarity: 'Common', stat: '+50 HP', flavorText: 'Tastes like cherry cough syrup, but it seals your wounds.', effects: { heal: 50 } },
  { id: 3, name: 'Leather Tunic', type: 'Body Armor', level: 2, rarity: 'Uncommon', stat: '+5 DEF', flavorText: 'Smells faintly of wet dog, but it turns a blade well enough.', bonuses: { defense: 5 } },
  { id: 5, name: 'Tattered Breeches', type: 'Pants', level: 1, rarity: 'Common', stat: '+1 DEF', flavorText: 'A bit drafty in the back.', bonuses: { defense: 1 } },
];

export const getItemValue = (item: Item) => {
  const base = 10 + item.level * 5;
  const multiplier = rarityMultiplier[item.rarity] ?? 1;
  return Math.round(base * multiplier);
};
