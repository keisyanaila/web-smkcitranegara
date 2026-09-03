'use client';

import ResourceManager, { Field } from '@/components/admin/ResourceManager';

const fields: Field[] = [
  { name: 'nama', label: 'Nama prestasi', type: 'text', required: true, placeholder: 'JUARA 1 Lomba ...' },
  { name: 'anggota', label: 'Siswa berprestasi', type: 'people', help: 'Tambah satu baris per siswa (nama + kelas). Untuk prestasi tim, boleh 1 baris berisi nama tim.' },
  { name: 'tahun', label: 'Tahun', type: 'text', placeholder: '2027' },
  { name: 'kategori', label: 'Kategori', type: 'select', options: ['Olahraga', 'Olahraga Elektronik', 'Seni', 'Akademik', 'Organisasi'] },
  { name: 'tingkat', label: 'Tingkat', type: 'text', placeholder: 'Nasional / Provinsi / Kota / Sekolah' },
  { name: 'foto', label: 'Foto', type: 'image', help: 'JPG/PNG/WEBP, maks 4 MB.' },
  { name: 'deskripsi', label: 'Deskripsi', type: 'textarea', rows: 6 },
  { name: 'published', label: 'Status', type: 'checkbox' },
];

const columns = [
  { name: 'nama', label: 'Nama' },
  { name: 'anggota', label: 'Siswa / Kelas' },
  { name: 'kategori', label: 'Kategori' },
  { name: 'published', label: 'Status' },
];

export default function AdminPrestasiPage() {
  return (
    <ResourceManager
      title="Prestasi"
      singular="prestasi"
      endpoint="/api/admin/prestasi"
      fields={fields}
      columns={columns}
      emptyRow={{
        nama: '', anggota: [], tahun: String(new Date().getFullYear()), kategori: 'Akademik',
        tingkat: '', foto: '', deskripsi: '', published: true,
      }}
    />
  );
}
