import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const formatPrice = (p) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

export default function Sidebar() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/listings', { params: { limit: 5 } })
      .then(r => setLatest(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '1.5rem', position: 'sticky', top: '6.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span>🆕</span> Terbaru
      </h2>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ height: '64px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {latest.map(book => (
            <Link to={`/books/${book.id}`} key={book.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.5rem', borderRadius: '0.5rem', transition: 'all 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ width: '3.5rem', height: '5rem', borderRadius: '0.5rem', overflow: 'hidden', background: '#F3F4F6', flexShrink: 0, border: '1px solid #E5E7EB' }}>
                <img src={book.cover || (book.images && book.images[0]?.url)} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.src = `https://picsum.photos/seed/${book.id}w/50/70`; }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', margin: 0, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {book.title}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.2rem 0 0' }}>{book.author}</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', margin: '0.25rem 0 0' }}>{formatPrice(book.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link to="/catalog" className="btn-secondary" style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
        Lihat Semua →
      </Link>
    </aside>
  );
}
