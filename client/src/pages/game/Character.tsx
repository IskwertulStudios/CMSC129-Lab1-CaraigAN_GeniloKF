import React from 'react';
import { useNavigate } from 'react-router-dom';

const Character: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('game_token');
    navigate('/login');
  };

  return (
    <div className="page-content">
      <div className="character-card">
        <div className="avatar-circle">👤</div>
        <h2>Adventurer</h2>
        <p>Level 1 Novice</p>
        <hr />
        <div className="char-stats">
          <p>Total Steps: 152</p>
          <p>Enemies Slain: 12</p>
        </div>
        
        <button className="logout-btn" onClick={handleLogout}>
          LEAVE REALM (LOGOUT)
        </button>
      </div>
    </div>
  );
};

export default Character;