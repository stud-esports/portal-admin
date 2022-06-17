import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Game } from '../../models/Game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  API_URL = 'http://localhost:5000/api/v1/games';
  FILES_API_URL = 'http://localhost:5000/api/v1/files';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  searchGame(text: string): Observable<Game[]> {
    const API_URL = `${this.API_URL}/search?text=${text}`;
    return this.http.get<Game[]>(API_URL);
  }

  create(data: {
    title: string;
    description: string;
    genre: string;
    short_title: string;
  }): Observable<any> {
    return this.http
      .post<any>(this.API_URL, data)
      .pipe(catchError(this.handleError));
  }

  saveImage(data: FormData | null): Observable<{ path: string | null }> {
    if (!data) {
      return of({ path: null });
    }
    return this.http.post<{ path: string | null }>(
      this.FILES_API_URL,
      data,
      {}
    );
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
    const name = fname.split('/')[fname.split('/').length - 1];
    return this.http
      .delete(this.FILES_API_URL, {
        body: { fileName: name, folder: 'photos' },
      })
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<Game[]> {
    return this.http
      .get<Game[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  update(id: number | null | undefined, data: any) {
    const API_URL = `${this.API_URL}/${id}`;
    return this.http
      .patch(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  remove(id: number) {
    const API_URL = `${this.API_URL}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.handleError));
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
