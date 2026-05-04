import { useNavigate, Link } from 'react-router-dom'

export default function GerantDashboard() {
  const navigate = useNavigate()

  const gerantJson = localStorage.getItem('gerant')
  const gerant = gerantJson ? JSON.parse(gerantJson) : null

  const handleLogout = () => {
    localStorage.removeItem('gerant')
    navigate('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4ff', padding: 40 }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <h1 style={{ color: '#0d47a1' }}>
          Bonjour, {gerant?.prenom} {gerant?.nom} 👋
        </h1>
        <p style={{ color: '#666' }}>Votre espace de gestion immobilière</p>

        {/* Cartes de navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>

          <Link to="/gerant/batiments" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: 16, padding: 28,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              cursor: 'pointer', transition: 'transform 0.2s'
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🏗️</div>
              <h3 style={{ color: '#0d47a1', margin: 0 }}>Mes Bâtiments</h3>
              <p style={{ color: '#888', fontSize: '0.875rem', marginTop: 6 }}>
                Gérer vos bâtiments
              </p>
            </div>
          </Link>

          <Link to="/gerant/appartements" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: 16, padding: 28,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
              <h3 style={{ color: '#0d47a1', margin: 0 }}>Mes Appartements</h3>
              <p style={{ color: '#888', fontSize: '0.875rem', marginTop: 6 }}>
                Gérer vos appartements
              </p>
            </div>
          </Link>

        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 40, padding: '10px 24px',
            background: 'transparent', border: '1.5px solid #e53935',
            color: '#e53935', borderRadius: 10, cursor: 'pointer',
            fontWeight: 600, fontSize: '0.875rem'
          }}
        >
          Se déconnecter
        </button>

      </div>
    </div>
  )
}