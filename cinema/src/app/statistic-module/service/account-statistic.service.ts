import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatisticAccount} from '../../model/statistic-account';

@Injectable({
  providedIn: 'root'
})
export class AccountStatisticService {

  URL_API = 'http://localhost:8080/api/statistic';

  constructor(private httpClient: HttpClient) { }

  sumStatisticalByAccount(): Observable<StatisticAccount[]> {
    return this.httpClient.get<StatisticAccount[]>(this.URL_API + '/account');
  }

  getAccountStatisticPage(index: number): Observable<StatisticAccount[]> {
    return this.httpClient.get<StatisticAccount[]>(this.URL_API + '/accountStatisticPage?page=' + index);
  }

  getTotalPriceAccount(): Observable<number> {
    return this.httpClient.get<number>(this.URL_API + '/totalPriceAccount');
  }

}
