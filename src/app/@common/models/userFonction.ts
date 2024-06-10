import { AbstractEntity } from './abstract-entity';
import { Fonction } from './fonction';
import { Users } from './users';

export class UserFonction extends AbstractEntity {
  userId: number;
  fonctionCode: string;
  user: Users;
  fonction: Fonction;
  position: string;
  nature: string;
  ordre: number;
  actions?: string;
}
