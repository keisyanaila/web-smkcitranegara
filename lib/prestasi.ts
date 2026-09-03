/**
 * Data prestasi. Sumber utama = tabel `prestasi` di Neon (lewat /api/prestasi).
 * Array di bawah dipakai sebagai fallback kalau DB belum di-set / masih kosong.
 */

export interface Prestasi {
  id: string;
  nama: string;
  tahun: string;
  kategori: string;
  tingkat: string;
  foto: string;
  deskripsi: string;
  href: string; // tujuan link kartu (detail)
}

export const FALLBACK_PRESTASI: Prestasi[] = [
  {
    id: '1', nama: 'JUARA 1 Ultimate Futsal Championship Sejabodetabek', tahun: '2026',
    kategori: 'Olahraga', tingkat: 'Jabodetabek', foto: '/images/futsalcn2.jpg',
    deskripsi: 'Tim futsal putra SMK Citra Negara keluar sebagai juara pertama.',
    href: '/prestasi/1',
  },
  {
    id: '2', nama: 'JUARA 1 Futsal Nation Region Depok', tahun: '2025',
    kategori: 'Olahraga', tingkat: 'Kota', foto: '/images/futsalcn1.jpg',
    deskripsi: 'Juara pertama turnamen futsal tingkat Kota Depok.',
    href: '/prestasi/2',
  },
  {
    id: '3', nama: 'JUARA 1 Battle in Style Dance Competition | Garena Youth Championship', tahun: '2026',
    kategori: 'Seni', tingkat: 'Nasional', foto: '/images/juaranusabeast.jpg',
    deskripsi: 'Tim dance meraih juara pertama kategori pelajar.',
    href: '/prestasi/3',
  },
  {
    id: '4', nama: 'JUARA 1 Turnamen Esport Free Fire Sejabodetabek', tahun: '2025',
    kategori: 'Olahraga Elektronik', tingkat: 'Jabodetabek', foto: '/images/esport.jpg',
    deskripsi: 'Juara pertama turnamen Free Fire tingkat Sejabodetabek.',
    href: '/prestasi/4',
  },
  {
    id: '5', nama: 'JUARA UMUM Kolakarya Tingkat Jabodetabek', tahun: '2025',
    kategori: 'Seni', tingkat: 'Jabodetabek', foto: '/images/citter.jpg',
    deskripsi: 'Meraih gelar juara umum pada ajang Kolakarya.',
    href: '/prestasi/5',
  },
  {
    id: '6', nama: 'JUARA 1 Turnamen Taekwondo Nasional | Mendagri Cup 2025', tahun: '2025',
    kategori: 'Olahraga', tingkat: 'Nasional', foto: '/images/tekon.jpg',
    deskripsi: 'Juara pertama pada Mendagri Cup 2025 tingkat nasional.',
    href: '/prestasi/6',
  },
];

export const KATEGORI_PRESTASI_COLOR: Record<string, string> = {
  Olahraga: '#1E3A5F',
  'Olahraga Elektronik': '#3a96d0',
  Seni: '#DC2626',
  Akademik: '#024d20',
  Organisasi: '#92681A',
};

export function getPrestasiFallback(): Prestasi[] {
  return FALLBACK_PRESTASI;
}

export function getPrestasiByIdFallback(id: string): Prestasi | undefined {
  return FALLBACK_PRESTASI.find((p) => p.id === id);
}
