import Plot from 'react-plotly.js'
import { useData } from '../hooks/useData'

const COLORS = ['#3b82f6','#ef4444','#f59e0b','#10b981','#8b5cf6','#ec4899','#06b6d4','#84cc16','#f97316']

export default function USAlignment() {
  const data = useData('us_alignment.json')
  if (!data) return null

  const traces = data.map((c, i) => ({
    type: 'scatter',
    mode: 'lines+markers',
    name: c.country_name,
    x:    c.decades,
    y:    c.agreement,
    line: { color: COLORS[i % COLORS.length], width: 2 },
    marker: { size: 6 },
    hovertemplate: `<b>${c.country_name}</b><br>%{x}s: %{y}%<extra></extra>`,
  }))

  return (
    <section>
      <p className="section-label">SQL Analysis · Q5</p>
      <h2 className="section-title">Alignment with the United States Over Time</h2>
      <p className="section-sub">
        Global agreement with US votes dropped from a median of 34.2% pre-1991 to 20.4%
        post-Cold War — the dissolution of the USSR removed the main axis of opposition,
        freeing more countries to diverge from Washington.
      </p>
      <div className="card" style={{ padding: '0.5rem' }}>
        <Plot
          data={traces}
          layout={{
            height: 420,
            paper_bgcolor: '#1f2937',
            plot_bgcolor:  '#1f2937',
            font:  { color: '#e6edf3' },
            margin: { t: 20, b: 60, l: 60, r: 20 },
            xaxis: { title:'Decade', gridcolor:'#30363d', dtick:10 },
            yaxis: { title:'Agreement with US (%)', gridcolor:'#30363d', range:[0,100] },
            shapes: [{
              type:'line', x0:1991, x1:1991, y0:0, y1:100,
              line: { color:'#8b949e', dash:'dash', width:1 },
            }],
            annotations: [{
              x:1993, y:95, xref:'x', yref:'y',
              text:'USSR dissolved', showarrow:false,
              font: { color:'#8b949e', size:11 },
            }],
            legend: { bgcolor:'rgba(0,0,0,0)', font:{ size:11 } },
          }}
          config={{ responsive:true, displayModeBar:false }}
          style={{ width:'100%' }}
          useResizeHandler
        />
      </div>
    </section>
  )
}
