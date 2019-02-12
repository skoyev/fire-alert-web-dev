import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '@appStore/reducers';

export const getCreateTeamStore = createFeatureSelector('team');

export const getCreateTeam = createSelector(
    getCreateTeamStore,
    (store: fromReducers.team.State) => store.team
);

export const getCreateTeamStoreSuccess = createSelector(
  getCreateTeamStore,
  (store: fromReducers.team.State) => store.createTeamSuccess
);

export const getShowNewTeamModal = createSelector(
  getCreateTeamStore,
  (store: fromReducers.team.State) => store.showNewTeamModal
);

export const getCloseNewTeamModal = createSelector(
  getCreateTeamStore,
  (store: fromReducers.team.State) => store.closeNewTeamModal
);

export const getTeamDetectChanges = createSelector(
  getCreateTeamStore,
  (store: fromReducers.team.State) => store.teamDetectChanges
);



