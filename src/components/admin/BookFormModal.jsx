import { useState, useEffect } from 'react';

const GENRES = ['Fiksi', 'Sastra', 'Self-Help', 'Bisnis', 'Sejarah', 'Sains', 'Filsafat', 'Romance', 'Humor', 'Lainnya'];
const CONDITIONS = ['Baru', 'Sangat Baik', 'Baik', 'Cukup'];

const emptyForm = { title: '', author: '', genre: 'Fiksi', condition: 'Baik', price: '', originalPrice: '', description: '', cover: '', year: '', publisher: '', pages: '', language: 'Indonesia', stock: '1' };

export default function BookFormModal({ book, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) setForm({ ...emptyForm, ...book, price: String(book.price), originalPrice: String(book.originalPrice || ''), pages: String(book.pages || ''), year: String(book.year || ''), stock: String(book.stock || '1') });
    else setForm(emptyForm);
  }, [book]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.author || !form.price) { setError('Judul, penulis, dan harga wajib diisi.'); return; }
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan buku.');
    } finally {
      setSaving(false);
    }
  };

  const labelStyle = { fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(1,11,19,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: 'var(--color-bg-main)', border: '1px solid var(--color-border)', borderRadius: '1rem', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 20px rgba(111,209,215,0.1)' }}>
        {/* Header */}
        <div style={{ padding: '1.5rem 1.75rem 1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--color-bg-main)', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', margin: 0, fontSize: '1.375rem', color: 'var(--color-text-main)' }}>
            {book ? '✏️ Edit Buku' : '➕ Tambah Buku Baru'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-text-muted)', lineHeight: 1 }}>×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem' }}>
          {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Judul Buku *</label>
              <input className="input-field" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Judul buku" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Penulis *</label>
              <input className="input-field" value={form.author} onChange={e => set('author', e.target.value)} placeholder="Nama penulis" />
            </div>
            <div>
              <label style={labelStyle}>Genre</label>
              <select className="input-field" value={form.genre} onChange={e => set('genre', e.target.value)}>
                {GENRES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Kondisi</label>
              <select className="input-field" value={form.condition} onChange={e => set('condition', e.target.value)}>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Harga Jual *</label>
              <input className="input-field" type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="cth. 45000" />
            </div>
            <div>
              <label style={labelStyle}>Harga Asli</label>
              <input className="input-field" type="number" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="cth. 100000" />
            </div>
            <div>
              <label style={labelStyle}>Tahun Terbit</label>
              <input className="input-field" type="number" value={form.year} onChange={e => set('year', e.target.value)} placeholder="cth. 2020" />
            </div>
            <div>
              <label style={labelStyle}>Stok</label>
              <input className="input-field" type="number" value={form.stock} onChange={e => set('stock', e.target.value)} min="0" />
            </div>
            <div>
              <label style={labelStyle}>Penerbit</label>
              <input className="input-field" value={form.publisher} onChange={e => set('publisher', e.target.value)} placeholder="Nama penerbit" />
            </div>
            <div>
              <label style={labelStyle}>Jumlah Halaman</label>
              <input className="input-field" type="number" value={form.pages} onChange={e => set('pages', e.target.value)} placeholder="cth. 320" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>URL Cover Buku</label>
              <input className="input-field" value={form.cover} onChange={e => set('cover', e.target.value)} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Deskripsi</label>
              <textarea className="input-field" style={{ minHeight: '90px', resize: 'vertical' }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Deskripsi singkat buku..." />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <button type="button" onClick={onClose} className="btn-ghost">Batal</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Menyimpan...' : book ? 'Simpan Perubahan' : 'Tambah Buku'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
