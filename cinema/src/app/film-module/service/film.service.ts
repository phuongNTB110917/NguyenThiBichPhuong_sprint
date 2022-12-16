import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from '../../model/film';
import {PageFilm} from '../../model/page-film';
import {Category} from '../../model/category';
import {CategoryFilm} from '../../model/category-film';
import {TokenStorageService} from '../../security/service/token-storage-service.service';

const API_URL = `${environment.apiUrl}` + '/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'};

  getAllFilmsWithPage(page: number): Observable<PageFilm> {
    return this.http.get<PageFilm>(API_URL + '/list?page=' + page, this.httpOptions);
  }

  search(searchName: any = '', page: number = 0): Observable<PageFilm> {
    let url = API_URL;
    url += '/list/search?value=' + searchName + '&page=' + page;
    return this.http.get<PageFilm>(url, this.httpOptions);
  }
  deleteFilm(id: number): Observable<PageFilm> {
    return this.http.delete<PageFilm>(API_URL + '/' + id, this.httpOptions);
  }
  detailFilm(id: number): Observable<Film> {
    return this.http.get<Film>(API_URL + '/' + id, this.httpOptions);
  }
  add(film: Film): Observable<Film> {
    return this.http.post<Film>(API_URL + '/create', film, this.httpOptions);
  }
  update(id: number, film: Film) {
    console.log('id = ' + id );
    return this.http.put<Film>(API_URL + '/update/' + film.id, film, this.httpOptions);
  }
  findById(id: number): Observable<Film> {
    return this.http.get<Film>(API_URL + '/' + id, this.httpOptions);
  }
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/getAllCategory', this.httpOptions);
  }

  // tslint:disable-next-line:ban-types
  getFilmIdByName(name: String): Observable<Number> {
    // tslint:disable-next-line:ban-types
    return this.http.get<Number>(API_URL + '/findFilmIdByName/' + name, this.httpOptions);
  }

  // tslint:disable-next-line:ban-types
  addCategoryFilm(id: Number, categoryId: Number, filmId: Number): Observable<CategoryFilm> {
    // @ts-ignore
    return this.http.post<CategoryFilm>( API_URL + '/createCategoryFilm/' + id + '/' + categoryId + '/' + filmId, this.httpOptions);
  }
  // tslint:disable-next-line:ban-types
  getNumberOfReCordOfCategoryFilm(): Observable<Number> {
    // tslint:disable-next-line:ban-types
    return this.http.get<Number>(API_URL + '/findNumberOfReCordOfCategoryFilm', this.httpOptions);
  }

  // getAllFilmsWithPage(page: number): Observable<PageFilm> {
  //   return this.http.get<PageFilm>(API_URL + '/list?page=' + page);
  // }
  //
  // search(searchName: any = '', page: number = 0): Observable<PageFilm> {
  //   let url = API_URL;
  //   url += '/search?value=' + searchName + '&page=' + page;
  //   return this.http.get<PageFilm>(url);
  // }
  getInfoFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(API_URL + '/info' + '?' + 'id=' + id, this.httpOptions);
  }
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }
}
