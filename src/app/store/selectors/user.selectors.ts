import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '@appStore/reducers';

export const getShowProfileStore = createFeatureSelector('user');

export const getShowProfile = createSelector(
    getShowProfileStore,
    (store: fromReducers.user.State) => store.showProfile
  );
