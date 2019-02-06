import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';
import { Employee } from '@appModels/employee';
import { Create } from '@appStore/actions/employee.actions';

@Component({
  selector: 'app-profile-team-cmp',
  templateUrl: './profile-team.component.html',
  styleUrls: ['./profile-team.component.css']
})
export class ProfileTeamComponent implements OnInit {
  @Input()  employees:Employee[];

  constructor(private emplStore: Store<fromReducers.employee.State>) {}

  ngOnInit() {
  }

  onCreateNewTeam = (event:any, content:any) => {
    event.preventDefault();
    event.stopPropagation(); 
    this.emplStore.dispatch(new Create(new Employee));
  }

  onEditEmployee = (event:any, employee:Employee) => {
    event.preventDefault();
    event.stopPropagation();    
    console.log(employee.name);
  }
}
