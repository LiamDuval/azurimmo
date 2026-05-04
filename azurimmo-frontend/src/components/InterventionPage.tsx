import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Intervention } from "../types";
import "./InterventionPage.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function InterventionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const appartementId = Number(id);

  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/interventions/appartement/${appartementId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        return res.json();
      })
      .then((data: Intervention[]) => {
        setInterventions(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [appartementId]);

  return (
    <div className="page-wrapper">
      <header className="header-wave">
        <svg className="wave-svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
        <div className="header-badges">
          <button
            className="btn-back-int"
            onClick={() => navigate(`/appartements/${appartementId}`)}
          >
            ← Retour à l'appartement
          </button>
          <div className="badge badge-title">Interventions</div>
          <div className="badge badge-id">Appartement n°{appartementId}</div>
        </div>
      </header>

      <main className="main-content">
        {loading && (
          <div className="status-message loading">
            <span className="spinner" />
            Chargement des interventions…
          </div>
        )}

        {!loading && error && (
          <div className="status-message error">
            ⚠ {error}
          </div>
        )}

        {!loading && !error && (
          <div className="table-container">
            <table className="intervention-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Adresse</th>
                  <th>Heure</th>
                </tr>
              </thead>
              <tbody>
                {interventions.map((intervention) => (
                  <tr key={intervention.id}>
                    <td>{intervention.libelle || "—"}</td>
                    <td>{intervention.description || "—"}</td>
                    <td>
                      {[intervention.adresse, intervention.ville]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
                    <td>
                      {intervention.heure
                        ? String(intervention.heure).slice(0, 5)
                        : "—"}
                    </td>
                  </tr>
                ))}
                {interventions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="empty-row">
                      Aucune intervention trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
