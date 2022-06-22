import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversitiesComponent } from './universities.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversitiesRoutingModule } from './universities-routing.module';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UniversityComponent } from './university/university.component';

@NgModule({
  declarations: [UniversitiesComponent, UniversityComponent],
  exports: [UniversitiesComponent, UniversityComponent],
  imports: [
    CommonModule,
    UniversitiesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzMessageModule,
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzCardModule,
    NzDividerModule,
    NzListModule,
    NzPopoverModule,
    TableModule,
    SelectButtonModule,
    InputTextModule,
    ButtonModule
  ]
})
export class UniversitiesModule {}
