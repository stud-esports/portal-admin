import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';

import { tap, switchMap, map, Observable } from 'rxjs';

import { Contact, User } from '../../models/index';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'portal-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  form: FormGroup;
  isEditVisible = false;
  selectedItem: Contact | null | undefined = null;
  // isMarkMainImageForDelete = false;
  // fileList: NzUploadFile[] = [];
  // previewVisible = false;
  // previewImage: any;
  isLoading = false;

  users: User[] = [];
  contacts: Contact[] = [];
  nzFilterOption = (): boolean => true;

  constructor(
    private _formBuilder: FormBuilder,
    private _contactsService: ContactsService
  ) {
    this.form = this._formBuilder.group({
      questions: ['', Validators.required],
      position: ['', Validators.required],
      userId: [{}, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getContactsList().pipe(untilDestroyed(this)).subscribe();
  }

  getContactsList(): Observable<Contact[]> {
    return this._contactsService
      .getAllContacts()
      .pipe(map((contacts: Contact[]) => (this.contacts = contacts)));
  }

  search(value: string): void {
    if (!value) {
      return;
    }
    this._contactsService
      .searchUsers(value)
      .pipe(
        map((users: User[]) => (this.users = users)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  create(): void {
    this.isLoading = true;
    this._contactsService
      .create({ ...this.form.value, user_id: this.form.value.userId })
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
        }),
        switchMap(() => this.getContactsList()),
        untilDestroyed(this)
      )
      .subscribe();
  }

  edit(): void {
    this.isLoading = true;
    this._contactsService
      .updateContact(this.selectedItem?._id, {
        ...this.form.value,
        user_id: this.form.value.userId,
      })
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
        }),
        switchMap(() => this.getContactsList()),
        untilDestroyed(this)
      )
      .subscribe();
  }

  showEditModal(item?: Contact): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.form.patchValue({
        ...this.selectedItem,
        userId: this.selectedItem.user_id,
      });
      this.users.push(this.selectedItem.user);
    }
    this.isEditVisible = true;
    // this.isMarkMainImageForDelete = false;
  }

  handleCancel(): void {
    this.isEditVisible = false;
    this.form.reset();
  }

  // handlePreview = async (file: any): Promise<void> => {
  //   if (!file.url && !file['preview']) {
  //     file['preview'] = await getBase64(file.originFileObj);
  //   }
  //   this.previewImage = file.url || file['preview'];
  //   this.previewVisible = true;
  // };

  // beforeUpload = (file: NzUploadFile): boolean => {
  //   this.fileList = this.fileList.concat(file);
  //   return false;
  // };

  // checkIsMarkMainImageForDelete(event: Event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // this.isMarkMainImageForDelete = true;
  // }

  confirmDelete(id: number): void {
    this.isLoading = true;
    this._contactsService
      .removeContact(id)
      .pipe(
        switchMap(() => {
          this.isLoading = false;
          return this.getContactsList();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  getFullName(first_name: string, last_name: string, patronymic?: string) {
    return last_name + ' ' + first_name + (patronymic ? ' ' + patronymic : '');
  }
}
