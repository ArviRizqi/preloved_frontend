import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    tag: 'Koleksi Pilihan',
    title: 'Temukan Buku Impianmu',
    subtitle: 'Ratusan buku preloved berkualitas dengan harga ramah di kantong. Dari fiksi, sastra, hingga self-help.',
    cta: 'Jelajahi Katalog',
    link: '/catalog',
    bg: 'radial-gradient(circle at 10% 20%, rgba(9,60,93,0.8) 0%, rgba(1,11,19,1) 90%)',
    accent: '#6FD1D7',
    emoji: '📘',
  },
  {
    id: 2,
    tag: 'Sastra & Fiksi',
    title: 'Kisah yang Mengubah Dunia',
    subtitle: 'Temukan masterpiece sastra Indonesia dan dunia. Laskar Pelangi, Bumi Manusia, dan lebih banyak lagi.',
    cta: 'Lihat Koleksi',
    link: '/catalog?genre=Sastra',
    bg: 'radial-gradient(circle at 90% 80%, rgba(59,117,151,0.6) 0%, rgba(1,11,19,1) 90%)',
    accent: '#5DF8D8',
    emoji: '🌌',
  },
  {
    id: 3,
    tag: 'Self-Help & Bisnis',
    title: 'Investasi Terbaik adalah Ilmu',
    subtitle: 'Atomic Habits, Rich Dad Poor Dad, Sapiens — buku yang mengubah cara pandangmu tentang dunia.',
    cta: 'Mulai Belajar',
    link: '/catalog?genre=Self-Help',
    bg: 'radial-gradient(circle at 50% 10%, rgba(9,60,93,0.9) 0%, rgba(1,11,19,1) 100%)',
    accent: '#6FD1D7',
    emoji: '🚀',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setCurrent(idx); setTransitioning(false); }, 300);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const slide = slides[current];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '0 0 1.5rem 1.5rem' }}>
      <div
        style={{
          background: slide.bg,
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          padding: '4rem 0',
          transition: 'opacity 0.3s ease',
          opacity: transitioning ? 0 : 1,
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '30%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', width: '100%' }}>
          {/* Text */}
          <div style={{ maxWidth: '600px', flex: 1 }}>
            <span style={{ display: 'inline-block', background: slide.accent + '15', color: slide.accent, padding: '0.35rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.25rem', border: `1px solid ${slide.accent}40`, boxShadow: `0 0 10px ${slide.accent}40` }}>
              {slide.tag}
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, color: 'var(--color-text-main)', lineHeight: 1.15, marginBottom: '1.25rem', textShadow: `0 0 20px ${slide.accent}50` }}>
              {slide.title}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px' }}>
              {slide.subtitle}
            </p>
            <Link to={slide.link} className="btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>
              {slide.cta} →
            </Link>
          </div>

          {/* Emoji illustration */}
          <div style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', userSelect: 'none', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span>{slide.emoji}</span>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? '2rem' : '0.5rem', height: '0.5rem', borderRadius: '9999px', background: i === current ? slide.accent : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <button onClick={prev} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFDF7', width: '2.75rem', height: '2.75rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}>‹</button>
        <button onClick={next} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFDF7', width: '2.75rem', height: '2.75rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}>›</button>
      </div>
    </div>
  );
}
