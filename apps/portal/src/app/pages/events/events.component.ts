import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap, tap, Observable, map } from 'rxjs';
import { EventsService } from './events.service';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi
} from '@fullcalendar/angular';
import ruLocale from '@fullcalendar/core/locales/ru';
import { UsersService } from '../users/users.service';
import { UniversitiesService } from '../universities/universities.service';
import { environment } from 'apps/portal/src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'portal-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  form: FormGroup;
  selectedItem: any | null | undefined = null;
  isEditVisible = false;
  isClearFileList = false;
  uploadFormData: any;
  isDeleteFormData = false;
  isLoading = false;
  isUserAdmin = false;
  apiUrl = environment.filesUrl;
  eventList: any[] = [];
  modes = [
    { icon: 'pi pi-calendar', value: 'calendar' },
    { icon: 'pi pi-list', value: 'card' }
  ];
  selectedMode = { icon: 'pi pi-calendar', value: 'calendar' };
  universities: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _eventsService: EventsService,
    private _messageService: NzMessageService,
    private _userService: UsersService,
    private _universitiesService: UniversitiesService
  ) {
    this.form = this._formBuilder.group({
      title: ['', Validators.required],
      description: '',
      location: '',
      start: ['', Validators.required],
      end: ['', Validators.required],
      university_id: null
    });
  }

  calendarOptions: CalendarOptions = {
    locale: 'ru',
    locales: [ruLocale],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    events: this.eventList,
    initialEvents: this.eventList,
    weekends: true,
    selectable: true,
    dayMaxEvents: true,
    allDaySlot: false,
    validRange: {
      start: new Date()
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];

  ngOnInit(): void {
    this.isUserAdmin = this._userService.isCurrentUserAdmin();
    this.getList().pipe(untilDestroyed(this)).subscribe();
    this.form
      .get('university_id')
      ?.patchValue(this._userService.user?.moderated_university_id);
    this._universitiesService.universities
      .pipe(untilDestroyed(this))
      .subscribe((universities) => (this.universities = universities));
  }

  nzFilterOption = (): boolean => true;

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    this.showEditModal({
      start: selectInfo.startStr,
      end: new Date(selectInfo.startStr).setTime(
        new Date(selectInfo.startStr).getTime() + 30 * 60000
      )
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.showEditModal({
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      ...clickInfo.event.extendedProps
    });
  }

  handleEvents(events: EventApi[]): void {
    this.currentEvents = this.eventList;
  }

  showEditModal(item?: any): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.form.patchValue(this.selectedItem);
    }
    this.isEditVisible = true;
  }

  handleCancel(): void {
    this.form.reset();
    this.isEditVisible = false;
  }

  edit(): void {
    this.isLoading = true;

    this._eventsService
      .deleteImageByName(
        this.uploadFormData,
        this.selectedItem?.main_image_url,
        true,
        this.isDeleteFormData
      )
      .pipe(
        switchMap(() => this._eventsService.saveImage(this.uploadFormData)),
        switchMap((image) =>
          this._eventsService.update(this.selectedItem?._id, {
            ...this.form.value,
            main_image_url:
              !this.uploadFormData && !this.isDeleteFormData
                ? this.selectedItem?.main_image_url
                : image.path
          })
        ),
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create('success', `?????????????? ?????????????? ??????????????????`);
        }),
        switchMap(() => this.getList()),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.isClearFileList = false;
        this.uploadFormData = null;
        this.isDeleteFormData = false;
      });
  }

  confirmDelete(event: any): void {
    this.isLoading = true;
    this._eventsService
      .remove(event._id)
      .pipe(
        switchMap(() => {
          this.isLoading = false;
          this._messageService.create('success', '?????????????? ?????????????? ??????????????');
          return this.getList();
        }),
        switchMap(() =>
          this._eventsService.deleteImageByName(
            this.uploadFormData,
            event?.main_image_url,
            false
          )
        ),
        untilDestroyed(this)
      )
      .subscribe(() => (this.isDeleteFormData = false));
  }

  create(): void {
    this.isEditVisible = false;
    this._eventsService
      .saveImage(this.uploadFormData)
      .pipe(
        switchMap((image) =>
          this._eventsService.create({
            ...this.form.value,
            main_image_url: image.path ?? null,
            university_id:
              this._userService.user?.moderated_university_id ?? null
          })
        ),
        tap(() => {
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create('success', '?????????????? ?????????????? ??????????????');
        }),
        switchMap(() => this.getList()),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.isClearFileList = false;
        this.isDeleteFormData = false;
        this.uploadFormData = null;
      });
  }

  getList(): Observable<any[]> {
    if (this._userService.isCurrentUserModeratorOfUniversity()) {
      return this._eventsService
        .getAll(this._userService.user?.moderated_university_id)
        .pipe(
          map((events: any[]) => {
            events.forEach((event) => {
              event.createdAt = new Date(event.createdAt);
            });
            this.calendarOptions.events = events;
            return (this.eventList = events);
          })
        );
    } else {
      return this._eventsService.getAll().pipe(
        map((items: any[]) => {
          items.forEach((item) => {
            item.createdAt = new Date(item.createdAt);
          });
          this.calendarOptions.events = items;
          return (this.eventList = items);
        })
      );
    }
  }

  onConstructFormData(event: any): void {
    this.uploadFormData = event;
    this.isDeleteFormData = false;
  }

  onDeleteFormData() {
    this.isDeleteFormData = true;
  }
}
