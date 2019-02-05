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
import { AuthenticationService } from '../../core';
import { Franchaisee } from '@appModels/franchaisee';

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
  menuItems1:string[];
  menuItems2:string[];
  menuItems3:string[];
  showAboutMe:boolean;

  topHeroes$: Observable<Hero[]>; 
  private showSidebar: boolean = false;
  private showProfile: boolean = false;

  constructor(private store: Store<fromReducers.hero.State>,
              private authService: AuthenticationService,
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

    //this.employees = new Array<Employee>();
    //this.employees.push(new Employee('Duncan Long','Field Technician'));
    //this.employees.push(new Employee('Tyler Girloy','Field Technician'));

    this.codes = ['L6M 3C3', 'L2M 8N9', 'L2B 8N9', 'L2C 8N9', 'L2G 8N9', 'L2R 8N9'];

    this.dashboardService
        .getMenuItems("dashboard-menu1")
        .subscribe((items:string[]) => {
          this.menuItems1 = items;
    });

    this.dashboardService
        .getMenuItems("dashboard-menu2")
        .subscribe((items:string[]) => {
          this.menuItems2 = items;
    });

    this.dashboardService
        .getMenuAuthItems("dashboard-menu3")
        .subscribe((items:string[]) => {
          this.menuItems3 = items;
    });

    this.showAboutMe = !this.dashboardService.isFranchaisor();

    this.dashboardService
        .fetchProfile(this.authService.credentials)
        .subscribe(p => this.profile = p);

    // load employee per franchaisee
    if(this.showAboutMe) {
      this.dashboardService
          .findFranchaiseeByUserID(this.authService.credentials.id)
          .pipe(filter(d => d != null))
          .subscribe((fr:Franchaisee) => {
            this.dashboardService
                .fetchEmployeesByFranchaisee(fr.id)
                .subscribe(e => this.employees = e);  
          });
    }
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
    this.dashboardService.setShouldSwowDashboard(this.showSidebar);
  }
}
