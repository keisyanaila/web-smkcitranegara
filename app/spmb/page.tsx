'use client';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import { CheckCircle, Calendar, AlertCircle, ChevronRight, Check } from 'lucide-react';
import { TAHUN_AJARAN, STATUS_LABEL, useSpmbGelombang } from '@/lib/spmb';

const PERSYARATAN = [
  'Ijazah/SKHUN SMP/MTs (fotokopi)',
  'Kartu Keluarga (fotokopi)',
  'Akte Kelahiran (fotokopi)',
  'KTP orang tua/wali (fotokopi)',
  'Pas foto 3×4 berwarna (3 lembar)',
  'Surat keterangan sehat dari dokter',
  'Surat Keterangan Tidak Buta Warna (khusus jurusan TJKT, PPLG, dan DKV)',
];

const ALUR = [
  { no: 1, title: 'Buat Akun', desc: 'Daftarkan email Anda untuk membuat akun SPMB Online' },
  { no: 2, title: 'Isi Formulir', desc: 'Lengkapi data pribadi, data orang tua, dan pilih jurusan' },
  { no: 3, title: 'Upload Berkas', desc: 'Upload dokumen persyaratan dalam format PDF/JPG' },
  { no: 4, title: 'Submit', desc: 'Kirim formulir dan tunggu verifikasi dari admin sekolah' },
  { no: 5, title: 'Verifikasi', desc: 'Admin akan memverifikasi data dan berkas Anda' },
  { no: 6, title: 'Pengumuman', desc: 'Cek status penerimaan di dashboard akun Anda' },
];

const BIAYA_PENDIDIKAN = [
  {
    no: 1,
    jurusan: 'PEMASARAN',
    bg: '#DCEBFA',
    rows: [{ kelas: 'REGULER', biaya: 'Rp3.500.000' }],
  },
  {
    no: 2,
    jurusan: 'PENGEMBANGAN PERANGKAT LUNAK & GIM (PPLG)',
    bg: '#FBE0CE',
    rows: [
      { kelas: 'PLUS', biaya: 'Rp4.000.000' },
      { kelas: 'REGULER', biaya: 'Rp3.800.000' },
    ],
  },
  {
    no: 3,
    jurusan: 'MANAJEMEN PERKANTORAN DAN LAYANAN BISNIS (MPLB)',
    bg: '#FBF3C4',
    rows: [
      { kelas: 'PLUS', biaya: 'Rp4.950.000' },
      { kelas: 'REGULER', biaya: 'Rp4.000.000' },
    ],
  },
  {
    no: 4,
    jurusan: 'TEKNIK JARINGAN KOMPUTER DAN TELEKOMUNIKASI (TJKT)',
    bg: '#D6F0D2',
    rows: [
      { kelas: 'PLUS', biaya: 'Rp5.750.000' },
      { kelas: 'REGULER', biaya: 'Rp4.500.000' },
    ],
  },
  {
    no: 5,
    jurusan: 'DESIGN KOMUNIKASI VISUAL (DKV)',
    bg: '#F1D9EF',
    rows: [
      { kelas: 'PLUS', biaya: 'Rp6.000.000' },
      { kelas: 'REGULER', biaya: 'Rp5.000.000' },
    ],
  },
  {
    no: 6,
    jurusan: 'PERHOTELAN',
    bg: '#FBF3C4',
    rows: [{ kelas: '', biaya: 'Rp4.000.000' }],
  },
];

export default function SPMBPage() {
  const { list: gelombangList, fokus } = useSpmbGelombang();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', borderRadius: 20, padding: '6px 16px', color: '#E8B84B', fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
              SPMB {TAHUN_AJARAN}
            </div>
            <h1 className="font-display" style={{ fontSize: 48, color: 'white', marginBottom: 16 }}>
              Sistem Penerimaan<br />Peserta Didik Baru
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
              Pendaftaran online SMK Citra Negara tahun ajaran {TAHUN_AJARAN}.
              Proses mudah, transparan, dan dapat dipantau secara real-time.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn-primary" style={{ fontSize: 16 }}>Daftar Sekarang</Link>
              <Link href="/login" className="btn-outline" style={{ fontSize: 16 }}>Sudah Punya Akun</Link>
            </div>
          </div>
        </section>

        {/* Jadwal */}
        <section style={{ padding: '70px 24px', background: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div className="gold-line" style={{ margin: '0 auto 16px' }} />
              <h2 className="font-display" style={{ fontSize: 36, color: '#0A1628' }}>Jadwal SPMB</h2>
              <p style={{ color: '#6B7280', fontSize: 15, marginTop: 10 }}>
                Tahun Ajaran {TAHUN_AJARAN} &middot; 3 Gelombang Pendaftaran
              </p>
            </div>

            <div className="jadwal-grid">
              {gelombangList.map((g, i) => {
                const aktif = i === fokus;
                return (
                  <div key={g.nama} className={`jadwal-card j-${g.status}${aktif ? ' j-aktif' : ''}`}>
                    <div className="jadwal-card-top">
                      <span className="jadwal-no">
                        {g.status === 'selesai' ? <Check size={18} strokeWidth={3} /> : `0${i + 1}`}
                      </span>
                      <span className={`jadwal-chip j-chip-${g.status}`}>
                        {g.status === 'berlangsung' && <span className="jadwal-chip-dot" />}
                        {STATUS_LABEL[g.status]}
                      </span>
                    </div>
                    <h3 className="jadwal-card-name">{g.nama}</h3>
                    <div className="jadwal-card-date"><Calendar size={14} /> {g.rentang}</div>
                  </div>
                );
              })}
            </div>

            <p style={{ textAlign: 'center', fontSize: 12.5, color: '#9CA3AF', marginTop: 26 }}>
              Status jadwal diperbarui otomatis mengikuti tanggal. Kuota tiap gelombang terbatas &mdash; semakin awal mendaftar, semakin besar peluang diterima.
            </p>
          </div>

          <style jsx>{`
            .jadwal-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
            @media (max-width: 820px) {
              .jadwal-grid { grid-template-columns: 1fr; }
            }
            .jadwal-card {
              position: relative;
              border-radius: 18px;
              padding: 26px 24px;
              background: #fff;
              border: 1.5px solid #F0EBE0;
              transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            .jadwal-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 16px 34px rgba(10, 22, 40, 0.1);
            }
            .jadwal-card-top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 16px;
            }
            .jadwal-no {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 44px;
              height: 44px;
              border-radius: 12px;
              font-family: 'Playfair Display', serif;
              font-weight: 700;
              font-size: 18px;
              background: #FAF7F0;
              color: #C8973A;
              border: 1px solid #F0EBE0;
            }
            .jadwal-card-name {
              font-size: 18px;
              font-weight: 700;
              color: #0A1628;
              margin-bottom: 8px;
            }
            .jadwal-card-date {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 13px;
              color: #6B7280;
            }
            .jadwal-chip {
              display: inline-flex;
              align-items: center;
              gap: 5px;
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.03em;
              text-transform: uppercase;
              padding: 3px 10px;
              border-radius: 999px;
            }
            .j-chip-selesai { background: #F3F4F6; color: #9CA3AF; }
            .j-chip-berlangsung { background: rgba(23, 113, 59, 0.12); color: #15803d; }
            .j-chip-akan-datang { background: rgba(200, 151, 58, 0.14); color: #B4802A; }
            .jadwal-chip-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #22c55e;
              animation: jchip 1.6s ease-out infinite;
            }
            @keyframes jchip {
              0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
              70% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
              100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
            }

            .j-selesai { opacity: 0.7; }
            .j-selesai .jadwal-no {
              background: rgba(23, 113, 59, 0.1);
              color: #15803d;
              border-color: rgba(23, 113, 59, 0.25);
            }

            .j-aktif {
              border-color: transparent;
              background: linear-gradient(160deg, #052e16, #15803d);
              box-shadow: 0 20px 44px -12px rgba(5, 46, 22, 0.5);
            }
            .j-aktif .jadwal-no {
              background: linear-gradient(135deg, #C8973A, #E8B84B);
              color: #0A1628;
              border-color: transparent;
            }
            .j-aktif .jadwal-card-name { color: #fff; }
            .j-aktif .jadwal-card-date { color: #E8B84B; }
          `}</style>
        </section>

        {/* Biaya Pendidikan */}
        <section style={{ padding: '70px 24px', background: '#FAF7F0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="gold-line" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#C8973A', marginBottom: 8 }}>TAHUN PELAJARAN {TAHUN_AJARAN}</div>
              <h2 className="font-display" style={{ fontSize: 36, color: '#0A1628' }}>Biaya Pendidikan Siswa Baru</h2>
            </div>

            <div className="biaya-grid">
              {BIAYA_PENDIDIKAN.map(item => {
                const multi = item.rows.length > 1;
                return (
                  <div
                    key={item.no}
                    className="biaya-card"
                    style={{
                      background: 'linear-gradient(155deg,#0A1628,#123a2b)',
                      border: '1.5px solid #C8973A',
                    }}
                  >
                    {multi && (
                      <div style={{ position: 'absolute', top: -12, left: 24, background: '#C8973A', color: '#0A1628', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 20, letterSpacing: 0.5 }}>
                        PLUS &amp; REGULER
                      </div>
                    )}
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#E8B84B', marginBottom: 10 }}>
                      NO. {item.no}
                    </div>
                    <h3 className="font-display" style={{ fontSize: 21, color: 'white', marginBottom: 20, lineHeight: 1.3 }}>
                      {item.jurusan}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {item.rows.map((row, ri) => (
                        <div key={ri}>
                          {row.kelas && (
                            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
                              Kelas {row.kelas.charAt(0) + row.kelas.slice(1).toLowerCase()}
                            </div>
                          )}
                          <span className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#E8B84B' }}>
                            {row.biaya}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 18 }}>
                      Biaya pendidikan siswa baru
                    </div>
                  </div>
                );
              })}
            </div>

            <p style={{ textAlign: 'center', fontSize: 12.5, color: '#9CA3AF', marginTop: 28 }}>
              Untuk rincian dan informasi lebih lanjut mengenai biaya pendidikan, silakan hubungi bagian Tata Usaha sekolah.
            </p>
          </div>

          <style jsx>{`
            .biaya-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
              gap: 24px;
            }
            .biaya-card {
              position: relative;
              border-radius: 18px;
              padding: 32px 28px;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .biaya-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 16px 34px rgba(10,22,40,0.12);
            }
            @media (max-width: 640px) {
              .biaya-card { padding: 28px 22px; }
            }
          `}</style>
        </section>

        {/* Alur */}
        <section style={{ padding: '70px 24px', background: '#FAF7F0' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="gold-line" style={{ margin: '0 auto 16px' }} />
              <h2 className="font-display" style={{ fontSize: 36, color: '#0A1628' }}>Alur Pendaftaran</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {ALUR.map((step, i) => (
                <div key={step.no} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#C8973A,#E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#0A1628', flexShrink: 0 }}>{step.no}</div>
                    {i < ALUR.length - 1 && <div style={{ width: 2, height: 36, background: '#E5E7EB', margin: '4px 0' }} />}
                  </div>
                  <div style={{ background: 'white', borderRadius: 12, padding: '16px 20px', flex: 1, border: '1px solid #F0EBE0', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{step.title}</h4>
                    <p style={{ fontSize: 13, color: '#6B7280' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Persyaratan */}
        <section style={{ padding: '70px 24px', background: 'white' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div className="gold-line" style={{ marginBottom: 16 }} />
              <h2 className="font-display" style={{ fontSize: 36, color: '#0A1628', marginBottom: 16 }}>Persyaratan Dokumen</h2>
              <p style={{ color: '#6B7280', marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>
                Berikut adalah berkas persyaratan yang wajib diserahkan ke sekolah untuk proses verifikasi pendaftaran.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PERSYARATAN.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <CheckCircle size={18} color="#C8973A" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#374151' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 10, padding: 16, marginTop: 24, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <AlertCircle size={16} color="#92400E" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.5 }}>
                  Setelah mengirimkan formulir pendaftaran secara online, calon peserta didik wajib menyerahkan fotokopi berkas persyaratan ke sekolah paling lambat 3 (tiga) hari kerja.
                </p>
              </div>
            </div>
            <div style={{ background: '#02513b', borderRadius: 20, padding: 36, color: 'white' }}>
              <h3 className="font-display" style={{ fontSize: 26, color: 'white', marginBottom: 8 }}>Mulai Daftar Sekarang</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                Proses pendaftaran 100% online. Buat akun, isi formulir, dan upload berkas dari rumah.
              </p>
              {['Buat akun gratis', 'Isi formulir online', 'Upload dokumen digital', 'Pantau status real-time'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, background: 'rgba(200,151,58,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} color="#C8973A" />
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                </div>
              ))}
              <Link href="/register" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 28, fontSize: 15 }}>
                Daftar Sekarang →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}