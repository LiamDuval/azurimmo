export interface Batiment {
  id: number;
  nom?: string;
  adresse?: string;
  ville?: string;
  appartements?: Appartement[];
  nombreAppartements?: number;
}

export interface Appartement {
  id: number;
  batiment: Batiment;
  surface: number;
  nombreDePiece: number;
  description?: string;
  Numero: string;
}

export interface Contrat {
  id: number;
  description: string;
  montantBrut: number;
  montantCharge: number;
  statut: string;
  dateDebut: string;
  dateFin: string | null;
  appartementId: number;
  locataireId: number;
}

export interface Intervention {
  id: number;
  libelle: string;
  description: string;
  adresse: string;
  ville: string;
  dateIntervention?: string;
  heure: string;
  appartementId: number;
  typeInterventionId: number;
}
