import { Timestamp } from 'firebase/firestore';
import { AbstractEntity } from './abstract-entity';
export class Users extends AbstractEntity {
  login!: string;
  mdp!: string;
  etat!: string;
  dateexpiration!: Date;
  lastAuth!: Date;
  nbjour!: number;
  type!: string;
  langue!: string;
  custom1!: string;
  custom2!: string;
  custom3!: string;
  prenom: string;
  nom: string;
  patronyme: string;
  email: string;
  adresse: string;
  date_insc: string;
  date_naiss:{
  seconds: number;
  }
  formation: string;
  lieu_naiss: string;
  code: string;
  sexe: string;
  avatar: string;
  annee_acc: string;
  bp: string;
  niveau: string;
  etablissement: string;
  publish_at: Date;
  tel1: string;
  tel2: string;
  ville: string;
  pid: string;
}
