import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { filter, delay, tap } from 'rxjs/operators';
import { Profile, BusinessProfile, PesonalProfile } from '@appModels/profile';
import { Employee } from '@appModels/employee';
import { AuthenticationService } from '../../core';
import { Franchaisee } from '@appModels/franchaisee';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModal } from '@appComponents/modal/employee/employee.modal.component';
import { TeamModal } from '@appComponents/modal/team/team.modal.component';
import * as fromStore from '@appStore/index';
import { of } from 'rxjs';
import { EmployeeDetectChanges } from '@appStore/actions/employee.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
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
  private showAboutMyBusiness: boolean = false;
  private employeeModal:NgbActiveModal;

  constructor(private store: Store<fromReducers.hero.State>,
              private globalStore: Store<fromStore.State>,
              private emplStore: Store<fromReducers.employee.State>,
              private teamStore: Store<fromReducers.team.State>,
              private authService: AuthenticationService,
              private modalService: NgbModal,
              private dashboardService: DashboardService) {}

  ngOnInit() {
    //this.topHeroes$ = this.store.pipe(select(fromSelectors.getTopHeroes));
    
    this.store.select(fromSelectors.getShowProfile)        
        .subscribe(r => {
          this.showProfile = r;          
    });

    // Create New Employee
    this.emplStore        
        .select(fromSelectors.getShowNewEmployeeModal)
        .pipe(filter(e => e))
        .subscribe(_ => this.employeeModal = this.modalService.open(EmployeeModal));

    this.emplStore        
        .select(fromSelectors.getCloseNewEmployeeModal)
        .pipe(filter(e => e))
        .subscribe(_ => {
          if(this.employeeModal){
            this.employeeModal.close()
          }
        });


    // Create New Team
    this.teamStore
        .select(fromSelectors.getCreateTeam)
        .pipe(filter(t => t != null))
        .subscribe(t => {
          const modalRef = this.modalService.open(TeamModal);
          modalRef.componentInstance.name = 'World Test';          
        });
    /*
    this.store.select(fromSelectors.getSearchStore)
        .pipe(filter(r => r != null))
        .subscribe(r => {
          //this.showProfile = true;          
    })
    */

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
      this.loadEmployees();

      this.globalStore
          .select(fromSelectors.getCreateEmployeeSuccess)
          .pipe(filter(t => t))
          .subscribe(_ => {
            this.loadEmployees();
          });
    }

    this.showAboutMyBusiness = !this.dashboardService.isEmployee();
  }

  loadEmployees() {
    this.dashboardService
        .findFranchaiseeByUserID(this.authService.credentials.id)
        .pipe(filter(d => d != null))
        .subscribe((fr:Franchaisee) => {
           /*          
           this.employees = this.dashboardService
                                .fetchEmployeesByFranchaisee(fr.id)
                                .pipe(delay(5000), tap())
            */
          
          this.dashboardService
              .fetchEmployeesByFranchaisee(fr.id)
              .pipe(filter(r => r && r.length > 0 ))
              .subscribe(empls => {
                this.employees = [...empls]
                this.emplStore.dispatch(new EmployeeDetectChanges(true))
              });                                  
    });
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
    this.dashboardService.setShouldSwowDashboard(this.showSidebar);
  }
}
