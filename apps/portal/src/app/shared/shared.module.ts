import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageModule } from './upload-image/upload-image.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UploadImageModule],
  exports: [UploadImageModule],
})
export class SharedModule {}
