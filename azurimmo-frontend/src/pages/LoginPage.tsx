import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE

export default function LoginPage() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/gerant/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, password })
      })

      if (!res.ok) {
        setError('Email ou mot de passe incorrect')
        return
      }

      const gerant = await res.json()

      localStorage.setItem('gerant', JSON.stringify(gerant))

      navigate('/gerant/dashboard')

    } catch {
      setError('Impossible de contacter le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d47a1, #1565c0, #0097c7)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: 48,
        width: 380,
        boxShadow: '0 24px 64px rgba(0,0,0,0.25)'
      }}>

        {/* Logo / titre */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #0d47a1, #0097c7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 24
          }}>🏢</div>
          <h1 style={{ color: '#0d47a1', margin: 0, fontSize: '1.6rem' }}>AzurImmo</h1>
          <p style={{ color: '#888', margin: '6px 0 0', fontSize: '0.9rem' }}>Espace Gérant</p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div style={{
            background: '#fce4ec', color: '#c62828',
            padding: '10px 14px', borderRadius: 10,
            marginBottom: 20, fontSize: '0.875rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Email
            </label>
            <input
              type="email"
              value={mail}
              onChange={e => setMail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={{
                padding: '11px 14px', borderRadius: 10,
                border: '1.5px solid #ddd', fontSize: '0.95rem',
                outline: 'none', transition: 'border 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                padding: '11px 14px', borderRadius: 10,
                border: '1.5px solid #ddd', fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8, padding: '13px',
              background: loading ? '#90caf9' : 'linear-gradient(135deg, #0d47a1, #0097c7)',
              color: 'white', border: 'none', borderRadius: 12,
              fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>

        {/* Lien retour */}
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: '#888' }}>
          <span
            onClick={() => navigate('/')}
            style={{ color: '#0d47a1', cursor: 'pointer', fontWeight: 500 }}
          >
            ← Retour aux appartements
          </span>
        </p>

      </div>
    </div>
  )
}