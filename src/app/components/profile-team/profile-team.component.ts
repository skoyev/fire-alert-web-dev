import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';
import { Employee } from '@appModels/employee';
import { ShowNewEmployeeModal, EmployeeDetectChanges } from '@appStore/actions/employee.actions';
import { Team } from '@appModels/team';
import { CreateTeam } from '@appStore/actions/team.actions';
import { interval } from 'rxjs/observable/interval';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile-team-cmp',
  templateUrl: './profile-team.component.html',
  styleUrls: ['./profile-team.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileTeamComponent implements OnInit {
  @Input() employees:Employee[];

  constructor(private emplStore: Store<fromReducers.employee.State>,
              private teamStore: Store<fromReducers.team.State>,
              private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.emplStore
        .select(fromSelectors.getEmployeeDetectChanges)
        .pipe(filter(r => r))
        .subscribe(_=> {
          this.ref.markForCheck();
          this.emplStore.dispatch(new EmployeeDetectChanges(false))
    })
  }

  onCreateNewTeam = (event:any) => {
    event.preventDefault();
    event.stopPropagation(); 
    this.teamStore.dispatch(new CreateTeam(new Team()));
  }

  onCreateNewEmployee = (event:any) => {
    event.preventDefault();
    event.stopPropagation(); 
    this.emplStore.dispatch(new ShowNewEmployeeModal(true));
  }

  onEditEmployee = (event:any, employee:Employee) => {
    event.preventDefault();
    event.stopPropagation();    
    console.log(employee.name);
  }
}
