import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Activity, Users, Box, Heart, Building } from 'lucide-react';

export default function CoordinatorDashboard() {
  const [stats, setStats] = useState({
    totalCamps: 0,
    totalHostages: 0,
    urgentCampsCount: 0,
    totalVolunteers: 0,
    totalDonations: 0,
    totalNGOSupport: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        // Fallback demo data
        setStats({
          totalCamps: 142,
          totalHostages: 12450,
          urgentCampsCount: 28,
          totalVolunteers: 850,
          totalDonations: 432,
          totalNGOSupport: 15
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatConfig = [
    { label: 'Active Camps', value: stats.totalCamps, icon: <Building size={32} />, color: '#38BDF8' },
    { label: 'Evacuated Hostages', value: stats.totalHostages, icon: <Users size={32} />, color: '#10B981' },
    { label: 'Critical Zones', value: stats.urgentCampsCount, icon: <Activity size={32} />, color: '#EF4444' },
    { label: 'Volunteers Ready', value: stats.totalVolunteers, icon: <Heart size={32} />, color: '#F59E0B' },
    { label: 'Pledged Supplies', value: stats.totalDonations, icon: <Box size={32} />, color: '#A855F7' },
    { label: 'NGO Operations', value: stats.totalNGOSupport, icon: <Building size={32} />, color: '#6366F1' },
  ];

  return (
    <div className="page-container" style={{ backgroundColor: 'var(--background)' }}>
      <Navbar />
      <div className="container" style={{ marginTop: '3rem' }}>
        <h1 className="title" style={{ marginBottom: '0.5rem' }}>Central Coordination</h1>
        <p className="subtitle" style={{ marginBottom: '3rem' }}>State-wide real-time tracking metrics</p>
        
        {loading ? (
          <div>Loading vital statistics...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {StatConfig.map((stat, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `4px solid ${stat.color}` }}>
                <div style={{ 
                  backgroundColor: `${stat.color}20`, 
                  color: stat.color,
                  padding: '1rem', 
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {stat.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1 }}>{stat.value.toLocaleString()}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.25rem' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
