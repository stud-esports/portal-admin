import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageModule } from './upload-image/upload-image.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [CommonModule, UploadImageModule],
  exports: [UploadImageModule],
})
export class SharedModule {}
