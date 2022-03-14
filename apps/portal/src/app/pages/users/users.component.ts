import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
  blocked: [Date | null | string, Date | null | string] | null;
  roles: string[];
}

@Component({
  selector: 'portal-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      blocked: [
        'Tue Mar 08 2022 17:30:38 GMT+0300 (Moscow Standard Time)',
        'Tue Mar 08 2022 17:30:38 GMT+0300 (Moscow Standard Time)',
      ],
      roles: ['user'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      blocked: null,
      roles: ['user', 'moderator'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      blocked: null,
      roles: ['user', 'admin'],
    },
  ];
  isChangeRoleModalVisible = false;
  isBlockModalVisible = false;
  selectedUser: any;

  blockDates = null;

  rolesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rolesForm = this.fb.group({
      user: false,
      moderator: false,
      admin: false,
    });
  }

  ngOnInit(): void {}

  showChangeRoleModal(data: any): void {
    this.isChangeRoleModalVisible = true;
    this.selectedUser = data;

    if (this.selectedUser.roles.includes('user')) {
      this.rolesForm.get('user')?.patchValue(true);
    }
    if (this.selectedUser.roles.includes('admin')) {
      this.rolesForm.get('admin')?.patchValue(true);
    }
    if (this.selectedUser.roles.includes('moderator')) {
      this.rolesForm.get('moderator')?.patchValue(true);
    }
  }

  showBlockModal(data: any): void {
    this.isBlockModalVisible = true;
    this.selectedUser = data;
    this.blockDates = this.selectedUser.blocked;
  }

  handleOk(): void {
    this.isChangeRoleModalVisible = false;
    this.isBlockModalVisible = false;
    this.selectedUser = null;
    this.rolesForm.reset();
  }

  handleCancel(): void {
    this.isChangeRoleModalVisible = false;
    this.isBlockModalVisible = false;
    this.selectedUser = null;
    this.rolesForm.reset();
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
}
