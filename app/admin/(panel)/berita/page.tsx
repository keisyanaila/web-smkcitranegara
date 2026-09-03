'use client';

import ResourceManager, { Field } from '@/components/admin/ResourceManager';

const today = () => new Date().toISOString().slice(0, 10);

const fields: Field[] = [
  { name: 'judul', label: 'Judul', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', help: 'Kosongkan untuk dibuat otomatis dari judul. Contoh: juara-lomba-2027' },
  { name: 'tanggal', label: 'Tanggal', type: 'date' },
  { name: 'kategori', label: 'Kategori', type: 'select', options: ['Prestasi', 'Pengumuman', 'Kegiatan'] },
  { name: 'penulis', label: 'Penulis', type: 'text' },
  { name: 'gambar', label: 'Gambar', type: 'image', help: 'JPG/PNG/WEBP, maks 4 MB.' },
  { name: 'ringkasan', label: 'Ringkasan', type: 'textarea', rows: 3, help: 'Satu-dua kalimat yang muncul di kartu daftar berita.' },
  { name: 'konten', label: 'Isi berita', type: 'textarea', rows: 10, help: 'Pisahkan antar paragraf dengan satu baris kosong.' },
  { name: 'published', label: 'Status', type: 'checkbox' },
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
