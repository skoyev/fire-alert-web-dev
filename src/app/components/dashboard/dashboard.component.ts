import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

@Component({
  selector: 'app-dashboard-cmp',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
  }
}
