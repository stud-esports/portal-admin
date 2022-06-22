import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { environment } from 'apps/portal/src/environments/environment';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'portal-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnChanges {
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  isMarkMainImageForDelete = false;
  apiUrl = environment.apiUrl;

  @Input() isClearFileList = false;
  @Input() selectedItem: any;
  @Output() formData: EventEmitter<FormData> = new EventEmitter();
  @Output() deleteFormData: EventEmitter<FormData> = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isClearFileList'].currentValue) {
      this.fileList = [];
    }
  }

  handlePreview = async (file: any): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  constructFormDataImage(): void {
    if (!this.fileList.length) {
      return;
    }
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.formData.emit(formData);
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.constructFormDataImage();
    return false;
  };

  checkIsMarkMainImageForDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isMarkMainImageForDelete = true;
    this.deleteFormData.emit();
  }
}
