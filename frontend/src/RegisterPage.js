

import React, { useState } from 'react';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Registration failed');
      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f5f6fa' }}>
      <div style={{ background: 'white', padding: '2rem 2.5rem', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 340 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#222' }}>Register</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontWeight: 500 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontWeight: 500 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontWeight: 500 }}>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ background: '#28a745', color: 'white', border: 'none', borderRadius: 4, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Register</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: 16, textAlign: 'center' }}>{success}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
