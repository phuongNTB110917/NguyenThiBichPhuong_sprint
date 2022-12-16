import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookingService} from '../service/booking.service';
import {SeatDetail} from '../../model/seat-detail';
import {JsogService} from 'jsog-typescript';

@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.component.html',
  styleUrls: ['./booking-seat.component.css']
})
export class BookingSeatComponent implements OnInit {
  seatid: number;
  movies: any[];
  showtimes: any[] = [];
  movieId: number;
  showtimeId: number;
  maxDate: Date;
  minDate: Date;
  selectedMovie: any;
  selectedTasks = {};
  isLoggedIn = false;
  seatDetails: SeatDetail[];
  public rows: Array<string>;
  public seats: Array<number>;
  seatChoose = [];
  seatBooking: any[] = [];
  selectedIdx = '';
  constructor(private router: Router, private jsogService: JsogService, private activatedRoute: ActivatedRoute, private bookingService: BookingService) {
     // this.seatid = this.router.;
  }

  ngOnInit(): void {
    this.rows = ['A', 'B', 'C', 'D', 'E'];
    this.seats = [1, 2, 3, 4, 5, 6, 7, 8];
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.seatid = Number(paramMap.get('id'));
      console.log(this.seatid);
      this.bookingService.getAllSeatDetailByIdSeatDetail(this.seatid).subscribe(next => {
        // @ts-ignore
        this.seatDetails = this.jsogService.deserializeArray(next);
        console.log(this.seatDetails);
      });
    });
  }

  booking() {

  }

  chooseSeat(seat: string) {
    this.selectedIdx = seat;
    const index: number = this.seatChoose.indexOf(seat);
    if (index !== -1) {
      this.seatChoose.splice(index, 1);
      return;
    }
    this.seatChoose.push(seat);
    console.log(this.seatChoose);
  }
}
