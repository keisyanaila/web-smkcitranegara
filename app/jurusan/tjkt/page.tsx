'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { CheckCircle2, ArrowLeft, Briefcase } from 'lucide-react';
import { useLang } from '@/lib/i18n';

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

const PROFESI_EN: Record<string, string> = {
  'Teknisi Jaringan': 'Network Technician',
  'Administrator Jaringan': 'Network Administrator',
  'Teknisi Telekomunikasi': 'Telecommunications Technician',
  'Spesialis Keamanan Jaringan': 'Network Security Specialist',
  'Teknisi IT': 'IT Technician',
};

export default function TkjPage() {
  const { t } = useLang();
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
              <ArrowLeft size={16} /> {t('Kembali', 'Back')}
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
              {t("Teknik Jaringan Komputer dan Telekomunikasi", "Computer Networking & Telecommunications")}
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
              {t("Membekali siswa dengan pengetahuan dan keterampilan praktis di bidang jaringan komputer dan telekomunikasi agar siap kerja di industri TIK.", "Equipping students with practical knowledge and skills in computer networking and telecommunications so they are ready to work in the ICT industry.")}
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
              {t("Apa itu TJKT", "What is TJKT?")}
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              {t("Bidang studi Teknik Jaringan Komputer dan Telekomunikasi adalah program pendidikan yang dirancang untuk mempersiapkan siswa dengan pengetahuan dan keterampilan praktis dalam bidang jaringan komputer dan telekomunikasi. Program ini bertujuan untuk menghasilkan lulusan yang siap kerja di industri teknologi informasi dan komunikasi.", "Computer Networking and Telecommunications (TJKT) is a study program designed to equip students with practical knowledge and skills in computer networks and telecommunications. It aims to produce graduates who are ready to work in the information and communication technology industry.")}
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
              {t("Apa yang akan kamu pelajari?", "What will you learn?")}
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
                  labelEn: 'ICT Fundamentals',
                  descEn: 'Introduction to computer hardware and software, and basic networking principles including network types and topologies.',
                  desc: 'Pengenalan perangkat keras dan perangkat lunak komputer, serta prinsip dasar jaringan komputer termasuk jenis-jenis jaringan dan topologi jaringan.',
                },
                {
                  label: 'Jaringan Lokal (LAN)',
                  labelEn: 'Local Area Networks (LAN)',
                  descEn: 'Designing, installing, and configuring local networks, and using network devices such as hubs, switches, and routers.',
                  desc: 'Desain, instalasi, dan konfigurasi jaringan lokal, serta penggunaan perangkat jaringan seperti hub, switch, dan router.',
                },
                {
                  label: 'Jaringan Area Luas (WAN)',
                  labelEn: 'Wide Area Networks (WAN)',
                  descEn: 'WAN concepts and technologies, and an introduction to network protocols such as TCP/IP.',
                  desc: 'Konsep dan teknologi jaringan area luas, serta pengenalan dan penggunaan protokol jaringan seperti TCP/IP.',
                },
                {
                  label: 'Keamanan Jaringan',
                  labelEn: 'Network Security',
                  descEn: 'Basic techniques to protect networks from security threats, and using firewalls and other security devices.',
                  desc: 'Teknik dasar untuk melindungi jaringan dari ancaman keamanan, serta penggunaan firewall dan perangkat keamanan lainnya.',
                },
                {
                  label: 'Teknologi Nirkabel',
                  labelEn: 'Wireless Technology',
                  descEn: 'Wireless communication basics and Wi-Fi configuration, plus an introduction to mobile and cellular networks.',
                  desc: 'Dasar-dasar komunikasi nirkabel dan konfigurasi jaringan Wi-Fi, serta pengenalan teknologi mobile dan jaringan seluler.',
                },
                {
                  label: 'Pemrograman Dasar',
                  labelEn: 'Basic Programming',
                  descEn: 'Programming languages relevant to networking such as Python or JavaScript, and scripting to automate network tasks.',
                  desc: 'Pengenalan bahasa pemrograman yang relevan untuk jaringan seperti Python atau JavaScript, serta penggunaan skrip untuk otomasi tugas jaringan.',
                },
                {
                  label: 'Manajemen Jaringan',
                  labelEn: 'Network Management',
                  descEn: 'Network maintenance and troubleshooting, and using network monitoring tools.',
                  desc: 'Pemeliharaan dan troubleshooting jaringan, serta penggunaan alat monitoring jaringan.',
                },
                {
                  label: 'Sistem Telekomunikasi',
                  labelEn: 'Telecommunication Systems',
                  descEn: 'Introduction to analog and digital communication technology, and the basics of telephone systems and VoIP.',
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
                      {t(m.label, m.labelEn)}:
                    </span>{' '}
                    {t(m.desc, m.descEn)}
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
              {t("Kenapa harus memilih TJKT?", "Why choose TJKT?")}
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
                  labelEn: 'High Industry Demand',
                  descEn: 'Almost every organization and company needs networking and IT staff to support their operations.',
                  desc: 'Hampir semua instansi dan perusahaan membutuhkan tenaga jaringan dan IT untuk mendukung operasional mereka.',
                },
                {
                  label: 'Keahlian nyata',
                  labelEn: 'Real, Hands-on Skills',
                  descEn: 'Students practice installing, configuring, and troubleshooting computer networks and telecommunication systems.',
                  desc: 'Siswa langsung praktik instalasi, konfigurasi, dan troubleshooting jaringan komputer serta sistem telekomunikasi.',
                },
                {
                  label: 'Fleksibilitas kerja',
                  labelEn: 'Flexible Work',
                  descEn: 'Work as a field technician, an office network administrator, or run your own network installation business.',
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
                      {t(a.label, a.labelEn)}:
                    </span>{' '}
                    {t(a.desc, a.descEn)}
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
              {t("Profesi yang cocok untuk lulusan TJKT", "Careers for TJKT graduates")}
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
                    {t(p, PROFESI_EN[p] ?? p)}
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
                {t("Tertarik bergabung dengan jurusan TJKT?", "Interested in joining TJKT?")}
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
                {t("Daftar Sekarang", "Apply Now")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}