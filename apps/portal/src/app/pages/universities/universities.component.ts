import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Table } from 'primeng/table';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Game } from '../../models/Game';
import { University } from '../../models/University';
import { UniversitiesService } from './universities.service';

@UntilDestroy()
@Component({
  selector: 'universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss']
})
export class UniversitiesComponent implements OnInit {
  form: FormGroup;
  selectedItem: any | null | undefined = null;
  isEditVisible = false;
  isLoading = false;
  list: University[] = [];
  isUserAdmin = false;
  modes = [
    { icon: 'pi pi-table', value: 'table' },
    { icon: 'pi pi-list', value: 'card' }
  ];
  selectedMode = { icon: 'pi pi-table', value: 'table' };

  @ViewChild(Table) dt: Table | null = null;

  constructor(
    private _fb: FormBuilder,
    private _universityService: UniversitiesService,
    private _messageService: NzMessageService
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
    this.getList().pipe(untilDestroyed(this)).subscribe();
  }

  getGames(uni: University) {
    const games = new Set();
    uni?.teams.forEach((team) => games.add(team.game.title));
    return Array.from(games);
  }

  showEditModal(item?: University): void {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.form.patchValue(this.selectedItem);
    }
    this.isEditVisible = true;
  }

  create(): void {
    this.isEditVisible = false;
    this._universityService
      .create(this.form.value)
      .pipe(
        switchMap(() => {
          this.form.reset();
          this.isEditVisible = false;
          this.selectedItem = null;
          this._messageService.create('success', 'Университет успешно создан');
          return this.getList();
        }),

        untilDestroyed(this)
      )
      .subscribe();
  }

  edit(): void {
    this.isLoading = true;
    this._universityService
      .update(this.selectedItem?._id, this.form.value)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.isEditVisible = false;
          this.form.reset();
          this._messageService.create(
            'success',
            `Университет успешно обновлен`
          );
        }),
        switchMap(() => this.getList()),
        untilDestroyed(this)
      )
      .subscribe();
  }

  confirmDelete(uni: University): void {
    this.isLoading = true;
    this._universityService
      .remove(uni._id)
      .pipe(
        switchMap(() => {
          this.isLoading = false;
          this._messageService.create('success', 'Университет успешно удален');
          return this.getList();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  getList(): Observable<any> {
    this.isLoading = true;
    return this._universityService.getAll().pipe(
      map((list: University[]) => {
        this.list = list;
        this._universityService.universities.next(list);
        this.isLoading = false;
      }),
      untilDestroyed(this)
    );
  }

  handleCancel() {
    this.form.reset();
    this.isEditVisible = false;
  }

  clear(table: any) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
