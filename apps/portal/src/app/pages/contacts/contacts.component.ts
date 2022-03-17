import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'portal-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  index1 = 0;
  index2 = 0;
  mockUsers = [
    {
      _id: 222,
      user: {
        _id: 1,
        first_name: 'Дарья',
        last_name: 'Попова',
        patronyc: 'Сергеевна',
        position: 'Разработчик',
        email: 'example@mail.ru',
        phone: '+7999999999',
        photo: 'https://avatars.githubusercontent.com/u/23119808?v=4',
      },
      questions: 'Разработка портала, разработка административной панели',
    },
    {
      _id: 333,
      user: {
        _id: 2,
        first_name: 'Дарья',
        last_name: 'Попова',
        patronyc: 'Сергеевна',
        position: 'Разработчик',
        email: 'example@mail.ru',
        phone: '',
        photo: 'https://avatars.githubusercontent.com/u/23119808?v=4',
      },
      questions: 'Разработка портала',
    },
  ];
  form: FormGroup;
  isEditVisible = false;
  selectedItem: any;
  isMarkMainImageForDelete = false;
  fileList: NzUploadFile[] = [];
  previewVisible = false;
  previewImage: any;
  isLoading = false;
  isDeleteModalVisible = false;

  // select
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = (): boolean => true;

  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient
  ) {
    this.form = this._formBuilder.group({
      questions: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  search(value: string): void {
    this._httpClient
      .jsonp<{ result: Array<[string, string]> }>(
        `https://suggest.taobao.com/sug?code=utf-8&q=${value}`,
        'callback'
      )
      .subscribe((data) => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.result.forEach((item) => {
          listOfOption.push({
            value: item[0],
            text: item[0],
          });
        });
        this.listOfOption = listOfOption;
      });
  }

  create() {}

  edit() {}

  showEditModal(item?: any): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.form.patchValue(this.selectedItem?.questions);
    }
    this.isEditVisible = true;
    this.isMarkMainImageForDelete = false;
  }

  showDeleteConfirmationModal(item: any): void {
    this.isDeleteModalVisible = true;
    this.selectedItem = item;
  }

  handleCancel() {
    this.isEditVisible = false;
    this.isDeleteModalVisible = false;
    this.form.reset();
  }

  handlePreview = async (file: any): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  checkIsMarkMainImageForDelete(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isMarkMainImageForDelete = true;
  }

  confirmDelete() {
    this.isLoading = true;
    // this._newsService
    //   .deleteNewsById(this.selectedNews._id)
    //   .pipe(
    //     tap(() => {
    //       this.isLoading = false;
    //       this.isDeleteModalVisible = false;
    //     }),
    //     switchMap(() => this.getNewsList()),
    //     switchMap(() =>
    //       this._newsService.deleteImageByName(this.selectedNews.main_image_url)
    //     )
    //   )
    //   .subscribe();
  }
}
