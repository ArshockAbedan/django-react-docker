import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Login failed');
      // Handle successful login (e.g., save token, redirect)
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:8000/api/google-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      if (!response.ok) throw new Error('Google login failed');
      // Handle successful login (e.g., save token, redirect)
    } catch (err) {
      setError('Google login failed');
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <hr />
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setError('Google login failed')}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
