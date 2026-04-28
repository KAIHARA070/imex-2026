'use client';
import { useImexData } from '@/hooks/useImexData';
import { RankingItem } from '@/lib/types';
import { MAX_SCORES } from '@/lib/constants';
import { Trophy, Medal } from 'lucide-react';

export default function RankingPage() {
  const { data: allData = [], isLoading } = useImexData();

  const groupMap: Record<string, { tajuk: string; totalMarkah: number; count: number }> = {};
  for (const item of allData) {
    const key = (item.tajuk_projek || '').toUpperCase().trim();
    if (!key) continue;
    if (!groupMap[key]) groupMap[key] = { tajuk: item.tajuk_projek, totalMarkah: 0, count: 0 };
    groupMap[key].totalMarkah += item.jumlah_keseluruhan || 0;
    groupMap[key].count += 1;
  }

  const ranking: RankingItem[] = Object.values(groupMap)
    .map(g => ({ tajuk: g.tajuk, purata: g.totalMarkah / g.count, jumlah_panel: g.count }))
    .sort((a, b) => b.purata - a.purata);

  const medals = ['🥇', '🥈', '🥉'];
  const medalColors = ['#f59e0b', '#9ca3af', '#cd7c3a'];
  const pctColor = (p: number) => p >= 80 ? 'var(--success)' : p >= 60 ? '#60a5fa' : p >= 40 ? '#f59e0b' : 'var(--danger)';

  if (isLoading) return (
    <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(124,58,237,0.2)', borderTopColor: 'var(--primary)', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div className="page-content fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header Card */}
      <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          🏆
        </div>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 18 }}>Ranking Pencapaian IMEX 2026</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 3 }}>
            {ranking.length > 0 ? `${ranking.length} projek telah dinilai` : 'Belum ada penilaian'} • Disusun mengikut purata markah
          </p>
        </div>
      </div>

      {ranking.length === 0 ? (
        <div className="glass-card empty-state">
          <span style={{ fontSize: 48 }}>📊</span>
          <p style={{ fontWeight: 700, fontSize: 18 }}>Tiada Data Ranking</p>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Mulakan penilaian di panel juri untuk melihat ranking.</p>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {ranking.length >= 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: ranking.length >= 3 ? 'repeat(3, 1fr)' : `repeat(${ranking.length}, 1fr)`, gap: 12 }}>
              {ranking.slice(0, 3).map((item, i) => (
                <div key={item.tajuk} className="glass-card" style={{
                  padding: '20px 16px', textAlign: 'center',
                  borderColor: i === 0 ? 'rgba(245,158,11,0.3)' : 'var(--border)',
                  background: i === 0 ? 'rgba(245,158,11,0.05)' : 'var(--card)',
                  order: i === 0 ? 1 : i === 1 ? 0 : 2,
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{medals[i]}</div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, lineHeight: 1.4 }}>{item.tajuk}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: medalColors[i] }}>{item.purata.toFixed(1)}</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)' }}>/ {MAX_SCORES.keseluruhan}</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{item.jumlah_panel} panel dinilai</p>
                </div>
              ))}
            </div>
          )}

          {/* Full Table */}
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 50, textAlign: 'center' }}>#</th>
                  <th>Tajuk Projek</th>
                  <th style={{ textAlign: 'center' }}>Purata Markah</th>
                  <th style={{ textAlign: 'center' }}>Peratusan</th>
                  <th style={{ textAlign: 'center' }}>Panel</th>
                  <th style={{ minWidth: 120 }}>Prestasi</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((item, i) => {
                  const pct = (item.purata / MAX_SCORES.keseluruhan) * 100;
                  return (
                    <tr key={item.tajuk}>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>
                        {i < 3 ? <span style={{ fontSize: 18 }}>{medals[i]}</span> : <span style={{ color: 'var(--muted)' }}>{i + 1}</span>}
                      </td>
                      <td style={{ fontWeight: 500 }}>{item.tajuk}</td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary)' }}>
                        {item.purata.toFixed(1)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 700, color: pctColor(pct) }}>{pct.toFixed(1)}%</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="badge badge-blue">{item.jumlah_panel}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-track" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
