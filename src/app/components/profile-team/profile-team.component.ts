import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';
import { Employee } from '@appModels/employee';

@Component({
  selector: 'app-profile-team-cmp',
  templateUrl: './profile-team.component.html',
  styleUrls: ['./profile-team.component.css']
})
export class ProfileTeamComponent implements OnInit {
  @Input() employees:Employee[];

  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
  }

  onEditEmployee = (event:any, employee:Employee) => {
    event.preventDefault();
    event.stopPropagation();    
    console.log(employee.name);
  }
}
