import Plot from 'react-plotly.js'
import { useData } from '../hooks/useData'

const CLUSTER_COLORS = {
  1: '#ef4444',
  2: '#3b82f6',
  3: '#10b981',
  4: '#f59e0b',
}

const CLUSTER_NAMES = {
  1: 'Global South',
  2: 'Western Bloc',
  3: 'Swing States',
  4: 'US-Aligned Core',
}

export default function WorldMap() {
  const countries = useData('countries.json')
  if (!countries) return <div style={{ color: 'var(--muted)', padding: '2rem' }}>Loading map…</div>

  const traces = [1, 2, 3, 4].map(c => {
    const group = countries.filter(d => d.cluster === c)
    return {
      type: 'choropleth',
      locationmode: 'ISO-3',
      locations: group.map(d => d.id),
      z: group.map(() => c),
      zmin: 1, zmax: 4,
      colorscale: [[0, CLUSTER_COLORS[c]], [1, CLUSTER_COLORS[c]]],
      showscale: false,
      name: CLUSTER_NAMES[c],
      text: group.map(d =>
        `<b>${d.name}</b><br>Cluster: ${CLUSTER_NAMES[d.cluster]}<br>` +
        Object.entries(d.yes_rates).map(([k, v]) => `${k}: ${v}%`).join('<br>')
      ),
      hovertemplate: '%{text}<extra></extra>',
    }
  })

  return (
    <section>
      <p className="section-label">Global Overview</p>
      <h2 className="section-title">The Four Voting Blocs</h2>
      <p className="section-sub">
        K-means clustering on 77 years of voting records groups 197 countries into
        4 blocs — purely by how they vote, with no geographic or political assumptions.
      </p>

      <div className="card" style={{ padding: '0.5rem' }}>
        <Plot
          data={traces}
          layout={{
            geo: {
              showframe: false,
              showcoastlines: true,
              coastlinecolor: '#30363d',
              showland: true,
              landcolor: '#1f2937',
              showocean: true,
              oceancolor: '#0d1117',
              showlakes: false,
              bgcolor: '#0d1117',
              projection: { type: 'natural earth' },
            },
            paper_bgcolor: '#1f2937',
            plot_bgcolor:  '#1f2937',
            margin: { t: 0, b: 0, l: 0, r: 0 },
            height: 480,
            showlegend: true,
            legend: {
              orientation: 'h',
              x: 0.5, xanchor: 'center',
              y: -0.02,
              font: { color: '#e6edf3', size: 12 },
              bgcolor: 'rgba(0,0,0,0)',
            },
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%' }}
          useResizeHandler
        />
      </div>

      {/* Cluster legend cards */}
      <div className="grid-4" style={{ marginTop: '1.5rem' }}>
        {[
          { id: 1, desc: '79 countries · YES >89% on all issues · Post-colonial solidarity bloc' },
          { id: 2, desc: '57 countries · YES ~51–66% · Skeptical on nuclear & human rights' },
          { id: 3, desc: '48 countries · YES ~71–80% · Moderate on Middle East, includes China, India, Russia' },
          { id: 4, desc: '13 countries · YES only 23% on Middle East · USA, Israel, Pacific microstates' },
        ].map(({ id, desc }) => (
          <div key={id} className="card" style={{ borderTop: `3px solid ${CLUSTER_COLORS[id]}` }}>
            <span className={`cluster-badge cluster-${id}`}>{CLUSTER_NAMES[id]}</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem' }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
