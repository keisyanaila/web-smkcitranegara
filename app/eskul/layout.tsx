/**
 * Layout semua halaman eskul.
 * Di HP / layar sentuh, efek yang berat untuk GPU dimatikan (backdrop blur, blend mode,
 * glow kursor). Animasi gerak (transform/opacity) dan musik tetap jalan.
 * Pembungkus pakai `display: contents` supaya tidak mengubah tata letak halaman.
 */
export default function EskulLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="esk-lite" style={{ display: 'contents' }}>
      {children}
      <style>{`
        @media (max-width: 768px), (pointer: coarse) {
          .esk-lite *, .esk-lite *::before, .esk-lite *::after {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            mix-blend-mode: normal !important;
          }
          .esk-lite .eskfx-glow, .esk-lite .eskfx-dot { display: none !important; }
        }
      `}</style>
    </div>
  );
}
