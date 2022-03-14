import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'portal-application-team',
  templateUrl: './application-team.component.html',
  styleUrls: ['./application-team.component.scss'],
})
export class ApplicationTeamComponent implements OnInit {
  isDeclineModalVisible = false;
  isConfirmModalVisible = false;

  reasonOfDecline = '';
  commentToConfirm = '';

  expandSet = new Set<number>();

  listOfData = [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      expand: false,
      address: 'New York No. 1 Lake Park',
      reason:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      id: 2,
      name: 'Jim Green',
      age: 42,
      expand: false,
      address: 'London No. 1 Lake Park',
      reason:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      reason:
        'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

  ngOnInit(): void {
    // из стора брать заявки
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  showDeclineModal(): void {
    this.isDeclineModalVisible = true;
  }

  showConfirmModal(): void {
    this.isConfirmModalVisible = true;
  }

  handleOk(): void {
    this.isDeclineModalVisible = false;
    this.isConfirmModalVisible = false;
  }

  handleCancel(): void {
    this.isDeclineModalVisible = false;
    this.isConfirmModalVisible = false;
    this.reasonOfDecline = '';
    this.commentToConfirm = '';
  }
}
