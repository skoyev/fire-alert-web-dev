import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '@appStore/reducers';

export const getCreateTeamStore = createFeatureSelector('team');

export const getCreateTeam = createSelector(
    getCreateTeamStore,
    (store: fromReducers.team.State) => store.team
  );
