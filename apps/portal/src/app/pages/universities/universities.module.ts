import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversitiesComponent } from './universities.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UniversitiesComponent],
  exports: [UniversitiesComponent],
  imports: [CommonModule, FormsModule],
})
export class UniversitiesModule {}
