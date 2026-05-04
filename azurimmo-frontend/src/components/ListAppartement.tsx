import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import FilterBar, { type SortOption } from "./FilterBar";
import "./ListAppartement.css";
 
const API_BASE = import.meta.env.VITE_API_BASE;
 
interface Batiment {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
}
 
interface Appartement {
  id: number;
  numero: string;
  surface: number;
  nombreDePiece: number;
  description: string;
  batiment: Batiment;
}
 
interface FilterValues {
  search: string;
  minSurface: string;
  sortBy: SortOption;
}
 
interface Props {
  onSelectAppartement: (id: number) => void;
}
 
export default function ListAppartement({ onSelectAppartement }: Props) {
  const [data, setData] = useState<Appartement[]>([]);
  const [filtered, setFiltered] = useState<Appartement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate()
 
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/appartements/`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const result: Appartement[] = await response.json();
      setData(result);
      setFiltered(result);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);

  const handleFiltersChange = ({ search, minSurface, sortBy }: FilterValues) => {
    let result = [...data];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.batiment?.nom?.toLowerCase().includes(q) ||
          a.batiment?.ville?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.numero?.toLowerCase().includes(q)
      );
    }

    if (minSurface) {
      result = result.filter((a) => a.surface >= parseFloat(minSurface));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "surface-desc": return b.surface - a.surface;
        case "surface-asc":  return a.surface - b.surface;
        case "pieces-desc":  return b.nombreDePiece - a.nombreDePiece;
        case "pieces-asc":   return a.nombreDePiece - b.nombreDePiece;
        case "batiment":     return (a.batiment?.nom ?? "").localeCompare(b.batiment?.nom ?? "");
        default:             return 0;
      }
    });

    setFiltered(result);
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-label">Agence Azurimmo</span>
          <h1 className="hero-title">Nos Appartements</h1>
          <p className="hero-subtitle">Trouvez le bien qui vous correspond</p>
		    <div className="hero-badge">
		      <span className="badge-dot" />
		      {loading
		        ? "Chargement..."
		        : `${filtered.length} appartement${filtered.length > 1 ? "s" : ""} disponible${filtered.length > 1 ? "s" : ""}`}
		    </div>
		    <button
		      className="btn-login-hero"
		      onClick={() => navigate('/login')}
		    >
		      Espace Gérant
		    </button>

		  </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFF" />
          </svg>
        </div>
      </header>

      <FilterBar total={filtered.length} onChange={handleFiltersChange} />

      <main className="main-content">
        {loading && (
          <div className="state-wrap">
            <div className="loader">
              <div className="loader-ring" />
              <div className="loader-ring loader-ring--2" />
            </div>
            <p className="state-text">Chargement des appartements...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-wrap">
            <h3 className="state-title">Impossible de contacter le serveur</h3>
            <p className="state-text">{error}</p>
            <button className="btn-primary" onClick={fetchData}>Réessayer</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="state-wrap">
            <h3 className="state-title">Aucun appartement trouvé</h3>
            <p className="state-text">Modifiez vos critères de recherche.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid">
            {filtered.map((apt, i) => (
              <article
                className="card"
                key={apt.id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="card-header">
                  <div className="card-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    Apt. {apt.numero ?? "?"}
                  </div>
                  <div className="card-surface">{apt.surface ?? "?"} m²</div>
                </div>

                <div className="card-body">
                  <h2 className="card-title">
                    {apt.batiment?.nom ?? "Bâtiment inconnu"}
                  </h2>

                  {apt.batiment?.ville && (
                    <div className="card-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {apt.batiment.ville}
                    </div>
                  )}

                  <p className="card-desc">
                    {apt.description || "Appartement de standing dans un bâtiment d'exception."}
                  </p>
                </div>

                <div className="card-footer">
                  <div className="card-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                    {apt.nombreDePiece ?? "?"} pièce{(apt.nombreDePiece ?? 0) > 1 ? "s" : ""}
                  </div>
                  <button className="btn-card" onClick={() => onSelectAppartement(apt.id)}>
                    Voir le détail
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}