import Plot from 'react-plotly.js'
import { useData } from '../hooks/useData'

export default function IssueBreakdown() {
  const data = useData('issue_vote_dist.json')
  if (!data) return null

  const issues  = data.map(d => d.issue_name)
  const colors  = { yes:'#10b981', abstain:'#f59e0b', no:'#ef4444', absent:'#4b5563' }

  const traces = ['yes','abstain','no','absent'].map(v => ({
    type:  'bar',
    name:  v.charAt(0).toUpperCase() + v.slice(1),
    x:     data.map(d => d[v]),
    y:     issues,
    orientation: 'h',
    marker: { color: colors[v] },
    hovertemplate: `%{y}: %{x:.1f}%<extra>${v.toUpperCase()}</extra>`,
  }))

  return (
    <section>
      <p className="section-label">SQL Analysis · Q1</p>
      <h2 className="section-title">Voting by Issue Category</h2>
      <p className="section-sub">
        Human Rights draws the lowest YES share (69%) — the sharpest fault line
        across all issue categories, and the one where conventional bloc solidarity breaks down.
      </p>
      <div className="card" style={{ padding: '0.5rem' }}>
        <Plot
          data={traces}
          layout={{
            barmode: 'stack',
            height:  320,
            paper_bgcolor: '#1f2937',
            plot_bgcolor:  '#1f2937',
            font:  { color: '#e6edf3' },
            margin: { t: 20, b: 40, l: 180, r: 20 },
            xaxis: { title:'Share of votes (%)', gridcolor:'#30363d', range:[0,100] },
            yaxis: { gridcolor:'#30363d' },
            legend: { orientation:'h', x:0.5, xanchor:'center', y:-0.2,
                      bgcolor:'rgba(0,0,0,0)', font:{ size:11 } },
          }}
          config={{ responsive:true, displayModeBar:false }}
          style={{ width:'100%' }}
          useResizeHandler
        />
      </div>
    </section>
  )
}
