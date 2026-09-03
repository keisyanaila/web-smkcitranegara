-- Isi tabel prestasi dengan 6 prestasi yang sudah ada.
-- Jalankan di Neon: dashboard > SQL Editor > tempel semua > Run.
-- Aman dijalankan berulang: baris dengan nama sama tidak akan diduplikasi.

insert into prestasi (nama, tahun, kategori, tingkat, foto, deskripsi)
select v.nama, v.tahun, v.kategori, v.tingkat, v.foto, v.deskripsi
from (values
  ('JUARA 1 Ultimate Futsal Championship Sejabodetabek',
   '2026', 'Olahraga', 'Jabodetabek', '/images/futsalcn2.jpg',
   'Tim futsal putra SMK Citra Negara keluar sebagai juara pertama pada ajang Ultimate Futsal Championship tingkat Sejabodetabek.'),

  ('JUARA 1 Futsal Nation Region Depok',
   '2025', 'Olahraga', 'Kota', '/images/futsalcn1.jpg',
   'Juara pertama turnamen Futsal Nation tingkat Kota Depok.'),

  ('JUARA 1 Battle in Style Dance Competition | Garena Youth Championship',
   '2026', 'Seni', 'Nasional', '/images/juaranusabeast.jpg',
   'Tim dance SMK Citra Negara meraih juara pertama kategori pelajar pada Battle in Style Dance Competition (Garena Youth Championship).'),

  ('JUARA 1 Turnamen Esport Free Fire Sejabodetabek',
   '2025', 'Olahraga Elektronik', 'Jabodetabek', '/images/esport.jpg',
   'Juara pertama turnamen Esport Free Fire tingkat Sejabodetabek (Prambors x Top Coffee Gen2ation).'),

  ('JUARA UMUM Kolakarya Tingkat Jabodetabek',
   '2025', 'Seni', 'Jabodetabek', '/images/citter.jpg',
   'Meraih gelar juara umum pada ajang Kolakarya tingkat Jabodetabek.'),

  ('JUARA 1 Turnamen Taekwondo Nasional | Mendagri Cup 2025',
   '2025', 'Olahraga', 'Nasional', '/images/tekon.jpg',
   'Juara pertama pada turnamen Taekwondo tingkat nasional, Mendagri Cup 2025.')
) as v(nama, tahun, kategori, tingkat, foto, deskripsi)
where not exists (select 1 from prestasi p where p.nama = v.nama);
