import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/portal/src/environments/environment';
import { Observable, catchError, throwError, map, BehaviorSubject } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URL = `${environment.apiUrl}users`;
  user: User | null = null;
  isLoadingUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.API_URL}/get-all-by-admin`)
      .pipe(catchError(this.handleError));
  }

  updateUser(userId: number | null | undefined, data: any) {
    return this.http
      .put(`${this.API_URL}/${userId}`, data, {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  createUser(data: any) {
    return this.http
      .post(this.API_URL, data, {
        headers: this.headers
      })
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number | undefined) {
    return this.http
      .delete<User[]>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  blockUser(
    userId: number | undefined,
    dates: any,
    block_reason: string
  ): Observable<number> {
    return this.http
      .patch<number>(`${this.API_URL}/block/${userId}`, {
        banned_from_date: dates[0],
        banned_to_date: dates[1],
        block_reason
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
        oldRoles
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

  getUserByToken(): Observable<User> {
    this.isLoadingUser$.next(true);
    // if (localStorage.getItem('user')) {
    //   return localStorage.getItem('user')
    // }
    return this.http.get<User>(`${this.API_URL}/by-token`).pipe(
      map((user) => {
        this.user = user;
        this.isLoadingUser$.next(false);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }),
      catchError(this.handleError)
    );
  }

  isCurrentUserAdmin(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.roles.some(
      (role: { name: string }) => role.name === 'admin'
    );
  }

  isCurrentUserModerator(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.roles.some(
      (role: { name: string }) => role.name === 'moderator'
    );
  }

  isCurrentUserModeratorOfUniversity() {
    return (
      !this.isCurrentUserAdmin() &&
      this.isCurrentUserModerator() &&
      this.user?.moderated_university_id
    );
  }

  isCurrentUserIsNotModeratorOfUniversity() {
    return (
      !this.isCurrentUserAdmin() &&
      this.isCurrentUserModerator() &&
      !this.user?.moderated_university_id
    );
  }
}
