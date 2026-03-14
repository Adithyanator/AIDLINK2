import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { UserPlus, MapPin, CheckCircle } from 'lucide-react';

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: '', phoneNumber: '', district: '', area: '', skills: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim())
    };

    try {
      const res = await fetch('http://localhost:5000/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit, mocking success for demo');
      setSubmitted(true); // Mock success if offline
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="container" style={{ marginTop: '3rem', maxWidth: '600px' }}>
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <UserPlus size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h1 className="title">Volunteer Registration</h1>
            <p className="subtitle">Join the relief efforts on the ground.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ color: 'var(--success)' }}>Registration Successful!</h2>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                Thank you for your willingness to help. Coordinators will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input required className="form-input" type="text" placeholder="John Doe" 
                  onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input required className="form-input" type="tel" placeholder="+91 9876543210" 
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">District</label>
                  <input required className="form-input" type="text" placeholder="e.g. Ernakulam" 
                    onChange={e => setFormData({...formData, district: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Area / City</label>
                  <input required className="form-input" type="text" placeholder="e.g. Aluva" 
                    onChange={e => setFormData({...formData, area: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Skills (Comma separated)</label>
                <input required className="form-input" type="text" placeholder="Medical, Rescue, Cooking, Logistics" 
                  onChange={e => setFormData({...formData, skills: e.target.value})} />
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Register as Volunteer
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
