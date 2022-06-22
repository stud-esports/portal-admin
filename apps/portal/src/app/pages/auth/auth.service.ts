import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'apps/portal/src/environments/environment';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = `${environment.apiUrl}auth}`;

  constructor(private http: HttpClient, private _router: Router) {}

  signIn(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/admin/sign-in`, data).pipe(
      map((response) => {
        this.setTokensToLocalStorage(
          response.access_token,
          response.refresh_token
        );

        this._router.navigate(['']);
      })
      // catchError(this.handleError)
    );
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/refresh-tokens`).pipe(
      map((response) =>
        this.setTokensToLocalStorage(
          response.access_token,
          response.refresh_token
        )
      ),
      catchError(this.handleError)
    );
  }

  setTokensToLocalStorage(access_token: string, refresh_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  logOut(): Observable<any> {
    localStorage.clear();
    this._router.navigate(['auth']);

    return this.http
      .get<any>(`${this.API_URL}/logout`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
