import React from 'react';
import { useNavigate } from 'react-router-dom';

const Character: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('game_token')}`
        }
      });
    } catch (err) {
      console.error("Server-side logout failed, proceeding with local logout.");
    } finally {
      localStorage.removeItem('game_token');
      navigate('/login');
    }
  };

  return (
    <div className="page-content">
      <div className="character-card">
        <div className="avatar-circle">👤</div>
        <h2>Adventurer</h2>
        <p>Level 1 Novice</p>
        <hr />
        
        <button className="logout-btn" onClick={handleLogout}>
          LEAVE REALM (LOGOUT)
        </button>
      </div>
    </div>
  );
};

export default Character;