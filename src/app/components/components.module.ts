import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ProfileComponentNew } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsListComponent } from './news/news-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivityComponent } from './activity/activity.component';
import { TranslateModule } from '@ngx-translate/core';
import { ListItemComponent } from '@appShared/components/list-item/list-item.component';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from '@appStore/router';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ProfileBusinessComponent } from './profile-business/profile-business.component';
import { ProfilePersonalComponent } from './profile-personal/profile-personal.component';
import { ProfileTeamComponent } from './profile-team/profile-team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),   
  ],
  declarations: [
    ProfileComponentNew,
    DashboardComponent,
    NewsListComponent,
    CalendarComponent,
    ActivityComponent,
    ListItemComponent,
    ProfileBusinessComponent,
    ProfilePersonalComponent,
    ProfileTeamComponent
  ],   
  exports: [
    ProfileComponentNew,
    DashboardComponent,
    NewsListComponent,
    CalendarComponent,
    ActivityComponent,
    ListItemComponent,
    ProfileBusinessComponent,
    ProfilePersonalComponent,
    ProfileTeamComponent
  ],  
  providers: [    
    AuthenticationService,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],  
})
export class ComponentsModule {}
