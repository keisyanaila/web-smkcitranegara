'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { CheckCircle2, ArrowLeft, Briefcase } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { SPMB_URL } from '@/lib/spmb';

const NAVY = '#0A1628';
const GOLD = '#C8973A';
const GRAY = '#6B7280';
const BORDER = '#F0EBE0';
const HERO_IMG = '/images/logoph.png';

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
        alt="perhotelan"
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

export default function PerhotelanPage() {
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
              {t("Perhotelan", "Hospitality")}
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
              {t("Mencetak profesional muda yang kompeten dan siap terjun ke industri pariwisata dan perhotelan yang dinamis, mulai dari hotel bintang lima, restoran, hingga kapal pesiar.", "Shaping competent young professionals ready to enter the dynamic tourism and hospitality industry, from five-star hotels and restaurants to cruise ships.")}
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
            {/* Apa itu Perhotelan */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 16,
              }}
            >
              {t("Apa itu Perhotelan", "What is Hospitality?")}
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              {t("Program Keahlian Perhotelan adalah program pendidikan yang dirancang untuk mencetak para profesional muda yang kompeten dan siap terjun ke dalam industri pariwisata dan perhotelan yang dinamis. Program ini membekali siswa dengan pengetahuan, keterampilan, dan sikap (attitude) yang dibutuhkan untuk memberikan pelayanan prima (excellent service) di berbagai sektor, mulai dari hotel bintang lima, restoran, hingga kapal pesiar. Fokusnya adalah menghasilkan lulusan yang andal dalam praktik, memiliki etika profesi yang kuat, serta mampu beradaptasi dengan tren industri global.", "The Hospitality program is designed to shape competent young professionals ready to enter the dynamic tourism and hospitality industry. It equips students with the knowledge, skills, and attitude needed to deliver excellent service across many sectors, from five-star hotels and restaurants to cruise ships. The focus is on producing graduates who are skilled in practice, hold strong professional ethics, and can adapt to global industry trends.")}
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
                  label: 'Front Office (Kantor Depan)',
                  labelEn: 'Front Office',
                  desc: 'Alur kerja di garda terdepan hotel, termasuk proses reservasi, prosedur check-in dan check-out, penanganan telepon, serta komunikasi dan melayani keluhan tamu secara profesional.',
                  descEn: 'The workflow at a hotel\'s front line, including reservations, check-in and check-out procedures, handling phone calls, and communicating with and resolving guest complaints professionally.',
                },
                {
                  label: 'Housekeeping (Tata Graha)',
                  labelEn: 'Housekeeping',
                  desc: 'Standar kebersihan dan kerapian area hotel, teknik membersihkan kamar tamu (room attendant), area publik (public area), serta manajemen laundry.',
                  descEn: 'Cleanliness and tidiness standards for hotel areas, techniques for cleaning guest rooms (room attendant) and public areas, and laundry management.',
                },
                {
                  label: 'Food & Beverage Service (Tata Hidang)',
                  labelEn: 'Food & Beverage Service',
                  desc: 'Seni melayani makanan dan minuman, mencakup pengetahuan menu, teknik penyajian, penataan meja (table setting), hingga keterampilan dasar sebagai waiter/waitress, barista, dan bartender.',
                  descEn: 'The art of serving food and drinks, covering menu knowledge, serving techniques, table setting, and the basic skills of a waiter/waitress, barista, and bartender.',
                },
                {
                  label: 'Food & Beverage Production (Produksi Makanan & Minuman)',
                  labelEn: 'Food & Beverage Production',
                  desc: 'Dasar-dasar pengolahan makanan di dapur (kitchen), mulai dari pengenalan bahan, teknik memasak dasar, hingga basic cookery dan patisserie.',
                  descEn: 'Kitchen fundamentals, from getting to know ingredients and basic cooking techniques to basic cookery and patisserie.',
                },
                {
                  label: 'Komunikasi Industri & Bahasa Asing',
                  labelEn: 'Industry Communication & Foreign Languages',
                  desc: 'Kemampuan komunikasi yang efektif, baik dalam Bahasa Indonesia maupun Bahasa Inggris sebagai bahasa internasional utama di industri pariwisata.',
                  descEn: 'Effective communication skills in both Indonesian and English, the main international language of the tourism industry.',
                },
                {
                  label: 'Sanitasi, Higiene, dan Keselamatan Kerja',
                  labelEn: 'Sanitation, Hygiene & Occupational Safety',
                  desc: 'Standar kebersihan dan keselamatan kerja (K3) di lingkungan hotel untuk menjamin kesehatan tamu dan karyawan.',
                  descEn: 'Hygiene and occupational health & safety standards in hotels to protect the health of guests and staff.',
                },
                {
                  label: 'Kewirausahaan',
                  labelEn: 'Entrepreneurship',
                  desc: 'Jiwa wirausaha agar mampu menciptakan peluang bisnis mandiri di bidang perhotelan dan pariwisata, seperti membuka kafe, layanan katering, atau penginapan.',
                  descEn: 'An entrepreneurial mindset to create independent business opportunities in hospitality and tourism, such as opening a café, catering service, or guesthouse.',
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

            {/* Prospek Karir */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 20,
              }}
            >
              {t("Prospek Karir lulusan Perhotelan", "Career prospects for Hospitality graduates")}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
                marginBottom: 40,
              }}
            >
              {t([
                'Resepsionis / Front Desk Agent',
                'Room Attendant / Staf Housekeeping',
                'Waiter / Waitress',
                'Barista / Bartender',
                'Asisten Koki (Commis Chef)',
                'Concierge / Bellboy',
                'Staf Restoran & Katering',
                'Staf Kapal Pesiar (Cruise Ship)',
                'Staf Agen Perjalanan',
                'Pemandu Wisata (Tour Guide)',
                'Event Organizer',
                'Wirausaha Kuliner & Penginapan',
              ], [
                'Receptionist / Front Desk Agent',
                'Room Attendant / Housekeeping Staff',
                'Waiter / Waitress',
                'Barista / Bartender',
                'Commis Chef',
                'Concierge / Bellboy',
                'Restaurant & Catering Staff',
                'Cruise Ship Crew',
                'Travel Agency Staff',
                'Tour Guide',
                'Event Organizer',
                'Culinary & Lodging Entrepreneur',
              ]).map((p) => (
                <div
                  key={p}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#024d20',
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
                {t("Tertarik bergabung dengan jurusan Perhotelan?", "Interested in joining Hospitality?")}
              </p>

              <Link
                href={SPMB_URL}
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