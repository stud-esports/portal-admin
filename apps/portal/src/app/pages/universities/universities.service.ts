import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { University } from '../../models/University';

@Injectable({
  providedIn: 'root'
})
export class UniversitiesService implements OnInit {
  API_URL = 'http://localhost:5000/api/v1/universities';
  universities: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll(): Observable<University[]> {
    return this.http
      .get<University[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  create(data: University): Observable<University> {
    return this.http
      .post<University>(this.API_URL, data)
      .pipe(catchError(this.handleError));
  }

  update(id: number | null | undefined, data: University) {
    const API_URL = `${this.API_URL}/${id}`;
    return this.http
      .patch(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  remove(id: number) {
    const API_URL = `${this.API_URL}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.handleError));
  }

  getById(id: number | undefined) {
    const API_URL = `${this.API_URL}/${id}`;
    return this.http.get(API_URL).pipe(catchError(this.handleError));
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
