import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { UploadImageModule } from '../../shared/upload-image/upload-image.module';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GamesRoutingModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    UploadImageModule,
    NzMessageModule,
    NzCardModule,
    NzDividerModule,
    NzButtonModule,
    NzPopconfirmModule,
  ],
})
export class GamesModule {}
