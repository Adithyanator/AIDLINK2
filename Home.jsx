import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MapComponent from '../components/MapComponent';
import { AlertTriangle, Users, MapPin } from 'lucide-react';

export default function Home() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real environment, this would fetch from http://localhost:5000/api/camps
    // For demo purposes when offline/no backend running, I am providing fallback seed data.
    const fetchCamps = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/camps');
        if (!res.ok) throw new Error('API not reachable');
        const data = await res.json();
        setCamps(data);
      } catch (err) {
        console.warn('Backend not running, using fallback data.', err);
        setCamps([
          { _id: '1', name: 'Govt Model Boys HSS', district: 'Trivandrum', hostages: 250, priority: 'Critical', resourceNeeds: ['Food', 'Medical Aid'], lat: 8.4875, lng: 76.9525, contactNumber: '9876543210' },
          { _id: '2', name: 'St. Marys School', district: 'Ernakulam', hostages: 80, priority: 'Medium', resourceNeeds: ['Water'], lat: 9.9816, lng: 76.2999, contactNumber: '9123456789' },
          { _id: '3', name: 'Alappuzha SDV Camp', district: 'Alappuzha', hostages: 400, priority: 'Critical', resourceNeeds: ['Evacuation', 'Food', 'Medical Aid'], lat: 9.4981, lng: 76.3388, contactNumber: '9988776655' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCamps();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <div style={{ flex: 1, position: 'relative' }}>
        {loading ? (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <h2>Loading Map Data...</h2>
          </div>
        ) : (
          <MapComponent camps={camps} />
        )}
        
        {/* Floating Info Panel */}
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          zIndex: 400, 
          background: 'rgba(30, 41, 59, 0.9)', 
          backdropFilter: 'blur(10px)',
          padding: '1.5rem', 
          borderRadius: '1rem',
          border: '1px solid var(--border)',
          width: '320px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle color="var(--primary)" size={20} />
            Live Situation
          </h3>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Active Camps</span>
              <span style={{ fontWeight: 'bold' }}>{camps.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total People (Est)</span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                {camps.reduce((acc, curr) => acc + (curr.hostages || 0), 0)}
              </span>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            AidLink automatically categorizes and highlights urgent relief areas on the map.
          </p>
        </div>
      </div>
    </div>
  );
}
