export interface Batiment {
  id: number;
  nom?: string;
  adresse?: string;
  ville?: string;
}
 
export interface Appartement {
  id: number;
  batiment: Batiment;
  surface: number;
  nombreDePiece: number;
  description?: string;
  Numero: string;
}
 
 
export type SortOption = 'surface-asc' | 'surface-desc' | 'pieces-asc' | 'pieces-desc';
 