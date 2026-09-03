'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { CheckCircle2, ArrowLeft, Briefcase } from 'lucide-react';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';
const HERO_IMG = '/images/logomplb.png';

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
        alt="mplb"
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

export default function MplbPage() {
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
              Manajemen Perkantoran dan Layanan Bisnis
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
              Membekali siswa dengan pengetahuan dan keterampilan praktis dalam mengelola administrasi perkantoran dan memberikan layanan bisnis yang efektif agar siap kerja di berbagai sektor.
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
            {/* Apa itu MPLB */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 16,
              }}
            >
              Apa itu MPLB
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Bidang studi Manajemen Perkantoran dan Layanan Bisnis adalah program pendidikan yang dirancang untuk mempersiapkan siswa dengan pengetahuan dan keterampilan praktis dalam mengelola administrasi perkantoran dan memberikan layanan bisnis yang efektif. Program ini bertujuan untuk menghasilkan lulusan yang siap kerja di berbagai jenis perusahaan dan organisasi, baik di sektor publik maupun swasta.
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
                  label: 'Dasar-dasar Manajemen Perkantoran',
                  desc: 'Prinsip-prinsip dasar manajemen dan administrasi perkantoran, serta struktur organisasi dan fungsi manajemen.',
                },
                {
                  label: 'Administrasi Perkantoran',
                  desc: 'Teknik dan prosedur administrasi perkantoran, pengelolaan surat-menyurat, pengarsipan, dan dokumentasi.',
                },
                {
                  label: 'Teknologi Perkantoran',
                  desc: 'Penggunaan perangkat lunak perkantoran seperti Microsoft Office (Word, Excel, PowerPoint), pengelolaan basis data dan sistem informasi manajemen.',
                },
                {
                  label: 'Komunikasi Bisnis',
                  desc: 'Teknik komunikasi yang efektif dalam lingkungan bisnis, penulisan laporan bisnis, memo, dan korespondensi profesional.',
                },
                {
                  label: 'Layanan Pelanggan',
                  desc: 'Prinsip-prinsip layanan pelanggan yang baik, serta teknik menangani keluhan dan meningkatkan kepuasan pelanggan.',
                },
                {
                  label: 'Manajemen Waktu dan Produktivitas',
                  desc: 'Teknik manajemen waktu dan pengaturan prioritas kerja, serta penggunaan alat bantu seperti kalender digital dan aplikasi to-do list.',
                },
                {
                  label: 'Keuangan dan Akuntansi Dasar',
                  desc: 'Pengantar dasar akuntansi dan pengelolaan keuangan, pembuatan dan pengelolaan anggaran, serta pelaporan keuangan sederhana.',
                },
                {
                  label: 'Sumber Daya Manusia',
                  desc: 'Pengelolaan sumber daya manusia termasuk rekrutmen, seleksi, dan pengembangan karyawan, serta prinsip-prinsip dasar manajemen SDM.',
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

            {/* Prospek Karir */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 20,
              }}
            >
              Prospek Karir lulusan MPLB
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
                'Staf Administrasi',
                'Sekretaris',
                'Resepsionis',
                'Staf Layanan Pelanggan',
                'Asisten Manajer',
                'Staf Pengarsipan',
              ].map((p) => (
                <div
                  key={p}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#92681A',
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
                Tertarik bergabung dengan jurusan MPLB?
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