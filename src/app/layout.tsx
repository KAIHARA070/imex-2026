import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistem Penilaian IMEX 2026',
  description: 'Sistem Penilaian Projek IMEX TVETMARA Besut',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" data-scroll-behavior="smooth">
      <body>
        <Providers>
          <div className="main-layout">
            <Sidebar />
            <div className="main-content">
              <Topbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
