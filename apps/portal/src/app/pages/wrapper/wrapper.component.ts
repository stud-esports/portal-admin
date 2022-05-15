import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  isCollapsed = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  logOut(): void {
    this._authService.logOut();
  }
}
