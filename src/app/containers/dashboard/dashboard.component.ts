import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  topHeroes$: Observable<Hero[]>; 
  private showSidebar: boolean = false;

  constructor(private store: Store<fromReducers.hero.State>,
              private dashboardService: DashboardService) {}

  ngOnInit() {
    this.topHeroes$ = this.store.pipe(select(fromSelectors.getTopHeroes));
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
    this.dashboardService.setShouldSwowDashboard(this.showSidebar);
  }
}
