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
  user: User | null = null;
  isLoadingUser$: any;

  constructor(
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._usersService.getUserByToken().subscribe(() => {
      this.isUserAdmin = this._usersService.isCurrentUserAdmin();
      this.user = this._usersService.user;
      this.isLoadingUser$ = this._usersService.isLoadingUser$;
    });
  }

  logOut(): void {
    this._authService.logOut().pipe(untilDestroyed(this)).subscribe();
  }
}
