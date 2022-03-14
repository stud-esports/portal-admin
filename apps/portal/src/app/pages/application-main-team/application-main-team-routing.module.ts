import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationMainTeamComponent } from './application-main-team.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationMainTeamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationMainTeamRoutingModule {}
