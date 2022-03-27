import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';

import { map, Observable, switchMap, tap } from 'rxjs';

import { News } from '../../models';
import { NewsService } from './news.service';

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

  selectedNews: News | null | undefined = null;
  isLoading = false;

  newsList: News[] = [];

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
    return this._newsService
      .getAllNews()
      .pipe(map((news: News[]) => (this.newsList = news)));
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
      });
  }

  onConstructFormData(event: FormData) {
    this.uploadFormData = event;
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
      .deleteImageByName(this.selectedNews?.main_image_url)
      .pipe(
        switchMap(() => this._newsService.saveImage(this.uploadFormData)),
        switchMap((image) => {
          return this._newsService.updateNewsById(this.selectedNews?._id, {
            ...this.newsForm.value,
            main_image_url: image.path,
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
          this._newsService.deleteImageByName(news?.main_image_url)
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  handleCancel(): void {
    this.isEditVisible = false;
    this.newsForm.reset();
  }
}
