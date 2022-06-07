import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';

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
    TableModule,
    NzCheckboxModule,
    NzDatePickerModule,
    ButtonModule,
    InputTextModule,
    NzInputModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzSelectModule,
  ],
})
export class UsersModule {}
