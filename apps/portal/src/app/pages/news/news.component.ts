import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Table } from 'primeng/table';

import { map, Observable, switchMap, tap } from 'rxjs';

import { News } from '../../models';
import { NewsService } from './news.service';

@UntilDestroy()
@Component({
  selector: 'portal-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsForm: FormGroup;
  isEditVisible = false;

  uploadFormData: any;
  isClearFileList = false;
  isDeleteFormData = false;

  selectedNews: News | null | undefined = null;
  isLoading = false;

  newsList: News[] = [];

  modes = [
    { icon: 'pi pi-table', value: 'table' },
    { icon: 'pi pi-list', value: 'card' },
  ];
  selectedMode = { icon: 'pi pi-table', value: 'table' };

  @ViewChild(Table) dt: Table | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _newsService: NewsService,
    private _messageService: NzMessageService
  ) {
    this.newsForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: '',
    });
  }

  ngOnInit(): void {
    //  здесь будем доставать новости из store
    this.getNewsList().pipe(untilDestroyed(this)).subscribe();
  }

  getNewsList(): Observable<News[]> {
    return this._newsService.getAllNews().pipe(
      map((news: News[]) => {
        news.forEach(
          (newsItem) => (newsItem.createdAt = new Date(newsItem.createdAt))
        );
        return (this.newsList = news);
      })
    );
  }

  showEditModal(news?: News | null | undefined): void {
    this.selectedNews = news;
    if (this.selectedNews?._id) {
      this.newsForm.patchValue(this.selectedNews);
    }
    this.isEditVisible = true;
  }

  createNews(): void {
    this.isEditVisible = false;
    this._newsService
      .saveImage(this.uploadFormData)
      .pipe(
        switchMap((image) =>
          this._newsService.createNews({
            ...this.newsForm.value,
            main_image_url: image.path ?? null,
          })
        ),
        tap(() => {
          this.newsForm.reset();
          this.isClearFileList = true;
          this._messageService.create('success', `Новость успешно создана`);
        }),
        switchMap(() => this.getNewsList()),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.isClearFileList = false;
        this.uploadFormData = null;
        this.isDeleteFormData = false;
      });
  }

  onConstructFormData(event: any) {
    this.uploadFormData = event;
    this.isDeleteFormData = false;
  }

  // example for multiple images
  // createNews() {
  //   this.isEditVisible = false;
  //   const formData = this.constructFormDataImage()
  //   this._newsService
  //     .saveImages(formData)
  //     .pipe(
  //       switchMap((images) =>
  //         this._newsService.createNews({
  //           ...this.newsForm.value,
  //           // images,
  //           main_image_url: images[0],
  //         })
  //       ),
  //       tap(() => {
  //         this.newsForm.reset();
  //         this.fileList = [];
  //       }),
  //       switchMap(() => this.getNewsList()),
  //       untilDestroyed(this)
  //     )
  //     .subscribe();
  // }

  editNews(): void {
    this.isLoading = true;
    this._newsService
      .deleteImageByName(
        this.uploadFormData,
        this.selectedNews?.main_image_url,
        true,
        this.isDeleteFormData
      )
      .pipe(
        switchMap(() => this._newsService.saveImage(this.uploadFormData)),
        switchMap((image) => {
          return this._newsService.updateNewsById(this.selectedNews?._id, {
            ...this.newsForm.value,
            main_image_url:
              !this.uploadFormData && !this.isDeleteFormData
                ? this.selectedNews?.main_image_url
                : image.path,
          });
        }),
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.newsForm.reset();
          this.isClearFileList = true;
          this._messageService.create('success', `Новость успешно обновлена`);
        }),
        switchMap(() => this.getNewsList()),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.isClearFileList = false;
        this.uploadFormData = null;
        this.isDeleteFormData = false;
      });
  }

  confirmDelete(news: News): void {
    this.isLoading = true;
    this._newsService
      .deleteNewsById(news._id)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this._messageService.create('success', `Новость успешно удалена`);
        }),
        switchMap(() => this.getNewsList()),
        switchMap(() =>
          this._newsService.deleteImageByName(
            this.uploadFormData,
            news?.main_image_url,
            false
          )
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  handleCancel(): void {
    this.isEditVisible = false;
    this.newsForm.reset();
  }

  onDeleteFormData() {
    this.isDeleteFormData = true;
  }

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
