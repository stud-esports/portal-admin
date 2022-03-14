import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { InDevelopmentModule } from '../../in-development/in-development.module';

@NgModule({
  declarations: [GamesComponent],
  imports: [CommonModule, GamesRoutingModule, InDevelopmentModule],
})
export class GamesModule {}
