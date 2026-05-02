import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HERO_GENRES = ['Fiction', 'Non-Fiction', 'Rare Finds', 'Academic', 'Comics', 'Poetry', 'Self-Help'];

export default function HeroArea() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/catalog?search=${encodeURIComponent(search)}`);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', background: '#F8F9FA', overflow: 'hidden' }}>
      {/* Background Image with Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 100%)', zIndex: 1 }} />
        <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Library Background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
          Find Quality Preloved Books
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-main)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          Affordable, sustainable reading for a better planet. Join our community of book lovers today.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', background: '#FFFFFF', padding: '0.5rem', borderRadius: '9999px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', maxWidth: '640px', margin: '0 auto 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', color: '#9CA3AF' }}>
            🔍
          </div>
          <input 
            type="text" 
            placeholder="Search by title, author, or ISBN" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', padding: '0.75rem 1rem', fontSize: '1rem', color: 'var(--color-text-main)' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            Browse Books
          </button>
        </form>

        {/* Categories Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
          {HERO_GENRES.map(g => (
            <button key={g} onClick={() => navigate(`/catalog?genre=${g}`)} style={{ background: '#FFFFFF', color: 'var(--color-text-main)', border: '1px solid #E5E7EB', borderRadius: '9999px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
              onMouseEnter={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.target.style.transform = ''; }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
