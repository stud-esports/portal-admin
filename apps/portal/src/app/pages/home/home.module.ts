import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomeRoutingModule } from './home-routing.module';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { HomeComponent } from './home.component';

import * as fromHome from './store/reducers';
import { HomeEffects } from './store/home.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NzCheckboxModule,
    NzMenuModule,
    NzFormModule,
    NzLayoutModule,
    NzCardModule,
    NzSkeletonModule,
    NzDividerModule,
    NzSliderModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzTagModule,
    StoreModule.forFeature(
      fromHome.homeFeatureKey,
      fromHome.searchPartnersReducer
    ),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
