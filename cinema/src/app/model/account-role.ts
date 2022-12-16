import {Role} from './role';
import {Account} from './account';

export interface AccountRole {
  id: number;
  account_id: Account;
  role_id: Role;
}
