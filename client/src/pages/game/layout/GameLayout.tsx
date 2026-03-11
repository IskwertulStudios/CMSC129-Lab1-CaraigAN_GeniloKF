import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { usePlayer } from '../../../contexts/PlayerContext.tsx';
import { useItems } from '../../../contexts/ItemContext.tsx';
import { useEquipment } from '../../../contexts/EquipmentContext.tsx';
import { useEnemy } from '../../../contexts/EnemyContext.tsx';
import { getStageForLevel } from '../../../domain/stages';
import './GameLayout.css';

import ProgressBar from '../components/ProgressBar.tsx';
import { useSaveStatus } from '../../../contexts/SaveContext.tsx';

const GameLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { level, gold, exp, expThreshold, hp, maxHp, stepsTaken, totalGoldEarned, totalDamageDealt, totalDamageReceived, totalEnemiesDefeated, resetPlayer } = usePlayer();
  const { saveNow, saving, lastSavedAt, saveError } = useSaveStatus();
  const { resetInventory, inventory } = useItems();
  const { resetEquipment, equipment } = useEquipment();
  const { clearEncounter } = useEnemy();
  const [pendingResetSave, setPendingResetSave] = useState(false);
  const [levelUpNotice, setLevelUpNotice] = useState(false);
  const [navAlerts, setNavAlerts] = useState({ shop: false, character: false });
  const prevLevelRef = useRef(level);

  const lastSavedLabel = lastSavedAt
    ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}`
    : 'Not saved yet';

  const isDefaultInventory = useMemo(() => (
    inventory.length === 0
  ), [inventory]);

  const isEquipmentCleared = useMemo(() => (
    Object.values(equipment).every((item) => item == null)
  ), [equipment]);

  const handleRestart = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith('quests_stage_'))
      .forEach((key) => localStorage.removeItem(key));
    clearEncounter();
    resetPlayer();
    resetInventory();
    resetEquipment();
    setPendingResetSave(true);
  };

  useEffect(() => {
    if (level > prevLevelRef.current) {
      setLevelUpNotice(true);
      setNavAlerts({ shop: true, character: true });
      prevLevelRef.current = level;
      const timeout = window.setTimeout(() => setLevelUpNotice(false), 4500);
      return () => window.clearTimeout(timeout);
    }
    prevLevelRef.current = level;
  }, [level]);

  useEffect(() => {
    if (location.pathname === '/shop') {
      setNavAlerts(prev => ({ ...prev, shop: false }));
    }
    if (location.pathname === '/character') {
      setNavAlerts(prev => ({ ...prev, character: false }));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!pendingResetSave) return;
    if (hp === 100 && level === 1 && exp === 0 && gold === 0 && stepsTaken === 0 && isDefaultInventory && isEquipmentCleared) {
      saveNow();
      setPendingResetSave(false);
    }
  }, [pendingResetSave, hp, level, exp, gold, stepsTaken, isDefaultInventory, isEquipmentCleared, saveNow]);

  return (
    <div className="dashboard-container">
      <header className="stats-bar">
        <div className="stat-item"><span className="label">Level:</span> {level}</div>
        <div className="stat-item">
          <span className="label">HP:</span>
          <ProgressBar currentProgress={hp} threshold={maxHp} barColor="var(--hp-color)" />
        </div>
        <div className="stat-item"><span className="label">GOLD:</span> <span className="gold-text">${gold}</span></div>
        <div className="stat-item">
          <span className="label">Exp:</span>
          <ProgressBar currentProgress={exp} threshold={expThreshold} barColor="var(--exp-color)" />
        </div>
        <div className="stat-item save-item">
          <button className="save-btn" onClick={saveNow} disabled={saving}>
            {saving ? 'SAVING...' : 'SAVE'}
          </button>
          <div className="save-meta">
            <span>{saveError ? 'Save failed' : lastSavedLabel}</span>
          </div>
        </div>
      </header>

      {levelUpNotice && (
        <div className="level-up-toast" role="status">
          <div className="level-up-toast-title">Level up!</div>
          <div className="level-up-toast-body">New skill points and shop stock are available.</div>
        </div>
      )}

      <main className="game-area">
        <Outlet /> 
      </main>

      <footer className="game-nav">
        <button 
          className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} 
          onClick={() => navigate('/dashboard')}>Travel</button>
        <button 
          className={`nav-item ${location.pathname === '/inventory' ? 'active' : ''}`} 
          onClick={() => navigate('/inventory')}>Bag</button>
        <button 
          className={`nav-item ${location.pathname === '/shop' ? 'active' : ''} ${navAlerts.shop ? 'nav-attention' : ''}`} 
          onClick={() => navigate('/shop')}>Shop{navAlerts.shop && <span className="nav-badge" aria-label="New">!</span>}</button>
        <button 
          className={`nav-item ${location.pathname === '/character' ? 'active' : ''} ${navAlerts.character ? 'nav-attention' : ''}`} 
          onClick={() => navigate('/character')}>Hero{navAlerts.character && <span className="nav-badge" aria-label="New">!</span>}</button>
      </footer>

      {hp <= 0 && (
        <div className="death-overlay">
          <div className="death-modal">
            <h2>YOU HAVE FALLEN</h2>
            <p className="death-sub">Your journey ends here.</p>
            <div className="death-stats">
              <h3>Adventure Stats</h3>
              <div className="death-stats-grid">
                <div>
                  <span>Steps Taken</span>
                  <strong>{stepsTaken}</strong>
                </div>
                <div>
                  <span>Gold Earned</span>
                  <strong>{totalGoldEarned}</strong>
                </div>
                <div>
                  <span>Damage Dealt</span>
                  <strong>{totalDamageDealt}</strong>
                </div>
                <div>
                  <span>Damage Received</span>
                  <strong>{totalDamageReceived}</strong>
                </div>
                <div>
                  <span>Enemies Defeated</span>
                  <strong>{totalEnemiesDefeated}</strong>
                </div>
              </div>
            </div>
            <button className="death-restart-btn" onClick={handleRestart}>
              Restart Journey
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default GameLayout;






