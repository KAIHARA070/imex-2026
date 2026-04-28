'use client';
import { useState } from 'react';
import { useImexData, useDeleteImex } from '@/hooks/useImexData';
import { PANELS, PANEL_SHORT, MAX_SCORES } from '@/lib/constants';
import { ImexRecord } from '@/lib/types';
import ImexTable from './ImexTable';
import ImexModal from './ImexModal';
import Swal from 'sweetalert2';
import { Plus, RefreshCw, ClipboardList, BarChart3, Target } from 'lucide-react';

export default function PanelView({ panelId }: { panelId: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<ImexRecord | null>(null);
  const { data: allData = [], isLoading, error, refetch } = useImexData();
  const deleteImex = useDeleteImex();

  const panelName = PANELS[panelId];
  const panelData = allData.filter(d => d.panel === panelName);
  const avgScore = panelData.length
    ? (panelData.reduce((a, b) => a + (b.jumlah_keseluruhan || 0), 0) / panelData.length).toFixed(1)
    : '—';
  const avgPct = panelData.length
    ? ((panelData.reduce((a, b) => a + (b.peratus || 0), 0) / panelData.length)).toFixed(1)
    : '—';

  function handleEdit(item: ImexRecord) {
    setEditItem(item);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: 'Hapus Penilaian?',
      text: 'Tindakan ini tidak boleh diundur.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      background: '#13131a',
      color: '#f0f0f4',
    });
    if (!result.isConfirmed) return;
    try {
      await deleteImex.mutateAsync(id);
      Swal.fire({ icon: 'success', title: 'Dihapus!', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, background: '#13131a', color: '#f0f0f4' });
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: e.message, background: '#13131a', color: '#f0f0f4' });
    }
  }

  const stats = [
    { label: 'Juri Aktif', value: PANEL_SHORT[panelId], icon: <Target size={18} />, color: 'var(--primary)' },
    { label: 'Projek Dinilai', value: `${panelData.length} / 25`, icon: <ClipboardList size={18} />, color: '#3b82f6' },
    { label: 'Purata Markah', value: avgScore === '—' ? '—' : `${avgScore}`, icon: <BarChart3 size={18} />, color: 'var(--success)' },
  ];

  return (
    <div className="page-content fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <p style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
              <div style={{ color: s.color, opacity: 0.8 }}>{s.icon}</div>
            </div>
            <p style={{ fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <p style={{ fontWeight: 700, fontSize: 15 }}>Senarai Penilaian</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => refetch()} title="Muat semula"
            style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', display: 'flex' }}>
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button onClick={() => { setEditItem(null); setModalOpen(true); }} className="btn-primary">
            <Plus size={16} />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="glass-card empty-state">
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(124,58,237,0.2)', borderTopColor: 'var(--primary)', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Memuatkan data...</p>
        </div>
      )}

      {error && (
        <div className="glass-card" style={{ padding: 24, textAlign: 'center', borderColor: 'rgba(239,68,68,0.3)' }}>
          <p style={{ color: 'var(--danger)' }}>Ralat: {(error as Error).message}</p>
        </div>
      )}

      {!isLoading && !error && (
        <ImexTable data={panelData} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <ImexModal open={modalOpen} panelId={panelId} editItem={editItem} onClose={() => { setModalOpen(false); setEditItem(null); }} />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
