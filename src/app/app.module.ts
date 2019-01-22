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
import { DashboardService } from '@appServices/dashboard.service';

import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from '@appContainers/dashboard/dashboard.component';
import { HeaderComponent } from '@appShared/components/header/header.component';
import { ListItemComponent } from '@appShared/components/list-item/list-item.component';
import { FooterComponent } from '@appShared/components/footer/footer.component';
//import { LoginComponent } from '@appContainers/login/login.component';
import { HeroesComponent } from '@appContainers/heroes/heroes.component';
import { HeroDetailComponent } from '@appContainers/hero-detail/hero-detail.component';
import { MessagesComponent } from '@appComponents/messages/messages.component';
import { HeroSearchComponent } from '@appComponents/hero-search/hero-search.component';
import { NavigationComponent } from '@appComponents/menu/navigation.component';
import { NewsListComponent } from '@appComponents/news/news-list.component';
import { ActivityComponent } from '@appComponents/activity/activity.component';
import { CalendarComponent } from '@appComponents/calendar/calendar.component';

import { HeroService } from '@appServices/hero.service';
import { MessageService } from '@appServices/message.service';
import { I18nService } from './core/i18n.service';
import { AuthenticationService } from './core/authentication/authentication.service';

import * as fromStore from '@appStore/index';
import { CustomRouterStateSerializer } from '@appStore/router';

//import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { ProfileComponent } from '@appContainers/profile/profile.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    LoginModule,
    /*
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    */
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
    NavigationComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    //LoginComponent, 
    ProfileComponent,   
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    NewsListComponent,
    ActivityComponent,
    CalendarComponent,
    ListItemComponent
  ],
  providers: [
    DashboardService,
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