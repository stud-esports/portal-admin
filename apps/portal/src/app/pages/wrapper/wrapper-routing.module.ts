import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../admin.guard';
import { WrapperComponent } from './wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('../news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'applications/main-team',
        loadChildren: () =>
          import('../application-main-team/application-main-team.module').then(
            (m) => m.ApplicationMainTeamModule
          ),
      },
      {
        path: 'applications/team',
        loadChildren: () =>
          import('../application-team/application-team.module').then(
            (m) => m.ApplicationTeamModule
          ),
      },
      {
        path: 'users',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'games',
        loadChildren: () =>
          import('../games/games.module').then((m) => m.GamesModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('../contacts/contacts.module').then((m) => m.ContactsModule),
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('../team/team.module').then((m) => m.TeamModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class WrapperRoutingModule {}
