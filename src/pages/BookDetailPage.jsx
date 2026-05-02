import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import BookCard from '../components/BookCard';

const formatPrice = (p) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

const getConditionClass = (cond) => {
  if (cond === 'Baru') return 'badge badge-condition-baru';
  if (cond === 'Sangat Baik') return 'badge badge-condition-sangat-baik';
  if (cond === 'Baik') return 'badge badge-condition-baik';
  return 'badge badge-condition-cukup';
};

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/listings/${id}`)
      .then(r => {
        setBook(r.data.data);
        return api.get('/listings', { params: { genre: r.data.data.genre } });
      })
      .then(r => setRelated((r.data.data || []).filter(b => b.id !== parseInt(id)).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', fontSize: '3rem' }}>📚</div>
  );
  if (!book) return (
    <div style={{ textAlign: 'center', padding: '5rem', color: '#9CA3AF' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-main)' }}>Buku tidak ditemukan</h2>
      <Link to="/catalog" className="btn-primary" style={{ marginTop: '1rem' }}>Kembali ke Katalog</Link>
    </div>
  );

  const discount = book.originalPrice > book.price ? Math.round((1 - book.price / book.originalPrice) * 100) : null;

  return (
    <div className="page-container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
        <Link to="/" style={{ color: 'var(--color-primary)' }}>Beranda</Link>
        <span>›</span>
        <Link to="/catalog" style={{ color: 'var(--color-primary)' }}>Katalog</Link>
        <span>›</span>
        <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>{book.title}</span>
      </div>

      {/* Main detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem', marginBottom: '4rem' }}>
        {/* Cover */}
        <div style={{ position: 'sticky', top: '6.5rem', alignSelf: 'start' }}>
          <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB', aspectRatio: '2/3', background: '#F3F4F6' }}>
            <img src={book.cover || (book.images && book.images[0]?.url)} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.src = `https://picsum.photos/seed/${book.id}w/280/420`; }} />
          </div>
          {discount && (
            <div style={{ textAlign: 'center', marginTop: '1rem', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 700 }}>
              Hemat {discount}% dari harga asli!
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-genre">{book.genre}</span>
            <span className={getConditionClass(book.condition)}>{book.condition}</span>
            {book.is_sold && <span className="badge badge-condition-cukup">Terjual</span>}
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.5rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{book.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>oleh <strong style={{ color: 'var(--color-text-main)' }}>{book.author}</strong></p>
          {book.rating > 0 && <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{'★'.repeat(Math.floor(book.rating))} {book.rating}/5</p>}

          {/* Price */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1, fontFamily: 'var(--font-sans)' }}>{formatPrice(book.price)}</div>
            {discount && <div style={{ fontSize: '0.9rem', color: '#9CA3AF', textDecoration: 'line-through', marginTop: '0.5rem' }}>{formatPrice(book.originalPrice)}</div>}
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>Stok: <strong style={{ color: !book.is_sold ? '#047857' : '#DC2626' }}>{!book.is_sold ? '1 tersisa' : 'Habis'}</strong></div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <a href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan buku "${book.title}" (ID: ${book.id}). Apakah masih tersedia?`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 1.75rem' }}>
              💬 Hubungi Penjual
            </a>
            <Link to="/catalog" className="btn-secondary">← Kembali</Link>
          </div>

          {/* Specs */}
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.25rem', color: 'var(--color-text-main)', fontSize: '1.25rem' }}>Detail Buku</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[['Penerbit', book.publisher], ['Tahun Terbit', book.year], ['Jumlah Halaman', book.pages ? `${book.pages} hal.` : '-'], ['Bahasa', book.language]].map(([k, v]) => v && (
                <div key={k}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', marginTop: '0.25rem', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--color-text-main)', fontSize: '1.25rem' }}>Deskripsi</h3>
              <p style={{ color: '#4B5563', lineHeight: 1.8, fontSize: '1rem' }}>{book.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related books */}
      {related.length > 0 && (
        <section>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Buku Serupa</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1.25rem' }}>
            {related.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}
    </div>
  );
}
