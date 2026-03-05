import React, { useState, useEffect } from 'react';
import './Dashboard.css';

interface Enemy {
  name: string;
  hpLoss: number;
  goldReward: number;
  expReward: number;
}

const Dashboard: React.FC = () => {
  // Game Logic State
  const [isCooldown, setIsCooldown] = useState(false);
  const [lastAction, setLastAction] = useState("The road ahead is long...");
  const [encounter, setEncounter] = useState<Enemy | null>(null);

  // Note: HP/Gold/EXP will eventually come from a Context or Global State 
  // For now, we'll keep local placeholders to demonstrate the logic
  const [hp, setHp] = useState(100);

  const handleStep = () => {
    if (isCooldown || encounter || hp <= 0) return;

    setIsCooldown(true);
    
    // 20% chance for an enemy encounter
    const roll = Math.random();
    if (roll < 0.2) {
      triggerEncounter();
    } else {
      const goldGained = Math.floor(Math.random() * 5) + 1;
      setLastAction(`You walked safely and found ${goldGained} gold.`);
      // Update global state/backend here
    }

    setTimeout(() => setIsCooldown(false), 1200);
  };

  const triggerEncounter = () => {
    const enemies = [
      { name: "Wild Slime", hpLoss: 10, goldReward: 15, expReward: 20 },
      { name: "Angry Goblin", hpLoss: 25, goldReward: 40, expReward: 50 },
      { name: "Shadow Bat", hpLoss: 5, goldReward: 5, expReward: 10 }
    ];
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    setEncounter(randomEnemy);
    setLastAction(`A ${randomEnemy.name} blocks your path!`);
  };

  const handleFight = () => {
    if (!encounter) return;
    
    setHp(prev => Math.max(0, prev - encounter.hpLoss));
    setLastAction(`Victory! You defeated the ${encounter.name} but lost ${encounter.hpLoss} HP.`);
    // Add rewards logic here
    setEncounter(null);
  };

  const handleSkip = () => {
    setLastAction(`You carefully snuck past the enemy.`);
    setEncounter(null);
  };

  return (
    <div className="page-content">
      <div className="event-log">
        <p>{lastAction}</p>
      </div>

      <div className="action-zone">
        {!encounter ? (
          <button 
            className={`step-btn ${isCooldown ? 'cooldown' : ''}`} 
            onClick={handleStep}
            disabled={isCooldown || hp <= 0}
          >
            {hp <= 0 ? 'YOU ARE EXHAUSTED' : isCooldown ? 'WAITING...' : 'TAKE A STEP'}
          </button>
        ) : (
          <div className="encounter-controls">
            <div className="enemy-preview">
              <h3>{encounter.name}</h3>
              <p>Estimated Risk: {encounter.hpLoss} HP</p>
            </div>
            <div className="button-group">
              <button className="fight-btn" onClick={handleFight}>FIGHT</button>
              <button className="skip-btn" onClick={handleSkip}>SKIP</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;