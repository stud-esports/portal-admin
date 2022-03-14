import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./pages/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'applications/main-team',
    loadChildren: () =>
      import('./pages/application-main-team/application-main-team.module').then(
        (m) => m.ApplicationMainTeamModule
      ),
  },
  {
    path: 'applications/team',
    loadChildren: () =>
      import('./pages/application-team/application-team.module').then(
        (m) => m.ApplicationTeamModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./pages/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./pages/events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
