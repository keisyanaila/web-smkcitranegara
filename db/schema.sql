-- Jalankan sekali di Neon: dashboard > SQL Editor > tempel semua isi file ini > Run.

create extension if not exists "pgcrypto";

-- ── Media (gambar di-upload dari form admin, disimpan sebagai base64) ──
create table if not exists media (
  id          uuid primary key default gen_random_uuid(),
  filename    text        not null,
  mime        text        not null,
  data        text        not null,          -- base64
  size        integer     not null,
  created_at  timestamptz not null default now()
);

-- ── Berita ──
create table if not exists berita (
  id          uuid primary key default gen_random_uuid(),
  slug        text        not null unique,
  judul       text        not null,
  tanggal     date        not null default current_date,
  kategori    text        not null default 'Kegiatan',
  penulis     text        not null default 'Humas SMK Citra Negara',
  gambar      text        not null default '',
  ringkasan   text        not null default '',
  konten      text        not null default '',   -- pisahkan paragraf dengan baris kosong
  published   boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Prestasi ──
create table if not exists prestasi (
  id          uuid primary key default gen_random_uuid(),
  nama        text        not null,                  -- nama prestasi, mis. "JUARA 1 ..."
  tahun       text        not null default '',
  kategori    text        not null default 'Akademik',
  tingkat     text        not null default '',       -- mis. "Nasional", "Provinsi"
  anggota     text        not null default '[]',     -- JSON: [{"nama":"...","kelas":"..."}]
  foto        text        not null default '',
  deskripsi   text        not null default '',
  published   boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Perbaikan tabel lama ──
-- Kalau tabel sudah ada dari versi sebelumnya, "create table if not exists" di atas
-- tidak menambah kolom yang kurang. Baris di bawah melengkapinya (aman diulang).

alter table media add column if not exists filename   text        not null default 'upload';
alter table media add column if not exists mime       text        not null default 'application/octet-stream';
alter table media add column if not exists data       text        not null default '';
alter table media add column if not exists size       integer     not null default 0;
alter table media add column if not exists created_at timestamptz not null default now();

alter table berita add column if not exists tanggal    date        not null default current_date;
alter table berita add column if not exists kategori   text        not null default 'Kegiatan';
alter table berita add column if not exists penulis    text        not null default 'Humas SMK Citra Negara';
alter table berita add column if not exists gambar     text        not null default '';
alter table berita add column if not exists ringkasan  text        not null default '';
alter table berita add column if not exists konten     text        not null default '';
alter table berita add column if not exists published  boolean     not null default true;
alter table berita add column if not exists created_at timestamptz not null default now();
alter table berita add column if not exists updated_at timestamptz not null default now();

alter table prestasi add column if not exists tahun      text        not null default '';
alter table prestasi add column if not exists kategori   text        not null default 'Akademik';
alter table prestasi add column if not exists tingkat    text        not null default '';
alter table prestasi add column if not exists anggota    text        not null default '[]';
alter table prestasi add column if not exists foto       text        not null default '';
alter table prestasi add column if not exists deskripsi  text        not null default '';
alter table prestasi add column if not exists published  boolean     not null default true;
alter table prestasi add column if not exists created_at timestamptz not null default now();
alter table prestasi add column if not exists updated_at timestamptz not null default now();

-- ── Index (dibuat setelah kolom dipastikan ada) ──
create index if not exists berita_tanggal_idx on berita (tanggal desc);
create index if not exists prestasi_created_idx on prestasi (created_at desc);
