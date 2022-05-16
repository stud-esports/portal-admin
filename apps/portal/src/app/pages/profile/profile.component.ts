import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'portal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private store: Store, private _usersService: UsersService) {}

  ngOnInit(): void {
    this.user = this._usersService.user;
  }
}
