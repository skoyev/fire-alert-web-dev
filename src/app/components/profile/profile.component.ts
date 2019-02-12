import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { Profile, BusinessProfile } from '@appModels/profile';
import { Employee } from '@appModels/employee';
import { Team } from '@appModels/team';

@Component({
  selector: 'app-profile-cmp',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponentNew implements OnInit {
  @Input() profile:Profile = new Profile();
  @Input() team:Team;
  @Input() codes:string[];
  @Input() showAboutMe:boolean;
  @Input() showAboutMyBusiness:boolean;

  shouldShowProfile:boolean = true;

  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {}

  showPersonalProfile(event:any, shouldShowProfile:boolean){
    event.preventDefault();
    event.stopPropagation();    

    this.shouldShowProfile = shouldShowProfile;
  }
}
