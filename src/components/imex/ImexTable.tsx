import { ImexRecord } from '@/lib/types';
import { MAX_SCORES } from '@/lib/constants';
import { Edit2, Trash2, FileText } from 'lucide-react';

interface Props {
  data: ImexRecord[];
  onEdit: (item: ImexRecord) => void;
  onDelete: (id: number) => void;
}

function PctBadge({ pct }: { pct: number }) {
  const cls = pct >= 80 ? 'badge-green' : pct >= 60 ? 'badge-blue' : pct >= 40 ? 'badge-amber' : 'badge-red';
  return <span className={`badge ${cls}`}>{Number(pct).toFixed(1)}%</span>;
}

export default function ImexTable({ data, onEdit, onDelete }: Props) {
  if (data.length === 0) {
    return (
      <div className="glass-card empty-state fade-up">
        <div style={{ fontSize: 48 }}>📋</div>
        <p style={{ fontWeight: 700, fontSize: 18 }}>Belum Ada Penilaian</p>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Klik &ldquo;+ Tambah Penilaian&rdquo; untuk mula menilai projek.</p>
      </div>
    );
  }

  return (
    <div className="data-table-wrap fade-up">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: 40, textAlign: 'center' }}>#</th>
            <th>Tajuk Projek</th>
            <th style={{ textAlign: 'center' }}>P<span style={{ fontSize: 9 }}>/{MAX_SCORES.persembahan}</span></th>
            <th style={{ textAlign: 'center' }}>S<span style={{ fontSize: 9 }}>/{MAX_SCORES.semangat}</span></th>
            <th style={{ textAlign: 'center' }}>I<span style={{ fontSize: 9 }}>/{MAX_SCORES.idea}</span></th>
            <th style={{ textAlign: 'center' }}>Jumlah</th>
            <th style={{ textAlign: 'center' }}>Peratusan</th>
            <th style={{ textAlign: 'center', width: 80 }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td style={{ textAlign: 'center', color: 'var(--muted)', fontWeight: 600 }}>{i + 1}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={14} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }} title={item.tajuk_projek}>
                    {item.tajuk_projek}
                  </span>
                </div>
              </td>
              <td style={{ textAlign: 'center', fontWeight: 500 }}>{item.jumlah_persembahan}</td>
              <td style={{ textAlign: 'center', fontWeight: 500 }}>{item.jumlah_semangat}</td>
              <td style={{ textAlign: 'center', fontWeight: 500 }}>{item.jumlah_idea}</td>
              <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary)' }}>{item.jumlah_keseluruhan}</td>
              <td style={{ textAlign: 'center' }}><PctBadge pct={item.peratus || 0} /></td>
              <td style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                  <button onClick={() => onEdit(item)} title="Edit"
                    style={{ padding: 7, borderRadius: 7, border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.1)', color: '#a78bfa', cursor: 'pointer', display: 'flex' }}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => onDelete(item.id)} title="Hapus"
                    style={{ padding: 7, borderRadius: 7, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#f87171', cursor: 'pointer', display: 'flex' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
