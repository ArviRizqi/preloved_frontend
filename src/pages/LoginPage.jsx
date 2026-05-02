import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) { navigate('/admin'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#FBF7F0' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📖</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.875rem', color: '#1C0F05', margin: '0 0 0.25rem' }}>Admin Login</h1>
          <p style={{ color: '#9B7B5E', fontSize: '0.9rem', margin: 0 }}>Masuk untuk mengelola katalog buku</p>
        </div>

        {/* Card */}
        <div style={{ background: '#FFFDF7', border: '1px solid #EDE0CC', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 24px rgba(61,26,10,0.08)' }}>
          {error && (
            <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B4423', display: 'block', marginBottom: '0.4rem' }}>Username</label>
              <input className="input-field" type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="admin" autoComplete="username" required />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B4423', display: 'block', marginBottom: '0.4rem' }}>Password</label>
              <input className="input-field" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" autoComplete="current-password" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.875rem' }}>
              {loading ? '⏳ Masuk...' : '🔐 Masuk'}
            </button>
          </form>

          {/* Hint */}
          <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: '#FBF7F0', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#9B7B5E', textAlign: 'center' }}>
            💡 Demo: <strong>admin</strong> / <strong>admin123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
