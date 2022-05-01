import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  API_URL = 'http://localhost:5000/api/v1/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.API_URL}/get-all`)
      .pipe(catchError(this.handleError));
  }

  blockUser(userId: number | undefined, dates: any): Observable<number> {
    return this.http
      .patch<number>(`${this.API_URL}/block/${userId}`, {
        banned_from_date: dates[0],
        banned_to_date: dates[1],
      })
      .pipe(catchError(this.handleError));
  }

  updateRoles(
    userId: number | undefined,
    newRoles: { name: string }[],
    oldRoles: { name: string }[] | undefined
  ) {
    return this.http
      .patch<number>(`${this.API_URL}/${userId}/update-roles`, {
        newRoles,
        oldRoles,
      })
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
