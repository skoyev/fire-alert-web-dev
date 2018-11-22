import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginModule } from './containers/login/login.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//import { LoginModule } from './containers/login/login.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@appServices/in-memory-data.service';

import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from '@appContainers/dashboard/dashboard.component';
//import { LoginComponent } from '@appContainers/login/login.component';
import { HeroesComponent } from '@appContainers/heroes/heroes.component';
import { HeroDetailComponent } from '@appContainers/hero-detail/hero-detail.component';
import { MessagesComponent } from '@appComponents/messages/messages.component';
import { HeroSearchComponent } from '@appComponents/hero-search/hero-search.component';

import { HeroService } from '@appServices/hero.service';
import { MessageService } from '@appServices/message.service';
import { I18nService } from './core/i18n.service';
import { AuthenticationService } from './core/authentication/authentication.service';

import * as fromStore from '@appStore/index';
import { CustomRouterStateSerializer } from '@appStore/router';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    LoginModule,
    StoreModule.forRoot(fromStore.reducers),
    EffectsModule.forRoot(fromStore.effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    //LoginComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [
    HeroService,
    MessageService,
    I18nService,
    AuthenticationService,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}