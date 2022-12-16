import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StatisticFilm} from '../../model/statistic-film';

@Injectable({
  providedIn: 'root'
})
export class FilmStatisticService {
  URL_API = 'http://localhost:8080/api/statistic';

  constructor(private httpClient: HttpClient) { }

  sumStatisticalByCurrentDay(): Observable<StatisticFilm[]> {
    return this.httpClient.get<StatisticFilm[]>(this.URL_API + '/currentDay');
  }

  getFilmStatisticPage(index: number): Observable<StatisticFilm[]> {
    return this.httpClient.get<StatisticFilm[]>(this.URL_API + '/filmStatisticPage?page=' + index);
  }

  getTotalPrice(): Observable<number> {
    return this.httpClient.get<number>(this.URL_API + '/totalPrice');
  }

}
