// Jalankan: node db/run-schema.mjs
// Membaca DATABASE_URL dari .env.local, lalu menjalankan db/schema.sql
// (membuat tabel + melengkapi kolom yang kurang). Aman dijalankan berulang.
import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
const m = env.match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m);
if (!m) { console.error('DATABASE_URL tidak ditemukan di .env.local'); process.exit(1); }

const sql = neon(m[1].trim());

const raw = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');
// buang komentar (satu baris penuh maupun di ujung baris), sisakan statement SQL
const cleaned = raw
  .split(/\r?\n/)
  .filter((line) => !line.trim().startsWith('--'))
  .map((line) => line.replace(/\s+--[^'\n]*$/, ''))
  .join('\n');

const stmts = cleaned.split(/;\s*(?:\n|$)/).map((s) => s.trim()).filter(Boolean);
for (const s of stmts) await sql.query(s);

const cols = await sql`
  select table_name, count(*)::int as kolom
  from information_schema.columns
  where table_schema = 'public' and table_name in ('berita', 'prestasi', 'media', 'pengaturan')
  group by table_name
  order by table_name
`;
console.log(`OK. ${stmts.length} statement dijalankan.`);
for (const c of cols) console.log(` - ${c.table_name}: ${c.kolom} kolom`);
