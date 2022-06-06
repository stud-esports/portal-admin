import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../../models';
import { UsersService } from './users.service';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import { NzMessageService } from 'ng-zorro-antd/message';

@UntilDestroy()
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
  block_reason = '';

  rolesForm: FormGroup;
  users: User[] = [];

  @ViewChild(Table) dt: Table | null = null;

  constructor(
    private fb: FormBuilder,
    private _usersService: UsersService,
    private nzMessageService: NzMessageService
  ) {
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
        action === 'block' ? this.blockDates : [null, null],
        this.block_reason
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
    this.block_reason = '';
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

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
