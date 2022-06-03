import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { UploadImageModule } from '../../shared/upload-image/upload-image.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewsRoutingModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzModalModule,
    NzImageModule,
    NzIconModule,
    NzSpaceModule,
    NzPopconfirmModule,
    NzMessageModule,
    UploadImageModule,
    DividerModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
  ],
  exports: [NewsComponent],
})
export class NewsModule {}
