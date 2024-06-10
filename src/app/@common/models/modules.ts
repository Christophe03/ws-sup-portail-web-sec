import { AbstractEntity } from "./abstract-entity";

export class Modules extends AbstractEntity {
  code!: string;

  nom!: string;

  ordre!: number;

  statut!: number;

  icon: string;
}
