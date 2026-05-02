import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import api from '../utils/api';

const GENRES = ['Semua', 'Fiksi', 'Sastra', 'Self-Help', 'Bisnis', 'Sejarah', 'Sains', 'Filsafat', 'Romance', 'Humor'];
const CONDITIONS = [
  { value: 'sangat_baik', label: 'Sangat Baik' },
  { value: 'baik', label: 'Baik' },
  { value: 'cukup', label: 'Cukup' }
];

const SORTS = [{ value: 'newest', label: 'Terbaru' }, { value: 'price_asc', label: 'Harga Terendah' }, { value: 'price_desc', label: 'Harga Tertinggi' }];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const activeGenre = searchParams.get('genre') || 'Semua';
  const activeCondition = searchParams.get('condition') || 'Semua';

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'Semua') next.delete(key); else next.set(key, value);
    setSearchParams(next);
  };

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeGenre !== 'Semua') params.genre = activeGenre;
    if (activeCondition !== 'Semua') params.condition = activeCondition;
    if (search) params.search = search;
    params.sort = sort;
    api.get('/listings', { params })
      .then(r => setBooks(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeGenre, activeCondition, sort, search]);

  return (
    <div className="page-container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="section-title">Catalog</h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          {loading ? '...' : `${books.length} buku tersedia`}
        </p>
      </div>

      {/* Filters */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '1.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* Search + Sort */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input className="input-field" style={{ flex: 1, minWidth: '200px' }} placeholder="Search by title, author..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input-field" style={{ minWidth: '160px', width: 'auto' }} value={sort} onChange={e => setSort(e.target.value)}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Genre chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6B7280', marginRight: '0.5rem' }}>Genre:</span>
          {GENRES.map(g => (
            <button key={g} onClick={() => setFilter('genre', g)} style={{ padding: '0.4rem 1rem', borderRadius: '9999px', border: '1px solid', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', background: activeGenre === g ? 'var(--color-primary)' : '#FFFFFF', color: activeGenre === g ? '#FFFFFF' : 'var(--color-text-main)', borderColor: activeGenre === g ? 'var(--color-primary)' : '#E5E7EB' }}>
              {g}
            </button>
          ))}
        </div>

        {/* Condition chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6B7280', marginRight: '0.5rem' }}>Condition:</span>
          {CONDITIONS.map(c => (
            <button key={c.value} onClick={() => setFilter('condition', c.value)} style={{ padding: '0.4rem 1rem', borderRadius: '9999px', border: '1px solid', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', background: activeCondition === c.value ? 'var(--color-accent)' : '#FFFFFF', color: activeCondition === c.value ? 'var(--color-primary)' : 'var(--color-text-main)', borderColor: activeCondition === c.value ? 'var(--color-accent)' : '#E5E7EB' }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
          {[...Array(12)].map((_, i) => <div key={i} style={{ background: '#F3F4F6', borderRadius: '1rem', aspectRatio: '2/3', animation: 'pulse 1.5s infinite', border: '1px solid #E5E7EB' }} />)}
        </div>
      ) : books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#9CA3AF' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-main)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No books found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
          {books.map(b => <BookCard key={b.id} book={b} />)}
        </div>
      )}
    </div>
  );
}
