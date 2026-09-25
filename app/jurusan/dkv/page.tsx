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

const PROFESI_EN: Record<string, string> = {
  'Desainer Grafis': 'Graphic Designer',
  'Ilustrator': 'Illustrator',
  'Fotografer': 'Photographer',
  'Animator': 'Animator',
  'Desainer Web': 'Web Designer',
  'Videografer / Editor Video': 'Videographer / Video Editor',
  'Desainer Identitas Visual': 'Brand Identity Designer',
};

export default function DkvPage() {
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
              {t("Desain Komunikasi Visual", "Visual Communication Design")}
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
              {t("Menciptakan karya visual yang efektif untuk komunikasi lewat desain grafis, ilustrasi, fotografi, animasi, dan multimedia.", "Creating effective visual work for communication through graphic design, illustration, photography, animation, and multimedia.")}
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
              {t("Apa itu DKV", "What is DKV?")}
            </h2>

            <p
              style={{
                fontSize: 15,
                color: GRAY,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              {t("Bidang studi Desain Komunikasi Visual adalah program pendidikan yang fokus pada pengembangan keterampilan dalam menciptakan karya visual yang efektif untuk komunikasi. Program ini mencakup berbagai aspek desain grafis, ilustrasi, fotografi, animasi, dan multimedia untuk mempersiapkan siswa menjadi profesional kreatif yang mampu bekerja di industri kreatif dan media.", "Visual Communication Design (DKV) is a study program focused on building the skills to create effective visual work for communication. It covers graphic design, illustration, photography, animation, and multimedia to prepare students to become creative professionals in the creative and media industries.")}
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
                  label: 'Dasar-dasar Desain Grafis',
                  labelEn: 'Graphic Design Fundamentals',
                  descEn: 'Core design principles such as composition, color, typography, and layout, using graphic design software such as Adobe Photoshop, Illustrator, and CorelDRAW.',
                  desc: 'Prinsip-prinsip dasar desain seperti komposisi, warna, tipografi, dan layout. Penggunaan perangkat lunak desain grafis seperti Adobe Photoshop, Illustrator, dan CorelDRAW.',
                },
                {
                  label: 'Ilustrasi dan Seni Digital',
                  labelEn: 'Illustration & Digital Art',
                  descEn: 'Traditional and digital drawing techniques, and creating illustrations for books, magazines, posters, and other media.',
                  desc: 'Teknik menggambar manual dan digital, serta pembuatan ilustrasi untuk berbagai media seperti buku, majalah, dan poster.',
                },
                {
                  label: 'Fotografi',
                  labelEn: 'Photography',
                  descEn: 'Photography basics including composition, lighting, and shooting techniques, plus photo editing with Adobe Lightroom and Photoshop.',
                  desc: 'Dasar-dasar fotografi termasuk komposisi, pencahayaan, dan teknik pengambilan gambar, serta penggunaan perangkat lunak pengeditan foto seperti Adobe Lightroom dan Photoshop.',
                },
                {
                  label: 'Animasi dan Multimedia',
                  labelEn: 'Animation & Multimedia',
                  descEn: '2D and 3D animation principles, using animation software such as Adobe Animate and Blender.',
                  desc: 'Prinsip dasar animasi 2D dan 3D, serta penggunaan perangkat lunak animasi seperti Adobe Animate dan Blender.',
                },
                {
                  label: 'Desain Web dan Interaktif',
                  labelEn: 'Web & Interactive Design',
                  descEn: 'Web design basics including HTML, CSS, and UX/UI principles, and creating interactive content and animation for the web.',
                  desc: 'Dasar-dasar desain web termasuk HTML, CSS, dan prinsip-prinsip UX/UI, serta pembuatan konten interaktif dan animasi untuk web.',
                },
                {
                  label: 'Branding dan Identitas Visual',
                  labelEn: 'Branding & Visual Identity',
                  descEn: 'Branding concepts and visual identity development, including logo, packaging, and promotional design.',
                  desc: 'Konsep branding dan pengembangan identitas visual, termasuk desain logo, kemasan, dan materi promosi.',
                },
                {
                  label: 'Produksi Video',
                  labelEn: 'Video Production',
                  descEn: 'Video production basics including shooting, editing, and visual effects with Adobe Premiere Pro and After Effects.',
                  desc: 'Dasar-dasar produksi video termasuk pengambilan gambar, penyuntingan, dan efek visual, menggunakan perangkat lunak seperti Adobe Premiere Pro dan After Effects.',
                },
                {
                  label: 'Desain Publikasi',
                  labelEn: 'Publication Design',
                  descEn: 'Layout design for books, magazines, brochures, and other print materials using desktop publishing software such as Adobe InDesign.',
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
              {t("Kenapa harus memilih DKV?", "Why choose DKV?")}
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
                  labelEn: 'A Growing Creative Industry',
                  descEn: 'Demand for visual designers keeps rising along with digital media, advertising, and creative content.',
                  desc: 'Kebutuhan desainer visual meningkat seiring berkembangnya media digital, periklanan, dan konten kreatif.',
                },
                {
                  label: 'Keahlian nyata',
                  labelEn: 'Real, Hands-on Skills',
                  descEn: 'Students directly create graphic designs, illustrations, videos, and multimedia work.',
                  desc: 'Siswa langsung praktik membuat desain grafis, ilustrasi, video, dan karya multimedia.',
                },
                {
                  label: 'Fleksibilitas kerja',
                  labelEn: 'Flexible Work',
                  descEn: 'Work at a creative agency, in-house at a company, as a freelancer, or start your own business.',
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
              {t("Profesi yang cocok untuk lulusan DKV", "Careers for DKV graduates")}
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
                {t("Tertarik bergabung dengan jurusan DKV?", "Interested in joining DKV?")}
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