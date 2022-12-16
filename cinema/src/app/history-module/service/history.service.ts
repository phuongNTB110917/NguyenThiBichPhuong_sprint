import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {History} from '../../model/history';

const API_URL = 'http://localhost:8080/api/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getTotalPagesPointReward(id: number, start: Date, end: Date): Observable<number> {
    return this.http.get<number>(API_URL + '/total-page-reward?accountId=' + id + '&start=' + start + '&end=' + end);
  }

  getTotalPagesPointExchange(id: number, start: Date, end: Date): Observable<number> {
    return this.http.get<number>(API_URL + '/total-page-exchange?accountId=' + id + '&start=' + start + '&end=' + end);
  }

  getHistoriesPointReward(id: number, start: Date, end: Date, page: number): Observable<History[]> {
    return this.http.get<History[]>(API_URL + '/view-point-reward?accountId=' + id + '&start=' + start + '&end=' + end + '&page=' + page);
  }

  getHistoriesPointExchange(id: number, start: Date, end: Date, page: number): Observable<History[]> {
    return this.http.get<History[]>(API_URL + '/view-point-exchange?accountId=' + id + '&start=' + start + '&end=' + end + '&page=' + page);
  }
}
