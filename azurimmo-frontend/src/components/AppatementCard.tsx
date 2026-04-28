import type { Appartement } from '../types';

interface Props {
  appartement: Appartement;
  onClick: (a: Appartement) => void;
}

export default function AppartementCard({ appartement, onClick }: Props) {
  const { surface, nombreDePiece, description, numero, batiment } = appartement;

  return (
    <article className="apt-card" onClick={() => onClick(appartement)}>
      <div className="apt-card__badge">Appt. N°{numero}</div>

      <div className="apt-card__visual">
        <div className="apt-card__icon-wrap">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 56V28L32 8L56 28V56H38V40H26V56H8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
            <rect x="26" y="40" width="12" height="16" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M20 36H28M36 36H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="apt-card__surface-ring">
          <span className="apt-card__surface-num">{surface}</span>
          <span className="apt-card__surface-unit">m²</span>
        </div>
      </div>

      <div className="apt-card__body">
        <div className="apt-card__location">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
          </svg>
          <span>{batiment?.adresse}{batiment?.ville ? `, ${batiment.ville}` : ''}</span>
        </div>

        <h3 className="apt-card__title">
          {nombreDePiece} pièce{nombreDePiece > 1 ? 's' : ''}
        </h3>

        <p className="apt-card__desc">{description || 'Aucune description disponible.'}</p>

        <div className="apt-card__meta">
          <span className="apt-card__tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z"/></svg>
            {nombreDePiece} pièces
          </span>
          <span className="apt-card__tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v2M1 9h22M8 9V5m8 4V5"/></svg>
            {surface} m²
          </span>
        </div>
      </div>

      <div className="apt-card__footer">
        <button className="apt-card__btn">Voir le détail →</button>
      </div>
    </article>
  );
}