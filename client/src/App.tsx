import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';
import GameLayout from './pages/game/GameLayout.tsx';
import Dashboard from './pages/game/Dashboard.tsx';
import Character from './pages/game/Character.tsx';
import Inventory from './pages/game/Inventory.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Nested Game Routes */}
        <Route element={<GameLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/character" element={<Character />} />
        </Route>

        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;