import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    FormsModule,
    NzModalModule,
    NzTableModule,
    NzCheckboxModule,
    NzDatePickerModule,
  ],
})
export class UsersModule {}
