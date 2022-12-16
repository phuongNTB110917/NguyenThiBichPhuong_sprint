import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Account} from '../../model/account';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {
  }

  addAccount(account: Account): Observable<Account> {
    // @ts-ignore
    return this.httpClient.post<Account>(API_URL + '/auth/add', account);
    // return this.httpClient.post<Account>(API_URL + '/add', account).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

    }

    return throwError(error);
  }
  findById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(API_URL + '/account/find/' + id);
  }

  changePassword(id: number, oldPass: string, newPass: string): Observable<Account> {
    return this.httpClient.post<Account>
    (API_URL + '/account/updatePassword?id=' + id + '&oldPass=' + oldPass + '&newPass=' + newPass, {});
  }

  updateInfo(id: number, account: Account): Observable<Account> {
    return this.httpClient.post<Account>(API_URL + '/account/update?id=' + id, account);
  }

  checkExistEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(API_URL + '/account/checkExistEmail?email=' + email);
  }
}
