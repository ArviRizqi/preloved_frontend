import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.95rem',
    textDecoration: 'none',
    padding: '0.25rem 0',
    borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
    transition: 'all 0.2s',
  });

  return (
    <nav style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', height: '4.5rem', gap: '2rem' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
            Libris
          </div>
        </Link>

        {/* Nav links — desktop */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1, marginLeft: '1rem' }} className="nav-links-desktop">
          <NavLink to="/" style={navLinkStyle} end>Beranda</NavLink>
          <NavLink to="/catalog" style={navLinkStyle}>Katalog</NavLink>
          <NavLink to="/about" style={navLinkStyle}>Tentang</NavLink>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
          {isAdmin ? (
            <>
              <Link to="/admin" className="btn-ghost" style={{ fontSize: '0.85rem' }}>Dashboard</Link>
              <button onClick={handleLogout} className="btn-ghost" style={{ fontSize: '0.85rem' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--color-primary)', color: '#FFFFFF', textDecoration: 'none', transition: 'all 0.2s' }}>
              👤
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
