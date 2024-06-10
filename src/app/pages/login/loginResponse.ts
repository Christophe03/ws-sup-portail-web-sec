import { UserFonction } from 'src/app/@common/models/userFonction';
import { Users } from 'src/app/@common/models/users';
import { Menu } from 'src/app/theme/components/menu/menu.model';

// import { Societes } from './societes';

export class LoginResponse {
  status: boolean;
  message: string;
  // accessToken: string;
  // tokenType: string;
  // user: Users;
  access_token: string;
  user: Users;

  // modules: UserModule[];
  menuItems: Menu[];
  sousMenuItems: Menu[];
  fonctions: UserFonction[];
  droitSpecifique: UserFonction[];
  constructor() {}
}
