import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB', color: 'var(--color-text-muted)', marginTop: 'auto', padding: '4rem 0 2rem', position: 'relative' }}>
      <div className="page-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>Libris</div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              © 2024 Libris. Sustainable reading for a better planet.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '1.25rem', color: '#9CA3AF' }}>🌐</span>
              <span style={{ fontSize: '1.25rem', color: '#9CA3AF' }}>📷</span>
              <span style={{ fontSize: '1.25rem', color: '#9CA3AF' }}>💬</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Marketplace</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['/catalog', 'Browse All'], ['/catalog?genre=Sastra', 'Rare Finds'], ['/catalog?condition=Baru', 'Best Sellers']].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: '#6B7280', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'underline', textDecorationColor: 'transparent' }}
                  onMouseEnter={e => { e.target.style.color = 'var(--color-primary)'; e.target.style.textDecorationColor = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.target.style.color = '#6B7280'; e.target.style.textDecorationColor = 'transparent'; }}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>About</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['/about', 'About Us'], ['/', 'Sustainability'], ['/', 'Press']].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: '#6B7280', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'underline', textDecorationColor: 'transparent' }}
                  onMouseEnter={e => { e.target.style.color = 'var(--color-primary)'; e.target.style.textDecorationColor = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.target.style.color = '#6B7280'; e.target.style.textDecorationColor = 'transparent'; }}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#6B7280' }}>
              <Link to="/" style={{ color: '#6B7280', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-primary)'} onMouseLeave={e => e.target.style.color = '#6B7280'}>Help Center</Link>
              <Link to="/" style={{ color: '#6B7280', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-primary)'} onMouseLeave={e => e.target.style.color = '#6B7280'}>Support</Link>
              <a href="https://wa.me/6281234567890" style={{ color: '#6B7280', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-primary)'} onMouseLeave={e => e.target.style.color = '#6B7280'}>Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
