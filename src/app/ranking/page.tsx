'use client';
import { useImexData } from '@/hooks/useImexData';
import { RankingItem, ImexRecord } from '@/lib/types';
import { MAX_SCORES } from '@/lib/constants';
import { Trophy, Medal, Printer } from 'lucide-react';

export default function RankingPage() {
  const { data: allData = [], isLoading } = useImexData({ refetchInterval: 5000 });

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

  const handlePrint = () => { window.print(); };
  const printGroup = () => {
    const tableHtml = document.querySelector('.data-table')?.outerHTML;
    if (!tableHtml) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html><html><head><title>Ranking PDF</title><style>${document.querySelector('style')?.innerHTML || ''}</style></head><body>${tableHtml}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const printGroupDetails = (tajuk: string) => {
    const groupData = allData.filter(d => d.tajuk_projek === tajuk);
    if (groupData.length === 0) return;

    const getPanelData = (panelNameFragment: string) => groupData.find(d => d.panel.includes(panelNameFragment));
    
    const p1 = getPanelData('1.');
    const p2 = getPanelData('2.');
    const p3 = getPanelData('3.');

    const panels = [p1, p2, p3];
    const getVal = (p: ImexRecord | undefined, key: keyof ImexRecord) => p ? p[key] as number : '-';

    const calcAvg = (key: keyof ImexRecord) => {
      const valid = panels.filter(p => p !== undefined);
      if (valid.length === 0) return '-';
      const sum = valid.reduce((acc, p) => acc + ((p as any)[key] || 0), 0);
      return (sum / valid.length).toFixed(1);
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laporan Penilaian - ${tajuk}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          h2 { text-align: center; margin-bottom: 5px; }
          h3 { text-align: center; margin-top: 0; color: #666; font-weight: normal; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: center; }
          th { background-color: #f3f4f6; font-weight: bold; }
          .left { text-align: left; }
          .summary { margin-top: 30px; border: 1px solid #ddd; padding: 15px; background: #fafafa; }
        </style>
      </head>
      <body>
        <h2>Laporan Penilaian Projek IMEX TVETMARA Besut</h2>
        <h3>Tajuk Projek: <strong>${tajuk}</strong></h3>
        
        <table>
          <thead>
            <tr>
              <th class="left">Kriteria Penilaian</th>
              <th>Panel 1<br/><small>(Ust Nor Hesham)</small></th>
              <th>Panel 2<br/><small>(Pn Noor Azila)</small></th>
              <th>Panel 3<br/><small>(Ust Muhd Aiman)</small></th>
              <th>Purata</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="left">A. Persembahan (95)</td>
              <td>${getVal(p1, 'jumlah_persembahan')}</td>
              <td>${getVal(p2, 'jumlah_persembahan')}</td>
              <td>${getVal(p3, 'jumlah_persembahan')}</td>
              <td><strong>${calcAvg('jumlah_persembahan')}</strong></td>
            </tr>
            <tr>
              <td class="left">B. Semangat Berpasukan (65)</td>
              <td>${getVal(p1, 'jumlah_semangat')}</td>
              <td>${getVal(p2, 'jumlah_semangat')}</td>
              <td>${getVal(p3, 'jumlah_semangat')}</td>
              <td><strong>${calcAvg('jumlah_semangat')}</strong></td>
            </tr>
            <tr>
              <td class="left">C. Idea Boleh Dipasarkan (60)</td>
              <td>${getVal(p1, 'jumlah_idea')}</td>
              <td>${getVal(p2, 'jumlah_idea')}</td>
              <td>${getVal(p3, 'jumlah_idea')}</td>
              <td><strong>${calcAvg('jumlah_idea')}</strong></td>
            </tr>
            <tr style="background-color: #f9fafb; font-weight: bold; font-size: 1.1em;">
              <td class="left">Jumlah Keseluruhan (220)</td>
              <td>${getVal(p1, 'jumlah_keseluruhan')}</td>
              <td>${getVal(p2, 'jumlah_keseluruhan')}</td>
              <td>${getVal(p3, 'jumlah_keseluruhan')}</td>
              <td>${calcAvg('jumlah_keseluruhan')}</td>
            </tr>
            <tr style="background-color: #f3f4f6; font-weight: bold; font-size: 1.1em;">
              <td class="left">Peratusan (%)</td>
              <td>${p1 ? p1.peratus + '%' : '-'}</td>
              <td>${p2 ? p2.peratus + '%' : '-'}</td>
              <td>${p3 ? p3.peratus + '%' : '-'}</td>
              <td>${calcAvg('peratus')}%</td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <p><strong>Bilangan Panel Menilai:</strong> ${panels.filter(p => p !== undefined).length} / 3</p>
          <p><strong>Status:</strong> ${panels.filter(p => p !== undefined).length === 3 ? 'Selesai' : 'Belum Selesai'}</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  return (
    <div className="page-content fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Print Button */}
      <button onClick={handlePrint} className="btn-primary no-print" style={{ alignSelf: "flex-end", marginBottom: 10 }}>
        Cetak PDF
      </button>
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
                  <th style={{ textAlign: 'center', width: 60 }} className="no-print">Cetak</th>
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
                      <td style={{ textAlign: 'center' }} className="no-print">
                        <button onClick={() => printGroupDetails(item.tajuk)} className="btn-ghost" style={{ padding: '6px' }} title="Cetak Laporan">
                          <Printer size={16} />
                        </button>
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
