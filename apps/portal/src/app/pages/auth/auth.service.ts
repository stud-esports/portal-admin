import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:5000/api/v1/auth/admin/sign-in';

  constructor(private http: HttpClient, private _router: Router) {}

  signIn(data: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(this.API_URL, data)
      .pipe(catchError(this.handleError));
  }

  logOut(): void {
    localStorage.clear();
    this._router.navigate(['auth']);
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
