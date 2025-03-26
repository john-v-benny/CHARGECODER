import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import logo_cc from './assets/logo_cc.png';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        navigate('/landing');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-visual-section">
          <h2>Welcome Back!</h2>
          <p>
            Unlock a world of possibilities. Sign in to access your personalized 
            dashboard and continue your journey.
          </p>
        </div>
        
        <div className="auth-form-section">
          <img 
            src={logo_cc} 
            alt="ChargeCoder Logo" 
            className="auth-logo" 
          />
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSignIn} className="auth-form">
            <div className="auth-input-group">
              <span className="auth-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                className="auth-input"
                type="text"
                value={username}
                placeholder="Username or Email"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <span className="auth-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                className="auth-input"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="auth-forgot-password" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </p>
            
            <button className="auth-submit-button" type="submit">
              Sign In
            </button>
          </form>
          
          <div className="auth-divider">OR</div>
          
          <button 
            className="auth-alternate-button" 
            type="button" 
            onClick={() => navigate('/signup')}
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;