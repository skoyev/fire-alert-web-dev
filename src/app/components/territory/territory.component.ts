import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

@Component({
  selector: 'app-territory-cmp',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.css']
})
export class TerritoryComponent implements OnInit {
  @Input() codes:string[];

  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
  }
}
