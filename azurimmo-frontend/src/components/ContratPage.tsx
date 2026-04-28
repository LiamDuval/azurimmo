import { useEffect, useState } from "react";
import "./ContratPage.css";

interface Contrat {
  id: number;
  dateDebut: string;
  dateFin: string;
  montantBrut: number;
  montantCharge: number;
  statut: string;
  appartementId: number;
  locataireId: number;
}

interface Props {
  appartementId: number;
  onBack: () => void;
}

export default function ContratPage({ appartementId, onBack }: Props) {

  const [contrats, setContrats] = useState<Contrat[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContrats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:9008/api/contrats/appartement/${appartementId}`
        );
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        const data: Contrat[] = await res.json();
        setContrats(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchContrats();
  }, [appartementId]); 
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR");
  };

  const statutClass = (statut: string) => {
    switch (statut?.toLowerCase()) {
      case "actif":    return "badge badge--actif";
      case "terminé":
      case "termine":  return "badge badge--termine";
      case "en cours": return "badge badge--actif";
      default:         return "badge badge--default";
    }
  };

  return (
    <div className="contrat-page">

      {/* ---- HEADER ---- */}
      <header className="contrat-hero">
        <div className="contrat-hero__bg" />
        <div className="contrat-hero__content">
          {/* Bouton retour vers la page détail de l'appartement */}
          <button className="btn-back" onClick={onBack}>
            ← Retour à l'appartement
          </button>
          <h1 className="contrat-hero__title">Contrats de location</h1>
          <p className="contrat-hero__subtitle">
            Appartement n°{appartementId}
          </p>
          <div className="contrat-hero__badge">
            <span className="badge-dot" />
            {loading
              ? "Chargement..."
              : `${contrats.length} contrat${contrats.length > 1 ? "s" : ""}`}
          </div>
        </div>
        {/* Vague décorative en bas du hero */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFF" />
          </svg>
        </div>
      </header>

      {/* ---- CONTENU PRINCIPAL ---- */}
      <main className="contrat-main">

        {/* État : chargement en cours */}
        {loading && (
          <div className="state-wrap">
            <div className="loader">
              <div className="loader-ring" />
              <div className="loader-ring loader-ring--2" />
            </div>
            <p className="state-text">Chargement des contrats...</p>
          </div>
        )}

        {/* État : erreur API */}
        {!loading && error && (
          <div className="state-wrap">
            <p className="state-title">Erreur de chargement</p>
            <p className="state-text">{error}</p>
          </div>
        )}

        {/* État : aucun contrat trouvé */}
        {!loading && !error && contrats.length === 0 && (
          <div className="state-wrap">
            <p className="state-title">Aucun contrat trouvé</p>
            <p className="state-text">
              Cet appartement n'a pas encore de contrat enregistré.
            </p>
          </div>
        )}

        {/* État : affichage de la liste des contrats */}
        {!loading && !error && contrats.length > 0 && (
          <div className="contrat-grid">
            {contrats.map((contrat, i) => (
              <article
                className="contrat-card"
                key={contrat.id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* En-tête de la carte avec l'ID et le statut */}
                <div className="contrat-card__header">
                  <span className="contrat-card__id">Contrat #{contrat.id}</span>
                  <span className={statutClass(contrat.statut)}>
                    {contrat.statut ?? "Inconnu"}
                  </span>
                </div>

                {/* Corps : dates et montants */}
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

                {/* Pied de carte avec l'ID du locataire */}
                <div className="contrat-card__footer">
                  <span className="contrat-card__locataire">
                    👤 Locataire #{contrat.locataireId}
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
