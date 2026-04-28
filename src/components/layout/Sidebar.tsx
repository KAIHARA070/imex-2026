'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PANELS, PANEL_SHORT } from '@/lib/constants';
import { Trophy, Users, GraduationCap, Activity } from 'lucide-react';

const links = [
  { name: 'Ranking', href: '/ranking', icon: Trophy, short: 'Ranking' },
  { name: `Panel 1`, href: '/panel/1', icon: Users, short: 'Panel 1' },
  { name: `Panel 2`, href: '/panel/2', icon: Users, short: 'Panel 2' },
  { name: `Panel 3`, href: '/panel/3', icon: Users, short: 'Panel 3' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>IMEX 2026</p>
              <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>Sistem Penilaian IMEX TVETMARA Besut</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 6px 8px' }}>Menu</p>
          {links.map(link => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`sidebar-link ${active ? 'active' : ''}`}>
                <link.icon size={17} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(16,185,129,0.08)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.15)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
            <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Sistem Aktif</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        {links.map(link => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={`bottom-nav-item ${active ? 'active' : ''}`}>
              <link.icon size={20} />
              <span>{link.short}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
