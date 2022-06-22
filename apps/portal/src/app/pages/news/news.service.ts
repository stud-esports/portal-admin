import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/portal/src/environments/environment';
import { Observable, catchError, throwError, of } from 'rxjs';
import { News } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiUrl = `http://localhost:5000/api/v1/news`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  createNews(data: {
    title: string;
    text: string;
    description: string;
    university_id: number;
  }): Observable<News> {
    const API_URL = `${this.apiUrl}`;
    return this.http
      .post<News>(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  getAllNews(moderated_university_id?: number | null | undefined) {
    if (moderated_university_id) {
      return this.http.get<News[]>(
        `${this.apiUrl}?university_id=${moderated_university_id}`
      );
    } else {
      return this.http.get<News[]>(`${this.apiUrl}`);
    }
  }

  updateNewsById(
    id: number | undefined,
    data: {
      title: string;
      description: string;
      text: string;
      main_image_url: string;
    }
  ): Observable<News> {
    const API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .patch<News>(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  deleteNewsById(id: number): Observable<boolean> {
    const API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .delete<boolean>(API_URL)
      .pipe(catchError(this.handleError));
  }

  saveImage(data: FormData | null): Observable<{ path: string | null }> {
    if (!data) {
      return of({ path: null });
    }
    const API_URL = `${environment.apiUrl}files`;
    return this.http.post<{ path: string | null }>(API_URL, data, {});
  }

  saveImages(data: FormData): Observable<{ path: string }> {
    const API_URL = `${environment.apiUrl}files/multiple`;
    return this.http
      .post<{ path: string }>(API_URL, data, {})
      .pipe(catchError(this.handleError));
  }

  deleteImageByName(
    newImage: any,
    fname: string | null | undefined,
    isEdit = false,
    isDeletedImage = false
  ): Observable<any> {
    if (!fname) {
      return of({});
    }

    if (isEdit) {
      if (isDeletedImage) {
        return this._deleteImage(fname);
      } else if (fname && !newImage) {
        return of({});
      }
    }
    return this._deleteImage(fname);
  }

  private _deleteImage(fname: string) {
    const API_URL = `${environment.apiUrl}files`;
    const name = fname.split('/')[fname.split('/').length - 1];
    return this.http
      .delete(API_URL, { body: { fileName: name, folder: 'photos' } })
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
