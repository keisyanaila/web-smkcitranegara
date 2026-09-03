'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import {
  formatTanggal,
  KATEGORI_BERITA_COLOR,
  type Berita,
} from '@/lib/berita';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';

export default function BeritaPage() {
  const [semua, setSemua] = useState<Berita[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/berita', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setSemua(d); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const kategoriList = useMemo(
    () => ['Semua', ...Array.from(new Set(semua.map((b) => b.kategori)))],
    [semua],
  );
  const [aktif, setAktif] = useState('Semua');

  const list = aktif === 'Semua' ? semua : semua.filter((b) => b.kategori === aktif);
  const [utama, ...lainnya] = list;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)',
                borderRadius: 20, padding: '6px 16px', color: '#E8B84B',
                fontSize: 12, fontWeight: 600, marginBottom: 20,
              }}
            >
              <Newspaper size={14} /> KABAR SEKOLAH
            </div>
            <h1 className="font-display" style={{ fontSize: 48, color: 'white', marginBottom: 16 }}>
              Berita &amp; Kegiatan
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              Informasi terbaru seputar prestasi, pengumuman, dan kegiatan SMK Citra Negara.
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <section style={{ background: '#FAF7F0', padding: '32px 24px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {kategoriList.map((k) => (
              <button
                key={k}
                onClick={() => setAktif(k)}
                style={{
                  padding: '8px 20px', borderRadius: 30,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: aktif === k ? GOLD : '#E2D9C8',
                  background: aktif === k ? GOLD : 'white',
                  color: aktif === k ? NAVY : GRAY,
                  transition: 'all 0.18s',
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </section>

        {/* Konten */}
        <section style={{ padding: '32px 24px 70px', background: '#FAF7F0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {list.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF', fontSize: 15 }}>
                {loaded ? 'Belum ada berita.' : 'Memuat…'}
              </div>
            )}

            {/* Berita utama (terbaru) */}
            {utama && (
              <Link
                href={`/berita/${utama.slug}`}
                className="berita-hero-card"
                style={{
                  display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0,
                  background: 'white', border: `1px solid ${BORDER}`, borderRadius: 18,
                  overflow: 'hidden', textDecoration: 'none', marginBottom: 36,
                  boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
                }}
              >
                <div style={{ position: 'relative', minHeight: 260, background: '#F0EBE0' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={utama.gambar}
                    alt={utama.judul}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={badge(KATEGORI_BERITA_COLOR[utama.kategori])}>{utama.kategori}</span>
                </div>
                <div style={{ padding: '32px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={metaRow}>
                    <Calendar size={14} /> {formatTanggal(utama.tanggal)}
                  </div>
                  <h2 className="font-display" style={{ fontSize: 26, color: NAVY, lineHeight: 1.3, margin: '10px 0 12px' }}>
                    {utama.judul}
                  </h2>
                  <p style={{ color: GRAY, fontSize: 14.5, lineHeight: 1.7, marginBottom: 18 }}>{utama.ringkasan}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: GOLD, fontWeight: 700, fontSize: 14 }}>
                    Baca selengkapnya <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            )}

            {/* Grid berita lainnya */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              {lainnya.map((b) => (
                <Link
                  key={b.slug}
                  href={`/berita/${b.slug}`}
                  className="berita-card"
                  style={{
                    background: 'white', borderRadius: 16, overflow: 'hidden',
                    border: `1px solid ${BORDER}`, boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
                    display: 'flex', flexDirection: 'column', textDecoration: 'none',
                    transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: 180, background: '#F0EBE0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.gambar}
                      alt={b.judul}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <span style={badge(KATEGORI_BERITA_COLOR[b.kategori])}>{b.kategori}</span>
                  </div>
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={metaRow}>
                      <Calendar size={13} /> {formatTanggal(b.tanggal)}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, lineHeight: 1.45, margin: '8px 0 8px' }}>
                      {b.judul}
                    </h3>
                    <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.6, flex: 1 }}>{b.ringkasan}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: GOLD, fontWeight: 700, fontSize: 13, marginTop: 14 }}>
                      Baca selengkapnya <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx global>{`
        .berita-card:hover {
          transform: translateY(-4px);
          border-color: ${GOLD};
          box-shadow: 0 8px 28px rgba(200, 151, 58, 0.18);
        }
        .berita-hero-card {
          transition: box-shadow 0.25s, border-color 0.25s;
        }
        .berita-hero-card:hover {
          border-color: ${GOLD};
          box-shadow: 0 10px 32px rgba(200, 151, 58, 0.16);
        }
        @media (max-width: 760px) {
          .berita-hero-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

const metaRow: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 6,
  color: '#9CA3AF', fontSize: 12, fontWeight: 600,
};

function badge(color?: string): React.CSSProperties {
  return {
    position: 'absolute', top: 12, left: 12,
    background: color ?? 'rgba(10,22,40,0.75)',
    color: 'white', fontSize: 10, fontWeight: 800,
    padding: '4px 10px', borderRadius: 20, letterSpacing: 0.5,
  };
}
