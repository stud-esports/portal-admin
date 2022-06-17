import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversitiesComponent } from './universities.component';
import { UniversityComponent } from './university/university.component';

const routes: Routes = [
  {
    path: '',
    component: UniversitiesComponent,
  },
  {
    path: ':id',
    component: UniversityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversitiesRoutingModule {}
