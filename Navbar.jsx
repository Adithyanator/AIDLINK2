import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <ShieldAlert size={28} />
          <span>AidLink</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Map</Link>
          <Link to="/volunteer" className="nav-link">Volunteer</Link>
          <Link to="/donate" className="nav-link">Donate</Link>
          <Link to="/coordinator" className="nav-link">Dashboard</Link>
          <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
            Ward Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
