import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { UploadImageComponent } from './upload-image.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [UploadImageComponent],
  imports: [
    CommonModule,
    NzUploadModule,
    NzModalModule,
    NzImageModule,
    NzIconModule,
    NzButtonModule,
  ],
  exports: [UploadImageComponent],
})
export class UploadImageModule {}
