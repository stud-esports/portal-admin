import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../../models';
import { UsersService } from './users.service';

@Component({
  selector: 'portal-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  isChangeRoleModalVisible = false;
  isBlockModalVisible = false;
  selectedUser: User | null = null;

  blockDates: any = null;

  rolesForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private _usersService: UsersService) {
    this.rolesForm = this.fb.group({
      user: false,
      moderator: false,
      admin: false,
    });
  }

  ngOnInit(): void {
    this.getAllUsers().subscribe();
  }

  getAllUsers(): Observable<any[]> {
    return this._usersService
      .getAll()
      .pipe(map((users) => (this.users = users)));
  }

  showChangeRoleModal(user: User): void {
    this.isChangeRoleModalVisible = true;
    this.selectedUser = user;

    if (this.selectedUser?.roles.some((role) => role.name === 'user')) {
      this.rolesForm.get('user')?.patchValue(true);
    }
    if (this.selectedUser?.roles.some((role) => role.name === 'admin')) {
      this.rolesForm.get('admin')?.patchValue(true);
    }
    if (this.selectedUser?.roles.some((role) => role.name === 'moderator')) {
      this.rolesForm.get('moderator')?.patchValue(true);
    }
  }

  showBlockModal(data: User): void {
    this.isBlockModalVisible = true;
    this.selectedUser = data;
    this.blockDates = null;
  }

  blockOrUnblockUser(action: 'block' | 'unblock', user?: User): void {
    if (user) {
      this.selectedUser = user;
    }
    this._usersService
      .blockUser(
        this.selectedUser?._id,
        action === 'block' ? this.blockDates : [null, null]
      )
      .pipe(
        switchMap(() => this.getAllUsers()),
        untilDestroyed(this)
      )
      .subscribe(() => this.handleBlockCancel());
  }

  handleBlockCancel(): void {
    this.isBlockModalVisible = false;
    this.selectedUser = null;
    this.blockDates = null;
  }

  handleRolesCancel(): void {
    this.isChangeRoleModalVisible = false;
    this.selectedUser = null;
    this.rolesForm.reset();
  }

  changeRoles(): void {
    const rolesToUpdate: { name: string }[] = [];
    Object.keys(this.rolesForm.controls).forEach((key) => {
      if (this.rolesForm.get(key)?.value) {
        rolesToUpdate.push({ name: key });
      }
    });
    const oldRoles = this.selectedUser?.roles;

    this._usersService
      .updateRoles(this.selectedUser?._id, rolesToUpdate, oldRoles)
      .pipe(
        switchMap(() => this.getAllUsers()),
        untilDestroyed(this)
      )
      .subscribe(() => this.handleRolesCancel());
  }
}
