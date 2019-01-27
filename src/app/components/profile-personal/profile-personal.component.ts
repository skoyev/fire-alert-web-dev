import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { Profile } from '@appModels/profile';

@Component({
  selector: 'app-profile-personal-cmp',
  templateUrl: './profile-personal.component.html',
  styleUrls: ['./profile-personal.component.css']
})
export class ProfilePersonalComponent implements OnInit {
  @Input() profile:Profile;
  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
  }
}
