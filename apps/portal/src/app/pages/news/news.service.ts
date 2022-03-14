import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiUrl: string = 'http://localhost:5000/api/v1/news';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create
  createNews(data: any): Observable<any> {
    const API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }

  // Read
  getAllNews() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Update
  updateNewsById(id: any, data: any): Observable<any> {
    const API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .patch(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Delete
  deleteNewsById(id: any): Observable<any> {
    const API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.handleError));
  }

  // Handle API errors
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

  saveImage(data: any): Observable<any> {
    const API_URL = `http://localhost:5000/api/v1/files`;
    return this.http.post(API_URL, data, {});
  }

  saveImages(data: any): Observable<any> {
    const API_URL = 'http://localhost:5000/api/v1/files/multiple';
    return this.http.post(API_URL, data, {}).pipe(catchError(this.handleError));
  }

  deleteImageByName(fname: string): Observable<any> {
    if (!fname) {
      return of();
    }
    const API_URL = `http://localhost:5000/api/v1/files`;
    const name = fname.split('/')[fname.split('/').length - 1];
    return this.http
      .delete(API_URL, { body: { fileName: name, folder: 'photos' } })
      .pipe(catchError(this.handleError));
  }
}
