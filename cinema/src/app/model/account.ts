import {AccountRole} from './account-role';

export interface Account {
  id: number;
  isEnabled: boolean;
  username: string;
  accountCode: string;
  password: string;
  fullname: string;
  birthday: any;
  idCard: string;
  address: string;
  phone: string;
  verificationCode: string;
  email: string;
  gender: string;
  totalPoint: number;
  imageUrl: string;
  account_role_test: AccountRole;
}
