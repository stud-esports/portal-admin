import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  API_URL = 'http://localhost:5000/api/v1/events';
  FILES_API_URL = 'http://localhost:5000/api/v1/files';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  create(data: {
    title: string;
    description: string;
    start: Date;
    end: Date;
    location: string;
    event_university_id: number;
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
    // если нет пути фото, то не удаляем
    if (!fname) {
      return of({});
    }

    if (isEdit) {
      // если есть путь, но нет новой картинки
      // 1) картинка уже есть и она не меняется fname !newImage
      // 2) картинка была, но удалена и не вставлена новая !fname !newImage
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

  getAll(moderated_university_id?: number | null | undefined) {
    if (moderated_university_id) {
      return this.http.get<any[]>(
        `${this.API_URL}?university_id=${moderated_university_id}`
      );
    } else {
      return this.http.get<any[]>(`${this.API_URL}`);
    }
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
