import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';

import { ApplicationTeamRoutingModule } from './application-team-routing.module';
import { ApplicationTeamComponent } from './application-team.component';

@NgModule({
  declarations: [ApplicationTeamComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationTeamRoutingModule,
    NzTableModule,
    NzModalModule,
    NzInputModule,
  ],
  exports: [ApplicationTeamComponent],
})
export class ApplicationTeamModule {}
