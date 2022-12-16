import {Account} from './account';

export interface Booking {
  id: number;
  dayTimeBooking: any;
  totalPrice: any;
  pointExchange: number;
  pointReward: number;
  bookingCode: string;
  received: boolean;
  account_id: Account;
}
