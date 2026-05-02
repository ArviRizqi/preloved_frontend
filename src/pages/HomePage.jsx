import { useEffect, useState } from 'react';
import HeroArea from '../components/HeroArea';
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const GENRES = ['Fiksi', 'Sastra', 'Self-Help', 'Bisnis', 'Sejarah', 'Sains', 'Filsafat', 'Romance'];

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/listings')
      .then(r => setBooks(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = books.slice(0, 4);
  const recent = books.slice(4, 12);

  return (
    <div>
      <HeroArea />

      {/* How it works */}
      <div style={{ background: 'var(--color-bg-alt)', padding: '5rem 0' }}>
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#6B7280', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>How it works</h2>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Connecting readers in three simple, sustainable steps.
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#B3F0D4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem', color: '#0A3622' }}>
                🧭
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.5rem', fontWeight: 600 }}>Browse</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Discover thousands of unique titles at a fraction of their original price.</p>
            </div>
            {/* Step 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DCE4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem', color: '#1E3A8A' }}>
                💬
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.5rem', fontWeight: 600 }}>Chat</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Directly message sellers to ask about book conditions or request more photos.</p>
            </div>
            {/* Step 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FCE7F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem', color: '#9D174D' }}>
                🛒
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.5rem', fontWeight: 600 }}>Buy</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Securely complete your purchase and enjoy your next sustainable read.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="page-container" style={{ padding: '4rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '3rem', alignItems: 'start' }}>
        <main>
          {/* Featured */}
          {featured.length > 0 && (
            <section style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="section-title">Featured Finds</h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Curated highlights from our community sellers.</p>
                </div>
                <Link to="/catalog" style={{ color: 'var(--color-text-main)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  See all <span style={{ fontSize: '1.1rem' }}>→</span>
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                {featured.map(b => <BookCard key={b.id} book={b} />)}
              </div>
            </section>
          )}

          {/* All books */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <h2 className="section-title">Recent Additions</h2>
              <Link to="/catalog" style={{ color: 'var(--color-text-main)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                See all <span style={{ fontSize: '1.1rem' }}>→</span>
              </Link>
            </div>

            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '1rem', aspectRatio: '2/3', animation: 'pulse 1.5s infinite' }} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                {recent.map(b => <BookCard key={b.id} book={b} />)}
              </div>
            )}
          </section>
        </main>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* CTA Banner */}
      <div style={{ background: 'var(--color-primary)', padding: '5rem 0', margin: '2rem 0 0' }}>
        <div className="page-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF', marginBottom: '1rem', fontWeight: 600 }}>
              Ready to declutter your shelf?
            </h2>
            <p style={{ color: '#E5E7EB', fontSize: '1rem', marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.6 }}>
              Join 50,000+ readers who are making books sustainable. Turn your read stories into someone else's new discovery.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Start Selling
              </a>
              <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1.5rem', background: 'transparent', color: '#FFFFFF', border: '1px solid #FFFFFF', borderRadius: '9999px', fontSize: '0.95rem', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; }}
              >
                How it Works
              </Link>
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '4/3', background: '#D1D5DB', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Person holding books" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
