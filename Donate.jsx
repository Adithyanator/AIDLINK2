import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { HeartHandshake, Building2, CheckCircle } from 'lucide-react';

export default function Donate() {
  const [tab, setTab] = useState('individual'); // 'individual' or 'ngo'
  const [submitted, setSubmitted] = useState(false);

  const [indData, setIndData] = useState({ donorName: '', phoneNumber: '', district: '', itemDonated: '', quantity: '' });
  const [ngoData, setNgoData] = useState({ organizationName: '', contactPerson: '', phoneNumber: '', district: '', supportType: '', capacity: '' });

  const handleIndividualSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/donations/individual', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(indData)
      });
      setSubmitted(true);
    } catch { setSubmitted(true); }
  };

  const handleNgoSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/donations/ngo', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ngoData)
      });
      setSubmitted(true);
    } catch { setSubmitted(true); }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="container" style={{ marginTop: '3rem', maxWidth: '700px' }}>
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 className="title">Donate Supplies & Support</h1>
            <p className="subtitle">Every contribution saves a life.</p>
          </div>

          {!submitted && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button 
                className={`btn ${tab === 'individual' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setTab('individual')}
              >
                <HeartHandshake size={20} /> Individual Donation
              </button>
              <button 
                className={`btn ${tab === 'ngo' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setTab('ngo')}
              >
                <Building2 size={20} /> NGO / Org Support
              </button>
            </div>
          )}

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ color: 'var(--success)' }}>Thank you for your generosity!</h2>
              <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => setSubmitted(false)}>
                Make another donation
              </button>
            </div>
          ) : (
            tab === 'individual' ? (
              <form onSubmit={handleIndividualSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input required className="form-input" type="text" onChange={e => setIndData({...indData, donorName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input required className="form-input" type="text" onChange={e => setIndData({...indData, phoneNumber: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">District where you are dropping it</label>
                  <input required className="form-input" type="text" onChange={e => setIndData({...indData, district: e.target.value})} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Items Donated (Food, Blankets, etc)</label>
                    <input required className="form-input" type="text" onChange={e => setIndData({...indData, itemDonated: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input required className="form-input" type="text" placeholder="e.g. 50 packets" onChange={e => setIndData({...indData, quantity: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Donation Info</button>
              </form>
            ) : (
              <form onSubmit={handleNgoSubmit}>
                <div className="form-group">
                  <label className="form-label">Organization Name</label>
                  <input required className="form-input" type="text" onChange={e => setNgoData({...ngoData, organizationName: e.target.value})} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Contact Person</label>
                    <input required className="form-input" type="text" onChange={e => setNgoData({...ngoData, contactPerson: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input required className="form-input" type="text" onChange={e => setNgoData({...ngoData, phoneNumber: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Target District</label>
                  <input required className="form-input" type="text" onChange={e => setNgoData({...ngoData, district: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Type of Support (Medical Team, Rescue Boats, etc)</label>
                  <input required className="form-input" type="text" onChange={e => setNgoData({...ngoData, supportType: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Capacity / Count</label>
                  <input required className="form-input" type="text" placeholder="e.g. 10 Doctors" onChange={e => setNgoData({...ngoData, capacity: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register NGO Support</button>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}
