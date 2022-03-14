import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';

import { ApplicationMainTeamRoutingModule } from './application-main-team-routing.module';
import { ApplicationMainTeamComponent } from './application-main-team.component';

@NgModule({
  declarations: [ApplicationMainTeamComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationMainTeamRoutingModule,
    NzTableModule,
    NzModalModule,
    NzInputModule,
  ],
  exports: [ApplicationMainTeamComponent],
})
export class ApplicationMainTeamModule {}
