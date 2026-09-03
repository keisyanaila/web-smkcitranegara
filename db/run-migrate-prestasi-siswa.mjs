// Sekali pakai: node db/run-migrate-prestasi-siswa.mjs
// Menambah kolom `anggota` (JSON) ke tabel prestasi, memindahkan data
// lama dari kolom siswa/kelas (kalau ada). Aman dijalankan berulang.
import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
const m = env.match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m);
if (!m) { console.error('DATABASE_URL tidak ditemukan di .env.local'); process.exit(1); }

const sql = neon(m[1]);

await sql`alter table prestasi add column if not exists anggota text not null default '[]'`;

// Pindahkan data lama siswa/kelas -> anggota (hanya kalau kolom lamanya masih ada)
const cols = await sql`
  select column_name from information_schema.columns where table_name = 'prestasi'
`;
const names = cols.map((c) => c.column_name);
if (names.includes('siswa') || names.includes('kelas')) {
  await sql`
    update prestasi
    set anggota = json_build_array(
      json_build_object('nama', coalesce(siswa, ''), 'kelas', coalesce(kelas, ''))
    )::text
    where anggota = '[]'
      and (coalesce(siswa, '') <> '' or coalesce(kelas, '') <> '')
  `;
  console.log('Data lama siswa/kelas dipindahkan ke anggota.');
}

const check = await sql`select id, nama, anggota from prestasi order by created_at`;
console.log(`OK. Total ${check.length} prestasi.`);
for (const r of check) console.log(` - ${r.nama}  ->  ${r.anggota}`);
