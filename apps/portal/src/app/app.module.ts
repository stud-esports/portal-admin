import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeRu from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers, appReducer } from './store/reducers';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { IconsProviderModule } from './icons-provider.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature('appRoot', appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: NZ_I18N, useValue: ru_RU },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
