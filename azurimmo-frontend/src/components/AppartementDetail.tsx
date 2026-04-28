import { useEffect, useState } from "react";
import type { Appartement } from "../types/index";
import "../components.css";
import "./AppartementDetail.css";
 

const API_BASE = import.meta.env.VITE_API_BASE;
 
interface Props {
  appartementId: number;
  onBack: () => void;
  onShowInterventions: (id: number) => void;
  onShowContrats: (id: number) => void;
}
 
export default function AppartementDetail({ appartementId, onBack, onShowInterventions, onShowContrats }: Props) {
  const [apt, setApt] = useState<Appartement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {

        const res = await fetch(`${API_BASE}/appartements/${appartementId}`);
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        const data: Appartement = await res.json();
        setApt(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
 
    fetchDetail();
  }, [appartementId]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="state-wrap" style={{ minHeight: "100vh" }}>
          <div className="loader">
            <div className="loader-ring" />
            <div className="loader-ring loader-ring--2" />
          </div>
          <p className="state-text">Chargement de l&apos;appartement…</p>
        </div>
      </div>
    );
  }

  if (error || !apt) {
    return (
      <div className="detail-page">
        <div className="state-wrap" style={{ minHeight: "100vh" }}>
          <div className="error-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="state-title">Appartement introuvable</h3>
          <p className="state-text">{error}</p>
          <button className="btn-primary" onClick={onBack}>← Retour à la liste</button>
        </div>
      </div>
    );
  }

  const { surface, nombreDePiece, description, Numero, batiment } = apt;

  return (
    <div className="detail-page">

      {/* ── Hero ── */}
      <header className="detail-hero">
        <div className="hero-bg" />
        <div className="detail-hero__orb detail-hero__orb--1" />
        <div className="detail-hero__orb detail-hero__orb--2" />

        <div className="detail-hero__nav">
          <button className="detail-back-btn" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Retour aux appartements
          </button>
        </div>

        <div className="detail-hero__content">
          <div className="detail-hero__tags">
            <span className="hero-label">Agence Azurimmo</span>
            {Numero && <span className="detail-numero-badge">Apt. {Numero}</span>}
          </div>

          <h1 className="detail-hero__title">
            {nombreDePiece} pièce{nombreDePiece > 1 ? "s" : ""}
            <span className="detail-hero__surface"> · {surface} m²</span>
          </h1>

          {batiment?.ville && (
            <div className="detail-hero__location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {batiment.adresse && `${batiment.adresse}, `}{batiment.ville}
            </div>
          )}
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFF" />
          </svg>
        </div>
      </header>

      {/* ── Contenu principal ── */}
      <main className="detail-main">
        <div className="detail-layout">

          {/* ─ Colonne gauche ─ */}
          <div className="detail-left">

            <section className="detail-stats">
              <div className="detail-stat-card">
                <div className="detail-stat-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <div className="detail-stat-card__body">
                  <span className="detail-stat-card__value">{surface} m²</span>
                  <span className="detail-stat-card__label">Surface habitable</span>
                </div>
              </div>

              <div className="detail-stat-card">
                <div className="detail-stat-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="detail-stat-card__body">
                  <span className="detail-stat-card__value">{nombreDePiece}</span>
                  <span className="detail-stat-card__label">Pièce{nombreDePiece > 1 ? "s" : ""}</span>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <div className="detail-section__header">
                <div className="detail-section__dot" />
                <h2 className="detail-section__title">Description</h2>
              </div>
              <p className="detail-description">
                {description || "Cet appartement de standing est situé dans un bâtiment d'exception."}
              </p>
            </section>

            <section className="detail-section">
              <div className="detail-section__header">
                <div className="detail-section__dot" />
                <h2 className="detail-section__title">Caractéristiques</h2>
              </div>
              <div className="detail-features">
                <div className="detail-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Surface de {surface} m²</span>
                </div>
                <div className="detail-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{nombreDePiece} pièce{nombreDePiece > 1 ? "s" : ""} principale{nombreDePiece > 1 ? "s" : ""}</span>
                </div>
                <div className="detail-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Appartement N°{Numero}</span>
                </div>
                {batiment?.ville && (
                  <div className="detail-feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Situé à {batiment.ville}</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ─ Colonne droite ─ */}
          <div className="detail-right">

            <div className="detail-building-card">
              <div className="detail-building-card__header">
                <div className="detail-building-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <span className="detail-building-label">Bâtiment</span>
                  <h3 className="detail-building-name">
                    {batiment?.nom ?? `Bâtiment #${batiment?.id}`}
                  </h3>
                </div>
              </div>
              <div className="detail-building-infos">
                {batiment?.adresse && (
                  <div className="detail-building-info">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{batiment.adresse}</span>
                  </div>
                )}
                {batiment?.ville && (
                  <div className="detail-building-info">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    <span>{batiment.ville}</span>
                  </div>
                )}
                <div className="detail-building-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>ID #{batiment?.id}</span>
                </div>
              </div>
            </div>

            {/* ✅ Bouton Interventions */}
            <button
              className="btn btn-intervention"
              onClick={() => onShowInterventions(appartementId)}
              style={{ marginBottom: '10px' }}
            >
              Interventions
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>

            {/* ✅ AJOUT — Bouton Contrats */}
            <button
              className="btn btn-intervention"
              onClick={() => onShowContrats(appartementId)}
            >
              Contrats
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </button>

          </div>

        </div>
      </main>

      <footer className="footer"></footer>
    </div>
  );
}