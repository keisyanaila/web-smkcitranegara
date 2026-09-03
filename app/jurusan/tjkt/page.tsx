'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { CheckCircle2, ArrowLeft, Briefcase } from 'lucide-react';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';
const HERO_IMG = '/images/logotJKT.png';

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
        alt="tkj"
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

export default function TkjPage() {
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
              Teknik Jaringan Komputer dan Telekomunikasi
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
              Membekali siswa dengan pengetahuan dan keterampilan praktis di bidang jaringan komputer dan telekomunikasi agar siap kerja di industri TIK.
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
            {/* Apa itu TKJ */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 16,
              }}
            >
              Apa itu TJKT
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Bidang studi Teknik Jaringan Komputer dan Telekomunikasi adalah program pendidikan yang dirancang untuk mempersiapkan siswa dengan pengetahuan dan keterampilan praktis dalam bidang jaringan komputer dan telekomunikasi. Program ini bertujuan untuk menghasilkan lulusan yang siap kerja di industri teknologi informasi dan komunikasi.
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
                  label: 'Dasar-dasar Teknologi Informasi dan Komunikasi',
                  desc: 'Pengenalan perangkat keras dan perangkat lunak komputer, serta prinsip dasar jaringan komputer termasuk jenis-jenis jaringan dan topologi jaringan.',
                },
                {
                  label: 'Jaringan Lokal (LAN)',
                  desc: 'Desain, instalasi, dan konfigurasi jaringan lokal, serta penggunaan perangkat jaringan seperti hub, switch, dan router.',
                },
                {
                  label: 'Jaringan Area Luas (WAN)',
                  desc: 'Konsep dan teknologi jaringan area luas, serta pengenalan dan penggunaan protokol jaringan seperti TCP/IP.',
                },
                {
                  label: 'Keamanan Jaringan',
                  desc: 'Teknik dasar untuk melindungi jaringan dari ancaman keamanan, serta penggunaan firewall dan perangkat keamanan lainnya.',
                },
                {
                  label: 'Teknologi Nirkabel',
                  desc: 'Dasar-dasar komunikasi nirkabel dan konfigurasi jaringan Wi-Fi, serta pengenalan teknologi mobile dan jaringan seluler.',
                },
                {
                  label: 'Pemrograman Dasar',
                  desc: 'Pengenalan bahasa pemrograman yang relevan untuk jaringan seperti Python atau JavaScript, serta penggunaan skrip untuk otomasi tugas jaringan.',
                },
                {
                  label: 'Manajemen Jaringan',
                  desc: 'Pemeliharaan dan troubleshooting jaringan, serta penggunaan alat monitoring jaringan.',
                },
                {
                  label: 'Sistem Telekomunikasi',
                  desc: 'Pengenalan teknologi komunikasi analog dan digital, serta dasar-dasar sistem telepon dan VoIP.',
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
              Kenapa harus memilih TJKT?
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
                  label: 'Kebutuhan industri tinggi',
                  desc: 'Hampir semua instansi dan perusahaan membutuhkan tenaga jaringan dan IT untuk mendukung operasional mereka.',
                },
                {
                  label: 'Keahlian nyata',
                  desc: 'Siswa langsung praktik instalasi, konfigurasi, dan troubleshooting jaringan komputer serta sistem telekomunikasi.',
                },
                {
                  label: 'Fleksibilitas kerja',
                  desc: 'Bisa bekerja sebagai teknisi lapangan, administrator jaringan di kantor, maupun membuka jasa instalasi jaringan sendiri.',
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
              Profesi yang cocok untuk lulusan TJKT
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
                'Teknisi Jaringan',
                'Administrator Jaringan',
                'Teknisi Telekomunikasi',
                'Spesialis Keamanan Jaringan',
                'Teknisi IT',
              ].map((p) => (
                <div
                  key={p}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#3a96d0',
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
                Tertarik bergabung dengan jurusan TJKT?
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