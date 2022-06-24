import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { User } from '../../models';
import { UniversitiesService } from '../universities/universities.service';
import { UsersService } from '../users/users.service';

@UntilDestroy()
@Component({
  selector: 'portal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null | any = null;
  isShowEditModal = false;
  form: FormGroup;
  genders = [
    { name: 'мужской', value: 'male' },
    { name: 'женский', value: 'female' }
  ];
  universities: any[] = [];

  constructor(
    private store: Store,
    private _usersService: UsersService,
    private _fb: FormBuilder,
    private _universitiesService: UniversitiesService
  ) {
    this.form = this._fb.group({
      about_yourself: '',
      birth_date: ['', Validators.required],
      first_name: ['', Validators.required],
      gender: ['', Validators.required],
      last_name: ['', Validators.required],
      login: ['', Validators.required],
      patronymic: '',
      email: ['', Validators.required],
      phone: '',
      // photo_url: null
      // points: 0,
      student_card: '',
      university_id: ''
      // password: '' validators.required
    });
  }

  ngOnInit(): void {
    if (this._usersService.user) {
      this.user = this._usersService.user;
    } else {
      this._usersService
        .getUserByToken()
        .subscribe((user) => (this.user = user));
    }
    this._universitiesService.universities
      .pipe(untilDestroyed(this))
      .subscribe((universities: any) => (this.universities = universities));
  }

  nzFilterOption = (): boolean => true;

  hideEditModal() {
    this.isShowEditModal = false;
    this.form.reset;
  }

  showEditModal() {
    this.isShowEditModal = true;
    this.form.patchValue({ ...this.user });
  }

  updateProfile() {
    this._usersService
      .updateUser(this.user?._id, {
        ...this.form.value,
        birth_date: new Date(this.form.value.birth_date)
      })
      .subscribe();
  }
}
