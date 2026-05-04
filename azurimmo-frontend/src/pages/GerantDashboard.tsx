import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Batiment, Appartement, Contrat, Intervention } from '../types'

type Page = 'accueil' | 'batiments' | 'appartements' | 'contrats' | 'interventions'

const API_BASE = import.meta.env.VITE_API_BASE

// ─────────────────────────────────────────────
// HOOK GÉNÉRIQUE — charge des données depuis l'API
// ─────────────────────────────────────────────
// Ce hook (fonction réutilisable) évite de réécrire le même fetch + loading + error
// dans chaque composant. On le réutilise pour batiments, contrats, interventions...
function useFetch<T>(url: string, deps: unknown[] = []) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Erreur HTTP ${r.status}`)
        return r.json()
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}

// ─────────────────────────────────────────────
// SOUS-COMPOSANTS — une page par section
// ─────────────────────────────────────────────

// ── Page Bâtiments ──────────────────────────
function PageBatiments({ onViewAppartements }: { onViewAppartements: (b: Batiment) => void }) {
  const { data: batiments, loading, error } = useFetch<Batiment>(`${API_BASE}/batiments/liste`)

  if (loading) return <Loader text="Chargement des bâtiments…" />
  if (error)   return <ErrorMsg text={error} />

  return (
    <>
      <PageHeader title="Bâtiments" sub={`${batiments.length} bâtiment${batiments.length > 1 ? 's' : ''}`} />
      <div style={styles.grid3}>
        {batiments.map(b => (
          <div key={b.id} style={styles.card}>
            <div style={styles.cardTop}>
              <div style={{ ...styles.cardIcon, background: 'rgba(0,150,199,0.15)', color: '#48cae4' }}>🏗️</div>
              <span style={styles.cardId}>#{b.id}</span>
            </div>
            <h3 style={styles.cardTitle}>{b.nom ?? `Bâtiment #${b.id}`}</h3>
            <p style={styles.cardSub}>{b.adresse}</p>
            <p style={{ ...styles.cardSub, color: '#48cae4', marginTop: 2 }}>{b.ville}</p>
            {b.nombreAppartements !== undefined && (
              <p style={styles.cardMeta}>{b.nombreAppartements} appartement{b.nombreAppartements > 1 ? 's' : ''}</p>
            )}
            <button style={styles.btnSecondary} onClick={() => onViewAppartements(b)}>
              Voir les appartements →
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Page Appartements ────────────────────────
function PageAppartements({ batimentFiltre }: { batimentFiltre: Batiment | null }) {
  // Si on arrive depuis "Voir les appartements" d'un bâtiment, on filtre par bâtiment
  // Sinon on charge tous les appartements
  const url = batimentFiltre
    ? `${API_BASE}/appartements/batiment/${batimentFiltre.id}`
    : `${API_BASE}/appartements/`

  const { data: appartements, loading, error } = useFetch<Appartement>(url, [batimentFiltre?.id])
  const navigate = useNavigate()

  if (loading) return <Loader text="Chargement des appartements…" />
  if (error)   return <ErrorMsg text={error} />

  return (
    <>
      <PageHeader
        title="Appartements"
        sub={batimentFiltre
          ? `${appartements.length} appart. — ${batimentFiltre.nom ?? 'Bâtiment #' + batimentFiltre.id}`
          : `${appartements.length} appartement${appartements.length > 1 ? 's' : ''}`}
      />
      <div style={styles.grid3}>
        {appartements.map(a => (
          <div key={a.id} style={styles.card}>
            <div style={styles.cardTop}>
              <div style={{ ...styles.cardIcon, background: 'rgba(105,224,156,0.15)', color: '#69e09c' }}>🏠</div>
              <span style={styles.cardId}>Apt. {a.numero ?? a.id}</span>
            </div>
            <h3 style={styles.cardTitle}>{a.batiment?.nom ?? `Bâtiment #${a.batiment?.id}`}</h3>
            <p style={styles.cardSub}>{a.batiment?.ville}</p>
            <div style={styles.chips}>
              <span style={styles.chip}>{a.surface} m²</span>
              <span style={styles.chip}>{a.nombreDePiece} pièce{a.nombreDePiece > 1 ? 's' : ''}</span>
            </div>
            {/* Bouton vers la fiche publique de l'appartement */}
            <button style={styles.btnSecondary} onClick={() => navigate(`/appartements/${a.id}`)}>
              Voir la fiche →
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Page Contrats ────────────────────────────
function PageContrats() {
  const { data: contrats, loading, error } = useFetch<Contrat>(`${API_BASE}/contrats/liste`)

  const formatDate = (d: string | null) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('fr-FR')
  }

  // Retourne la couleur du badge selon le statut
  const statutColor = (s: string) => {
    switch (s?.toUpperCase()) {
      case 'ACTIF':    return { bg: 'rgba(105,224,156,0.15)', color: '#69e09c' }
      case 'TERMINE':
      case 'TERMINÉ':  return { bg: 'rgba(255,100,100,0.15)', color: '#ff6b6b' }
      default:         return { bg: 'rgba(255,255,255,0.08)', color: '#aaa' }
    }
  }

  if (loading) return <Loader text="Chargement des contrats…" />
  if (error)   return <ErrorMsg text={error} />

  return (
    <>
      <PageHeader title="Contrats" sub={`${contrats.length} contrat${contrats.length > 1 ? 's' : ''}`} />
      <div style={styles.table}>
        {/* Ligne d'en-tête du tableau */}
        <div style={styles.tableHead}>
          <span>ID</span>
          <span>Description</span>
          <span>Appart.</span>
          <span>Début</span>
          <span>Fin</span>
          <span>Montant</span>
          <span>Statut</span>
        </div>
        {contrats.map((c, i) => {
          const sc = statutColor(c.statut)
          return (
            <div key={c.id} style={{ ...styles.tableRow, animationDelay: `${i * 0.04}s` }}>
              <span style={{ color: '#48cae4', fontWeight: 600 }}>#{c.id}</span>
              <span style={{ color: '#ccc', fontSize: '0.82rem' }}>{c.description || '—'}</span>
              <span>Apt. #{c.appartementId}</span>
              <span>{formatDate(c.dateDebut)}</span>
              <span>{formatDate(c.dateFin)}</span>
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>
                {c.montantBrut ? `${c.montantBrut + (c.montantCharge ?? 0)} €` : '—'}
              </span>
              <span style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 20,
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
                background: sc.bg, color: sc.color
              }}>
                {c.statut ?? '—'}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── Page Interventions ───────────────────────
function PageInterventions() {
  const { data: interventions, loading, error } = useFetch<Intervention>(`${API_BASE}/interventions/liste`)

  if (loading) return <Loader text="Chargement des interventions…" />
  if (error)   return <ErrorMsg text={error} />

  // Couleur par type d'intervention (typeInterventionId)
  const typeColor = (id: number) => {
    const colors: Record<number, { bg: string; color: string; label: string }> = {
      1: { bg: 'rgba(0,150,199,0.15)',  color: '#48cae4', label: 'Plomberie'    },
      2: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24', label: 'Électricité'  },
      3: { bg: 'rgba(236,72,153,0.15)', color: '#f472b6', label: 'Serrurerie'   },
      4: { bg: 'rgba(105,224,156,0.15)',color: '#69e09c', label: 'Menuiserie'   },
      5: { bg: 'rgba(167,139,250,0.15)',color: '#a78bfa', label: 'Déménagement' },
    }
    return colors[id] ?? { bg: 'rgba(255,255,255,0.08)', color: '#aaa', label: `Type #${id}` }
  }

  return (
    <>
      <PageHeader title="Interventions" sub={`${interventions.length} intervention${interventions.length > 1 ? 's' : ''}`} />
      <div style={styles.grid2}>
        {interventions.map((inv, i) => {
          const tc = typeColor(inv.typeInterventionId)
          return (
            <div key={inv.id} style={{ ...styles.card, animationDelay: `${i * 0.04}s` }}>
              <div style={styles.cardTop}>
                <span style={{
                  padding: '3px 10px', borderRadius: 20,
                  fontSize: '0.72rem', fontWeight: 700,
                  background: tc.bg, color: tc.color
                }}>
                  {tc.label}
                </span>
                <span style={styles.cardId}>Apt. #{inv.appartementId}</span>
              </div>
              <h3 style={styles.cardTitle}>{inv.libelle || 'Intervention'}</h3>
              <p style={styles.cardSub}>{inv.description}</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                {inv.heure && (
                  <span style={styles.chip}>🕐 {String(inv.heure).slice(0, 5)}</span>
                )}
                {inv.ville && (
                  <span style={styles.chip}>📍 {inv.ville}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─────────────────────────────────────────────
// COMPOSANTS UTILITAIRES (réutilisés partout)
// ─────────────────────────────────────────────
function Loader({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
      <div style={{
        width: 24, height: 24, border: '3px solid rgba(255,255,255,0.1)',
        borderTopColor: '#0096c7', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      {text}
    </div>
  )
}

function ErrorMsg({ text }: { text: string }) {
  return (
    <div style={{
      background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
      borderRadius: 12, padding: '20px 24px', color: '#ff6b6b', marginTop: 20
    }}>
      ⚠️ {text}
    </div>
  )
}

function PageHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>
        {title}
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginTop: 4 }}>{sub}</p>
    </div>
  )
}

// ─────────────────────────────────────────────
// STYLES — objet JavaScript de styles inline
// Utilisés comme style={{ ...styles.card }} dans le JSX
// ─────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 16,
    width: '100%',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
    width: '100%',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: '20px 22px',
    transition: 'all 0.2s',
    animation: 'fadeUp 0.4s ease both',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    width: 38, height: 38, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
  },
  cardId: {
    fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)',
    fontWeight: 600, letterSpacing: '0.06em',
  },
  cardTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0,
  },
  cardSub: {
    fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0,
  },
  cardMeta: {
    fontSize: '0.75rem', color: '#48cae4', margin: '4px 0',
  },
  chips: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 },
  chip: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 20, padding: '3px 10px',
    fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
  },
  btnSecondary: {
    marginTop: 14,
    background: 'rgba(0,150,199,0.12)',
    border: '1px solid rgba(0,150,199,0.25)',
    borderRadius: 8, padding: '7px 14px',
    color: '#48cae4', fontSize: '0.8rem', fontWeight: 600,
    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.2s', width: '100%',
  },
  // Tableau pour les contrats
  table: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16,
    overflow: 'auto',  // scroll horizontal sur petits écrans
    width: '100%',
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 80px 100px 100px 100px 110px',
    gap: 12, padding: '12px 20px',
    background: 'rgba(255,255,255,0.05)',
    fontSize: '0.7rem', fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    minWidth: 700,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 80px 100px 100px 100px 110px',
    gap: 12, padding: '14px 20px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    fontSize: '0.83rem', color: 'rgba(255,255,255,0.7)',
    transition: 'background 0.15s', animation: 'fadeUp 0.4s ease both',
    alignItems: 'center',
    minWidth: 700,
  },
}

// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL — Dashboard
// ─────────────────────────────────────────────
export default function GerantDashboard() {
  const navigate = useNavigate()

  const gerantJson = localStorage.getItem('gerant')
  const gerant = gerantJson ? JSON.parse(gerantJson) : null

  // Page active dans la sidebar
  const [activePage, setActivePage] = useState<Page>('accueil')

  // Bâtiment sélectionné — sert à filtrer les appartements
  // quand on clique "Voir les appartements" depuis la page Bâtiments
  const [batimentFiltre, setBatimentFiltre] = useState<Batiment | null>(null)

  const handleLogout = () => {
    localStorage.removeItem('gerant')
    navigate('/login')
  }

  // Navigation items de la sidebar avec leur icône SVG
  const navItems: { id: Page; label: string; emoji: string }[] = [
    { id: 'accueil',       label: 'Accueil',       emoji: '🏠' },
    { id: 'batiments',     label: 'Bâtiments',     emoji: '🏗️' },
    { id: 'appartements',  label: 'Appartements',  emoji: '🏡' },
    { id: 'contrats',      label: 'Contrats',      emoji: '📄' },
    { id: 'interventions', label: 'Interventions', emoji: '🔧' },
  ]

  // Quand on clique "Voir les appartements" depuis la page Bâtiments
  const handleViewAppartements = (b: Batiment) => {
    setBatimentFiltre(b)       // on mémorise le bâtiment choisi
    setActivePage('appartements') // on change de page
  }

  // Quand on change de page manuellement via la sidebar
  // on réinitialise le filtre bâtiment
  const handleNav = (page: Page) => {
    if (page !== 'appartements') setBatimentFiltre(null)
    setActivePage(page)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }

        .g-shell { display: flex; height: 100vh; background: #0a0f1e; font-family: 'DM Sans', sans-serif; color: #e8eaf0; overflow: hidden; }

        /* ── SIDEBAR ── */
        .g-sidebar {
          width: 230px; min-width: 230px;
          background: #0d1426;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
        }
        .g-sidebar::before {
          content: ''; position: absolute;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(0,150,199,0.1) 0%, transparent 70%);
          top: -80px; left: -80px; pointer-events: none;
        }
        .g-logo { padding: 24px 20px 18px; display: flex; align-items: center; gap: 11px; border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 2; }
        .g-logo-icon { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #0096c7, #0d47a1); display: flex; align-items: center; justify-content: center; font-size: 17px; box-shadow: 0 4px 14px rgba(0,150,199,0.4); flex-shrink: 0; }
        .g-logo-text { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 800; background: linear-gradient(135deg,#fff,#90caf9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .g-logo-sub  { font-size: 0.6rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; }
        .g-profile { padding: 16px 20px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 2; }
        .g-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#0096c7,#48cae4); display: flex; align-items: center; justify-content: center; font-family: 'Syne',sans-serif; font-weight: 700; font-size: 0.82rem; color: white; flex-shrink: 0; box-shadow: 0 0 0 2px rgba(0,150,199,0.3); }
        .g-profile-name { font-size: 0.82rem; font-weight: 600; color: #e8eaf0; line-height: 1.2; }
        .g-profile-role { font-size: 0.65rem; color: #48cae4; font-weight: 500; }
        .g-nav { flex: 1; padding: 14px 10px; display: flex; flex-direction: column; gap: 2px; position: relative; z-index: 2; overflow-y: auto; }
        .g-nav-label { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.22); padding: 8px 10px 4px; }
        .g-nav-btn { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 9px; cursor: pointer; transition: all 0.15s; color: rgba(255,255,255,0.45); font-size: 0.84rem; font-weight: 500; border: none; background: transparent; width: 100%; text-align: left; position: relative; font-family: 'DM Sans',sans-serif; }
        .g-nav-btn:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
        .g-nav-btn.active { background: rgba(0,150,199,0.14); color: #fff; }
        .g-nav-btn.active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 55%; background: #0096c7; border-radius: 0 3px 3px 0; }
        .g-nav-emoji { font-size: 15px; flex-shrink: 0; }
        .g-sidebar-footer { padding: 14px 10px 22px; border-top: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 2; }
        .g-logout { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 9px; cursor: pointer; transition: all 0.15s; color: rgba(255,100,100,0.55); font-size: 0.84rem; font-weight: 500; border: none; background: transparent; width: 100%; text-align: left; font-family: 'DM Sans',sans-serif; }
        .g-logout:hover { background: rgba(255,80,80,0.1); color: #ff6b6b; }

        /* ── CONTENU ── */
        .g-main { flex: 1; overflow-y: auto; background: #0a0f1e; position: relative; }
        .g-main-grad { position: absolute; top: 0; left: 0; right: 0; height: 260px; background: linear-gradient(180deg, rgba(0,100,170,0.3) 0%, transparent 100%); pointer-events: none; }
        .g-content { position: relative; z-index: 2; padding: 38px 38px 60px; width: 100%; box-sizing: border-box; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .g-sidebar { width: 200px; min-width: 200px; }
          .g-content { padding: 24px 20px 40px; }
        }
        @media (max-width: 640px) {
          .g-sidebar { width: 56px; min-width: 56px; }
          .g-logo-text, .g-logo-sub, .g-profile-name, .g-profile-role, .g-nav-label { display: none; }
          .g-logo { padding: 16px 10px; justify-content: center; }
          .g-profile { padding: 12px 10px; justify-content: center; }
          .g-nav-btn { justify-content: center; padding: 10px; }
          .g-nav-btn span:last-child { display: none; }
          .g-logout span:last-child { display: none; }
          .g-logout { justify-content: center; }
          .g-content { padding: 20px 14px 40px; }
        }

        /* Hover sur card */
        .g-card-hover:hover { background: rgba(255,255,255,0.07) !important; border-color: rgba(0,150,199,0.28) !important; transform: translateY(-3px); }
        .g-tr:hover { background: rgba(255,255,255,0.04); }

        /* Scrollbar */
        .g-main::-webkit-scrollbar { width: 5px; }
        .g-main::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.09); border-radius: 3px; }
        .g-nav::-webkit-scrollbar { width: 3px; }
        .g-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 2px; }
      `}</style>

      <div className="g-shell">

        {/* ══ SIDEBAR ══════════════════════════════ */}
        <aside className="g-sidebar">

          <div className="g-logo">
            <div className="g-logo-icon">🏢</div>
            <div>
              <div className="g-logo-text">AzurImmo</div>
              <div className="g-logo-sub">Espace Gérant</div>
            </div>
          </div>

          <div className="g-profile">
            {/* Initiales du gérant dans l'avatar */}
            <div className="g-avatar">
              {gerant?.prenom?.[0]?.toUpperCase()}{gerant?.nom?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="g-profile-name">{gerant?.prenom} {gerant?.nom}</div>
              <div className="g-profile-role">Gérant</div>
            </div>
          </div>

          <nav className="g-nav">
            <div className="g-nav-label">Navigation</div>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`g-nav-btn ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNav(item.id)}
              >
                <span className="g-nav-emoji">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="g-sidebar-footer">
            <button className="g-logout" onClick={handleLogout}>
              <span style={{ fontSize: 15 }}>🚪</span>
              Se déconnecter
            </button>
          </div>
        </aside>

        {/* ══ CONTENU PRINCIPAL ════════════════════ */}
        <main className="g-main">
          <div className="g-main-grad" />
          <div className="g-content">

            {/* ── Page Accueil ── */}
            {activePage === 'accueil' && (
              <>
                <div style={{ marginBottom: 36 }}>
                  <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: '2.1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>
                    Bonjour, {gerant?.prenom} 👋
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Tableau de bord de gestion immobilière</p>
                </div>

                {/* Raccourcis vers chaque section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 36, width: '100%' }}>
                  {[
                    { page: 'batiments'     as Page, emoji: '🏗️', label: 'Bâtiments',     color: 'rgba(0,150,199,0.2)',  tc: '#48cae4' },
                    { page: 'appartements'  as Page, emoji: '🏡', label: 'Appartements',  color: 'rgba(105,224,156,0.2)', tc: '#69e09c' },
                    { page: 'contrats'      as Page, emoji: '📄', label: 'Contrats',      color: 'rgba(251,191,36,0.2)',  tc: '#fbbf24' },
                    { page: 'interventions' as Page, emoji: '🔧', label: 'Interventions', color: 'rgba(244,114,182,0.2)', tc: '#f472b6' },
                  ].map(item => (
                    <div
                      key={item.page}
                      className="g-card-hover"
                      onClick={() => handleNav(item.page)}
                      style={{
                        ...styles.card, cursor: 'pointer',
                        alignItems: 'center', textAlign: 'center', padding: '28px 20px',
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 10 }}>{item.emoji}</div>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{item.label}</span>
                      <span style={{ fontSize: '0.72rem', color: item.tc, marginTop: 4, fontWeight: 600 }}>Gérer →</span>
                    </div>
                  ))}
                </div>

                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                  Connecté en tant que <strong style={{ color: '#48cae4' }}>{gerant?.mail}</strong>
                </p>
              </>
            )}

            {/* ── Pages dynamiques ── */}
            {activePage === 'batiments'     && <PageBatiments onViewAppartements={handleViewAppartements} />}
            {activePage === 'appartements'  && <PageAppartements batimentFiltre={batimentFiltre} />}
            {activePage === 'contrats'      && <PageContrats />}
            {activePage === 'interventions' && <PageInterventions />}

          </div>
        </main>
      </div>
    </>
  )
}