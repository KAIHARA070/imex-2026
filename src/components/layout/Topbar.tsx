'use client';
import { usePathname } from 'next/navigation';
import { PANEL_SHORT } from '@/lib/constants';
import { Menu } from 'lucide-react';

export default function Topbar() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === '/ranking') return { emoji: '🏆', text: 'Ranking Penilaian' };
    const m = pathname.match(/\/panel\/(\d+)/);
    if (m) return { emoji: '📊', text: `Panel ${m[1]} — ${PANEL_SHORT[m[1]] || ''}` };
    return { emoji: '📋', text: 'IMEX 2026' };
  };

  const { emoji, text } = getTitle();

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <div>
          <p style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{text}</p>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>Projek FYP PPU IKM Besut</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 12px', borderRadius: 8,
          background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 6px var(--success)' }} />
          <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Live</span>
        </div>
      </div>
    </header>
  );
}
