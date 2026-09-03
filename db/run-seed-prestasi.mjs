// Sekali pakai: node db/run-seed-prestasi.mjs
// Membaca DATABASE_URL dari .env.local, lalu menjalankan db/seed-prestasi.sql.
import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
const m = env.match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m);
if (!m) { console.error('DATABASE_URL tidak ditemukan di .env.local'); process.exit(1); }

const sql = neon(m[1]);

const raw = readFileSync(new URL('./seed-prestasi.sql', import.meta.url), 'utf8');
// buang baris komentar, sisakan statement SQL
const cleaned = raw
  .split(/\r?\n/)
  .filter((line) => !line.trim().startsWith('--'))
  .join('\n');

const stmts = cleaned.split(/;\s*(?:\r?\n|$)/).map((s) => s.trim()).filter(Boolean);
for (const s of stmts) await sql.query(s);

const rows = await sql`select nama, tahun, kategori from prestasi order by created_at`;
console.log(`OK. Total prestasi di DB: ${rows.length}`);
for (const r of rows) console.log(` - [${r.tahun}] ${r.kategori} — ${r.nama}`);
