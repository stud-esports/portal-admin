import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/portal/src/environments/environment';

import { Observable, catchError, throwError } from 'rxjs';

import { User, Contact } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  apiUrlUsers = `${environment.apiUrl}users/search`;
  apiUrlContacts = `${environment.apiUrl}contacts`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {}

  searchUsers(text: string): Observable<User[]> {
    const API_URL = `${this.apiUrlUsers}?text=${text}`;
    return this._http.get<User[]>(API_URL);
  }

  create(data: any): Observable<any> {
    const API_URL = `${this.apiUrlContacts}`;
    return this._http.post(API_URL, data).pipe(catchError(this.handleError));
  }

  getAllContacts(moderated_university_id?: number | null | undefined) {
    const API_URL = `${this.apiUrlContacts}`;
    if (moderated_university_id) {
      return this._http.get<Contact[]>(
        `${API_URL}?university_id=${moderated_university_id}`
      );
    } else {
      return this._http.get<Contact[]>(`${API_URL}`);
    }
  }

  updateContact(id: number | null | undefined, data: any) {
    const API_URL = `${this.apiUrlContacts}/${id}`;
    return this._http
      .patch(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  removeContact(id: number) {
    const API_URL = `${this.apiUrlContacts}/${id}`;
    return this._http.delete(API_URL).pipe(catchError(this.handleError));
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
