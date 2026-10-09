/**
 * Data jadwal SPMB (tahun ajaran + gelombang) yang bisa diatur dari admin (/admin/spmb).
 * Disimpan di tabel `pengaturan` (kunci = 'spmb', nilai = JSON).
 * Kalau database belum di-set / belum ada isinya, dipakai SPMB_DEFAULT di bawah.
 *
 * File ini tanpa 'use client' supaya bisa dipakai di route handler (server) maupun komponen.
 */

export interface Gelombang {
  nama: string;
  mulai: string; // YYYY-MM-DD
  selesai: string; // YYYY-MM-DD
}

export interface SpmbJadwal {
  tahunAjaran: string; // mis. "2027/2028"
  gelombang: Gelombang[];
}

export const SPMB_KEY = 'spmb';

export const SPMB_DEFAULT: SpmbJadwal = {
  tahunAjaran: '2027/2028',
  gelombang: [
    { nama: 'Gelombang 1', mulai: '2026-09-01', selesai: '2026-12-01' },
    { nama: 'Gelombang 2', mulai: '2026-12-01', selesai: '2027-04-30' },
    { nama: 'Gelombang 3', mulai: '2027-05-01', selesai: '2027-06-30' },
  ],
};

export const MAX_GELOMBANG = 10;

const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(`${s}T00:00:00`).getTime());

/** Rapikan input mentah (dari DB / form) jadi SpmbJadwal; gelombang diurutkan menurut tanggal mulai. */
export function normalizeSpmb(raw: unknown): SpmbJadwal {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const list = Array.isArray(r.gelombang) ? r.gelombang : [];
  return {
    tahunAjaran: String(r.tahunAjaran ?? '').trim(),
    gelombang: list
      .map((g) => {
        const x = (g && typeof g === 'object' ? g : {}) as Record<string, unknown>;
        return {
          nama: String(x.nama ?? '').trim(),
          mulai: String(x.mulai ?? '').trim(),
          selesai: String(x.selesai ?? '').trim(),
        };
      })
      .sort((a, b) => a.mulai.localeCompare(b.mulai)),
  };
}

/** Kembalikan daftar pesan kesalahan (kosong = valid). Dipakai di form admin dan di API. */
export function validateSpmb(d: SpmbJadwal): string[] {
  const err: string[] = [];

  const m = d.tahunAjaran.match(/^(\d{4})\/(\d{4})$/);
  if (!m) err.push('Tahun ajaran harus berformat 2027/2028.');
  else if (Number(m[2]) !== Number(m[1]) + 1) err.push('Tahun ajaran harus dua tahun berurutan, mis. 2027/2028.');

  if (d.gelombang.length === 0) err.push('Minimal harus ada 1 gelombang.');
  if (d.gelombang.length > MAX_GELOMBANG) err.push(`Maksimal ${MAX_GELOMBANG} gelombang.`);

  const names = new Set<string>();
  d.gelombang.forEach((g, i) => {
    const label = g.nama || `Gelombang baris ${i + 1}`;
    if (!g.nama) err.push(`Baris ${i + 1}: nama gelombang wajib diisi.`);
    else if (names.has(g.nama.toLowerCase())) err.push(`Nama "${g.nama}" dipakai lebih dari sekali.`);
    names.add(g.nama.toLowerCase());
    if (!isDate(g.mulai)) err.push(`${label}: tanggal mulai belum diisi / tidak valid.`);
    if (!isDate(g.selesai)) err.push(`${label}: tanggal selesai belum diisi / tidak valid.`);
    if (isDate(g.mulai) && isDate(g.selesai) && g.selesai < g.mulai) {
      err.push(`${label}: tanggal selesai tidak boleh sebelum tanggal mulai.`);
    }
  });

  // gelombang tidak boleh tumpang tindih (boleh bersambung di hari yang sama)
  const sorted = [...d.gelombang].filter((g) => isDate(g.mulai) && isDate(g.selesai)).sort((a, b) => a.mulai.localeCompare(b.mulai));
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].mulai < sorted[i - 1].selesai) {
      err.push(`"${sorted[i - 1].nama}" dan "${sorted[i].nama}" tanggalnya tumpang tindih.`);
    }
  }
  return err;
}
