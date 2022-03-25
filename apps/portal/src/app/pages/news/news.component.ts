import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';

import { NzUploadFile } from 'ng-zorro-antd/upload';
import { map, pipe, switchMap, tap } from 'rxjs';
import { NewsService } from './news.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'portal-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsForm: FormGroup;
  isEditVisible = false;

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  selectedNews: any;
  isLoading = false;
  isMarkMainImageForDelete = false;

  newsList: {
    _id: number;
    title: string;
    description: string;
    main_image_url: string;
    images: any;
  }[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _newsService: NewsService
  ) {
    this.newsForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: '',
    });
  }

  ngOnInit() {
    //  здесь будем доставать новости из store
    this.getNewsList().pipe(untilDestroyed(this)).subscribe();
  }

  getNewsList() {
    return this._newsService
      .getAllNews()
      .pipe(map((news: any) => (this.newsList = news)));
  }

  handlePreview = async (file: any): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  showEditModal(news?: any): void {
    this.selectedNews = news;
    this.newsForm.patchValue(this.selectedNews);
    this.isEditVisible = true;
    this.isMarkMainImageForDelete = false;
  }

  createNews() {
    this.isEditVisible = false;
    const formData = this.constructFormDataImage();
    this._newsService
      .saveImage(formData)
      .pipe(
        switchMap((image) =>
          this._newsService.createNews({
            ...this.newsForm.value,
            main_image_url: image.path,
          })
        ),
        tap(() => {
          this.newsForm.reset();
          this.fileList = [];
        }),
        switchMap(() => this.getNewsList()),
        untilDestroyed(this)
      )
      .subscribe();
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
  // untilDestroyed(this)
  //     )
  //     .subscribe();
  // }

  editNews() {
    this.isLoading = true;
    this._newsService
      .deleteImageByName(this.selectedNews.main_image_url)
      .pipe(
        switchMap(() => {
          const formData = this.constructFormDataImage();
          return this._newsService.saveImage(formData);
        }),
        switchMap((image) => {
          return this._newsService.updateNewsById(this.selectedNews._id, {
            ...this.newsForm.value,
            main_image_url: image.path,
          });
        }),
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.newsForm.reset();
        }),
        switchMap(() => this.getNewsList()),
        untilDestroyed(this)
      )
      .subscribe();
  }

  constructFormDataImage() {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    return formData;
  }

  confirmDelete(id: number) {
    this.isLoading = true;
    this._newsService
      .deleteNewsById(id)
      .pipe(
        tap(() => (this.isLoading = false)),
        switchMap(() => this.getNewsList()),
        switchMap(() =>
          this._newsService.deleteImageByName(this.selectedNews.main_image_url)
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  handleCancel(): void {
    this.isEditVisible = false;
    this.newsForm.reset();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  checkIsMarkMainImageForDelete(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isMarkMainImageForDelete = true;
  }
}
