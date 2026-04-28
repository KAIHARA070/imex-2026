'use client';
import { useEffect, useState } from 'react';
import { useSaveImex } from '@/hooks/useImexData';
import { PANELS, PANEL_SHORT, PROJECT_LIST, IMEX_SCHEMA, MAX_SCORES } from '@/lib/constants';
import { ImexRecord } from '@/lib/types';
import Swal from 'sweetalert2';
import ScoreSection from './ScoreSection';
import { X, Send, ChevronDown } from 'lucide-react';

function buildEmptyScores(): Record<string, number> {
  const s: Record<string, number> = {};
  for (let j = 1; j <= 19; j++) s[`p${j}`] = 0;
  for (let j = 1; j <= 13; j++) s[`s${j}`] = 0;
  for (let j = 1; j <= 12; j++) s[`i${j}`] = 0;
  return s;
}

function calcScores(scores: Record<string, number>) {
  let sumP = 0, sumS = 0, sumI = 0;
  for (let j = 1; j <= 19; j++) sumP += scores[`p${j}`] || 0;
  for (let j = 1; j <= 13; j++) sumS += scores[`s${j}`] || 0;
  for (let j = 1; j <= 12; j++) sumI += scores[`i${j}`] || 0;
  const total = sumP + sumS + sumI;
  const pct = parseFloat(((total / MAX_SCORES.keseluruhan) * 100).toFixed(2));
  return { sumP, sumS, sumI, total, pct };
}

interface Props {
  open: boolean;
  panelId: string;
  editItem: ImexRecord | null;
  onClose: () => void;
}

export default function ImexModal({ open, panelId, editItem, onClose }: Props) {
  const isEdit = !!editItem;
  const saveImex = useSaveImex();
  const [tajuk, setTajuk] = useState('');
  const [scores, setScores] = useState<Record<string, number>>(buildEmptyScores());

  useEffect(() => {
    if (editItem) {
      setTajuk(editItem.tajuk_projek);
      const s: Record<string, number> = {};
      for (let j = 1; j <= 19; j++) s[`p${j}`] = (editItem as any)[`p${j}`] ?? 0;
      for (let j = 1; j <= 13; j++) s[`s${j}`] = (editItem as any)[`s${j}`] ?? 0;
      for (let j = 1; j <= 12; j++) s[`i${j}`] = (editItem as any)[`i${j}`] ?? 0;
      setScores(s);
    } else {
      setTajuk('');
      setScores(buildEmptyScores());
    }
  }, [editItem, open]);

  const handleScoreChange = (fieldId: string, value: number) =>
    setScores(prev => ({ ...prev, [fieldId]: value }));

  async function doSubmit() {
    if (!tajuk) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Pilih Projek', 
        text: 'Sila pilih tajuk projek terlebih dahulu.', 
        background: '#13131a', 
        color: '#f0f0f4', 
        confirmButtonColor: '#8b5cf6' 
      });
      return;
    }
    const { sumP, sumS, sumI, total, pct } = calcScores(scores);
    const payload = {
      panel: PANELS[panelId], tajuk_projek: tajuk, nama_kumpulan: '-',
      ...scores, jumlah_persembahan: sumP, jumlah_semangat: sumS,
      jumlah_idea: sumI, jumlah_keseluruhan: total, peratus: pct,
    };
    try {
      await saveImex.mutateAsync({ payload, isEdit, id: editItem?.id });
      onClose();
      Swal.fire({ 
        icon: 'success', 
        title: isEdit ? 'Dikemaskini!' : 'Disimpan!', 
        toast: true, 
        position: 'top-end', 
        showConfirmButton: false, 
        timer: 2000, 
        background: '#13131a', 
        color: '#f0f0f4' 
      });
    } catch (err: any) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Gagal', 
        text: err.message, 
        background: '#13131a', 
        color: '#f0f0f4', 
        confirmButtonColor: '#8b5cf6' 
      });
    }
  }

  if (!open) return null;

  const { sumP, sumS, sumI, total, pct } = calcScores(scores);
  const totalPct = Math.round((total / MAX_SCORES.keseluruhan) * 100);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box slide-up">
        <div className="modal-drag-handle" />

        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>
              {isEdit ? 'Kemaskini Penilaian' : 'Borang Penilaian Baru'}
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {PANEL_SHORT[panelId]} • Skala 1–5
            </p>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Tajuk Projek FYP
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={tajuk}
                onChange={e => setTajuk(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg3)',
                  color: '#fff',
                  fontSize: '14px',
                  appearance: 'none'
                }}
              >
                <option value="">— Pilih Projek FYP —</option>
                {PROJECT_LIST.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)' }} />
            </div>
          </div>

          <ScoreSection title="A. Persembahan" maxScore={MAX_SCORES.persembahan} fields={IMEX_SCHEMA.persembahan} scores={scores} onChange={handleScoreChange} currentTotal={sumP} />
          <ScoreSection title="B. Semangat Berpasukan" maxScore={MAX_SCORES.semangat} fields={IMEX_SCHEMA.semangat} scores={scores} onChange={handleScoreChange} currentTotal={sumS} />
          <ScoreSection title="C. Idea Boleh Dipasarkan" maxScore={MAX_SCORES.idea} fields={IMEX_SCHEMA.idea} scores={scores} onChange={handleScoreChange} currentTotal={sumI} />
        </div>

        <div className="modal-footer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Jumlah Keseluruhan</p>
                <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>{total} / {MAX_SCORES.keseluruhan}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Peratusan</p>
                <p style={{ fontSize: '20px', fontWeight: 800 }}>{pct}%</p>
              </div>
            </div>
            
            <div className="progress-track" style={{ height: '10px' }}>
              <div className="progress-fill" style={{ width: `${totalPct}%` }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={onClose} className="btn-ghost" style={{ flex: 1 }}>Batal</button>
              <button type="button" onClick={doSubmit} disabled={saveImex.isPending} className="btn-primary" style={{ flex: 2 }}>
                <Send size={18} />
                {saveImex.isPending ? 'Menyimpan...' : 'Hantar Penilaian'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
