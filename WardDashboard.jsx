import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut } from 'lucide-react';

export default function WardDashboard() {
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newCamp, setNewCamp] = useState({ name: '', address: '', contactNumber: '', hostages: '', capacity: '', resourceNeeds: '', lat: '', lng: '' });

  useEffect(() => {
    const data = localStorage.getItem('wardMember');
    if (!data) return navigate('/login');
    const parsed = JSON.parse(data);
    setMember(parsed);

    // Mock fetching camps managed by this ward member
    const fetchCamps = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/camps');
        const allCamps = await res.json();
        setCamps(allCamps.filter(c => c.district === parsed.district));
      } catch {
        setCamps([
          { _id: '1', name: 'Local Primary School Camp', hostages: 150, capacity: 500, priority: 'Medium', resourceNeeds: ['Water'] }
        ]);
      }
    };
    fetchCamps();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('wardMember');
    navigate('/');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      ...newCamp,
      district: member.district,
      ward: member.wardNumber,
      lat: parseFloat(newCamp.lat) || 10.8505,
      lng: parseFloat(newCamp.lng) || 76.2711,
      resourceNeeds: newCamp.resourceNeeds.split(',').map(s => s.trim()).filter(Boolean)
    };
    try {
      await fetch('http://localhost:5000/api/camps', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      alert('Camp Added. Please refresh.');
      setShowAdd(false);
    } catch {
      alert('Network error. Camp mocked locally.');
      setCamps([...camps, { ...payload, _id: Date.now().toString(), priority: 'High' }]);
      setShowAdd(false);
    }
  };

  if (!member) return null;

  return (
    <div className="page-container">
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Ward {member.wardNumber} Management</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome, {member.name} ({member.district})</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setShowAdd(!showAdd)}
              >
                <PlusCircle size={20} /> Add New Camp
              </button>
            </div>
          </div>

          <div>
            {showAdd && (
              <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--accent)' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Register Relief Camp</h3>
                <form onSubmit={handleCreate}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Camp Name</label>
                      <input required className="form-input" type="text" onChange={e => setNewCamp({...newCamp, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Address</label>
                      <input required className="form-input" type="text" onChange={e => setNewCamp({...newCamp, address: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Current Hostages</label>
                      <input required className="form-input" type="number" onChange={e => setNewCamp({...newCamp, hostages: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total Capacity</label>
                      <input required className="form-input" type="number" onChange={e => setNewCamp({...newCamp, capacity: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Number</label>
                      <input required className="form-input" type="text" onChange={e => setNewCamp({...newCamp, contactNumber: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Resource Needs (Comma separated)</label>
                    <input className="form-input" type="text" placeholder="Food, Blankets, Medical" onChange={e => setNewCamp({...newCamp, resourceNeeds: e.target.value})} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Latitude</label>
                      <input required className="form-input" type="text" placeholder="10.8505" onChange={e => setNewCamp({...newCamp, lat: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Longitude</label>
                      <input required className="form-input" type="text" placeholder="76.2711" onChange={e => setNewCamp({...newCamp, lng: e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Save Camp Details</button>
                </form>
              </div>
            )}

            <h3 style={{ marginBottom: '1.5rem' }}>Active Camps in your Jurisdiction</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {camps.map(camp => (
                <div key={camp._id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{camp.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      Hostages: {camp.hostages} / {camp.capacity} | Priority: {camp.priority}
                    </p>
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                      {camp.resourceNeeds && camp.resourceNeeds.map((need, idx) => (
                        <span key={idx} className={`badge badge-${camp.priority?.toLowerCase() || 'low'}`}>{need}</span>
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-outline">Update Stats</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
