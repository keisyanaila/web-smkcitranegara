'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { Award } from 'lucide-react';
import { KATEGORI_PRESTASI_COLOR as KATEGORI_COLOR, type Prestasi } from '@/lib/prestasi';

export default function PrestasiPage() {
  const [aktif, setAktif] = useState('Semua');
  const [PRESTASI, setPrestasi] = useState<Prestasi[]>([]);

  useEffect(() => {
    fetch('/api/prestasi', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setPrestasi(d); })
      .catch(() => {});
  }, []);

  const ALL_KATEGORI = useMemo(
    () => ['Semua', ...Array.from(new Set(PRESTASI.map((p) => p.kategori)))],
    [PRESTASI],
  );

  const filtered = aktif === 'Semua' ? PRESTASI : PRESTASI.filter(p => p.kategori === aktif);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="gold-line" style={{ margin: '0 auto 20px' }} />
            <h1 className="font-display" style={{ fontSize: 48, color: 'white', marginBottom: 16 }}>
              Prestasi & Penghargaan
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              Deretan pencapaian membanggakan siswa-siswi SMK Citra Negara di berbagai bidang kompetisi.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: '#023d17', padding: '22px 24px', borderBottom: '2px solid #C8973A' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Total Prestasi', val: `${PRESTASI.length}+` },
              { label: 'Tingkat Nasional', val: '3' },
              { label: 'Tingkat Jabodetabek', val: '3' },
              { label: 'Bidang', val: '4' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#E8B84B', fontWeight: 800, fontSize: 22 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter tabs */}
        <section style={{ background: '#FAF7F0', padding: '32px 24px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ALL_KATEGORI.map(k => (
              <button
                key={k}
                onClick={() => setAktif(k)}
                style={{
                  padding: '8px 20px', borderRadius: 30,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: aktif === k ? '#C8973A' : '#E2D9C8',
                  background: aktif === k ? '#C8973A' : 'white',
                  color: aktif === k ? '#0A1628' : '#6B7280',
                  transition: 'all 0.18s',
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </section>

        {/* Cards grid */}
        <section style={{ padding: '32px 24px 70px', background: '#FAF7F0' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {filtered.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                style={{
                  background: 'white', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid #F0EBE0',
                  boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
                  transition: 'all 0.25s',
                  display: 'flex', flexDirection: 'column',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '#C8973A';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 28px rgba(200,151,58,0.18)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '#F0EBE0';
                  el.style.transform = 'none';
                  el.style.boxShadow = '0 2px 12px rgba(10,22,40,0.06)';
                }}
              >
                {/* Foto */}
                <div style={{ position: 'relative', width: '100%', height: 210, overflow: 'hidden', background: '#F0EBE0' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.foto}
                    alt={p.nama}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: KATEGORI_COLOR[p.kategori] ?? 'rgba(10,22,40,0.75)',
                    color: 'white', fontSize: 10, fontWeight: 800,
                    padding: '4px 10px', borderRadius: 20, letterSpacing: 0.5,
                  }}>{p.kategori}</div>
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'linear-gradient(135deg,#C8973A,#E8B84B)',
                    color: '#0A1628', fontSize: 11, fontWeight: 800,
                    padding: '4px 10px', borderRadius: 20,
                  }}>{p.tahun}</div>
                </div>

                {/* Konten */}
                <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1 }}>
                  <div style={{
                    width: 38, height: 38, flexShrink: 0,
                    background: 'linear-gradient(135deg,#C8973A,#E8B84B)',
                    borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Award size={18} color="#0A1628" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', lineHeight: 1.5 }}>{p.nama}</div>
                    {p.anggota.length > 0 && (() => {
                      const namaList = p.anggota.map((a) => a.nama).filter(Boolean);
                      const kelasList = Array.from(new Set(p.anggota.map((a) => a.kelas).filter(Boolean)));
                      return (
                        <div style={{ marginTop: 6, fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          {namaList.length > 0 && (
                            <span style={{ fontWeight: 600, color: '#C8973A' }}>
                              {namaList.slice(0, 2).join(', ')}{namaList.length > 2 ? ` +${namaList.length - 2}` : ''}
                            </span>
                          )}
                          {namaList.length > 0 && kelasList.length > 0 && <span style={{ color: '#D1D5DB' }}>·</span>}
                          {kelasList.length > 0 && <span>{kelasList.join(', ')}</span>}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF', fontSize: 15 }}>
              Belum ada prestasi di kategori ini.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}