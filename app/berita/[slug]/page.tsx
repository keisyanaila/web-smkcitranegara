'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import {
  formatTanggal,
  KATEGORI_BERITA_COLOR,
  type Berita,
} from '@/lib/berita';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';

export default function DetailBeritaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [berita, setBerita] = useState<Berita | null | undefined>(undefined);
  const [lainnya, setLainnya] = useState<Berita[]>([]);

  useEffect(() => {
    let alive = true;
    fetch(`/api/berita/${slug}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (alive) setBerita(d && d.slug ? d : null); })
      .catch(() => { if (alive) setBerita(null); });

    fetch('/api/berita', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (alive && Array.isArray(d)) setLainnya(d.filter((b: Berita) => b.slug !== slug).slice(0, 3));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [slug]);

  if (berita === null) notFound();
  if (!berita) {
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
        <article style={{ maxWidth: 860, margin: '0 auto' }}>
          <Link
            href="/berita"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: NAVY, textDecoration: 'none', marginBottom: 28, fontWeight: 600,
            }}
          >
            <ArrowLeft size={18} />
            Kembali ke Berita
          </Link>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
            <span
              style={{
                background: KATEGORI_BERITA_COLOR[berita.kategori] ?? GOLD,
                color: 'white', padding: '5px 14px', borderRadius: 20,
                fontSize: 12, fontWeight: 700, letterSpacing: 0.4,
              }}
            >
              {berita.kategori}
            </span>
            <span style={metaItem}><Calendar size={15} /> {formatTanggal(berita.tanggal)}</span>
            <span style={metaItem}><User size={15} /> {berita.penulis}</span>
          </div>

          <h1 className="font-display" style={{ fontSize: 38, color: NAVY, lineHeight: 1.25, marginBottom: 28 }}>
            {berita.judul}
          </h1>

          <div
            style={{
              width: '100%', height: 440, borderRadius: 18, overflow: 'hidden',
              border: `1px solid ${BORDER}`, marginBottom: 36, background: '#F0EBE0',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={berita.gambar}
              alt={berita.judul}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div
            style={{
              background: 'white', borderRadius: 20, padding: 42,
              border: `1px solid ${BORDER}`, boxShadow: '0 12px 35px rgba(10,22,40,.08)',
            }}
          >
            <p style={{ fontSize: 17, color: NAVY, fontWeight: 600, lineHeight: 1.7, marginBottom: 24 }}>
              {berita.ringkasan}
            </p>
            {berita.konten.map((paragraf, i) => (
              <p key={i} style={{ color: GRAY, lineHeight: 1.9, fontSize: 16, textAlign: 'justify', marginBottom: 18 }}>
                {paragraf}
              </p>
            ))}
          </div>

          {/* Berita lainnya */}
          {lainnya.length > 0 && (
            <div style={{ marginTop: 60 }}>
              <div className="gold-line" style={{ marginBottom: 16 }} />
              <h2 className="font-display" style={{ fontSize: 26, color: NAVY, marginBottom: 24 }}>
                Berita Lainnya
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 20,
                }}
              >
                {lainnya.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/berita/${b.slug}`}
                    style={{
                      background: 'white', borderRadius: 14, overflow: 'hidden',
                      border: `1px solid ${BORDER}`, textDecoration: 'none',
                      display: 'flex', flexDirection: 'column',
                    }}
                  >
                    <div style={{ width: '100%', height: 140, background: '#F0EBE0' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.gambar} alt={b.judul} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ ...metaItem, fontSize: 11, color: '#9CA3AF' }}>
                        <Calendar size={12} /> {formatTanggal(b.tanggal)}
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY, lineHeight: 1.45, margin: '8px 0 10px', flex: 1 }}>
                        {b.judul}
                      </div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: GOLD, fontWeight: 700, fontSize: 12 }}>
                        Baca <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}

const metaItem: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 6,
  color: GRAY, fontSize: 14,
};
