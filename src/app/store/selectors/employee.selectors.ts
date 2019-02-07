import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '@appStore/reducers';

export const getCreateStore = createFeatureSelector('employee');

export const getCreate = createSelector(
    getCreateStore,
    (store: fromReducers.employee.State) => store.employee
);

export const getCreateEmployeeSuccess = createSelector(
    getCreateStore,
    (store: fromReducers.employee.State) => store.createEmployeeSuccess
);

export const getShowNewEmployeeModal = createSelector(
  getCreateStore,
  (store: fromReducers.employee.State) => store.showNewEmployeeModal
);

export const getCreateEmployee = createSelector(
    getCreateStore,
    (store: fromReducers.employee.State) => store.employee
);
