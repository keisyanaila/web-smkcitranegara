import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/lib/i18n';
import PauseOffscreenAnimations from '@/components/PauseOffscreenAnimations';

export const metadata: Metadata = {
  title: 'SMKCitra Negara - Sekolah Menengah Atas ',
  description: 'SMK Citra Negara - Mencetak generasi profesional dan berkarakter.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <LangProvider>{children}</LangProvider>
        <PauseOffscreenAnimations />
      </body>
    </html>
  );
}
