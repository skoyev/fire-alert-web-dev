import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromStore from '@appStore/index';
import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { Franchaisee } from '@appModels/franchaisee';
import { SearchFranchaisee } from '@appStore/actions/franchisee.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-franchisees-cmp',
  templateUrl: './franchisees.component.html',
  styleUrls: ['./franchisees.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FranchiseesComponent implements OnInit {
  franchisees: Observable<Array<any>>;

  constructor(private store: Store<fromStore.State>,
              private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.franchisees = this.store.pipe(select(fromSelectors.getSearchFranchaiseeSuccess));
    
    /*
    this.store
        .pipe(select(fromSelectors.getSearchFranchaiseeSuccess), 
              filter(r => r.length > 0))
        .subscribe(res => {
          this.franchisees = res;
          this.ref.markForCheck();
        });
    */

    //this.franchisees = [{"id":1, "name":"name1"}, {"id":2, "name":"name2"}];
        
    this.store.dispatch(new SearchFranchaisee(''));
  }

  onCreateNewFranchisee(event:any){
    event.preventDefault();
    event.stopPropagation(); 
  }
}
