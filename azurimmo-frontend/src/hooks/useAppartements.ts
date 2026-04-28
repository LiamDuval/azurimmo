import { useEffect, useState } from 'react';
import type { Appartement } from '../types';

const API_BASE = 'http://localhost:9008/api';

export function useAppartements() {
  const [data, setData] = useState<Appartement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/appartements`);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const json: Appartement[] = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const fetchByVille = async (ville: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/appartements/ville/${encodeURIComponent(ville)}`);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const json: Appartement[] = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const fetchBySurface = async (surface: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/appartements/surface/${surface}`);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const json: Appartement[] = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { data, loading, error, fetchAll, fetchByVille, fetchBySurface };
}