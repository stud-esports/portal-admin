import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { TeamComponent } from './team.component';
import { TeamRoutingModule } from './team-routing.module';
import { UploadImageModule } from '../../shared/upload-image/upload-image.module';

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TeamRoutingModule,
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    UploadImageModule,
    NzCardModule,
    NzDividerModule,
    NzListModule,
    NzPopoverModule
  ]
})
export class TeamModule {}
