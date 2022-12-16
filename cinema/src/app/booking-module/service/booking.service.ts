import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Film} from '../../model/film';
import {SeatDetailDto} from '../../model/seat-detail';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly MOVIE_URL = 'http://localhost:8080/api/film';
  constructor(private httpClient: HttpClient) { }

  public getMovieShowing(): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/getAllFilm');
  }
  public getDateShowByIdFilm(id: number): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/dateShowOfFilm/' + id);
  }
  public getTimeShowByIdSeatDetail(date: string, filmId: string): Observable<any> {
    console.log(this.MOVIE_URL + '/timeShowOfFilm/?date_show=' + date + '&film_id=' + filmId);
    return this.httpClient.get(this.MOVIE_URL + '/timeShowOfFilm/?date_show=' + date + '&film_id=' + filmId);
  }
  public getFilmById(id: number): Observable<any> {
    return this.httpClient.get(this.MOVIE_URL + '/findFilmById/' + id);
  }
  public findAllSeatDetailByCondition(name: string, date: string, time: number ): Observable<any> {
    console.log(this.MOVIE_URL + '/findAllSeatDetailByCondition/?name=' + name
      + '&date_show=' + date + '&time_id=' + time);
    return this.httpClient.get(this.MOVIE_URL + '/findAllSeatDetailByCondition/?name=' + name
      + '&date_show=' + date + '&time_id=' + time);
  }
  public getAllSeatDetailByIdSeatDetail(id: number) {
    return this.httpClient.get(this.MOVIE_URL + '/getAllSeatDetailByIdSeat/' + id);
  }

}
