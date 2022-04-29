import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap, tap, Observable, map } from 'rxjs';
import { EventsService } from './events.service';

@Component({
  selector: 'portal-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  form: FormGroup;
  selectedItem: any | null | undefined = null;
  isEditVisible = false;
  isClearFileList = false;
  uploadFormData: any;
  isDeleteFormData = false;
  isLoading = false;

  eventList: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _eventsService: EventsService,
    private _messageService: NzMessageService
  ) {
    this.form = this._formBuilder.group({
      title: ['', Validators.required],
      description: '',
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getList().pipe(untilDestroyed(this)).subscribe();
  }

  showEditModal(item?: any): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.form.patchValue({
        ...this.selectedItem,
      });
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
                : image.path,
          })
        ),
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create('success', `Событие успешно обновлено`);
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
          this._messageService.create('success', 'Событие успешно удалено');
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
          })
        ),
        tap(() => {
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create('success', 'Событие успешно создано');
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
    return this._eventsService
      .getAll()
      .pipe(map((items: any[]) => (this.eventList = items)));
  }

  onConstructFormData(event: any): void {
    this.uploadFormData = event;
    this.isDeleteFormData = false;
  }

  onDeleteFormData() {
    this.isDeleteFormData = true;
  }
}
