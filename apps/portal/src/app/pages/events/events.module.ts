import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { InDevelopmentModule } from '../../in-development/in-development.module';

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, EventsRoutingModule, InDevelopmentModule],
})
export class EventsModule {}
