import { Component, OnInit } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';
import { environment } from 'apps/portal/src/environments/environment';
import { User } from '../../models';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  isCollapsed = false;
  isUserAdmin = false;
  isShowContacts = false;
  user: User | null = null;
  isLoadingUser$: any;
  isCurrentUserModeratorOfUniversity: any = false;
  apiUrl = environment.filesUrl;
  isProd = environment.production;

  constructor(
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._usersService.getUserByToken().subscribe(() => {
      this.isUserAdmin = this._usersService.isCurrentUserAdmin();
      this.user = this._usersService.user;
      this.isLoadingUser$ = this._usersService.isLoadingUser$;

      this.isShowContacts =
        this._usersService.user?.roles.some(
          (role) =>
            role.name === 'admin' ||
            (role.name === 'moderator' &&
              this._usersService.user?.moderated_university_id)
        ) || false;

      if (this._usersService.isCurrentUserModeratorOfUniversity()) {
        this.isCurrentUserModeratorOfUniversity =
          this._usersService.isCurrentUserModeratorOfUniversity();
      }
    });
  }

  logOut(): void {
    this._authService.logOut().pipe(untilDestroyed(this)).subscribe();
  }
}
