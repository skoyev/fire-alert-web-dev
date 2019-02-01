import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { filter } from 'rxjs/operators';
import { Profile, BusinessProfile, PesonalProfile } from '@appModels/profile';
import { Employee } from '@appModels/employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  profile:Profile;
  employees:Employee[];
  codes:string[];

  topHeroes$: Observable<Hero[]>; 
  private showSidebar: boolean = false;
  private showProfile: boolean = false;

  constructor(private store: Store<fromReducers.hero.State>,
              private dashboardService: DashboardService) {}

  ngOnInit() {
    //this.topHeroes$ = this.store.pipe(select(fromSelectors.getTopHeroes));
    
    this.store.select(fromSelectors.getShowProfile)        
        .subscribe(r => {
          this.showProfile = r;          
    })

    /*
    this.store.select(fromSelectors.getSearchStore)
        .pipe(filter(r => r != null))
        .subscribe(r => {
          //this.showProfile = true;          
    })
    */

    // TODO: Dummy data
    this.profile = new Profile();
    this.profile.name = 'Sylvan Houle';
    this.profile.type = 'Owner'

    this.profile.business = new BusinessProfile();
    this.profile.business.legalName = 'Fire-Alert Oakville';
    this.profile.business.businessRegNum = '11091122Ontario';
    this.profile.business.ownership = 100;
    this.profile.business.agrStartDate = '01 December 2018';
    this.profile.business.agrRenewalDate = '01 December 2023';
    this.profile.business.royaltyFee = 4;
    this.profile.business.marketingFee = 2;
    this.profile.business.taxes = 'HST';

    this.profile.personal = new PesonalProfile();
    this.profile.personal.firstName = 'Sylvain';
    this.profile.personal.lastName  = 'Houle';
    this.profile.personal.gender    = 'Male';
    this.profile.personal.age       =  34;
    this.profile.personal.birthday  = '01 July 1984';
    this.profile.personal.homePhone = '905.847.7333';
    this.profile.personal.cellPhone = '647.515.8328';
    this.profile.personal.address   = '3363 Regal Rd. Burlington, ON L7N 1LP';
    this.profile.personal.email     = 'sylvain@fire-alert.ca';
    this.profile.personal.website   = 'https://fire-alert.ca/franchaise/oakville';

    this.employees = new Array<Employee>();
    this.employees.push(new Employee('Duncan Long','Field Technician'));
    this.employees.push(new Employee('Tyler Girloy','Field Technician'));

    this.codes = ['L6M 3C3', 'L2M 8N9', 'L2B 8N9', 'L2C 8N9', 'L2G 8N9', 'L2R 8N9'];
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
    this.dashboardService.setShouldSwowDashboard(this.showSidebar);
  }
}
