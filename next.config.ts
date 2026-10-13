import type { NextConfig } from "next";

// File di /public tidak punya hash di namanya, jadi tidak di-cache "selamanya":
// browser memakai salinan lokal 1 hari, lalu sampai 30 hari tetap tampil instan
// sambil mengecek versi baru di belakang.
const STATIC_CACHE = "public, max-age=86400, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  images: {
    // AVIF lebih kecil dari WebP; browser lama otomatis dapat WebP.
    formats: ["image/avif", "image/webp"],
    // Hasil optimasi gambar disimpan 30 hari.
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return ["/images/:path*", "/audio/:path*", "/videos/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
    }));
  },
};

export default nextConfig;
