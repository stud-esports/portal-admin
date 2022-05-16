import { Component, OnInit } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';
import { User } from '../../models';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  isCollapsed = false;
  isUserAdmin = false;

  constructor(
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.isUserAdmin = this._usersService.isCurrentUserAdmin();
  }

  logOut(): void {
    this._authService.logOut().pipe(untilDestroyed(this)).subscribe();
  }
}
