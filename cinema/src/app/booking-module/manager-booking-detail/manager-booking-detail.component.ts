import { Component, OnInit } from '@angular/core';
import {BookingDetail} from '../../model/content/booking-detail';
import {ManagerBookingService} from '../service/manager-booking.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-manager-booking-detail',
  templateUrl: './manager-booking-detail.component.html',
  styleUrls: ['./manager-booking-detail.component.css']
})
export class ManagerBookingDetailComponent implements OnInit {
id: number;
bookingDetail: BookingDetail;
message: string;
check: boolean;
  constructor(private managerBookingService: ManagerBookingService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getBookingDetail(this.id);
    });
  }

  ngOnInit(): void {
  }

  public getBookingDetail(id: number) {
this.managerBookingService.findById(id).subscribe(bookingDetail => {
  this.bookingDetail = bookingDetail;
  if (bookingDetail.total_Price < bookingDetail.total_Point) {
    this.message = '';
  } else {this.message = 'Không đủ điểm đổi vé'; }
});
  }
}
