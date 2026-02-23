import { useData } from '../hooks/useData'

export default function StatsFindings() {
  const s = useData('stats_summary.json')
  if (!s) return null

  const findings = [
    { key: 'h1', label: 'Issue Category → YES Rate', emoji: '📊' },
    { key: 'h2', label: 'Cold War End → US Alignment', emoji: '📉' },
    { key: 'h3', label: 'Geography → Voting Behavior', emoji: '🌍' },
  ]

  return (
    <section>
      <p className="section-label">Statistical Analysis · Hypothesis Tests</p>
      <h2 className="section-title">What the Numbers Say</h2>
      <p className="section-sub">
        Three non-parametric hypothesis tests on the full dataset. All results are
        statistically significant — but effect sizes tell the real story.
      </p>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        {findings.map(({ key, label, emoji }) => {
          const d = s[key]
          return (
            <div key={key} className="stat-card">
              <div style={{ fontSize:'1.5rem' }}>{emoji}</div>
              <div className="stat-label">{label}</div>
              <div className="stat-value">{d.p < 0.001 ? 'p < 0.001' : `p = ${d.p}`}</div>
              <div className="stat-test">{d.test} · {d.effect}</div>
              <div className="stat-finding">{d.finding}</div>
              {d.significant && <span className="sig-badge">Significant</span>}
            </div>
          )
        })}
      </div>

      {/* Clustering highlight */}
      <div className="card" style={{ borderLeft: '3px solid var(--accent)', display:'flex', gap:'1.5rem', alignItems:'flex-start' }}>
        <div style={{ fontSize:'2rem' }}>🔍</div>
        <div>
          <div style={{ fontWeight:700, marginBottom:'0.3rem' }}>
            Clustering result — k=4, Silhouette={s.clustering.silhouette}
          </div>
          <p style={{ color:'var(--muted)', fontSize:'0.92rem' }}>{s.clustering.finding}</p>
        </div>
      </div>
    </section>
  )
}
