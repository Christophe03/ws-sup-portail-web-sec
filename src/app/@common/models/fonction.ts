import { AbstractEntity } from "./abstract-entity";
import { Modules } from "./modules";

export class Fonction extends AbstractEntity {
  code!: string;
  nom!: string;
  ordre!: number;
  icon!: string;
  url!: string;
  position!: string;
  nature!: string;
  actions?: string;
  statut!: number;
  moduleCode: string;
  module: Modules;
}
