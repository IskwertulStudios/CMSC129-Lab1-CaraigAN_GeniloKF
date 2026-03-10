import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlayer } from '../../contexts/PlayerContext.tsx';
import './Auth.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loadPlayerState } = usePlayer();

  useEffect(() => {
    const token = localStorage.getItem('game_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Persist the token first so loadPlayerState can read it
        localStorage.setItem('game_token', data.token);
        // 2. Hydrate PlayerContext with the saved game state from the DB
        await loadPlayerState();
        // 3. Only navigate once state is loaded — no flash of default values
        navigate('/dashboard');
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Cannot reach the realm server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>QUEST STEPPER</h1>
        <p className="subtitle">Welcome back, Hero.</p>

        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="hero@example.com"
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'ENTERING REALM...' : 'ENTER WORLD'}
          </button>
        </form>

        <p className="footer-text">
          New to these lands? <Link to="/signup" className="toggle-btn">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;