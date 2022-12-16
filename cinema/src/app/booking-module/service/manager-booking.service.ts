import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Content} from '../../model/content/content';
// import {Booking} from '../../model/booking';
import {Page} from '../../model/content/page';
import {BookingDetail} from '../../model/content/booking-detail';
// import {Booking} from '../../model/booking';
const URL = 'http://localhost:8080/api/managerBooking';
@Injectable({
  providedIn: 'root'
})
export class ManagerBookingService {

  constructor(private httpClient: HttpClient) { }
  getAll(key: string, page: number): Observable<Page> {
    return this.httpClient.get<Page>(URL + '/list' + '?key=' + key + '&page=' + page );
  }
  findById(id: number): Observable<BookingDetail> {
    return this.httpClient.get<BookingDetail>(URL + '/detail' + '/' + id);
  }
  takeTicket(id: number): Observable<BookingDetail> {
    return this.httpClient.get<BookingDetail>(URL + '/takeTicket' + '/' + id);
  }
}
