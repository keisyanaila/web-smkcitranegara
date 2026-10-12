/**
 * Data guru & staf. Sumber utama = tabel `staf` di Neon (diatur dari /admin/staf, dibaca lewat /api/staf).
 * STAF_DEFAULT dipakai kalau database belum di-set atau tabelnya masih kosong,
 * dan juga diisikan sekali ke tabel oleh db/schema.sql.
 */

export interface Staf {
  id?: string;
  nama: string;
  jabatan: string;
  kategori: string;
  foto?: string;
}

/** Pilihan kategori (urutan ini juga urutan tombol filter di halaman publik). */
export const KATEGORI_STAF = ['Pimpinan', 'Kurikulum', 'Kepala Program', 'Humas', 'Kesiswaan', 'Keuangan', 'Tata Usaha', 'Guru', 'IT'];

export const KATEGORI_STAF_EN: Record<string, string> = {
  Semua: 'All',
  Pimpinan: 'Leadership',
  Kurikulum: 'Curriculum',
  'Kepala Program': 'Heads of Program',
  Humas: 'Public Relations',
  Kesiswaan: 'Student Affairs',
  Keuangan: 'Finance',
  'Tata Usaha': 'Administration',
  Guru: 'Teachers',
  IT: 'IT',
};

/** Sesuai bagan "Struktur SMK CITRA NEGARA". */
export const STAF_DEFAULT: Staf[] = [
  { nama: 'Abdul Kodir Zaelani, S.Pd.I', jabatan: 'Kepala Sekolah SMK Citra Negara', kategori: 'Pimpinan' },
  { nama: 'Noviyanti, S.Pd', jabatan: 'Komite Sekolah', kategori: 'Pimpinan' },

  { nama: 'Deni Romandono, ST', jabatan: 'Waka Kurikulum', kategori: 'Kurikulum' },
  { nama: 'Hari Suryanto, A.Md', jabatan: 'Kepala BKK & PKL', kategori: 'Kurikulum' },
  { nama: 'Ibnu Purbani Lantib, S.Ds', jabatan: 'Kaprog DKV', kategori: 'Kepala Program' },
  { nama: 'Aulia Fitri, S.Kom', jabatan: 'Kaprog TJKT', kategori: 'Kepala Program' },
  { nama: 'Ayu Budi, S.Kom', jabatan: 'Kaprog PPLG', kategori: 'Kepala Program' },
  { nama: 'Lenna Octasari, S.Pd', jabatan: 'Kaprog MPLB', kategori: 'Kepala Program' },
  { nama: 'Alvino A. Rahman, S.Pd', jabatan: 'Kaprog PM', kategori: 'Kepala Program' },
  { nama: 'Pamungkas Paksi J., SS', jabatan: 'Kaprog PHTL', kategori: 'Kepala Program' },

  { nama: 'M. Aris, S.Hum, M.Pd', jabatan: 'Waka Humas', kategori: 'Humas' },

  { nama: 'M. Djunaedi Lubis, S.Sn', jabatan: 'Waka Kesiswaan', kategori: 'Kesiswaan' },
  { nama: 'Rustandi, M.Pd', jabatan: 'SARPRAS & PPPK', kategori: 'Kesiswaan' },
  { nama: 'R. Bagus H. Handoko, S.Pd', jabatan: 'Kedisiplinan', kategori: 'Kesiswaan' },
  { nama: 'Salmah, S.Pd', jabatan: 'Koord. BK, BKK & Piket', kategori: 'Kesiswaan' },
  { nama: 'Zahra Maharani, S.Pd', jabatan: 'BK, Piket & Seragam', kategori: 'Kesiswaan' },

  { nama: 'Dina Sundari Wijaya, SE', jabatan: 'KA TU Keuangan', kategori: 'Keuangan' },
  { nama: 'Faisal Akbar Tionas', jabatan: 'TU Keuangan', kategori: 'Keuangan' },
  { nama: 'Andi Septiani Nabillah', jabatan: 'TU Keuangan', kategori: 'Keuangan' },
  { nama: 'Siti Afifah N, S.Pd', jabatan: 'TU Keuangan', kategori: 'Keuangan' },
  { nama: 'Ananda Putri Berliana, S.E', jabatan: 'TU Keuangan', kategori: 'Keuangan' },

  { nama: 'Rohmat', jabatan: 'KA TU & Dapodik', kategori: 'Tata Usaha' },
  { nama: 'Imam Suzzai, S.IKom', jabatan: 'Bendahara BOS', kategori: 'Tata Usaha' },
  { nama: 'Yeni Herawati, S.Kom', jabatan: 'TU Administrasi', kategori: 'Tata Usaha' },
  { nama: 'Ulya Aqila Haura', jabatan: 'TU Administrasi', kategori: 'Tata Usaha' },
  { nama: 'Seta Fitriana, A.Md', jabatan: 'Perpustakaan', kategori: 'Tata Usaha' },
].sort((a, b) => a.nama.localeCompare(b.nama, 'id'));

