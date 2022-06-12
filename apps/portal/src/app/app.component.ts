import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { AuthService } from './pages/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private store: Store, private _authService: AuthService) {}

  ngOnInit(): void {}

  logOut(): void {
    this._authService.logOut();
  }
}
