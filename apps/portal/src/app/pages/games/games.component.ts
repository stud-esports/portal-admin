import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, switchMap, tap } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';
import { genres } from 'apps/portal/src/assets/genres';
import { Game } from '../../models/Game';
import { GamesService } from './games.service';

@Component({
  selector: 'portal-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  form: FormGroup;
  selectedItem: any | null | undefined = null;
  isEditVisible = false;
  genres = genres;
  isLoading = false;

  uploadFormData: any;
  isClearFileList = false;
  isDeleteFormData = false;

  gamesList: Game[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _gamesService: GamesService,
    private _messageService: NzMessageService
  ) {
    this.form = this._formBuilder.group({
      title: ['', Validators.required],
      description: '',
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getList().pipe(untilDestroyed(this)).subscribe();
  }

  onConstructFormData(event: any): void {
    this.uploadFormData = event;
    this.isDeleteFormData = false;
  }

  showEditModal(item?: Game): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.form.patchValue(this.selectedItem);
    }
    this.isEditVisible = true;
  }

  edit(): void {
    this.isLoading = true;
    this._gamesService
      .deleteImageByName(
        this.uploadFormData,
        this.selectedItem?.main_image_url,
        true,
        this.isDeleteFormData
      )
      .pipe(
        switchMap(() => this._gamesService.saveImage(this.uploadFormData)),
        switchMap((image) => {
          return this._gamesService.update(this.selectedItem?._id, {
            ...this.form.value,
            main_image_url:
              !this.uploadFormData && !this.isDeleteFormData
                ? this.selectedItem?.main_image_url
                : image.path,
          });
        }),
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create('success', `Новость успешно обновлена`);
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

  confirmDelete(game: Game): void {
    this.isLoading = true;
    this._gamesService
      .remove(game._id)
      .pipe(
        switchMap(() => {
          this.isLoading = false;
          this._messageService.create(
            'success',
            'Дисциплина (игра) успешно удалена'
          );
          return this.getList();
        }),
        switchMap(() =>
          this._gamesService.deleteImageByName(
            this.uploadFormData,
            game?.main_image_url,
            false
          )
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  create(): void {
    this.isEditVisible = false;
    this._gamesService
      .saveImage(this.uploadFormData)
      .pipe(
        switchMap((image) =>
          this._gamesService.create({
            ...this.form.value,
            main_image_url: image.path ?? null,
          })
        ),
        tap(() => {
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create(
            'success',
            'Дисциплина (игра) успешно создана'
          );
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

  getList(): Observable<Game[]> {
    return this._gamesService
      .getAll()
      .pipe(map((items: Game[]) => (this.gamesList = items)));
  }

  handleCancel() {
    this.form.reset();
    this.isEditVisible = false;
  }

  onDeleteFormData() {
    this.isDeleteFormData = true;
  }
}
