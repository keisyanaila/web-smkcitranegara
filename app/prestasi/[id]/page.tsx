'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { ArrowLeft, Award, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { KATEGORI_PRESTASI_COLOR, type Prestasi } from '@/lib/prestasi';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';

export default function DetailPrestasiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<Prestasi | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    fetch(`/api/prestasi/${id}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (alive && d && d.nama) setData(d); else if (alive) setData((prev) => prev ?? null); })
      .catch(() => { if (alive) setData((prev) => prev ?? null); });
    return () => { alive = false; };
  }, [id]);

  if (data === null) notFound();
  if (!data) {
    return (
      <>
        <Navbar />
        <main style={{ background: '#FAF7F0', padding: '90px 24px', textAlign: 'center', color: GRAY }}>Memuat…</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ background: '#FAF7F0', padding: '70px 24px 90px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link
            href="/prestasi"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: NAVY, textDecoration: 'none', marginBottom: 28, fontWeight: 600 }}
          >
            <ArrowLeft size={18} /> Kembali ke Prestasi
          </Link>

          {data.foto ? (
            <div style={{ width: '100%', height: 420, borderRadius: 18, overflow: 'hidden', border: `1px solid ${BORDER}`, marginBottom: 36, background: '#F0EBE0' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.foto} alt={data.nama} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ) : null}

          <div style={{ background: 'white', borderRadius: 20, padding: 42, border: `1px solid ${BORDER}`, boxShadow: '0 12px 35px rgba(10,22,40,.08)' }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
              <span style={{ background: KATEGORI_PRESTASI_COLOR[data.kategori] ?? GOLD, color: 'white', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                {data.kategori}
              </span>
              {data.tahun ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: GRAY, fontSize: 14 }}>
                  <Calendar size={15} /> Tahun {data.tahun}
                </span>
              ) : null}
              {data.tingkat ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: GRAY, fontSize: 14 }}>
                  <MapPin size={15} /> {data.tingkat}
                </span>
              ) : null}
            </div>

            <h1 className="font-display" style={{ fontSize: 34, color: NAVY, lineHeight: 1.3, marginBottom: data.anggota.length ? 16 : 26 }}>
              {data.nama}
            </h1>

            {data.anggota.length > 0 && (
              <div style={{ marginBottom: 26 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: GOLD, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
                  <GraduationCap size={16} /> Diraih Oleh
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {data.anggota.map((a, i) => (
                    <li key={i} style={{ fontSize: 15, color: NAVY }}>
                      <strong>{a.nama}</strong>
                      {a.kelas && <span style={{ color: GRAY }}> — {a.kelas}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FBF4E4', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px', marginBottom: data.deskripsi ? 32 : 0 }}>
              <Award color={GOLD} size={22} />
              <div style={{ fontWeight: 700, color: NAVY }}>Prestasi Membanggakan</div>
            </div>

            {data.deskripsi ? (
              <p style={{ color: GRAY, lineHeight: 1.9, fontSize: 16, textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
                {data.deskripsi}
              </p>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
