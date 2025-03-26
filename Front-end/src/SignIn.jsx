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
        setError(errorData.error || 'Invalid credentials');
      }
    } catch (error) {
      setError('Server error. Please try again.');
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
            alt="Logo" 
            className="auth-logo" 
          />
          
          {error && <p className="auth-error">{error}</p>}
          
          <form onSubmit={handleSignIn} className="auth-form">
            <input
              className="auth-input"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="auth-input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <p 
              className="auth-forgot-password" 
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </p>
            
            <button 
              className="auth-submit-button" 
              type="submit"
            >
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