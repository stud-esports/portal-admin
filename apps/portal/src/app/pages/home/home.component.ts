import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'portal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  functionalityList = [
    'Создание/обновление/просмотр/удаление новостей',
    'Создание/обновление/просмотр/удаление событий',
    'Создание/обновление/просмотр/удаление дисциплин (игр)',
    'Создание/обновление/просмотр/удаление контактов',
    'Создание/обновление/просмотр/удаление команд',
    'Назначение прав пользователям',
    'Блокировка/разблокировка пользователей',
    'Авторизация/выход из системы'
  ];
  constructor(private store: Store) {}
}
