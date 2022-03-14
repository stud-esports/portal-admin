import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { InDevelopmentModule } from '../../in-development/in-development.module';

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, ContactsRoutingModule, InDevelopmentModule],
})
export class ContactsModule {}
