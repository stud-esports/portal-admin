import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthService } from './pages/auth/auth.service';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;

  constructor(
    private store: Store,
    private _authService: AuthService,
    private http: HttpClient
  ) {}

  logOut(): void {
    this._authService.logOut();
  }
}
