import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from 'apps/portal/src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, Observable, switchMap, tap } from 'rxjs';
import { User } from '../../models';
import { Game } from '../../models/Game';
import { Team } from '../../models/Team';
import { ContactsService } from '../contacts/contacts.service';
import { GamesService } from '../games/games.service';
import { UniversitiesService } from '../universities/universities.service';
import { UsersService } from '../users/users.service';
import { TeamService } from './team.service';

@UntilDestroy()
@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  form: FormGroup;
  selectedItem: any | null | undefined = null;
  isEditVisible = false;
  isLoading = false;
  teamList: Team[] = [];
  isUserAdmin = false;
  isCurrentUserIsNotModeratorOfUniversity = false;
  apiUrl = environment.filesUrl;

  // teamTypes = [
  //   { name: 'Сборная', value: 'main' },
  //   { name: 'Обычная', value: 'simple' },
  // ];
  teamTypes = [
    { name: 'Сборная', value: 'main' },
    { name: 'Обычная', value: 'general' }
  ];

  users: User[] = [];
  games: Game[] = [];
  universities: any[] = [];
  nzFilterOption = (): boolean => true;

  uploadFormData: any;
  isClearFileList = false;
  isDeleteFormData = false;

  constructor(
    private _fb: FormBuilder,
    private _contactsService: ContactsService,
    private _gamesService: GamesService,
    private _messageService: NzMessageService,
    private _teamService: TeamService,
    private _userService: UsersService,
    private _universitiesService: UniversitiesService
  ) {
    this.form = this._fb.group({
      title: ['', Validators.required],
      description: '',
      team_type: ['', Validators.required],
      game_id: [{}, Validators.required],
      captain_id: [{}, Validators.required],
      logo_url: '',
      members_count: ['', Validators.required],
      university_id: null
    });
  }
  ngOnInit(): void {
    this.isUserAdmin = this._userService.isCurrentUserAdmin();
    this.isCurrentUserIsNotModeratorOfUniversity =
      this._userService.isCurrentUserIsNotModeratorOfUniversity();
    if (this.isCurrentUserIsNotModeratorOfUniversity) {
      this.form.get('team_type')?.patchValue('general');
    }
    this.getList().pipe(untilDestroyed(this)).subscribe();
    this.form
      .get('university_id')
      ?.patchValue(this._userService.user?.moderated_university_id);
    this._universitiesService.universities
      .pipe(untilDestroyed(this))
      .subscribe((universities) => {
        this.universities = universities;
      });
  }

  onConstructFormData(event: any): void {
    this.uploadFormData = event;
    this.isDeleteFormData = false;
  }

  showEditModal(item?: Team): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.form.patchValue({
        ...this.selectedItem,
        game_id: this.selectedItem.game_id,
        captain_id: this.selectedItem.captain_id
      });
      this.users.push(this.selectedItem.captain);
      this.games.push(this.selectedItem.game);
      this.teamTypes.push(this.selectedItem.team_type);
    }
    this.isEditVisible = true;
  }

  create(): void {
    this.isEditVisible = false;
    this._teamService
      .saveImage(this.uploadFormData)
      .pipe(
        switchMap((image) =>
          this._teamService.create({
            ...this.form.value,
            captain_id: this.form.value.captain_id,
            game_id: this.form.value.game_id,
            logo_url: image.path ?? null,
            university_id:
              this._userService.user?.moderated_university_id ?? null
          })
        ),
        tap(() => {
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create('success', 'Команда успешно создана');
        }),
        switchMap(() => this.getList()),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.isClearFileList = false;
        this.uploadFormData = null;
        this.isDeleteFormData = false;
      });
  }

  edit(): void {
    this.isLoading = true;
    this._teamService
      .deleteImageByName(
        this.uploadFormData,
        this.selectedItem?.logo_url,
        true,
        this.isDeleteFormData
      )
      .pipe(
        switchMap((image) => {
          return this._teamService.update(this.selectedItem?._id, {
            ...this.form.value,
            logo_url:
              !this.uploadFormData && !this.isDeleteFormData
                ? this.selectedItem?.logo_url
                : image.path
          });
        }),
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
          this.isClearFileList = true;
          this._messageService.create('success', `Команда успешно обновлена`);
        }),
        switchMap(() => this.getList()),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.isClearFileList = false;
        this.uploadFormData = null;
        this.isDeleteFormData = false;
      });
  }

  confirmDelete(team: Team): void {
    this.isLoading = true;
    this._teamService
      .remove(team._id)
      .pipe(
        switchMap(() => {
          this.isLoading = false;
          this._messageService.create('success', 'Команда успешно удалена');
          return this.getList();
        }),
        switchMap(() =>
          this._teamService.deleteImageByName(
            this.uploadFormData,
            team?.logo_url,
            false
          )
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  getList(): Observable<any[]> {
    if (this._userService.isCurrentUserModeratorOfUniversity()) {
      this.isLoading = true;
      return this._teamService
        .getAll(this._userService.user?.moderated_university_id)
        .pipe(
          map((items: any[]) => {
            items.forEach(
              (item) => (item.createdAt = new Date(item.createdAt))
            );
            return (this.teamList = items);
          }),
          tap(() => (this.isLoading = true))
        );
    } else {
      return this._teamService.getAll().pipe(
        map((items: any[]) => {
          items.forEach((item) => (item.createdAt = new Date(item.createdAt)));
          return (this.teamList = items);
        })
      );
    }
  }

  handleCancel() {
    this.form.reset();
    this.isEditVisible = false;
  }

  onDeleteFormData() {
    this.isDeleteFormData = true;
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

  searchGame(value: string): void {
    if (!value) {
      return;
    }

    this._gamesService
      .searchGame(value)
      .pipe(
        map((games: Game[]) => (this.games = games)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  deleteMemberFromTeam(teamId: number, userId: number) {
    this._teamService
      .deleteMemberFromTeam(userId, teamId)
      .pipe(
        switchMap(() => this.getList()),
        tap(() => this.handleCancel()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
