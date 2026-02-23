import Hero               from './components/Hero'
import WorldMap           from './components/WorldMap'
import ClusterExplorer    from './components/ClusterExplorer'
import IssueBreakdown     from './components/IssueBreakdown'
import USAlignment        from './components/USAlignment'
import Timeline           from './components/Timeline'
import DivisiveResolutions from './components/DivisiveResolutions'
import AlliesRivals       from './components/AlliesRivals'
import ToolsUsed         from './components/ToolsUsed'

function Divider() {
  return <hr className="divider" style={{ maxWidth:1200, margin:'0 auto' }} />
}

function Footer() {
  return (
    <footer style={{
      textAlign:'center', padding:'3rem 2rem',
      color:'var(--muted)', fontSize:'0.85rem',
      borderTop:'1px solid var(--border)',
    }}>
      <p>
        Data: Voeten, Erik, Anton Strezhnev, and Michael Bailey.{' '}
        <a href="https://doi.org/10.7910/DVN/LEJUQZ" target="_blank" rel="noreferrer">
          "United Nations General Assembly Voting Data."
        </a>{' '}
        Harvard Dataverse, 2009.
      </p>
      <p style={{ marginTop:'0.4rem' }}>
        Built by Kerem Atas · 2025
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Hero />
      <Divider />
      <WorldMap />
      <Divider />
      <ClusterExplorer />
      <Divider />
      <IssueBreakdown />
      <Divider />
      <USAlignment />
      <Divider />
      <Timeline />
      <Divider />
      <DivisiveResolutions />
      <Divider />
      <AlliesRivals />
      <Divider />
      <ToolsUsed />
      <Footer />
    </>
  )
}
