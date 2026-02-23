import Plot from 'react-plotly.js'
import { useData } from '../hooks/useData'

export default function Timeline() {
  const data = useData('resolutions_per_year.json')
  if (!data) return null

  return (
    <section>
      <p className="section-label">SQL Analysis · Q6</p>
      <h2 className="section-title">UNGA Activity: 1946 – 2023</h2>
      <p className="section-sub">
        Resolution volume peaked in the early 1980s at the height of Cold War tensions,
        then fell sharply after the USSR dissolved. The decolonisation wave of the 1960s
        is visible as a step-change in membership and legislative activity.
      </p>
      <div className="card" style={{ padding:'0.5rem' }}>
        <Plot
          data={[{
            type: 'bar',
            x: data.map(d => d.year),
            y: data.map(d => d.count),
            marker: { color: '#3b82f6', opacity: 0.8 },
            hovertemplate: '%{x}: %{y} resolutions<extra></extra>',
          }]}
          layout={{
            height: 300,
            paper_bgcolor: '#1f2937',
            plot_bgcolor:  '#1f2937',
            font:  { color:'#e6edf3' },
            margin: { t:20, b:50, l:55, r:20 },
            xaxis: { title:'Year', gridcolor:'#30363d' },
            yaxis: { title:'Resolutions passed', gridcolor:'#30363d' },
            shapes: [
              { type:'line', x0:1960, x1:1960, y0:0, y1:200,
                line:{ color:'#8b949e', dash:'dot', width:1 } },
              { type:'line', x0:1991, x1:1991, y0:0, y1:200,
                line:{ color:'#8b949e', dash:'dot', width:1 } },
            ],
            annotations: [
              { x:1962, y:185, text:'Decolonisation boom', showarrow:false,
                font:{ color:'#8b949e', size:10 } },
              { x:1993, y:185, text:'Post-Cold War', showarrow:false,
                font:{ color:'#8b949e', size:10 } },
            ],
            showlegend: false,
          }}
          config={{ responsive:true, displayModeBar:false }}
          style={{ width:'100%' }}
          useResizeHandler
        />
      </div>
    </section>
  )
}
