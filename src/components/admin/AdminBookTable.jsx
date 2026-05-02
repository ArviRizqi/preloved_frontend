const formatPrice = (p) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

const getConditionClass = (cond) => {
  if (cond === 'Baru') return 'badge badge-condition-baru';
  if (cond === 'Sangat Baik') return 'badge badge-condition-sangat-baik';
  if (cond === 'Baik') return 'badge badge-condition-baik';
  return 'badge badge-condition-cukup';
};

export default function AdminBookTable({ books, onEdit, onDelete }) {
  if (!books.length) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'hue-rotate(180deg)' }}>📭</div>
      <p>Belum ada buku. Tambahkan buku pertama kamu!</p>
    </div>
  );

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '760px' }}>
        <thead>
          <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
            {['Cover', 'Judul & Penulis', 'Genre', 'Kondisi', 'Harga', 'Stok', 'Aksi'].map(h => (
              <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: 600, color: '#6B7280', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.05em', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={book.id} style={{ borderBottom: '1px solid #E5E7EB', background: '#FFFFFF', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
            >
              <td style={{ padding: '0.75rem 1rem' }}>
                <img src={book.cover || (book.images && book.images[0]?.url)} alt={book.title} style={{ width: '2.5rem', height: '3.5rem', objectFit: 'cover', borderRadius: '0.25rem', background: '#F3F4F6', border: '1px solid #E5E7EB' }}
                  onError={e => { e.target.src = `https://picsum.photos/seed/${book.id}z/40/56`; }} />
              </td>
              <td style={{ padding: '0.75rem 1rem', maxWidth: '220px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                <div style={{ color: '#6B7280', fontSize: '0.8rem' }}>{book.author}</div>
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span className="badge badge-genre">{book.genre}</span>
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span className={getConditionClass(book.condition)}>{book.condition}</span>
              </td>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>{formatPrice(book.price)}</td>
              <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                <span style={{ fontWeight: 600, color: !book.is_sold ? '#047857' : '#DC2626' }}>{!book.is_sold ? '1' : '0'}</span>
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => onEdit(book)} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: 500 }}>✏️ Edit</button>
                  <button onClick={() => onDelete(book)} className="btn-danger" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: 500 }}>🗑️ Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
