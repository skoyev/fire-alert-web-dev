import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '@appStore/reducers';

export const getCreateStore = createFeatureSelector('employee');

export const getCreate = createSelector(
    getCreateStore,
    (store: fromReducers.employee.State) => store.employee
  );
