import { Type } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';

import * as fromReducers from './reducers';

import { HeroEffects } from '@appStore/effects/hero.effects';
import { RouterEffects } from '@appStore/effects/router.effects';
import { SearchEffects } from '@appStore/effects/search.effects';

import { RouterStateUrl } from '@appStore/router';
import { EmployeeEffects } from './effects/employee.effects';

export interface State {
  employee: fromReducers.employee.State;
  hero: fromReducers.hero.State;
  search: fromReducers.search.State;
  user: fromReducers.user.State;
  team: fromReducers.team.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  employee: fromReducers.employee.reducer,
  hero: fromReducers.hero.reducer,
  search: fromReducers.search.reducer,
  user: fromReducers.user.reducer,
  team: fromReducers.team.reducer,
  router: routerReducer
};

export const effects = [HeroEffects, SearchEffects, RouterEffects, EmployeeEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
