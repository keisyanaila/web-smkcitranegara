'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { CheckCircle2, ArrowLeft, Briefcase } from 'lucide-react';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';
const HERO_IMG = '/images/logodkv.png';

function HeroBanner() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      <img
        src={HERO_IMG}
        alt="dkv"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.85) 100%)',
        }}
      />
    </div>
  );
}

export default function DkvPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section
          style={{
            position: 'relative',
            padding: '64px 24px 160px',
            overflow: 'hidden',
            minHeight: 480,
          }}
        >
          <HeroBanner />
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            <Link
              href="/jurusan"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#D9C79E',
                fontSize: 14,
                textDecoration: 'none',
                marginBottom: 24,
              }}
            >
              <ArrowLeft size={16} /> Kembali
            </Link>

            <h1
              className="font-display"
              style={{
                fontSize: 40,
                color: 'white',
                lineHeight: 1.2,
                maxWidth: 700,
              }}
            >
              Desain Komunikasi Visual
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: 14,
                marginTop: 16,
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
              Menciptakan karya visual yang efektif untuk komunikasi lewat desain grafis, ilustrasi, fotografi, animasi, dan multimedia.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section style={{ padding: '0 24px 80px' }}>
          <div
            style={{
              maxWidth: 900,
              margin: '-64px auto 0',
              background: 'white',
              borderRadius: 20,
              border: `1.5px solid ${BORDER}`,
              boxShadow: '0 20px 50px rgba(10,22,40,0.08)',
              padding: '48px 40px',
              position: 'relative',
            }}
          >
            {/* Apa itu DKV */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 16,
              }}
            >
              Apa itu DKV
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Bidang studi Desain Komunikasi Visual adalah program pendidikan yang fokus pada pengembangan keterampilan dalam menciptakan karya visual yang efektif untuk komunikasi. Program ini mencakup berbagai aspek desain grafis, ilustrasi, fotografi, animasi, dan multimedia untuk mempersiapkan siswa menjadi profesional kreatif yang mampu bekerja di industri kreatif dan media.
            </p>

            {/* Materi */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 20,
              }}
            >
              Apa yang akan kamu pelajari?
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                marginBottom: 40,
              }}
            >
              {[
                {
                  label: 'Dasar-dasar Desain Grafis',
                  desc: 'Prinsip-prinsip dasar desain seperti komposisi, warna, tipografi, dan layout. Penggunaan perangkat lunak desain grafis seperti Adobe Photoshop, Illustrator, dan CorelDRAW.',
                },
                {
                  label: 'Ilustrasi dan Seni Digital',
                  desc: 'Teknik menggambar manual dan digital, serta pembuatan ilustrasi untuk berbagai media seperti buku, majalah, dan poster.',
                },
                {
                  label: 'Fotografi',
                  desc: 'Dasar-dasar fotografi termasuk komposisi, pencahayaan, dan teknik pengambilan gambar, serta penggunaan perangkat lunak pengeditan foto seperti Adobe Lightroom dan Photoshop.',
                },
                {
                  label: 'Animasi dan Multimedia',
                  desc: 'Prinsip dasar animasi 2D dan 3D, serta penggunaan perangkat lunak animasi seperti Adobe Animate dan Blender.',
                },
                {
                  label: 'Desain Web dan Interaktif',
                  desc: 'Dasar-dasar desain web termasuk HTML, CSS, dan prinsip-prinsip UX/UI, serta pembuatan konten interaktif dan animasi untuk web.',
                },
                {
                  label: 'Branding dan Identitas Visual',
                  desc: 'Konsep branding dan pengembangan identitas visual, termasuk desain logo, kemasan, dan materi promosi.',
                },
                {
                  label: 'Produksi Video',
                  desc: 'Dasar-dasar produksi video termasuk pengambilan gambar, penyuntingan, dan efek visual, menggunakan perangkat lunak seperti Adobe Premiere Pro dan After Effects.',
                },
                {
                  label: 'Desain Publikasi',
                  desc: 'Desain layout untuk buku, majalah, brosur, dan materi cetak lainnya, menggunakan perangkat lunak desktop publishing seperti Adobe InDesign.',
                },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      minWidth: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: GOLD,
                      marginTop: 8,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 15,
                      color: GRAY,
                      lineHeight: 1.7,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: NAVY,
                      }}
                    >
                      {m.label}:
                    </span>{' '}
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Alasan */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 20,
              }}
            >
              Kenapa harus memilih DKV?
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                marginBottom: 40,
              }}
            >
              {[
                {
                  label: 'Industri kreatif terus tumbuh',
                  desc: 'Kebutuhan desainer visual meningkat seiring berkembangnya media digital, periklanan, dan konten kreatif.',
                },
                {
                  label: 'Keahlian nyata',
                  desc: 'Siswa langsung praktik membuat desain grafis, ilustrasi, video, dan karya multimedia.',
                },
                {
                  label: 'Fleksibilitas kerja',
                  desc: 'Bisa bekerja di agensi kreatif, in-house perusahaan, freelance, atau merintis usaha sendiri.',
                },
              ].map((a) => (
                <div
                  key={a.label}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                  }}
                >
                  <CheckCircle2
                    size={20}
                    color={GOLD}
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <p
                    style={{
                      fontSize: 15,
                      color: GRAY,
                      lineHeight: 1.7,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: NAVY,
                      }}
                    >
                      {a.label}:
                    </span>{' '}
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Profesi */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 20,
              }}
            >
              Profesi yang cocok untuk lulusan DKV
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
                marginBottom: 40,
              }}
            >
              {[
                'Desainer Grafis',
                'Ilustrator',
                'Fotografer',
                'Animator',
                'Desainer Web',
                'Videografer / Editor Video',
                'Desainer Identitas Visual',
              ].map((p) => (
                <div
                  key={p}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#DC2626',
                    border: `1px solid ${BORDER}`,
                    borderRadius: 10,
                    padding: '12px 16px',
                  }}
                >
                  <Briefcase size={16} color={GOLD} />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'white',
                    }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                textAlign: 'center',
                paddingTop: 24,
                borderTop: `1px solid ${BORDER}`,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  color: GRAY,
                  marginBottom: 20,
                }}
              >
                Tertarik bergabung dengan jurusan DKV?
              </p>

              <Link
                href="/spmb"
                style={{
                  display: 'inline-block',
                  background: GOLD,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 15,
                  padding: '14px 36px',
                  borderRadius: 10,
                  textDecoration: 'none',
                }}
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}