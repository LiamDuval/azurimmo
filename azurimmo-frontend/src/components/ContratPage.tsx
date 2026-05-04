import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Contrat } from "../types";
import "./ContratPage.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ContratPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const appartementId = Number(id);

  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/contrats/appartement/${appartementId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        return res.json();
      })
      .then((data: Contrat[]) => {
        setContrats(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [appartementId]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("fr-FR");
  };

  const statutClass = (statut: string) => {
    switch (statut?.toLowerCase()) {
      case "actif":
      case "en cours": return "badge badge--actif";
      case "terminé":
      case "termine":  return "badge badge--termine";
      default:         return "badge badge--default";
    }
  };

  return (
    <div className="contrat-page">
      <header className="contrat-hero">
        <div className="contrat-hero__bg" />
        <div className="contrat-hero__content">
          <button
            className="btn-back"
            onClick={() => navigate(`/appartements/${appartementId}`)}
          >
            ← Retour à l'appartement
          </button>
          <h1 className="contrat-hero__title">Contrats de location</h1>
          <p className="contrat-hero__subtitle">Appartement n°{appartementId}</p>
          <div className="contrat-hero__badge">
            <span className="badge-dot" />
            {loading
              ? "Chargement..."
              : `${contrats.length} contrat${contrats.length > 1 ? "s" : ""}`}
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFF" />
          </svg>
        </div>
      </header>

      <main className="contrat-main">
        {loading && (
          <div className="state-wrap">
            <div className="loader">
              <div className="loader-ring" />
              <div className="loader-ring loader-ring--2" />
            </div>
            <p className="state-text">Chargement des contrats...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-wrap">
            <p className="state-title">Erreur de chargement</p>
            <p className="state-text">{error}</p>
          </div>
        )}

        {!loading && !error && contrats.length === 0 && (
          <div className="state-wrap">
            <p className="state-title">Aucun contrat trouvé</p>
            <p className="state-text">
              Cet appartement n'a pas encore de contrat enregistré.
            </p>
          </div>
        )}

        {!loading && !error && contrats.length > 0 && (
          <div className="contrat-grid">
            {contrats.map((contrat, i) => (
              <article
                className="contrat-card"
                key={contrat.id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="contrat-card__header">
                  <span className="contrat-card__id">Contrat #{contrat.id}</span>
                  <span className={statutClass(contrat.statut)}>
                    {contrat.statut ?? "Inconnu"}
                  </span>
                </div>

                <div className="contrat-card__body">
                  <div className="contrat-card__row">
                    <span className="contrat-card__label">Début</span>
                    <span className="contrat-card__value">{formatDate(contrat.dateDebut)}</span>
                  </div>
                  <div className="contrat-card__row">
                    <span className="contrat-card__label">Fin</span>
                    <span className="contrat-card__value">{formatDate(contrat.dateFin)}</span>
                  </div>
                  <div className="contrat-card__divider" />
                  <div className="contrat-card__row">
                    <span className="contrat-card__label">Loyer brut</span>
                    <span className="contrat-card__value contrat-card__value--price">
                      {contrat.montantBrut?.toFixed(2)} €
                    </span>
                  </div>
                  <div className="contrat-card__row">
                    <span className="contrat-card__label">Charges</span>
                    <span className="contrat-card__value">
                      {contrat.montantCharge?.toFixed(2)} €
                    </span>
                  </div>
                  <div className="contrat-card__row contrat-card__row--total">
                    <span className="contrat-card__label">Total</span>
                    <span className="contrat-card__value contrat-card__value--total">
                      {((contrat.montantBrut ?? 0) + (contrat.montantCharge ?? 0)).toFixed(2)} €
                    </span>
                  </div>
                </div>

                <div className="contrat-card__footer">
                  <span className="contrat-card__locataire">
                    Locataire #{contrat.locataireId}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
