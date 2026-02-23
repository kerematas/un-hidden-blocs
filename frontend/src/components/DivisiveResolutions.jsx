import { useData } from '../hooks/useData'

export default function DivisiveResolutions() {
  const data = useData('divisive_resolutions.json')
  if (!data) return null

  return (
    <section>
      <p className="section-label">SQL Analysis · Q2</p>
      <h2 className="section-title">Most Divisive Resolutions</h2>
      <p className="section-sub">
        Ranked by NO-vote share. The sharpest fault lines are Cold War–era resolutions —
        early UNGA sessions when bloc discipline was absolute and the USSR routinely faced
        overwhelming majorities.
      </p>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Yes</th>
              <th>No</th>
              <th>Abstain</th>
              <th>NO %</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.res_id}>
                <td style={{ color:'var(--muted)', fontSize:'0.8rem' }}>{row.rank}</td>
                <td style={{ color:'var(--muted)' }}>{row.year}</td>
                <td style={{ color:'#10b981' }}>{row.yes_votes}</td>
                <td style={{ color:'#ef4444' }}>{row.no_votes}</td>
                <td style={{ color:'#f59e0b' }}>{row.abstain_votes}</td>
                <td>
                  <span style={{
                    display:'inline-block', padding:'0.15rem 0.45rem',
                    borderRadius:4, fontSize:'0.8rem', fontWeight:700,
                    background: `rgba(239,68,68,${row.no_pct / 200})`,
                    color: row.no_pct > 60 ? '#ef4444' : 'var(--text)',
                  }}>
                    {row.no_pct}%
                  </span>
                </td>
                <td style={{ fontSize:'0.82rem', color:'var(--muted)', maxWidth:420 }}>
                  {row.description.length > 100
                    ? row.description.slice(0,100) + '…'
                    : row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
