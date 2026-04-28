import { useState, useEffect } from 'react';

export type SortOption = 'surface-desc' | 'surface-asc' | 'pieces-desc' | 'pieces-asc' | 'batiment';

interface FilterValues {
  search: string;
  minSurface: string;
  sortBy: SortOption;
}

interface Props {
  total: number;
  onChange: (filters: FilterValues) => void;
}

export default function FilterBar({ total, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [minSurface, setMinSurface] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('surface-desc');

  useEffect(() => {
    onChange({ search, minSurface, sortBy });
  }, [search, minSurface, sortBy]);

  const handleReset = () => {
    setSearch('');
    setMinSurface('');
    setSortBy('surface-desc');
  };

  return (
    <div className="controls-wrap">
      <div className="controls">
        <div className="control-group">
          <label className="control-label">Rechercher</label>
          <div className="input-icon">
            <svg className="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="ctrl-input"
              type="text"
              placeholder="Ville, bâtiment, numéro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Surface min. (m²)</label>
          <div className="input-icon">
            <svg className="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
            </svg>
            <input
              className="ctrl-input"
              type="number"
              placeholder="ex: 40"
              min={0}
              value={minSurface}
              onChange={(e) => setMinSurface(e.target.value)}
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Trier par</label>
          <select
            className="ctrl-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="surface-desc">Surface ↑</option>
            <option value="surface-asc">Surface ↓</option>
            <option value="pieces-desc">Pièces ↑</option>
            <option value="pieces-asc">Pièces ↓</option>
            <option value="batiment">Bâtiment A→Z</option>
          </select>
        </div>

        <div className="control-group control-group--count">
          <span className="result-count">
            <span className="result-count__num">{total}</span>
            <span className="result-count__label">
              &nbsp;appt{total !== 1 ? 's' : ''}
            </span>
          </span>
        </div>

        <button className="btn-reset" onClick={handleReset}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
          </svg>
          Réinitialiser
        </button>
      </div>
    </div>
  );
}