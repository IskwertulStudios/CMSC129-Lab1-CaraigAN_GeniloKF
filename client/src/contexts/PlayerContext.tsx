import React, { createContext, useContext, useState } from 'react';

interface PlayerContextType {
  gold: number;
  exp: number;
  expThreshold: number;
  hp: number;
  maxHp: number;
  skillPoints: number;
  attack: number;
  defense: number;
  dexterity: number;
  level: number;
  addGold: (amount: number) => void;
  spendGold: (amount: number) => void;
  regenHP: (amount: number) => void;
  takeDamage: (amount: number) => void;
  gainExp: (amount: number) => void;
  levelUp: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gold, setGold] = useState(0);
    const [hp, setHp] = useState(100);
    const [maxHp, setMaxHp] = useState(100);
    const [exp, setExp] = useState(0);
    const [expThreshold, setExpThreshold] = useState(100);
    const [level, setLevel] = useState(1);
    const [skillPoints, setSkillPoints] = useState(0);
    const [attack, setAttack] = useState(5);
    const [defense, setDefense] = useState(5);
    const [dexterity, setDexterity] = useState(5);


    const addGold = (amount: number) => setGold(prev => prev + amount);
    const gainExp = (amount: number) => {
        const newExp = exp + amount;

        if (newExp >= expThreshold) {
            const remainingExp = newExp - expThreshold;
            setExp(remainingExp);
            levelUp();
        } else {
            setExp(newExp);
        }

        setExp(prev => prev + amount);

        if (exp >= expThreshold) {
            setExp(prev => prev - expThreshold);
            levelUp();
        }
    };
    const takeDamage = (amount: number) => setHp(prev => Math.max(0, prev - amount));
    const spendGold = (amount: number) => setGold(prev => Math.max(0, prev - amount));
    const regenHP = (amount: number) => setHp(prev => Math.min(maxHp, prev + amount));
    const levelUp = () => {
        setLevel(prev => prev + 1);
        setSkillPoints(prev => prev + 2);
        setMaxHp(prev => Math.floor(prev * 1.2));
        setExpThreshold(prev => Math.floor(prev * 1.2));
    }
    

    return (
        <PlayerContext.Provider value={{ gold, exp, expThreshold, hp, maxHp, skillPoints, attack, defense, dexterity, level, addGold, spendGold, regenHP, takeDamage, gainExp, levelUp }}>
        {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};