import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class UniversitiesService implements OnInit {
  API_URL = 'http://localhost:5000/api/v1/universities';
  universities: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAll()
      .pipe(untilDestroyed(this))
      .subscribe((universities: any[]) => {
        this.universities.next([
          { _id: null, title: 'Не выбрано' },
          ...universities,
        ]);
      });
  }

  getAll(): Observable<any[]> {
    return this.http
      .get<any[]>(this.API_URL)
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
