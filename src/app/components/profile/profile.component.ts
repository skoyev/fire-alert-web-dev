import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { Profile, BusinessProfile } from '@appModels/profile';

@Component({
  selector: 'app-profile-cmp',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponentNew implements OnInit {
  profile:Profile;
  shouldShowProfile:boolean = true;

  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
    this.profile = new Profile();
    this.profile.business = new BusinessProfile();
    this.profile.business.legalName = 'Fire-Alert Oakville';
    this.profile.business.businessRegNum = '11091122Ontario'
  }

  showPersonalProfile(event:any, shouldShowProfile:boolean){
    event.preventDefault();
    event.stopPropagation();    

    this.shouldShowProfile = shouldShowProfile;
  }
}
