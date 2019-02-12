import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, tap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

import { CreateEmployee, EmployeeActionTypes, CreateEmployeeSuccess, EmployeeError} from '@appStore/actions/employee.actions';
import { DashboardService } from '@appServices/dashboard.service';

import * as fromRouterActions from '@appStore/actions/router.actions';
import { Store } from '@ngrx/store';
import * as fromStore from '@appStore/index';
import { AuthenticationService } from '../../core';
import { Franchaisee } from '@appModels/franchaisee';
import { TeamActionTypes, CreateTeam, CreateTeamSuccess, TeamError } from '@appStore/actions/team.actions';

@Injectable()
export class TeamEffects {
    constructor(private actions$: Actions, 
                private dashService: DashboardService,
                private authService: AuthenticationService,
                private globalStore: Store<fromStore.State>) {}

    @Effect()
    addTeam$ = this.actions$.pipe(
      ofType(TeamActionTypes.CreateTeam),
      switchMap((action: CreateTeam) =>                
        this.dashService
            .addTeam(action.frID, action.payload)
            .pipe(map(_ => new CreateTeamSuccess(true)),
                  catchError(error => of(new TeamError(error))        

        /*
        this.dashService
            .findFranchaiseeByUserID(this.authService.credentials.id)            
            .subscribe((f:Franchaisee) => 
              this.dashService
                  .addEmployee(f.id, action.payload)
                  .pipe(map(_ => new CreateEmployeeSuccess(true)),
                  catchError(error => of(new EmployeeError(error)              
        */
    ))));
}