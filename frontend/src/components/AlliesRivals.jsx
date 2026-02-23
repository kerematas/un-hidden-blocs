import { useData } from '../hooks/useData'

function PairTable({ pairs, color }) {
  return (
    <table>
      <thead>
        <tr><th>Country A</th><th>Country B</th><th>Shared Votes</th><th>Agreement</th></tr>
      </thead>
      <tbody>
        {pairs.map((p, i) => (
          <tr key={i}>
            <td>{p.country_a}</td>
            <td>{p.country_b}</td>
            <td style={{ color:'var(--muted)' }}>{p.shared_votes.toLocaleString()}</td>
            <td>
              <span style={{
                fontWeight:700, color,
                background: `${color}22`,
                padding:'0.1rem 0.4rem', borderRadius:4, fontSize:'0.85rem'
              }}>
                {p.agreement_pct.toFixed(1)}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function AlliesRivals() {
  const data = useData('agreement_spotlight.json')
  if (!data) return null

  return (
    <section>
      <p className="section-label">SQL Analysis · Q4 · Pairwise Agreement</p>
      <h2 className="section-title">Closest Allies & Sharpest Rivals</h2>
      <p className="section-sub">
        From 19,121 country pairs — the ones that agreed most and least across
        all resolutions they both voted on.
      </p>
      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom:'1rem', color:'#10b981' }}>Most Aligned</h3>
          <PairTable pairs={data.most_aligned} color="#10b981" />
        </div>
        <div className="card">
          <h3 style={{ marginBottom:'1rem', color:'#ef4444' }}>Most Opposed</h3>
          <PairTable pairs={data.most_opposed} color="#ef4444" />
        </div>
      </div>
    </section>
  )
}
