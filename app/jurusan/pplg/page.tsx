'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { CheckCircle2, ArrowLeft, Briefcase } from 'lucide-react';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';
const HERO_IMG = '/images/logopplg.png';

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
        alt="pplg"
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

export default function IpaPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO — foto diperbesar (tinggi lebih besar + min-height biar konsisten di semua layar) */}
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
              Pengembangan Perangkat Lunak Dan Game 
            </h1>

            {/* Keterangan singkat di bawah judul, di atas foto */}
            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: 14,
                marginTop: 16,
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
           
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
            {/* Apa itu IPA */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 16,
              }}
            >
              Apa itu PPLG
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
             Bidang studi Pengembangan Perangkat Lunak dan Gim adalah program pendidikan yang dirancang untuk mempersiapkan siswa dengan pengetahuan dan keterampilan praktis dalam bidang pengembangan perangkat lunak dan pembuatan gim. Program ini bertujuan untuk menghasilkan lulusan yang siap bekerja di industri teknologi informasi dan hiburan digital, khususnya dalam pengembangan aplikasi perangkat lunak dan gim.
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
                  label: 'Dasar-dasar Pemrograman',
                  desc: 'Pengenalan bahasa pemrograman seperti Python, Java, C++, atau JavaScript, Konsep dasar pemrograman seperti variabel, tipe data, kontrol alur, dan fungsi.',
                },
                {
                  label: 'Pengembangan Perangkat Lunak',
                  desc: 'Prinsip-prinsip desain perangkat lunak, Pengembangan aplikasi berbasis desktop, web, dan mobile,Penggunaan framework dan alat bantu pengembangan perangkat lunak.',
                },
                {
                  label: 'Database dan Sistem Manajemen Basis Data',
                  desc: 'Konsep dasar basis data dan SQL,Perancangan dan implementasi basis data, Integrasi basis data dengan aplikasi perangkat lunak.',
                },
                {
                  label: 'Pemrograman Gim',
                  desc: 'Pengenalan pengembangan gim dan konsep dasar gim,Penggunaan mesin gim seperti Unity atau Unreal Engine, Pembuatan karakter, lingkungan, dan mekanik gim.',
                },
                {
                  label: 'Desain Antarmuka Pengguna (UI) dan Pengalaman Pengguna (UX)',
                  desc: 'Prinsip-prinsip desain antarmuka pengguna,Teknik untuk meningkatkan pengalaman pengguna,Alat bantu desain UI/UX seperti Adobe XD atau Figma.',
                },
                {
                  label: 'Manajemen Proyek Perangkat Lunak',
                  desc: 'Teknik dan metodologi manajemen proyek seperti Agile dan Scrum,Alat bantu manajemen proyek seperti Jira atau Trello,Dokumentasi dan pemeliharaan perangkat lunak.',
                },
                 {
                  label: 'Keamanan Perangkat Lunak',
                  desc: 'Konsep dasar keamanan perangkat lunak,Teknik untuk melindungi aplikasi dari ancaman keamanan,Pengujian keamanan perangkat lunak.',
                },
                  {
                  label: 'Testing dan Debugging',
                  desc: 'Teknik dan alat untuk pengujian perangkat lunak,Metode debugging untuk menemukan dan memperbaiki bug,Pengujian otomatis dengan menggunakan alat bantu seperti Selenium.',
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
              Kenapa harus memilih PPLG?
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
                  label: 'Peluang Kerja luas',
                  desc: ' Hampir semua perusahaan, dari instansi pemerintah hingga startup, butuh tenaga IT.',
                },
                {
                  label: 'Keahlian nyata',
                  desc: 'Siswa langsung belajar membuat aplikasi, web, dan game',
                },
                {
                  label: 'Fleksibilitas kerja',
                  desc: 'Bisa bekerja di kantor, jarak jauh (remote), atau merintis usaha sendiri.',
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
              Profesi yang cocok untuk lulusan IPA
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
                'programer',
                'Game Developer',
                'Game Developer',
                'Mobile App Developer',
                'UI/UX Designer',
                'Quality Assurance (QA) Tester',
                
              ].map((p) => (
                <div
                  key={p}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#1E3A5F',
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
                Tertarik bergabung dengan jurusan IPA?
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