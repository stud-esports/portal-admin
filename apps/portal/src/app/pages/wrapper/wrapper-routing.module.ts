import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../admin.guard';
import { AuthGuard } from '../../auth.guard';
import { IsModeratorOfPortalGuard } from '../../is-moderator-of-portal.guard';
import { WrapperComponent } from './wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'news',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../news/news.module').then((m) => m.NewsModule)
      },
      {
        path: 'applications/main-team',
        canActivate: [AuthGuard, IsModeratorOfPortalGuard],
        loadChildren: () =>
          import('../application-team/application-team.module').then(
            (m) => m.ApplicationTeamModule
          )
      },
      {
        path: 'applications/team',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../application-team/application-team.module').then(
            (m) => m.ApplicationTeamModule
          )
      },
      {
        path: 'users',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'games',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../games/games.module').then((m) => m.GamesModule)
      },
      {
        path: 'events',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../events/events.module').then((m) => m.EventsModule)
      },
      {
        path: 'contacts',

        canActivate: [AuthGuard, IsModeratorOfPortalGuard],
        loadChildren: () =>
          import('../contacts/contacts.module').then((m) => m.ContactsModule)
      },
      {
        path: 'teams',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../team/team.module').then((m) => m.TeamModule)
      },
      {
        path: 'universities',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../universities/universities.module').then(
            (m) => m.UniversitiesModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class WrapperRoutingModule {}
