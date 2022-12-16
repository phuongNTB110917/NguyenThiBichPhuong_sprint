export interface Content {
  id: number;
  isEnabled: boolean;
  username: string;
  accountCode: string;
  password: string;
  fullname: string;
  birthday: Date;
  idCard: string;
  address: string;
  phone: string;
  verificationCode: string;
  email: string;
  gender: boolean;
  totalPoint: number;
  imageUrl: string;
  deleted: boolean;
  enable: boolean;
  provider: string;
  accountRoles: [];
  bookings: [];
  roles: [];
  enabled: boolean;
}
