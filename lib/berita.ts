/**
 * Sumber data berita sekolah. Tambah / ubah artikel cukup di array BERITA ini —
 * halaman daftar (/berita) dan halaman detail (/berita/[slug]) otomatis mengikuti.
 *
 * `slug` dipakai sebagai URL: /berita/<slug> — harus unik, huruf kecil, tanpa spasi.
 * `konten` adalah array paragraf (tiap elemen = satu paragraf).
 */

export interface Berita {
  slug: string;
  judul: string;
  tanggal: string; // format ISO: YYYY-MM-DD
  kategori: string;
  penulis: string;
  gambar: string;
  ringkasan: string;
  konten: string[];
}

export const BERITA: Berita[] = [
  {
    slug: 'juara-futsal-sejabodetabek-2026',
    judul: 'Tim Futsal SMK Citra Negara Raih Juara 1 Sejabodetabek',
    tanggal: '2026-08-18',
    kategori: 'Prestasi',
    penulis: 'Humas SMK Citra Negara',
    gambar: '/images/futsalcn2.jpg',
    ringkasan:
      'Tim futsal putra sekolah menutup turnamen Ultimate Futsal Championship dengan kemenangan di partai final dan membawa pulang trofi juara pertama.',
    konten: [
      'Tim futsal putra SMK Citra Negara berhasil menjadi juara pertama pada ajang Ultimate Futsal Championship tingkat Sejabodetabek yang digelar pada pertengahan Agustus 2026. Di partai puncak, tim sekolah tampil dominan dan menutup pertandingan dengan kemenangan meyakinkan.',
      'Pelatih tim menyampaikan bahwa hasil ini adalah buah dari latihan rutin yang disiplin sejak awal semester, ditambah dukungan penuh dari pihak sekolah berupa fasilitas lapangan dan pendampingan fisik.',
      'Kepala sekolah mengapresiasi capaian para siswa dan berharap prestasi ini menular ke cabang olahraga lain. Sekolah berkomitmen terus memfasilitasi pengembangan bakat siswa, baik di bidang akademik maupun non-akademik.',
    ],
  },
  {
    slug: 'spmb-2027-2028-resmi-dibuka',
    judul: 'SPMB Tahun Ajaran 2027/2028 Resmi Dibuka',
    tanggal: '2026-08-05',
    kategori: 'Pengumuman',
    penulis: 'Panitia SPMB',
    gambar: '/images/olimsma.jpg',
    ringkasan:
      'Sistem Penerimaan Peserta Didik Baru untuk tahun ajaran 2027/2028 dibuka dalam tiga gelombang. Kuota tiap jurusan terbatas.',
    konten: [
      'SMK Citra Negara resmi membuka pendaftaran peserta didik baru untuk tahun ajaran 2027/2028. Pendaftaran dilakukan sepenuhnya secara online melalui laman SPMB sekolah, mulai dari pembuatan akun, pengisian formulir, hingga unggah berkas persyaratan.',
      'Pendaftaran dibagi menjadi tiga gelombang. Calon siswa disarankan mendaftar pada gelombang awal karena kuota tiap jurusan terbatas dan diisi berdasarkan urutan pendaftaran serta hasil seleksi.',
      'Enam program keahlian yang dibuka adalah PPLG, TJKT, DKV, PM, MPLB, dan PH. Informasi jadwal tiap gelombang dapat dilihat pada halaman SPMB, yang statusnya diperbarui otomatis mengikuti tanggal.',
    ],
  },
  {
    slug: 'gelar-karya-p5-2026',
    judul: 'Siswa Gelar Karya Projek Penguatan Profil Pelajar Pancasila',
    tanggal: '2026-07-22',
    kategori: 'Kegiatan',
    penulis: 'Tim Kurikulum',
    gambar: '/images/citter.jpg',
    ringkasan:
      'Ratusan siswa memamerkan hasil projek kolaboratif lintas jurusan dalam pameran Gelar Karya yang terbuka untuk orang tua dan masyarakat.',
    konten: [
      'Aula SMK Citra Negara dipenuhi stan karya siswa dalam acara Gelar Karya Projek Penguatan Profil Pelajar Pancasila (P5). Kegiatan ini menampilkan produk lintas jurusan, mulai dari aplikasi, konten visual, prototipe jaringan, hingga produk kewirausahaan.',
      'Setiap kelompok mempresentasikan proses pengerjaan projek di depan pengunjung, termasuk orang tua siswa dan tamu dari sekolah lain. Beberapa produk terbaik dipilih untuk dipamerkan kembali pada acara sekolah berikutnya.',
      'Guru pembimbing menilai kegiatan ini efektif melatih kerja sama tim, manajemen waktu, dan kemampuan komunikasi siswa di depan publik.',
    ],
  },
  {
    slug: 'juara-dance-garena-youth-championship',
    judul: 'Ekskul Dance Sabet Juara 1 Battle in Style Dance Competition',
    tanggal: '2026-06-30',
    kategori: 'Prestasi',
    penulis: 'Humas SMK Citra Negara',
    gambar: '/images/juaranusabeast.jpg',
    ringkasan:
      'Tim dance sekolah tampil memukau di panggung Garena Youth Championship dan keluar sebagai juara pertama kategori pelajar.',
    konten: [
      'Tim dance SMK Citra Negara meraih Juara 1 pada Battle in Style Dance Competition yang menjadi bagian dari Garena Youth Championship. Penampilan tim mendapat sambutan meriah dari penonton berkat koreografi yang rapi dan energik.',
      'Persiapan dilakukan selama lebih dari sebulan dengan latihan intensif di studio sekolah. Tim juga menyiapkan konsep kostum dan musik secara mandiri bersama pembina ekstrakurikuler.',
      'Kemenangan ini menambah daftar prestasi bidang seni sekolah pada tahun 2026 dan menjadi motivasi bagi anggota ekskul lain untuk berani tampil di kompetisi tingkat regional.',
    ],
  },
  {
    slug: 'workshop-industri-pplg-tjkt',
    judul: 'Workshop Bersama Praktisi Industri untuk Siswa PPLG dan TJKT',
    tanggal: '2026-06-10',
    kategori: 'Kegiatan',
    penulis: 'Hubungan Industri',
    gambar: '/images/tekon.jpg',
    ringkasan:
      'Praktisi dari perusahaan teknologi berbagi pengalaman kerja nyata dan tren terbaru kepada siswa jurusan PPLG dan TJKT.',
    konten: [
      'SMK Citra Negara menghadirkan praktisi dari industri teknologi dalam workshop sehari untuk siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) serta Teknik Jaringan Komputer dan Telekomunikasi (TJKT).',
      'Materi yang dibawakan mencakup alur kerja pengembangan perangkat lunak di perusahaan, pengenalan perkakas kolaborasi, serta praktik konfigurasi jaringan sesuai standar industri.',
      'Kegiatan ini merupakan bagian dari program penyelarasan kurikulum sekolah dengan kebutuhan dunia kerja, sekaligus membuka peluang kerja sama praktik kerja lapangan bagi siswa.',
    ],
  },
  {
    slug: 'paskibra-hut-ri-2026',
    judul: 'Paskibra Sekolah Bertugas pada Upacara HUT Kemerdekaan RI',
    tanggal: '2026-08-17',
    kategori: 'Kegiatan',
    penulis: 'Pembina OSIS',
    gambar: '/images/paskibra.jpg',
    ringkasan:
      'Anggota Paskibra SMK Citra Negara dipercaya menjadi petugas pengibar bendera pada upacara peringatan HUT ke-81 Republik Indonesia di lingkungan sekolah.',
    konten: [
      'Peringatan HUT Kemerdekaan RI di SMK Citra Negara berlangsung khidmat dengan Paskibra sekolah sebagai petugas pengibar bendera. Formasi pasukan berjalan tertib hasil dari latihan rutin selama beberapa pekan sebelumnya.',
      'Upacara diikuti seluruh siswa, guru, dan tenaga kependidikan. Dalam amanatnya, pembina upacara mengajak seluruh warga sekolah memaknai kemerdekaan dengan belajar sungguh-sungguh dan menjaga sportivitas.',
      'Setelah upacara, kegiatan dilanjutkan dengan lomba antarkelas yang dikoordinasi oleh OSIS.',
    ],
  },
];

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/** "2026-08-17" -> "17 Agustus 2026" */
export function formatTanggal(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${BULAN[m - 1]} ${y}`;
}

export function getBeritaTerbaru(): Berita[] {
  return [...BERITA].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function getBerita(slug: string): Berita | undefined {
  return BERITA.find((b) => b.slug === slug);
}

export const KATEGORI_BERITA_COLOR: Record<string, string> = {
  Prestasi: '#C8973A',
  Pengumuman: '#1E3A5F',
  Kegiatan: '#15803d',
};
