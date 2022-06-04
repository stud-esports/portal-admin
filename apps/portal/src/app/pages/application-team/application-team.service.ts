import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationTeamService {
  API_URL = 'http://localhost:5000/api/v1/applications';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(userId: number | undefined, teamType: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.API_URL}?user_id=${userId}&team_type=${teamType}`)
      .pipe(catchError(this.handleError));
  }


  approveApplication(id: number, data: any) {
    const API_URL = `${this.API_URL}/${id}/approve-application`;
    return this.http
      .patch(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  declineApplication(id: number, data: any) {
    const API_URL = `${this.API_URL}/${id}/decline-application`;
    return this.http
      .patch(API_URL, data, { headers: this.headers })
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
