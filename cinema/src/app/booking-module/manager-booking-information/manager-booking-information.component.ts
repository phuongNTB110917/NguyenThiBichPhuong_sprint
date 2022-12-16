import { Component, OnInit } from '@angular/core';
import {ManagerBookingService} from '../service/manager-booking.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookingDetail} from '../../model/content/booking-detail';

@Component({
  selector: 'app-manager-booking-information',
  templateUrl: './manager-booking-information.component.html',
  styleUrls: ['./manager-booking-information.component.css']
})
export class ManagerBookingInformationComponent implements OnInit {
  id: number;
  bookingDetail: BookingDetail;
  bookingDt: BookingDetail;
  message: string;
  constructor(private managerBookingService: ManagerBookingService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      console.log(this.id);
      this.takeTicket(this.id);
    });
  }
  public takeTicket(id: number) {
    this.managerBookingService.findById(id).subscribe(bookingDt => {
      this.bookingDt = bookingDt;
      if (this.bookingDt.total_Price < this.bookingDt.total_Point) {
        this.managerBookingService.takeTicket(id).subscribe(bookingDetail => {
          this.bookingDetail = bookingDetail;
        }); }
      console.log(this.bookingDetail);
    });
  }

  ngOnInit(): void {
  }
}
