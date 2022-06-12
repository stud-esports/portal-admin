import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';

import { tap, switchMap, map, Observable, catchError, EMPTY } from 'rxjs';

import { Contact, User } from '../../models/index';
import { UniversitiesService } from '../universities/universities.service';
import { UsersService } from '../users/users.service';
import { ContactsService } from './contacts.service';

@UntilDestroy()
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
  isUserAdmin = false;
  universities: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _contactsService: ContactsService,
    private _messageService: NzMessageService,
    private _userService: UsersService,
    private _universitiesService: UniversitiesService
  ) {
    this.form = this._formBuilder.group({
      questions: ['', Validators.required],
      position: ['', Validators.required],
      userId: [{}, Validators.required],
      contact_university_id: null,
    });
  }

  ngOnInit(): void {
    this.isUserAdmin = this._userService.isCurrentUserAdmin();
    this.getContactsList().pipe(untilDestroyed(this)).subscribe();
    this.form
      .get('contact_university_id')
      ?.patchValue(this._userService.user?.moderated_university_id);
    this._universitiesService.universities
      .pipe(untilDestroyed(this))
      .subscribe((universities) => {
        this.universities = universities;
      });
  }

  getContactsList(): Observable<Contact[]> {
    if (this._userService.isCurrentUserModeratorOfUniversity()) {
      return this._contactsService
        .getAllContacts(this._userService.user?.moderated_university_id)
        .pipe(
          map((items: Contact[]) => {
            // items.forEach(
            //   (item) => (item.createdAt = new Date(item.createdAt))
            // );
            return (this.contacts = items);
          })
        );
    } else {
      return this._contactsService.getAllContacts().pipe(
        map((items: any[]) => {
          items.forEach((item) => (item.createdAt = new Date(item.createdAt)));
          return (this.contacts = items);
        })
      );
    }
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
    console.log(this._userService.user);
    this._contactsService
      .create({
        ...this.form.value,
        user_id: this.form.value.userId,
      })
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
          this._messageService.create('success', `Контакт успешно создан`);
        }),
        switchMap(() => this.getContactsList()),
        catchError(() => {
          this._messageService.create(
            'error',
            `Контакт с этим пользователем уже существует`
          );
          return EMPTY;
        }),
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
          this._messageService.create('success', `Контакт успешно обновлен`);
        }),
        catchError(() => {
          this._messageService.create(
            'error',
            `Контакт с этим пользователем уже существует`
          );
          return EMPTY;
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
          this._messageService.create('success', `Контакт успешно удален`);
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
