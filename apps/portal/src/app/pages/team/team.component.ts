import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, Observable, switchMap, tap } from 'rxjs';
import { User } from '../../models';
import { Game } from '../../models/Game';
import { Team } from '../../models/Team';
import { ContactsService } from '../contacts/contacts.service';
import { GamesService } from '../games/games.service';
import { TeamService } from './team.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  form: FormGroup;
  selectedItem: any | null | undefined = null;
  isEditVisible = false;
  isLoading = false;
  teamList: Team[] = [];

  // teamTypes = [
  //   { name: 'Сборная', value: 'main' },
  //   { name: 'Обычная', value: 'simple' },
  // ];
  teamTypes = ['Сборная', 'Обычная'];

  users: User[] = [];
  games: Game[] = [];
  nzFilterOption = (): boolean => true;

  uploadFormData: any;
  isClearFileList = false;
  isDeleteFormData = false;

  constructor(
    private _fb: FormBuilder,
    private _contactsService: ContactsService,
    private _gamesService: GamesService,
    private _messageService: NzMessageService,
    private _teamService: TeamService
  ) {
    this.form = this._fb.group({
      title: ['', Validators.required],
      description: '',
      team_type: '',
      game_id: {},
      captain_id: {},
      logo_url: '',
      members_count: ['', Validators.required],
      // university_id: ''
    });
  }

  ngOnInit(): void {
    this.getList().pipe(untilDestroyed(this)).subscribe();
  }

  onConstructFormData(event: any): void {
    this.uploadFormData = event;
    this.isDeleteFormData = false;
  }

  showEditModal(item?: Team): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      console.log(this.selectedItem);
      this.form.patchValue({
        ...this.selectedItem,
        game_id: this.selectedItem.game_id,
        captain_id: this.selectedItem.captain_id,
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
                ? this.selectedItem?.main_image_url
                : image.path,
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

  getList(): Observable<Team[]> {
    return this._teamService
      .getAll()
      .pipe(map((items: Team[]) => (this.teamList = items)));
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
}
