import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '@appStore/reducers';

export const getCreateFranchaiseeStore = createFeatureSelector('franchaisee');

export const getSearchFranchaisee = createSelector(
    getCreateFranchaiseeStore,
    (store: fromReducers.franchaisee.State) => store.search
);

export const getSearchFranchaiseeSuccess = createSelector(
    getCreateFranchaiseeStore,
    (store: fromReducers.franchaisee.State) => store.searchResult
);
