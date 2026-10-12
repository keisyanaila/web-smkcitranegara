'use client';

import ResourceManager, { Field } from '@/components/admin/ResourceManager';
import { KATEGORI_STAF } from '@/lib/staf';

const fields: Field[] = [
  { name: 'nama', label: 'Nama lengkap & gelar', type: 'text', required: true, placeholder: 'contoh : Salmah, S.Pd' },
  { name: 'jabatan', label: 'Jabatan', type: 'text', placeholder: 'contoh : Waka Kurikulum / Guru Matematika' },
  { name: 'kategori', label: 'Kategori', type: 'select', options: KATEGORI_STAF, half: true },
  { name: 'published', label: 'Status', type: 'checkbox', half: true },
  { name: 'foto', label: 'Foto', type: 'image', help: 'Foto potret (tegak), JPG/PNG/WEBP maks 4 MB. Kosongkan untuk memakai inisial nama.' },
];

const columns = [
  { name: 'nama', label: 'Nama' },
  { name: 'jabatan', label: 'Jabatan' },
  { name: 'kategori', label: 'Kategori' },
  { name: 'published', label: 'Status' },
];

export default function AdminStafPage() {
  return (
    <ResourceManager
      title="Guru & Staf"
      description="Data yang berstatus Tayang muncul di halaman /gurustaffsmk, diurutkan sesuai abjad nama."
      singular="guru/staf"
      endpoint="/api/admin/staf"
      fields={fields}
      columns={columns}
      imageField="foto"
      searchFields={['nama', 'jabatan', 'kategori']}
      emptyRow={{ nama: '', jabatan: '', kategori: 'Guru', foto: '', published: true }}
    />
  );
}
