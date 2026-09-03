'use client';

import { useEffect, useState } from 'react';

/**
 * Sumber tunggal jadwal SPMB. Dipakai di homepage (kartu Jadwal SPMB) dan
 * halaman /spmb. Ubah tanggal di sini saja — status (Selesai / Sedang
 * Berlangsung / Akan Datang) dan gelombang yang di-highlight dihitung otomatis
 * dari tanggal hari ini.
 */

export const TAHUN_AJARAN = '2027/2028';

export const GELOMBANG = [
  { nama: 'Gelombang 1', mulai: '2027-01-02', selesai: '2027-02-27' },
  { nama: 'Gelombang 2', mulai: '2027-03-01', selesai: '2027-04-30' },
  { nama: 'Gelombang 3', mulai: '2027-05-01', selesai: '2027-06-30' },
];

export type SpmbStatus = 'selesai' | 'berlangsung' | 'akan-datang';

export const STATUS_LABEL: Record<SpmbStatus, string> = {
  selesai: 'Selesai',
  berlangsung: 'Sedang Berlangsung',
  'akan-datang': 'Akan Datang',
};

export function formatTanggalRange(mulai: string, selesai: string) {
  const fmt = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
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

/**
 * Daftar gelombang + status otomatis, plus index gelombang yang jadi fokus
 * (yang sedang berlangsung; kalau belum ada, gelombang terdekat yang akan datang).
 * `now` diambil lewat useEffect supaya tidak kena hydration mismatch.
 */
export function useSpmbGelombang(): { list: GelombangInfo[]; fokus: number } {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

  const ref = now ?? new Date(`${GELOMBANG[0].mulai}T00:00:00`);
  const list: GelombangInfo[] = GELOMBANG.map((g) => ({
    ...g,
    rentang: formatTanggalRange(g.mulai, g.selesai),
    status: statusGelombang(g.mulai, g.selesai, ref),
  }));

  let fokus = list.findIndex((g) => g.status === 'berlangsung');
  if (fokus === -1) fokus = list.findIndex((g) => g.status === 'akan-datang');
  if (fokus === -1) fokus = list.length - 1;

  return { list, fokus };
}
