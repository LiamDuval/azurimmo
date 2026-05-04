import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type Page = 'accueil' | 'appartements' | 'batiments' | 'contrats' | 'interventions'

// ─────────────────────────────────────────────
// ICÔNES SVG inline (pas de dépendance externe)
// ─────────────────────────────────────────────
const Icons = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  apt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  contract: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
}

// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────
export default function GerantDashboard() {
  const navigate = useNavigate()

  // On lit les infos du gérant stockées au moment du login
  const gerantJson = localStorage.getItem('gerant')
  const gerant = gerantJson ? JSON.parse(gerantJson) : null

  // useState gère quelle page est active dans la sidebar
  // Par défaut on est sur 'accueil'
  const [activePage, setActivePage] = useState<Page>('accueil')

  const handleLogout = () => {
    // On supprime le gérant du localStorage → il est déconnecté
    localStorage.removeItem('gerant')
    navigate('/login')
  }

  // Navigation items de la sidebar
  const navItems = [
    { id: 'accueil'       as Page, label: 'Accueil',       icon: Icons.home      },
    { id: 'batiments'     as Page, label: 'Bâtiments',     icon: Icons.building  },
    { id: 'appartements'  as Page, label: 'Appartements',  icon: Icons.apt       },
    { id: 'contrats'      as Page, label: 'Contrats',      icon: Icons.contract  },
    { id: 'interventions' as Page, label: 'Interventions', icon: Icons.wrench    },
  ]

  return (
    <>
      {/* ── Styles injectés en <style> pour ne pas créer de fichier CSS séparé ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .g-shell {
          display: flex;
          height: 100vh;
          background: #0a0f1e;
          font-family: 'DM Sans', sans-serif;
          color: #e8eaf0;
          overflow: hidden;
        }

        /* ── SIDEBAR ── */
        .g-sidebar {
          width: 240px;
          min-width: 240px;
          background: #0d1426;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          padding: 0;
          position: relative;
          overflow: hidden;
        }

        /* Effet décoratif blob derrière la sidebar */
        .g-sidebar::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,150,199,0.12) 0%, transparent 70%);
          top: -80px;
          left: -80px;
          pointer-events: none;
        }

        .g-sidebar-logo {
          padding: 28px 24px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
          z-index: 2;
        }

        .g-logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0096c7, #0d47a1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,150,199,0.4);
        }

        .g-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #90caf9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .g-logo-sub {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Profil gérant */
        .g-profile {
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
          z-index: 2;
        }

        .g-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0096c7, #48cae4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(0,150,199,0.3);
        }

        .g-profile-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #e8eaf0;
          line-height: 1.2;
        }

        .g-profile-role {
          font-size: 0.7rem;
          color: #48cae4;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        /* Navigation */
        .g-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          z-index: 2;
          overflow-y: auto;
        }

        .g-nav-label {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding: 8px 12px 4px;
        }

        .g-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.18s ease;
          color: rgba(255,255,255,0.5);
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          position: relative;
        }

        .g-nav-item:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
        }

        /* Item actif — style Spotify avec barre et fond */
        .g-nav-item.active {
          background: rgba(0, 150, 199, 0.15);
          color: #fff;
        }

        .g-nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #0096c7;
          border-radius: 0 3px 3px 0;
        }

        .g-nav-item.active svg {
          color: #48cae4;
        }

        /* Bouton déconnexion en bas */
        .g-sidebar-footer {
          padding: 16px 12px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
          z-index: 2;
        }

        .g-logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.18s;
          color: rgba(255,100,100,0.6);
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .g-logout-btn:hover {
          background: rgba(255,80,80,0.1);
          color: #ff6b6b;
        }

        /* ── CONTENU PRINCIPAL ── */
        .g-main {
          flex: 1;
          overflow-y: auto;
          background: #0a0f1e;
          position: relative;
        }

        /* Dégradé en haut du contenu (comme Spotify) */
        .g-main-header-bg {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 280px;
          background: linear-gradient(180deg, rgba(0,100,170,0.35) 0%, transparent 100%);
          pointer-events: none;
        }

        .g-content {
          position: relative;
          z-index: 2;
          padding: 40px 40px 60px;
          max-width: 1100px;
        }

        .g-page-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 6px;
          letter-spacing: -0.03em;
        }

        .g-page-sub {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 36px;
        }

        /* ── CARDS ACCUEIL ── */
        .g-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }

        .g-stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.2s;
          cursor: pointer;
        }

        .g-stat-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(0,150,199,0.3);
          transform: translateY(-3px);
        }

        .g-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .g-stat-icon.blue  { background: rgba(0,150,199,0.2);  color: #48cae4; }
        .g-stat-icon.green { background: rgba(0,200,100,0.2);  color: #69e09c; }
        .g-stat-icon.amber { background: rgba(255,180,0,0.2);  color: #fbbf24; }
        .g-stat-icon.pink  { background: rgba(236,72,153,0.2); color: #f472b6; }

        .g-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 6px;
        }

        .g-stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
        }

        /* ── QUICK ACTIONS ── */
        .g-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .g-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }

        .g-action-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .g-action-card:hover {
          background: rgba(0,150,199,0.12);
          border-color: rgba(0,150,199,0.35);
        }

        .g-action-card:hover .g-chevron {
          transform: translateX(4px);
          color: #48cae4;
        }

        .g-action-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(0,150,199,0.15);
          color: #48cae4;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .g-action-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #e8eaf0;
          flex: 1;
        }

        .g-chevron {
          color: rgba(255,255,255,0.2);
          transition: all 0.2s;
        }

        /* ── PLACEHOLDER pages ── */
        .g-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          text-align: center;
          color: rgba(255,255,255,0.3);
          gap: 16px;
        }

        .g-placeholder-icon {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.15);
        }

        .g-placeholder h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }

        .g-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #0096c7, #0d47a1);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(0,150,199,0.3);
        }

        .g-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,150,199,0.4);
        }

        /* Scrollbar personnalisée */
        .g-main::-webkit-scrollbar { width: 6px; }
        .g-main::-webkit-scrollbar-track { background: transparent; }
        .g-main::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

        .g-nav::-webkit-scrollbar { width: 4px; }
        .g-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
      `}</style>

      <div className="g-shell">

        {/* ══════════════════════════════
            SIDEBAR — style Spotify
        ══════════════════════════════ */}
        <aside className="g-sidebar">

          {/* Logo */}
          <div className="g-sidebar-logo">
            <div className="g-logo-icon">🏢</div>
            <div>
              <div className="g-logo-text">AzurImmo</div>
              <div className="g-logo-sub">Espace Gérant</div>
            </div>
          </div>

          {/* Profil */}
          <div className="g-profile">
            {/* Avatar avec initiales */}
            <div className="g-avatar">
              {gerant?.prenom?.[0]?.toUpperCase()}{gerant?.nom?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="g-profile-name">{gerant?.prenom} {gerant?.nom}</div>
              <div className="g-profile-role">Gérant</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="g-nav">
            <div className="g-nav-label">Menu</div>

            {/*
              On boucle sur les items de navigation.
              Pour chaque item, on vérifie si son id correspond à activePage
              pour lui appliquer la classe "active".
              Le onClick met à jour le state activePage → React re-rend la sidebar et le contenu.
            */}
            {navItems.map(item => (
              <button
                key={item.id}
                className={`g-nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Déconnexion */}
          <div className="g-sidebar-footer">
            <button className="g-logout-btn" onClick={handleLogout}>
              {Icons.logout}
              Se déconnecter
            </button>
          </div>
        </aside>

        {/* ══════════════════════════════
            CONTENU PRINCIPAL
        ══════════════════════════════ */}
        <main className="g-main">
          <div className="g-main-header-bg" />

          <div className="g-content">

            {/* ── PAGE ACCUEIL ── */}
            {activePage === 'accueil' && (
              <>
                <h1 className="g-page-title">Bonjour, {gerant?.prenom} 👋</h1>
                <p className="g-page-sub">Votre tableau de bord de gestion immobilière</p>

                {/* Stats rapides */}
                <div className="g-cards-grid">
                  <div className="g-stat-card" onClick={() => setActivePage('batiments')}>
                    <div className="g-stat-icon blue">{Icons.building}</div>
                    <div className="g-stat-label">Bâtiments</div>
                    <div className="g-stat-value">—</div>
                  </div>
                  <div className="g-stat-card" onClick={() => setActivePage('appartements')}>
                    <div className="g-stat-icon green">{Icons.apt}</div>
                    <div className="g-stat-label">Appartements</div>
                    <div className="g-stat-value">—</div>
                  </div>
                  <div className="g-stat-card" onClick={() => setActivePage('contrats')}>
                    <div className="g-stat-icon amber">{Icons.contract}</div>
                    <div className="g-stat-label">Contrats</div>
                    <div className="g-stat-value">—</div>
                  </div>
                  <div className="g-stat-card" onClick={() => setActivePage('interventions')}>
                    <div className="g-stat-icon pink">{Icons.wrench}</div>
                    <div className="g-stat-label">Interventions</div>
                    <div className="g-stat-value">—</div>
                  </div>
                </div>

                {/* Accès rapides */}
                <div className="g-section-title">
                  {Icons.eye}
                  Accès rapides
                </div>
                <div className="g-actions-grid">
                  {[
                    { label: 'Gérer les bâtiments',    icon: Icons.building, page: 'batiments'     as Page },
                    { label: 'Gérer les appartements', icon: Icons.apt,      page: 'appartements'  as Page },
                    { label: 'Voir les contrats',      icon: Icons.contract, page: 'contrats'      as Page },
                    { label: 'Voir les interventions', icon: Icons.wrench,   page: 'interventions' as Page },
                  ].map(a => (
                    <div key={a.label} className="g-action-card" onClick={() => setActivePage(a.page)}>
                      <div className="g-action-icon">{a.icon}</div>
                      <span className="g-action-label">{a.label}</span>
                      <span className="g-chevron">{Icons.chevron}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── PAGE APPARTEMENTS ── */}
            {activePage === 'appartements' && (
              <>
                <h1 className="g-page-title">Appartements</h1>
                <p className="g-page-sub">Gérez vos appartements</p>
                {/*
                  💡 ICI : tu peux remplacer ce placeholder par ton composant
                  GerantAppartements existant, ou charger la liste depuis l'API.
                  Exemple : <GerantAppartements />
                */}
                <div className="g-placeholder">
                  <div className="g-placeholder-icon">{Icons.apt}</div>
                  <h2>Liste des appartements</h2>
                  <p>Intègre ici ton composant GerantAppartements</p>
                  <button className="g-btn-primary" onClick={() => navigate('/gerant/appartements')}>
                    Ouvrir la page complète
                    {Icons.chevron}
                  </button>
                </div>
              </>
            )}

            {/* ── PAGE BÂTIMENTS ── */}
            {activePage === 'batiments' && (
              <>
                <h1 className="g-page-title">Bâtiments</h1>
                <p className="g-page-sub">Gérez vos bâtiments</p>
                <div className="g-placeholder">
                  <div className="g-placeholder-icon">{Icons.building}</div>
                  <h2>Liste des bâtiments</h2>
                  <p>Intègre ici ton composant GerantBatiments</p>
                  <button className="g-btn-primary" onClick={() => navigate('/gerant/batiments')}>
                    Ouvrir la page complète
                    {Icons.chevron}
                  </button>
                </div>
              </>
            )}

            {/* ── PAGE CONTRATS ── */}
            {activePage === 'contrats' && (
              <>
                <h1 className="g-page-title">Contrats</h1>
                <p className="g-page-sub">Tous les contrats de location</p>
                <div className="g-placeholder">
                  <div className="g-placeholder-icon">{Icons.contract}</div>
                  <h2>Liste des contrats</h2>
                  <p>Intègre ici ton composant ContratPage</p>
                </div>
              </>
            )}

            {/* ── PAGE INTERVENTIONS ── */}
            {activePage === 'interventions' && (
              <>
                <h1 className="g-page-title">Interventions</h1>
                <p className="g-page-sub">Suivi des interventions techniques</p>
                <div className="g-placeholder">
                  <div className="g-placeholder-icon">{Icons.wrench}</div>
                  <h2>Liste des interventions</h2>
                  <p>Intègre ici ton composant InterventionPage</p>
                </div>
              </>
            )}

          </div>
        </main>

      </div>
    </>
  )
}