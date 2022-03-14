import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'portal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private store: Store) {}
}
