import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgxHumanizeDurationModule } from 'ngx-humanize-duration';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import * as fromState from './store/reducers';
import { ProfileEffects } from './store/profile.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    NgxHumanizeDurationModule,
    NzFormModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzDividerModule,
    NzCardModule,
    NzDatePickerModule,
    StoreModule.forFeature(
      fromState.profileFeatureKey,
      fromState.profileReducer
    ),
    EffectsModule.forFeature([ProfileEffects]),
    NzAvatarModule,
    NzIconModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}
