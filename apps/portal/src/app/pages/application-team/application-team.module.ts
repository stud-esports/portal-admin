import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ApplicationTeamRoutingModule } from './application-team-routing.module';
import { ApplicationTeamComponent } from './application-team.component';
import { FormatTablePipe } from './format-table.pipe';

@NgModule({
  declarations: [ApplicationTeamComponent, FormatTablePipe],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationTeamRoutingModule,
    NzTableModule,
    NzModalModule,
    NzInputModule,
    NzPopoverModule,
    SelectButtonModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  exports: [ApplicationTeamComponent],
})
export class ApplicationTeamModule {}
