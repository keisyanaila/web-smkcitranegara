'use client';

import { useEffect, useState } from 'react';
import { SPMB_DEFAULT, normalizeSpmb, validateSpmb, type SpmbJadwal } from '@/lib/spmbData';

/**
 * Jadwal SPMB untuk homepage (kartu Jadwal SPMB).
 * Tahun ajaran & gelombang diatur dari admin (/admin/spmb) dan diambil lewat /api/spmb.
 * Nilai bawaan (dipakai sebelum data termuat / kalau DB belum siap) ada di lib/spmbData.ts.
 * Status (Selesai / Sedang Berlangsung / Akan Datang) dan gelombang yang di-highlight
 * dihitung otomatis dari tanggal hari ini.
 */

/** Nilai bawaan — data sebenarnya ambil dari useSpmbGelombang(). */
export const TAHUN_AJARAN = SPMB_DEFAULT.tahunAjaran;

/** Situs pendaftaran SPMB (eksternal). Semua tombol "Daftar" mengarah ke sini. */
export const SPMB_URL = 'https://spmb.citranegara.online/spmb';

export const GELOMBANG = SPMB_DEFAULT.gelombang;

export type SpmbStatus = 'selesai' | 'berlangsung' | 'akan-datang';

export const STATUS_LABEL: Record<SpmbStatus, string> = {
  selesai: 'Selesai',
  berlangsung: 'Sedang Berlangsung',
  'akan-datang': 'Akan Datang',
};

export const STATUS_LABEL_EN: Record<SpmbStatus, string> = {
  selesai: 'Closed',
  berlangsung: 'Now Open',
  'akan-datang': 'Coming Soon',
};

export function formatTanggalRange(mulai: string, selesai: string, locale = 'id-ID') {
  const fmt = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  return `${fmt(mulai)} – ${fmt(selesai)}`;
}

export function statusGelombang(mulai: string, selesai: string, now: Date): SpmbStatus {
  if (now > new Date(`${selesai}T23:59:59`)) return 'selesai';
  if (now >= new Date(`${mulai}T00:00:00`)) return 'berlangsung';
  return 'akan-datang';
}

export interface GelombangInfo {
  nama: string;
  mulai: string;
  selesai: string;
  rentang: string;
  status: SpmbStatus;
}

/** Hitung status tiap gelombang + index gelombang yang jadi fokus. */
export function hitungGelombang(gelombang: SpmbJadwal['gelombang'], now: Date): { list: GelombangInfo[]; fokus: number } {
  const list: GelombangInfo[] = gelombang.map((g) => ({
    ...g,
    rentang: formatTanggalRange(g.mulai, g.selesai),
    status: statusGelombang(g.mulai, g.selesai, now),
  }));

  let fokus = list.findIndex((g) => g.status === 'berlangsung');
  if (fokus === -1) fokus = list.findIndex((g) => g.status === 'akan-datang');
  if (fokus === -1) fokus = list.length - 1;
  return { list, fokus };
}

/**
 * Jadwal SPMB dari admin: daftar gelombang + status otomatis, index gelombang fokus
 * (yang sedang berlangsung; kalau belum ada, yang terdekat akan datang), dan tahun ajaran.
 * Render pertama pakai nilai bawaan (aman untuk hydration), lalu diganti data dari /api/spmb.
 */
export function useSpmbGelombang(): {
  list: GelombangInfo[];
  fokus: number;
  tahunAjaran: string;
  gelombang: SpmbJadwal['gelombang'];
} {
  const [now, setNow] = useState<Date | null>(null);
  const [data, setData] = useState<SpmbJadwal>(SPMB_DEFAULT);

  useEffect(() => {
    let alive = true;
    const raf = requestAnimationFrame(() => setNow(new Date()));
    fetch('/api/spmb', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d) return;
        const n = normalizeSpmb(d);
        if (validateSpmb(n).length === 0) setData(n);
      })
      .catch(() => {});
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  const ref = now ?? new Date(`${data.gelombang[0].mulai}T00:00:00`);
  return { ...hitungGelombang(data.gelombang, ref), tahunAjaran: data.tahunAjaran, gelombang: data.gelombang };
}

