import {Film} from './film';
import {Room} from './room';
import {Seat} from './seat';
import {Booking} from './booking';
import {Time} from './time';

export interface SeatDetail {
  id: number;
  isFlag: any;
  date_show: any;
  status: any;
  film_id: Film;
  room_id: Room;
  seat_id: Seat;
  time_id: Time;
  booking_id: Booking;
}

export  class  SeatDetailDto {
  name: string;
  date_show: string;
  time_show: string;

  constructor(name: string,date_show: string, time_show: string) {
    this.name = name;
    this.date_show = date_show;
    this.time_show = time_show;
  }
}
