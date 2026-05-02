import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="page-container" style={{ padding: '4rem 1.5rem', maxWidth: '860px' }}>
      <h1 className="section-title" style={{ marginBottom: '2rem', fontSize: '2.25rem' }}>Tentang Kami</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: '#FFFDF7', border: '1px solid #EDE0CC', borderRadius: '0.75rem', padding: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📖</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.375rem', color: '#1C0F05', marginBottom: '0.75rem' }}>Visi Kami</h2>
          <p style={{ color: '#6B4423', lineHeight: 1.8, fontSize: '0.925rem' }}>
            Membangun ekosistem literasi yang berkelanjutan — di mana setiap buku memiliki kesempatan kedua untuk mengubah kehidupan pembaca berikutnya.
          </p>
        </div>
        <div style={{ background: '#FFFDF7', border: '1px solid #EDE0CC', borderRadius: '0.75rem', padding: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.375rem', color: '#1C0F05', marginBottom: '0.75rem' }}>Misi Kami</h2>
          <p style={{ color: '#6B4423', lineHeight: 1.8, fontSize: '0.925rem' }}>
            Menyediakan buku preloved berkualitas dengan harga terjangkau, mempromosikan budaya membaca, dan mendukung gaya hidup ramah lingkungan.
          </p>
        </div>
      </div>

      <div style={{ background: '#3D1A0A', color: '#EDE0CC', borderRadius: '1rem', padding: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#EDE0CC', marginBottom: '1.5rem' }}>Kenapa Preloved Books?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {[['💰', 'Harga Terjangkau', 'Hemat hingga 70% dari harga asli'], ['✅', 'Terjamin Kualitas', 'Setiap buku dicek kondisinya'], ['🌍', 'Ramah Lingkungan', 'Kurangi limbah kertas bersama']].map(([icon, title, desc]) => (
            <div key={title}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#E8935A', marginBottom: '0.375rem' }}>{title}</div>
              <div style={{ fontSize: '0.8rem', color: '#9B7B5E' }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/catalog" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2.25rem' }}>Jelajahi Katalog →</Link>
      </div>
    </div>
  );
}
