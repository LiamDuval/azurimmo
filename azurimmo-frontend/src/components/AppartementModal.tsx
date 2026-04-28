import { useEffect } from 'react';
import type { Appartement } from '../types';

interface Props {
  appartement: Appartement | null;
  onClose: () => void;
}

export default function AppartementModal({ appartement, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!appartement) return null;
  const { surface, nombreDePiece, description, numero, batiment } = appartement;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>

        <div className="modal__header">
          <div className="modal__badge">Appartement N°{numero}</div>
          <h2 className="modal__title">{nombreDePiece} pièce{nombreDePiece > 1 ? 's' : ''} — {surface} m²</h2>
          <p className="modal__address">
            {batiment?.adresse}{batiment?.ville ? `, ${batiment.ville}` : ''}
          </p>
        </div>

        <div className="modal__grid">
          <div className="modal__stat">
            <span className="modal__stat-label">Surface</span>
            <span className="modal__stat-value">{surface} m²</span>
          </div>
          <div className="modal__stat">
            <span className="modal__stat-label">Pièces</span>
            <span className="modal__stat-value">{nombreDePiece}</span>
          </div>
          <div className="modal__stat">
            <span className="modal__stat-label">N° appartement</span>
            <span className="modal__stat-value">{numero}</span>
          </div>
          <div className="modal__stat">
            <span className="modal__stat-label">Bâtiment ID</span>
            <span className="modal__stat-value">#{batiment?.id}</span>
          </div>
        </div>

        <div className="modal__section">
          <h4 className="modal__section-title">Description</h4>
          <p className="modal__desc">{description || 'Aucune description disponible.'}</p>
        </div>

        <div className="modal__section">
          <h4 className="modal__section-title">Bâtiment</h4>
          <p className="modal__desc">{batiment?.adresse}{batiment?.ville ? <><br />{batiment.ville}</> : ''}</p>
        </div>
      </div>
    </div>
  );
}