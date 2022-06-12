import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { UploadImageModule } from '../../shared/upload-image/upload-image.module';
import { SelectButtonModule } from 'primeng/selectbutton';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    FormsModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    NzModalModule,
    UploadImageModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzDatePickerModule,
    NzMessageModule,
    NzDividerModule,
    NzCardModule,
    NzPopconfirmModule,
    FullCalendarModule,
    CalendarModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    SelectButtonModule,
    NzSelectModule,
  ],
})
export class EventsModule {}
