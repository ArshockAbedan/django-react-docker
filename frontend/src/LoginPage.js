

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f5f6fa' }}>
        <div style={{ background: 'white', padding: '2rem 2.5rem', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 340 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#222' }}>Login</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Email</label>
              <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Password</label>
              <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Login</button>
          </form>
          <div style={{ margin: '1.5rem 0', textAlign: 'center', color: '#888' }}>or</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError('Google login failed')}
            />
          </div>
          {error && <p style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</p>}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
