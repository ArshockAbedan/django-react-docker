

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Header from './Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={
          <div className="App">
            <h1>Welcome to My App</h1>
            <p>This is the home page.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
