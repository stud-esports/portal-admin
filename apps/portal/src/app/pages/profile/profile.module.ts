import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgxHumanizeDurationModule } from 'ngx-humanize-duration';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import * as fromState from './store/reducers';
import { ProfileEffects } from './store/profile.effects';
import { InDevelopmentModule } from '../../in-development/in-development.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxHumanizeDurationModule,
    StoreModule.forFeature(
      fromState.profileFeatureKey,
      fromState.profileReducer
    ),
    EffectsModule.forFeature([ProfileEffects]),
    InDevelopmentModule
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
