import React, { useEffect, useState } from "react";
import "./InterventionPage.css";


interface Intervention {
  id: number;
  libelle: string;
  description: string;
  dateEtHeure: string; 
}


interface InterventionPageProps {
  appartementId?: number; 
}

const InterventionPage: React.FC<InterventionPageProps> = ({
  appartementId = 1,
}) => {

  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:9008/api/interventions/appartement/${appartementId}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        return response.json();
      })
      .then((data: Intervention[]) => {

        setInterventions(data);
        setLoading(false);
      })
      .catch((err: Error) => {

        setError(err.message);
        setLoading(false);

        setInterventions([
          { id: 1, libelle: "Plomberie", description: "Fuite robinet salle de bain", dateEtHeure: "2026-03-24 09:00" },
          { id: 2, libelle: "Électricité", description: "Remplacement tableau électrique", dateEtHeure: "2026-03-25 14:30" },
          { id: 3, libelle: "Peinture", description: "Rafraîchissement couloir entrée", dateEtHeure: "2026-03-26 08:00" },
          { id: 4, libelle: "Serrurerie", description: "Changement de serrure porte principale", dateEtHeure: "2026-03-27 11:15" },
        ]);
      });
  }, [appartementId]);
  return (
    <div className="page-wrapper">


      <header className="header-wave">

        <svg
          className="wave-svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>


        <div className="header-badges">
          <div className="badge badge-title">Intervention</div>
          <div className="badge badge-id">&#123; AppartementId &#125;</div>
        </div>
      </header>


      <main className="main-content">

        {loading && (
          <div className="status-message loading">
            <span className="spinner" />
            Chargement des interventions…
          </div>
        )}

        {error && !loading && (
          <div className="status-message error">
            ⚠ Connexion API impossible — données de démonstration affichées.
          </div>
        )}

        {!loading && (
          <div className="table-container">
            <table className="intervention-table">
              <thead>
                <tr>
                  <th>libelle</th>
                  <th>Description</th>
                  <th>Date et heure</th>
                </tr>
              </thead>
              <tbody>

                {interventions.map((intervention) => (
                  <tr key={intervention.id}>
                    <td>{intervention.libelle}</td>
                    <td>{intervention.description}</td>
                    <td>{intervention.dateEtHeure}</td>
                  </tr>
                ))}


                {interventions.length === 0 && (
                  <tr>
                    <td colSpan={3} className="empty-row">
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
};

export default InterventionPage;