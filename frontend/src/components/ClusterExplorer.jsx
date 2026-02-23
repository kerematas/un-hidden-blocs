import Plot from 'react-plotly.js'
import { useData } from '../hooks/useData'

const CLUSTER_COLORS = { 1:'#ef4444', 2:'#3b82f6', 3:'#10b981', 4:'#f59e0b' }
const CLUSTER_NAMES  = { 1:'Global South', 2:'Western Bloc', 3:'Swing States', 4:'US-Aligned Core' }
const ISSUES = ['CO','DI','EC','HR','ME','NU']
const ISSUE_LABELS = {
  CO:'Colonialism', DI:'Disarmament', EC:'Econ Dev',
  HR:'Human Rights', ME:'Middle East', NU:'Nuclear'
}

export default function ClusterExplorer() {
  const countries = useData('countries.json')
  const profiles  = useData('cluster_profiles.json')
  if (!countries || !profiles) return null

  // ── PCA scatter ─────────────────────────────────────────────────────────
  const scatterTraces = [1,2,3,4].map(c => {
    const g = countries.filter(d => d.cluster === c)
    return {
      type: 'scatter',
      mode: 'markers',
      name: CLUSTER_NAMES[c],
      x: g.map(d => d.pca_x),
      y: g.map(d => d.pca_y),
      text: g.map(d => `<b>${d.name}</b><br>${CLUSTER_NAMES[d.cluster]}`),
      hovertemplate: '%{text}<extra></extra>',
      marker: { color: CLUSTER_COLORS[c], size: 8, opacity: 0.85,
                line: { color: '#0d1117', width: 1 } },
    }
  })

  // ── Cluster profile bar ──────────────────────────────────────────────────
  const barTraces = profiles.map(p => ({
    type: 'bar',
    name: p.cluster_name,
    x: ISSUES.map(i => ISSUE_LABELS[i]),
    y: ISSUES.map(i => p.yes_rates[i]),
    marker: { color: CLUSTER_COLORS[p.cluster], opacity: 0.85 },
    hovertemplate: '%{x}: %{y}%<extra>' + p.cluster_name + '</extra>',
  }))

  const darkLayout = {
    paper_bgcolor: '#1f2937',
    plot_bgcolor:  '#1f2937',
    font: { color: '#e6edf3' },
    legend: { bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } },
    margin: { t: 30, b: 60, l: 50, r: 20 },
  }

  return (
    <section>
      <p className="section-label">Machine Learning · k-means</p>
      <h2 className="section-title">Inside the Blocs</h2>
      <p className="section-sub">
        Left: each dot is a country, projected to 2D via PCA (95.8% variance explained).
        Right: mean YES-rate per issue shows what each bloc actually stands for.
      </p>

      <div className="grid-2">
        <div className="card" style={{ padding: '0.5rem' }}>
          <Plot
            data={scatterTraces}
            layout={{
              ...darkLayout,
              height: 380,
              xaxis: { title: 'PC1 (87.3%)', gridcolor:'#30363d', zerolinecolor:'#30363d' },
              yaxis: { title: 'PC2 (8.5%)',  gridcolor:'#30363d', zerolinecolor:'#30363d' },
              showlegend: true,
              legend: { ...darkLayout.legend, orientation:'h', x:0.5, xanchor:'center', y:-0.18 },
            }}
            config={{ responsive:true, displayModeBar:false }}
            style={{ width:'100%' }}
            useResizeHandler
          />
        </div>

        <div className="card" style={{ padding: '0.5rem' }}>
          <Plot
            data={barTraces}
            layout={{
              ...darkLayout,
              height: 380,
              barmode: 'group',
              xaxis: { gridcolor:'#30363d' },
              yaxis: { title:'YES-rate (%)', gridcolor:'#30363d', range:[0,105] },
              showlegend: true,
              legend: { ...darkLayout.legend, orientation:'h', x:0.5, xanchor:'center', y:-0.28 },
            }}
            config={{ responsive:true, displayModeBar:false }}
            style={{ width:'100%' }}
            useResizeHandler
          />
        </div>
      </div>
    </section>
  )
}
