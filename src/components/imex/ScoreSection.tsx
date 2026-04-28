import { ScoreField } from '@/lib/types';

interface Props {
  title: string;
  maxScore: number;
  fields: ScoreField[];
  scores: Record<string, number>;
  onChange: (id: string, value: number) => void;
  currentTotal: number;
}

export default function ScoreSection({ title, maxScore, fields, scores, onChange, currentTotal }: Props) {
  const pct = Math.round((currentTotal / maxScore) * 100);

  return (
    <div className="score-section-card">
      <div className="score-section-header">
        <div style={{ flex: 1 }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>{title}</h3>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>
              {currentTotal} <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '12px' }}>/ {maxScore}</span>
            </p>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 0' }}>
        {fields.map((field) => {
          const val = scores[field.id] || 0;
          return (
            <div key={field.id} className="score-row">
              <div style={{ flex: 1 }}>
                {field.kriteria && (
                  <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {field.kriteria}
                  </p>
                )}
                <p style={{ fontSize: '13px', color: '#ddd' }}>{field.desc}</p>
              </div>
              <select
                className="score-select"
                value={val}
                data-val={val > 0 ? val.toString() : undefined}
                onChange={e => onChange(field.id, parseInt(e.target.value))}
              >
                <option value={0}>—</option>
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
