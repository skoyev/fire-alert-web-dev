import { Component, OnInit, ChangeDetectionStrategy, Input,Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { Profile } from '@appModels/profile';
import { Employee } from '@appModels/employee';

@Component({
  selector: 'app-profile-business-cmp',
  templateUrl: './profile-business.component.html',
  styleUrls: ['./profile-business.component.css']
})
export class ProfileBusinessComponent implements OnInit {
  @Input() profile:Profile;
  @Input() employees:Employee[];
  @Input() codes:string[];
  @Input() showAboutMe:boolean;
  
  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
  }
}
