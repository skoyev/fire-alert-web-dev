import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, tap, debounceTime, throttle } from 'rxjs/operators';
import { of } from 'rxjs';

import { CreateEmployee, EmployeeActionTypes, CreateEmployeeSuccess, EmployeeError} from '@appStore/actions/employee.actions';
import { DashboardService } from '@appServices/dashboard.service';

import * as fromRouterActions from '@appStore/actions/router.actions';
import { Store } from '@ngrx/store';
import * as fromStore from '@appStore/index';
import { AuthenticationService } from '../../core';
import { Franchaisee } from '@appModels/franchaisee';
import { FranchaiseeActionTypes, CreateFranchaisee, CreateFranchaiseeSuccess, FranchaiseeError, SearchFranchaiseeSuccess, SearchFranchaisee } from '@appStore/actions/franchisee.actions';
import { FranchaiseeService } from '@appServices/franchaisee.service';

@Injectable()
export class FranchiseeEffects {
    constructor(private actions$: Actions, 
                private franchiseeService: FranchaiseeService,
                private authService: AuthenticationService,
                private store: Store<fromStore.State>) {}

    @Effect()
    addFranchisee$ = this.actions$.pipe(
      ofType(FranchaiseeActionTypes.CreateFranchaisee),
      switchMap((action: CreateFranchaisee) =>        
        this.franchiseeService
            .addFranchaisee(action.payload)
            .pipe(map(_ => new CreateFranchaiseeSuccess(true)),
                  catchError(error => of(new FranchaiseeError(error))        
    ))));


    @Effect()
    loadFranchaisee$ = this.actions$.pipe(
      ofType(FranchaiseeActionTypes.SearchFranchaisee),
      switchMap((action:SearchFranchaisee) =>
        this.franchiseeService
          .findFranchaisee(action.payload)
          .pipe(
            map(res => {
                console.log("SearchFranchaiseeSuccess");
                return new SearchFranchaiseeSuccess(res)
            }),
            catchError(error => of(new FranchaiseeError(error)))
          )
      )
    );  
}