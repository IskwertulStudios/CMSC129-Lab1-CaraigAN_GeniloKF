import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

const GameLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard-container">
      {/* Persistent Stat Bar (We'll make this dynamic later) */}
      <header className="stats-bar">
        <div className="stat-item"><span className="label">HP:</span> 100/100</div>
        <div className="stat-item"><span className="label">GOLD:</span> <span className="gold-text">50</span></div>
      </header>

      <main className="game-area">
        <Outlet /> {/* This renders the specific page (Dashboard, Inventory, etc.) */}
      </main>

      <footer className="game-nav">
        <button 
          className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} 
          onClick={() => navigate('/dashboard')}>Travel</button>
        <button 
          className={`nav-item ${location.pathname === '/inventory' ? 'active' : ''}`} 
          onClick={() => navigate('/inventory')}>Bag</button>
        <button 
          className={`nav-item ${location.pathname === '/character' ? 'active' : ''}`} 
          onClick={() => navigate('/character')}>Hero</button>
      </footer>
    </div>
  );
};

export default GameLayout;