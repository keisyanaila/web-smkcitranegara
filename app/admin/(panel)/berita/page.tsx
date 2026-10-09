'use client';

import ResourceManager, { Field } from '@/components/admin/ResourceManager';

const today = () => new Date().toISOString().slice(0, 10);

const fields: Field[] = [
  { name: 'judul', label: 'Judul', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', help: 'Kosongkan untuk dibuat otomatis dari judul. Contoh: juara-lomba-2027' },
  { name: 'tanggal', label: 'Tanggal', type: 'date', half: true },
  { name: 'kategori', label: 'Kategori', type: 'select', options: ['Prestasi', 'Pengumuman', 'Kegiatan'], half: true },
  { name: 'penulis', label: 'Penulis', type: 'text', half: true },
  { name: 'published', label: 'Status', type: 'checkbox', half: true },
  { name: 'gambar', label: 'Gambar', type: 'image', help: 'JPG/PNG/WEBP, maks 4 MB. Disarankan rasio 16:9 dan di bawah 500 KB.' },
  { name: 'ringkasan', label: 'Ringkasan', type: 'textarea', rows: 3, help: 'Satu-dua kalimat yang muncul di kartu daftar berita.' },
  { name: 'konten', label: 'Isi berita', type: 'textarea', rows: 10, help: 'Pisahkan antar paragraf dengan satu baris kosong.' },
];

const columns = [
  { name: 'judul', label: 'Judul' },
  { name: 'kategori', label: 'Kategori' },
  { name: 'tanggal', label: 'Tanggal' },
  { name: 'published', label: 'Status' },
];

export default function AdminBeritaPage() {
  return (
    <ResourceManager
      title="Berita"
      description="Berita yang berstatus Tayang muncul di halaman /berita, terbaru di atas."
      imageField="gambar"
      searchFields={['judul', 'kategori', 'penulis', 'tanggal']}
      singular="berita"
      endpoint="/api/admin/berita"
      fields={fields}
      columns={columns}
      emptyRow={{
        judul: '', slug: '', tanggal: today(), kategori: 'Kegiatan',
        penulis: 'Humas SMK Citra Negara', gambar: '', ringkasan: '', konten: '', published: true,
      }}
    />
  );
}
