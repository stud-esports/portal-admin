import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, switchMap } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { UniversitiesService } from '../universities.service';

@UntilDestroy()
@Component({
  selector: 'university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  university: any;
  isShowEditModal = false;
  form: FormGroup;

  constructor(
    private _universitiesService: UniversitiesService,
    private _userService: UsersService,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      title: ['', Validators.required],
      short_name: ['', Validators.required],
      address: '',
      phone: '',
      link: '',
      email: ['', [Validators.email]]
    });
  }

  ngOnInit(): void {
    this.getUniversityById().pipe(untilDestroyed(this)).subscribe();
  }

  getUniversityById() {
    return this._universitiesService
      .getById(this._userService.user?.moderated_university_id)
      .pipe(map((uni: any) => (this.university = uni)));
  }

  showEditModal() {
    this.isShowEditModal = true;
    this.form.patchValue(this.university);
  }

  hideEditModal() {
    this.isShowEditModal = false;
    this.form.reset();
  }

  updateUniversity() {
    this._universitiesService
      .update(this.university._id, this.form.value)
      .pipe(
        switchMap(() => {
          this.hideEditModal();
          return this.getUniversityById();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
