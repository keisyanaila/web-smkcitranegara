'use client';

import { useEffect, useState } from 'react';
import { GraduationCap, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { SPMB_URL, formatTanggalRange, useSpmbGelombang } from '@/lib/spmb';

const DISMISS_KEY = 'cn-spmb-promo-closed';

/**
 * Notifikasi ajakan daftar SPMB di Beranda.
 * Muncul saat `show` true (setelah splash selesai), bisa ditutup (✕ / Esc),
 * dan tidak muncul lagi selama sesi browser yang sama setelah ditutup.
 */
export default function SpmbPromo({ show }: { show: boolean }) {
  const { t } = useLang();
  const { list, fokus, tahunAjaran } = useSpmbGelombang();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    let closed = false;
    try { closed = sessionStorage.getItem(DISMISS_KEY) === '1'; } catch {}
    if (closed) return;
    const timer = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(timer);
  }, [show]);

  const close = () => {
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch {}
    setLeaving(true);
    setTimeout(() => setOpen(false), 250);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const g = list[fokus];
  const sedang = g?.status === 'berlangsung';
  const info = g
    ? `${t(g.nama, `Wave ${fokus + 1}`)} · ${t(g.rentang, formatTanggalRange(g.mulai, g.selesai, 'en-GB'))}`
    : '';

  return (
    <div className={`spmbp ${leaving ? 'spmbp-out' : ''}`} role="dialog" aria-labelledby="spmbp-title" aria-live="polite">
      <button type="button" className="spmbp-x" onClick={close} aria-label={t('Tutup', 'Close')}>
        <X size={18} />
      </button>

      <div className="spmbp-icon"><GraduationCap size={24} aria-hidden="true" /></div>

      <div className="spmbp-body">
        <span className={`spmbp-chip ${sedang ? 'on' : ''}`}>
          {sedang ? t('Pendaftaran Dibuka', 'Admissions Open') : t('Segera Dibuka', 'Opening Soon')}
        </span>
        <h3 id="spmbp-title">
          {t('SPMB SMK Citra Negara', 'SMK Citra Negara Admissions')} {tahunAjaran}
        </h3>
        {info && <p>{info}</p>}
        <div className="spmbp-actions">
          <a href={SPMB_URL} className="spmbp-cta" onClick={close}>
            {t('Daftar Sekarang', 'Apply Now')} →
          </a>
          <button type="button" className="spmbp-later" onClick={close}>
            {t('Nanti saja', 'Maybe later')}
          </button>
        </div>
      </div>

      <style>{`
        .spmbp {
          position: fixed; z-index: 9000; right: 20px; bottom: 20px;
          width: min(380px, calc(100vw - 32px));
          display: flex; gap: 14px; align-items: flex-start;
          padding: 18px 18px 18px 16px; border-radius: 18px;
          background: linear-gradient(155deg, #0B3D2E, #145a43);
          color: #fff; border: 1px solid rgba(232,184,75,0.45);
          box-shadow: 0 22px 50px rgba(5,46,22,0.45);
          font-family: inherit;
          animation: spmbpIn .45s cubic-bezier(.16,1,.3,1) both;
        }
        .spmbp-out { animation: spmbpOut .25s ease forwards; }
        @keyframes spmbpIn { from { opacity: 0; transform: translateY(24px) scale(.96); } to { opacity: 1; transform: none; } }
        @keyframes spmbpOut { to { opacity: 0; transform: translateY(16px); } }

        .spmbp-x {
          position: absolute; top: 10px; right: 10px; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border: none; border-radius: 9px; cursor: pointer;
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8);
        }
        .spmbp-x:hover { background: rgba(255,255,255,0.18); color: #fff; }

        .spmbp-icon {
          flex-shrink: 0; width: 46px; height: 46px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #C8973A, #E8B84B); color: #0A1628;
        }
        .spmbp-body { min-width: 0; padding-right: 26px; }
        .spmbp-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase;
          color: #E8B84B; background: rgba(232,184,75,0.14); padding: 3px 9px; border-radius: 999px;
        }
        .spmbp-chip.on::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
          box-shadow: 0 0 0 0 rgba(74,222,128,.6); animation: spmbpPulse 1.6s ease-out infinite;
        }
        @keyframes spmbpPulse { 70% { box-shadow: 0 0 0 7px rgba(74,222,128,0); } 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); } }
        .spmbp h3 { margin: 8px 0 4px; font-size: 16.5px; font-weight: 800; line-height: 1.3; color: #fff; }
        .spmbp p { margin: 0; font-size: 13px; color: rgba(255,255,255,0.72); line-height: 1.5; }
        .spmbp-actions { display: flex; align-items: center; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
        .spmbp-cta {
          display: inline-flex; align-items: center; padding: 10px 18px; border-radius: 10px;
          background: linear-gradient(135deg, #C8973A, #E8B84B); color: #0A1628;
          font-weight: 800; font-size: 13.5px; text-decoration: none;
          box-shadow: 0 6px 18px rgba(200,151,58,0.35);
        }
        .spmbp-cta:hover { filter: brightness(1.06); }
        .spmbp-later { border: none; background: none; color: rgba(255,255,255,0.65); font-size: 13px; cursor: pointer; padding: 6px 2px; font-family: inherit; }
        .spmbp-later:hover { color: #fff; }

        @media (max-width: 520px) {
          .spmbp { right: 12px; left: 12px; bottom: calc(12px + env(safe-area-inset-bottom, 0px)); width: auto; padding: 16px 14px; }
          .spmbp-icon { width: 40px; height: 40px; border-radius: 11px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .spmbp, .spmbp-out, .spmbp-chip.on::before { animation: none; }
        }
      `}</style>
    </div>
  );
}
