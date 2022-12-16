import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BookedTicket} from '../../model/booked-ticket';
import {map} from 'rxjs/operators';
import {PageBookedTicket} from '../../model/page-booked-ticket';

const API_URL = `${environment.apiUrl}` + '/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:ban-types
  getBookedTicket(page: number, id: number): Observable<PageBookedTicket> {
    // @ts-ignore
    return this.httpClient.get<PageBookedTicket>(API_URL + '/getbookedticket' + '?accountId=' + id + '&page=' + page);
  }

  deleteTicket(id: number): Observable<void> {
    // @ts-ignore
    return this.httpClient.patch<void>(API_URL + '/deleteTicket/' + id);
  }
}
