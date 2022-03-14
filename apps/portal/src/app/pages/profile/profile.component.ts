import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'portal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private store: Store) {}
}
