import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Account} from '../../model/account';
import {Content} from '@angular/compiler/src/render3/r3_ast';
import {TokenStorageService} from '../../security/service/token-storage-service.service';
import {PageAccount} from '../employee/model/page-employee';


const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private API_ACCOUNT = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'};

  constructor(private  http: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  getAll(page: number, searchFullname: string): Observable<Account[]> {
    return this.http.get<Account[]>( this.API_ACCOUNT + '/account/list?page=' + page + '&fullname=' + searchFullname, this.httpOptions);
  }

  findById(id: number): Observable<Account> {
    return this.http.get<Account>(`${API_URL}/account/find/${id}`, this.httpOptions);
  }

  edit(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${API_URL}/account/edit/${id}`, account, this.httpOptions);
  }
  getSearch(page: number, search: string): Observable<PageAccount> {
    return this.http.get<PageAccount>(this.API_ACCOUNT + `/account/employee/list?page=` + page + '&search=' + search , this.httpOptions);
  }
  delete(id: number): Observable<Content> {
    return this.http.delete<Content>(this.API_ACCOUNT + '/account/employee/delete/' + id);
  }
}
