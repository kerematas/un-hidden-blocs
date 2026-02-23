const TOOLS = [
  {
    category: 'Data & Storage',
    items: ['Python', 'pandas', 'SQLite', 'SQL (CTEs, window functions)'],
  },
  {
    category: 'Analysis',
    items: ['scikit-learn (k-means, PCA)', 'Jupyter Notebooks'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'Plotly.js', 'CSS Variables'],
  },
  {
    category: 'Data Source',
    items: ['Erik Voeten\'s UNGA Voting Dataset', 'Harvard Dataverse', '1946 - 2023'],
  },
]

export default function ToolsUsed() {
  return (
    <section>
      <p className="section-label">Stack</p>
      <h2 className="section-title">Tools Used</h2>
      <div className="grid-4">
        {TOOLS.map(({ category, items }) => (
          <div key={category} className="card">
            <div style={{
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem',
            }}>
              {category}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {items.map(item => (
                <li key={item} style={{
                  fontSize: '0.88rem', color: 'var(--muted)',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  <span style={{ color: 'var(--border)', fontSize: '0.6rem' }}>&#9632;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
