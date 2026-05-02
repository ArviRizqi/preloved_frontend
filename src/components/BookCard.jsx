import { Link } from 'react-router-dom';

const conditionClass = {
  'Baru': 'badge-condition-baru',
  'Sangat Baik': 'badge-condition-sangat-baik',
  'Baik': 'badge-condition-baik',
  'Cukup': 'badge-condition-cukup',
};

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

export default function BookCard({ book }) {
  const discount = book.originalPrice > book.price
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : null;

  return (
    <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Cover */}
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', background: '#F3F4F6', borderBottom: '1px solid #E5E7EB' }}>
          <img
            src={book.cover || (book.images && book.images[0]?.url)}
            alt={book.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            onError={e => { e.target.src = `https://picsum.photos/seed/${book.id}x/300/450`; }}
          />
          {discount && (
            <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>
              -{discount}%
            </span>
          )}
          {book.is_sold && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#4B5563', border: '1px solid #9CA3AF', fontWeight: 700, fontSize: '0.9rem', background: '#FFFFFF', padding: '0.35rem 0.75rem', borderRadius: '0.25rem' }}>Sold Out</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className={`badge badge-genre`}>{book.genre}</span>
            <span className={`badge ${conditionClass[book.condition] || 'badge-condition-baik'}`}>{book.condition}</span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', margin: 0, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {book.title}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{book.author}</p>

          <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #E5E7EB' }}>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
              {formatPrice(book.price)}
            </div>
            {discount && (
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                {formatPrice(book.originalPrice)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
