import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { Profile, BusinessProfile } from '@appModels/profile';
import { Employee } from '@appModels/employee';

@Component({
  selector: 'app-profile-cmp',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponentNew implements OnInit {
  profile:Profile;
  employees:Employee[];
  shouldShowProfile:boolean = true;

  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
    // TODO: Dummy data
    this.profile = new Profile();
    this.profile.business = new BusinessProfile();
    this.profile.business.legalName = 'Fire-Alert Oakville';
    this.profile.business.businessRegNum = '11091122Ontario';
    this.profile.business.ownership = 100;
    this.profile.business.agrStartDate = '01 December 2018';
    this.profile.business.agrRenewalDate = '01 December 2023';
    this.profile.business.royaltyFee = 4;
    this.profile.business.marketingFee = 2;
    this.profile.business.taxes = 'HST';

    this.employees = new Array<Employee>();
    this.employees.push(new Employee('Duncan Long','Field Technician'));
    this.employees.push(new Employee('Tyler Girloy','Field Technician'));
  }

  showPersonalProfile(event:any, shouldShowProfile:boolean){
    event.preventDefault();
    event.stopPropagation();    

    this.shouldShowProfile = shouldShowProfile;
  }
}
