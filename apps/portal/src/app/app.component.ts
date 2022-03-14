import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;

  constructor(private store: Store) {}
}
