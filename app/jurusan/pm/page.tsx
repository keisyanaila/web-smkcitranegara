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
const HERO_IMG = '/images/logopm.png';

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
        alt="pemasaran"
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

export default function PemasaranPage() {
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
              {t("BISNIS DIGITAL DAN RETAIL", "DIGITAL BUSINESS & RETAIL")}
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
              {t("Mengembangkan keterampilan dalam bidang pemasaran dan penjualan, mulai dari riset pasar, strategi pemasaran, hingga teknik penjualan dan pelayanan pelanggan.", "Building skills in marketing and sales, from market research and marketing strategy to sales techniques and customer service.")}
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
            {/* Apa itu Pemasaran */}
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 16,
              }}
            >
              {t("Apa itu BDR", "What is BDR?")}
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              {t("Bidang studi bisnis digital dan retail adalah program pendidikan yang fokus pada pengembangan keterampilan dalam bidang pemasaran dan penjualan. Program ini mencakup berbagai aspek pemasaran, mulai dari riset pasar, strategi pemasaran, hingga teknik penjualan dan pelayanan pelanggan, dengan tujuan menghasilkan lulusan yang siap bekerja di berbagai sektor industri.", "Digital Business and Retail (BDR) is a study program focused on developing skills in marketing and sales. It covers many aspects of marketing, from market research and marketing strategy to sales techniques and customer service, with the goal of producing graduates ready to work across many industries.")}
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
                  label: 'Dasar-dasar Pemasaran',
                  labelEn: 'Marketing Fundamentals',
                  desc: 'Prinsip-prinsip dasar pemasaran dan konsep-konsep utama seperti kebutuhan, keinginan, dan permintaan, serta elemen-elemen pemasaran (4P: Produk, Harga, Tempat, Promosi).',
                  descEn: 'Basic marketing principles and key concepts such as needs, wants, and demand, plus the marketing mix (4P: Product, Price, Place, Promotion).',
                },
                {
                  label: 'Riset Pasar',
                  labelEn: 'Market Research',
                  desc: 'Metode riset pasar untuk mengumpulkan dan menganalisis data, serta teknik survei, wawancara, dan observasi untuk memahami perilaku konsumen.',
                  descEn: 'Market research methods for collecting and analyzing data, and survey, interview, and observation techniques to understand consumer behavior.',
                },
                {
                  label: 'Strategi Pemasaran',
                  labelEn: 'Marketing Strategy',
                  desc: 'Pengembangan strategi pemasaran yang efektif, analisis SWOT (Strengths, Weaknesses, Opportunities, Threats), dan segmentasi pasar.',
                  descEn: 'Developing effective marketing strategies, SWOT analysis (Strengths, Weaknesses, Opportunities, Threats), and market segmentation.',
                },
                {
                  label: 'Promosi dan Periklanan',
                  labelEn: 'Promotion & Advertising',
                  desc: 'Teknik promosi dan pembuatan kampanye periklanan, serta penggunaan media cetak, media digital, dan media sosial untuk promosi.',
                  descEn: 'Promotion techniques and creating advertising campaigns, using print, digital, and social media for promotion.',
                },
                {
                  label: 'Penjualan dan Negosiasi',
                  labelEn: 'Sales & Negotiation',
                  desc: 'Teknik penjualan dan strategi untuk meningkatkan penjualan, serta keterampilan negosiasi dan penanganan keberatan pelanggan.',
                  descEn: 'Sales techniques and strategies to grow sales, plus negotiation skills and handling customer objections.',
                },
                {
                  label: 'Pelayanan Pelanggan',
                  labelEn: 'Customer Service',
                  desc: 'Prinsip-prinsip pelayanan pelanggan yang baik, serta teknik menangani keluhan dan meningkatkan kepuasan pelanggan.',
                  descEn: 'Principles of good customer service, handling complaints, and improving customer satisfaction.',
                },
                {
                  label: 'E-commerce dan Pemasaran Digital',
                  labelEn: 'E-commerce & Digital Marketing',
                  desc: 'Dasar-dasar e-commerce dan pemasaran digital, serta penggunaan platform online untuk menjual produk dan layanan.',
                  descEn: 'E-commerce and digital marketing basics, and using online platforms to sell products and services.',
                },
                {
                  label: 'Komunikasi Bisnis',
                  labelEn: 'Business Communication',
                  desc: 'Teknik komunikasi yang efektif dalam lingkungan bisnis, serta penulisan laporan bisnis, email, dan korespondensi profesional.',
                  descEn: 'Effective communication in a business environment, plus writing business reports, emails, and professional correspondence.',
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
              {t("Prospek Karir lulusan BDR", "Career prospects for BDR graduates")}
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
                'Staf Pemasaran',
                'Sales Representative',
                'Customer Service Representative',
                'Market Research Analyst',
                'Digital Marketing Specialist',
                'Event Coordinator',
              ], [
                'Marketing Staff',
                'Sales Representative',
                'Customer Service Representative',
                'Market Research Analyst',
                'Digital Marketing Specialist',
                'Event Coordinator',
              ]).map((p) => (
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
                {t("Tertarik bergabung dengan jurusan Pemasaran?", "Interested in joining Digital Business & Retail?")}
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