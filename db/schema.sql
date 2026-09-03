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
create index if not exists berita_tanggal_idx on berita (tanggal desc);

-- ── Prestasi ──
create table if not exists prestasi (
  id          uuid primary key default gen_random_uuid(),
  nama        text        not null,
  tahun       text        not null default '',
  kategori    text        not null default 'Akademik',
  tingkat     text        not null default '',       -- mis. "Nasional", "Provinsi"
  foto        text        not null default '',
  deskripsi   text        not null default '',
  published   boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists prestasi_created_idx on prestasi (created_at desc);
