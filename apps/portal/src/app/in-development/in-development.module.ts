import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InDevelopmentComponent } from './in-development.component';
import { InDevelopmentRoutingModule } from './in-development-routing.module';

@NgModule({
  declarations: [InDevelopmentComponent],
  imports: [CommonModule, InDevelopmentRoutingModule],
  exports: [InDevelopmentComponent],
})
export class InDevelopmentModule {}
