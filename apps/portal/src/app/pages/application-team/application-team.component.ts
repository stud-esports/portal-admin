import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Table } from 'primeng/table';
import { map, switchMap, tap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { ApplicationTeamService } from './application-team.service';

@UntilDestroy()
@Component({
  selector: 'portal-application-team',
  templateUrl: './application-team.component.html',
  styleUrls: ['./application-team.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class ApplicationTeamComponent implements OnInit {
  isDeclineModalVisible = false;
  isConfirmModalVisible = false;

  reasonOfDecline = '';
  commentToConfirm = '';
  selectedApplication: any;

  expandSet = new Set<number>();

  applications: any[] = [];

  applicationsTypes = [
    { name: 'Активные', value: 'active' },
    { name: 'Архивные', value: 'archive' },
  ];
  selectedApplicationsType = 'active';

  @ViewChild(Table) dt: Table | null = null;

  constructor(
    private _applicationTeamService: ApplicationTeamService,
    private _route: ActivatedRoute,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    // if university_id, то подгружаем заявки этого универа
    this.getApplications().pipe(untilDestroyed(this)).subscribe();
    // то подгружать по первому университету
  }

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getApplications() {
    if (this._userService.isCurrentUserModeratorOfUniversity()) {
      return this._applicationTeamService
        .getAll(
          this._userService.user?._id,
          location.href.includes('main-team') ? 'main' : 'general',
          this._userService.user?.moderated_university_id
        )
        .pipe(
          map((items: any[]) => {
            items.forEach(
              (item) => (item.createdAt = new Date(item.createdAt))
            );
            return (this.applications = items);
          })
        );
    } else {
      return this._applicationTeamService
        .getAll(
          this._userService.user?._id,
          location.href.includes('main-team') ? 'main' : 'general'
        )
        .pipe(
          map((items: any[]) => {
            items.forEach(
              (item) => (item.createdAt = new Date(item.createdAt))
            );
            return (this.applications = items);
          })
        );
    }
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  showDeclineModal(application: any): void {
    this.isDeclineModalVisible = true;
    this.selectedApplication = application;
  }

  showConfirmModal(application: any): void {
    this.isConfirmModalVisible = true;
    this.selectedApplication = application;
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
    this.selectedApplication = null;
  }

  approveApplication(): void {
    this._applicationTeamService
      .approveApplication(this.selectedApplication._id, {
        user_id: this.selectedApplication.applicant._id,
        team_id: this.selectedApplication.team._id,
        commentary: this.commentToConfirm,
      })
      .pipe(
        switchMap(() => this.getApplications()),
        tap(() => this.handleCancel()),
        untilDestroyed(this)
      )
      .subscribe(() => this.handleCancel());
  }

  declineApplication(): void {
    this._applicationTeamService
      .declineApplication(this.selectedApplication._id, {
        user_id: this.selectedApplication.applicant._id,
        team_id: this.selectedApplication.team._id,
        commentary: this.reasonOfDecline,
      })
      .pipe(
        switchMap(() => this.getApplications()),
        tap(() => this.handleCancel()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
