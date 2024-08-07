// import { NotesFrais } from "../models/notes-frais";
// import { NotesLignesFrais } from "../models/notes-lignes";
// import { OrdreMission } from "../models/ordre-mission";
// import { OrdreMissionAgent } from "../models/ordres_missions_agents";
import { Users } from '../models/users';

export class FiltreWrapper {
  periode: string;
  secteur: string;
  numero: string;
  account: null;
  accountName: string;
  dossier: number;
  dossierName: string;
  libelle: string;
  nature: string;
  domaine: string;
  modePaiement: string;
  montantDebut: string;
  montantFin: string;
  beneficiare: string;
  statut: string;
  statutIn: string;
  pays: string;
  datedebut: string;
  datefin: string;
  filtre: string;
  type: string;
  mois: number;
  semaine: number;
  annee: number;
  jours: number;
  client: string;
  agent: number;
  missionId: number;
  archiver: boolean;
  clientName: string;
  agentName: string;
  duree: number;
  typeActivite: number;
  strName: string;
  user: Users;
  bailleur: string;
  commanditaire: string;
  dateretour: string;
  datedepart: string;
  mission: string;
  niveau: string;
  activites: string;
  etat: string;
  ordreField: string;
  ordreType: string;
  heure: string;
  ordreMission: string;
  typeActiviteId: number;
  phase: number;
  activite: number;
  motif: string;
  // ordreDeMission: OrdreMission;
  // ordreAgents: OrdreMissionAgent[];
  listForAll: [];
  isCreatedBy: boolean;
  isInMembre: boolean;
  ordreId: number;
  // noteFrais: NotesFrais;
  // noteFraisLignes: NotesLignesFrais[];
  noteId: number;
  withChef: boolean;
  transportName: string;
  transportId: number;
  datedebutForDebut: string;
  datefinForDebut: string;
  datedebutForEnd: string;
  datefinForEnd: string;
  clientId: number;
  langue: string;
  questionnaireId: number;
  sectionId: number;
  profil: string;
  campagneId: number;
  managerId: number;
  rapport: string;
}
