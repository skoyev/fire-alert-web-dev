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

@Injectable()
export class EmployeeEffects {
    constructor(private actions$: Actions, 
                private dashService: DashboardService,
                private authService: AuthenticationService,
                private globalStore: Store<fromStore.State>) {}

    @Effect()
    addEmployee$ = this.actions$.pipe(
      ofType(EmployeeActionTypes.CreateEmployee),
      switchMap((action: CreateEmployee) =>        
        this.dashService
            .addEmployee(action.frID, action.payload)
            .pipe(map(_ => new CreateEmployeeSuccess(true)),
                  catchError(error => of(new EmployeeError(error))        
    ))));
}