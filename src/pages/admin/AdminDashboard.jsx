import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import AdminBookTable from '../../components/admin/AdminBookTable';
import BookFormModal from '../../components/admin/BookFormModal';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, book: null });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchBooks = () => {
    setLoading(true);
    api.get('/listings').then(r => setBooks(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleSave = async (form) => {
    if (modal.book) {
      await api.patch(`/listings/${modal.book.id}`, form);
      showToast('✅ Buku berhasil diperbarui!');
    } else {
      await api.post('/listings', form);
      showToast('✅ Buku berhasil ditambahkan!');
    }
    fetchBooks();
  };

  const handleDelete = async (book) => {
    await api.delete(`/listings/${book.id}`);
    setDeleteConfirm(null);
    fetchBooks();
    showToast('🗑️ Buku berhasil dihapus.');
  };

  const stats = [
    { icon: '📚', label: 'Total Buku', value: books.length },
    { icon: '✅', label: 'Tersedia', value: books.filter(b => !b.is_sold).length },
    { icon: '📭', label: 'Habis', value: books.filter(b => b.is_sold).length },
    { icon: '🌟', label: 'Unggulan', value: books.slice(0, 4).length },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Admin header */}
      <div style={{ background: '#FFFFFF', padding: '1rem 0', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="page-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', margin: 0, fontSize: '1.5rem', color: 'var(--color-text-main)' }}>Admin Dashboard</h1>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#6B7280' }}>Welcome back, <span style={{color: 'var(--color-primary)', fontWeight: 600}}>{user?.name}</span>.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => navigate('/')} className="btn-ghost" style={{ fontSize: '0.85rem' }}>Home</button>
            <button onClick={() => { logout(); navigate('/'); }} className="btn-ghost" style={{ fontSize: '0.85rem' }}>Logout</button>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-primary)', lineHeight: 1, fontFamily: 'var(--font-sans)' }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '0.5rem', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table header */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', margin: 0, fontSize: '1.5rem', color: 'var(--color-text-main)' }}>Daftar Buku</h2>
            <button onClick={() => setModal({ open: true, book: null })} className="btn-primary">
              Add New Book
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', fontSize: '2rem' }}>📚</div>
          ) : (
            <AdminBookTable books={books} onEdit={(b) => setModal({ open: true, book: b })} onDelete={(b) => setDeleteConfirm(b)} />
          )}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <BookFormModal book={modal.book} onSave={handleSave} onClose={() => setModal({ open: false, book: null })} />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Hapus Buku?</h3>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', marginBottom: '2rem' }}>
              <strong style={{ color: 'var(--color-text-main)' }}>"{deleteConfirm.title}"</strong> akan dihapus permanen. Aksi ini tidak bisa dibatalkan.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} className="btn-ghost">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-danger">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'var(--color-text-main)', color: '#FFFFFF', padding: '1rem 1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '0.95rem', fontWeight: 500, zIndex: 2000 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
