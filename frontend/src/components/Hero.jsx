export default function Hero() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        backgroundImage: 'radial-gradient(rgba(88,166,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* UN logo + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
        <img
          src="/un-logo.png"
          alt="United Nations logo"
          style={{ width: 48, height: 48, opacity: 0.9 }}
        />
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            United Nations General Assembly
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
            1946 - 2023 · 77 Sessions
          </div>
        </div>
      </div>

      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, maxWidth: 800, marginBottom: '1.5rem' }}>
        How the World Divides:<br />
        <span style={{ color: 'var(--accent)' }}>Uncovering Hidden Voting Blocs</span>
      </h1>
      <p style={{ fontSize: '1.15rem', color: 'var(--muted)', maxWidth: 620, marginBottom: '3rem', lineHeight: 1.7 }}>
        Every UN vote is a public act of diplomacy. This project analyzes 843,000
        votes across 77 years to ask: do the real diplomatic alliances match what
        conventional wisdom (geography, Cold War allegiance, regional blocs) would predict?
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          ['843K', 'votes analyzed'],
          ['5,195', 'resolutions'],
          ['198', 'countries'],
          ['4', 'voting blocs discovered'],
        ].map(([val, label]) => (
          <div key={label} className="card" style={{ minWidth: 130 }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent)' }}>{val}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
        <span>↓ scroll to explore</span>
      </div>
    </div>
  )
}
