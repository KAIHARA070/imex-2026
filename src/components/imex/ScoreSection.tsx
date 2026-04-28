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
      {/* Section Header */}
      <div className="score-section-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 700, fontSize: 14 }}>{title}</p>
            <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>
              {currentTotal}<span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 12 }}> / {maxScore}</span>
            </p>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Score Rows */}
      <div>
        {fields.map((field, idx) => {
          const val = scores[field.id] || 0;
          return (
            <div key={field.id} className="score-row">
              <div>
                {field.kriteria && (
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    {field.kriteria}
                  </p>
                )}
                <p style={{ fontSize: 13, color: field.kriteria ? 'var(--text)' : 'var(--muted)' }}>
                  {field.desc}
                </p>
              </div>
              <select
                className="score-select"
                value={val}
                data-val={val > 0 ? val.toString() : undefined}
                onChange={e => {
                  const newVal = parseInt(e.target.value);
                  onChange(field.id, newVal);
                  // Update data-val for color
                  e.target.dataset.val = newVal > 0 ? newVal.toString() : '';
                }}
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
