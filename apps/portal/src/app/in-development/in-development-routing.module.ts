import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InDevelopmentComponent } from './in-development.component';

const routes: Routes = [{ path: '', component: InDevelopmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InDevelopmentRoutingModule {}
