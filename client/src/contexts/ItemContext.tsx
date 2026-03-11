import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { Item } from './EquipmentContext';
import { usePlayer } from './PlayerContext';
import { itemBank, defaultStartingItems, getItemValue as calcItemValue } from '../domain/items';
import { rollForLoot } from '../services/loot';
import { buildStageShopStock } from '../domain/shop';
import { getStageForLevel } from '../domain/stages';

interface ItemContextType {
  inventory: Item[];
  itemBank: Item[];
  shopStock: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  sellItem: (item: Item) => void;
  buyItem: (item: Item) => boolean;
  getItemValue: (item: Item) => number;
  rollForLoot: () => Item | null;
  hydrateInventory: (items: Item[]) => void;
  resetInventory: () => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addGold, spendGold, gold, dexterity, level } = usePlayer();
  const [inventory, setInventory] = useState<Item[]>([]);
  const stage = useMemo(() => getStageForLevel(level), [level]);
  const [shopStock, setShopStock] = useState<Item[]>(() => buildStageShopStock(itemBank, stage));

  useEffect(() => {
    setShopStock(buildStageShopStock(itemBank, stage));
  }, [stage.id]);

  const addItem = (item: Item) => setInventory(prev => [...prev, item]);
  const removeItem = (id: number) => setInventory(prev => prev.filter(i => i.id !== id));

  const sellItem = (item: Item) => {
    addGold(calcItemValue(item));
    removeItem(item.id);
  };

  const buyItem = (item: Item) => {
    const cost = calcItemValue(item);
    if (gold < cost) return false;
    spendGold(cost);
    addItem({ ...item, id: Date.now() + Math.floor(Math.random() * 1000) });
    return true;
  };

  const hydrateInventory = (items: Item[]) => {
    if (!Array.isArray(items)) return;
    setInventory(items);
  };

  const resetInventory = () => {
    setInventory([]);
  };

  const value = useMemo(() => ({
    inventory,
    itemBank,
    shopStock,
    addItem,
    removeItem,
    sellItem,
    buyItem,
    getItemValue: calcItemValue,
    rollForLoot: () => rollForLoot(itemBank, { luck: dexterity, level }),
    hydrateInventory,
    resetInventory,
  }), [inventory, gold, dexterity, level, shopStock]);

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error('useItems must be used within ItemProvider');
  return context;
};



