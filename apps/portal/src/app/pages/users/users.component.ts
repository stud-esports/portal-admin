import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  showChangeRoleModal(data: User): void {
    this.isChangeRoleModalVisible = true;
    this.selectedUser = data;

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
      .pipe(switchMap(() => this.getAllUsers()))
      .subscribe(() => {
        this.blockDates = null;
        this.isChangeRoleModalVisible = false;
        this.isBlockModalVisible = false;
        this.selectedUser = null;
      });
  }

  handleCancel(): void {
    this.isChangeRoleModalVisible = false;
    this.isBlockModalVisible = false;
    this.selectedUser = null;
    this.blockDates = null;
    this.rolesForm.reset();
  }
}
