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

export default function PplgPage() {
  const { t } = useLang();
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
              {t('Pengembangan Perangkat Lunak Dan Gim', 'Software & Game Development')}
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
              {t('Apa itu PPLG?', 'What is PPLG?')}
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
             {t(
               'Bidang studi Pengembangan Perangkat Lunak dan Gim adalah program pendidikan yang dirancang untuk mempersiapkan siswa dengan pengetahuan dan keterampilan praktis dalam bidang pengembangan perangkat lunak dan pembuatan gim. Program ini bertujuan untuk menghasilkan lulusan yang siap bekerja di industri teknologi informasi dan hiburan digital, khususnya dalam pengembangan aplikasi perangkat lunak dan gim.',
               'Software and Game Development (PPLG) is a study program designed to equip students with practical knowledge and skills in software development and game creation. It aims to produce graduates who are ready to work in the IT and digital entertainment industries, especially in building software applications and games.',
             )}
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
              {t('Apa yang akan kamu pelajari?', 'What will you learn?')}
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
                  labelEn: 'Programming Fundamentals',
                  descEn: 'Introduction to programming languages such as Python, Java, C++, or JavaScript, and core concepts like variables, data types, control flow, and functions.',
                  desc: 'Pengenalan bahasa pemrograman seperti Python, Java, C++, atau JavaScript, Konsep dasar pemrograman seperti variabel, tipe data, kontrol alur, dan fungsi.',
                },
                {
                  label: 'Pengembangan Perangkat Lunak',
                  labelEn: 'Software Development',
                  descEn: 'Software design principles, building desktop, web, and mobile applications, and using frameworks and development tools.',
                  desc: 'Prinsip-prinsip desain perangkat lunak, Pengembangan aplikasi berbasis desktop, web, dan mobile,Penggunaan framework dan alat bantu pengembangan perangkat lunak.',
                },
                {
                  label: 'Database dan Sistem Manajemen Basis Data',
                  labelEn: 'Databases & Database Management Systems',
                  descEn: 'Database fundamentals and SQL, database design and implementation, and integrating databases with applications.',
                  desc: 'Konsep dasar basis data dan SQL,Perancangan dan implementasi basis data, Integrasi basis data dengan aplikasi perangkat lunak.',
                },
                {
                  label: 'Pemrograman Gim',
                  labelEn: 'Game Programming',
                  descEn: 'Introduction to game development and core game concepts, using game engines such as Unity or Unreal Engine, and creating characters, environments, and game mechanics.',
                  desc: 'Pengenalan pengembangan gim dan konsep dasar gim,Penggunaan mesin gim seperti Unity atau Unreal Engine, Pembuatan karakter, lingkungan, dan mekanik gim.',
                },
                {
                  label: 'Desain Antarmuka Pengguna (UI) dan Pengalaman Pengguna (UX)',
                  labelEn: 'User Interface (UI) & User Experience (UX) Design',
                  descEn: 'User interface design principles, techniques to improve user experience, and UI/UX tools such as Adobe XD or Figma.',
                  desc: 'Prinsip-prinsip desain antarmuka pengguna,Teknik untuk meningkatkan pengalaman pengguna,Alat bantu desain UI/UX seperti Adobe XD atau Figma.',
                },
                {
                  label: 'Manajemen Proyek Perangkat Lunak',
                  labelEn: 'Software Project Management',
                  descEn: 'Project management methods such as Agile and Scrum, tools like Jira or Trello, and software documentation and maintenance.',
                  desc: 'Teknik dan metodologi manajemen proyek seperti Agile dan Scrum,Alat bantu manajemen proyek seperti Jira atau Trello,Dokumentasi dan pemeliharaan perangkat lunak.',
                },
                 {
                  label: 'Keamanan Perangkat Lunak',
                  labelEn: 'Software Security',
                  descEn: 'Software security fundamentals, techniques to protect applications from threats, and security testing.',
                  desc: 'Konsep dasar keamanan perangkat lunak,Teknik untuk melindungi aplikasi dari ancaman keamanan,Pengujian keamanan perangkat lunak.',
                },
                  {
                  label: 'Testing dan Debugging',
                  labelEn: 'Testing & Debugging',
                  descEn: 'Software testing techniques and tools, debugging methods to find and fix bugs, and automated testing with tools such as Selenium.',
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
              {t('Kenapa harus memilih PPLG?', 'Why choose PPLG?')}
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
                  labelEn: 'Wide Career Opportunities',
                  descEn: 'Almost every organization, from government agencies to startups, needs IT talent.',
                  desc: ' Hampir semua perusahaan, dari instansi pemerintah hingga startup, butuh tenaga IT.',
                },
                {
                  label: 'Keahlian nyata',
                  labelEn: 'Real, Hands-on Skills',
                  descEn: 'Students learn by directly building apps, websites, and games.',
                  desc: 'Siswa langsung belajar membuat aplikasi, web, dan game',
                },
                {
                  label: 'Fleksibilitas kerja',
                  labelEn: 'Flexible Work',
                  descEn: 'Work in an office, remotely, or start your own business.',
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
              {t('Profesi yang cocok untuk lulusan PPLG', 'Careers for PPLG graduates')}
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
                'Programmer',
                'Web Developer',
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
                {t('Tertarik bergabung dengan jurusan PPLG?', 'Interested in joining PPLG?')}
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
                {t('Daftar Sekarang', 'Apply Now')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}