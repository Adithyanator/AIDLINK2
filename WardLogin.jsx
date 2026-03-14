import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function WardLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('wardMember', JSON.stringify(data.member));
        navigate('/ward/dashboard');
      } else {
        const err = await res.json();
        setError(err.error || 'Invalid login');
      }
    } catch (err) {
      // Mock login for offline demonstration
      if (phone === '9876543210' && password === 'password123') {
        localStorage.setItem('wardMember', JSON.stringify({ name: 'Rajesh Kumar', wardNumber: '1', district: 'Trivandrum' }));
        navigate('/ward/dashboard');
      } else {
        setError('Connection failed. For demo, use phone: 9876543210 and pass: password123');
      }
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="container" style={{ marginTop: '5rem', maxWidth: '400px' }}>
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ShieldCheck size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h2>Authority Login</h2>
            <p className="subtitle" style={{ fontSize: '1rem' }}>Ward Members Only</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input required className="form-input" type="text" onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input required className="form-input" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
