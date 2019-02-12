import { Action } from '@ngrx/store';
import {
    FranchaiseeActionTypes,
    FranchaiseeAction
} from '@appStore/actions/franchisee.actions';
import { Franchaisee } from '@appModels/franchaisee';

export interface State {
    franchaisee: Franchaisee;
    search: string;
    searchResult: Array<any>;
    showNewFranchaiseeModal: boolean; 
    closeNewFranchaiseeModal: boolean;
    createFranchaiseeSuccess: boolean;
    franchaiseeDetectChanges: boolean;
}

export const initialState: State = {
  franchaisee : null,
  search : '',
  searchResult: new Array<any>(), 
  showNewFranchaiseeModal: false, 
  closeNewFranchaiseeModal: false,
  createFranchaiseeSuccess: false,
  franchaiseeDetectChanges: false
};

export function reducer(state = initialState, action: FranchaiseeAction): State {
  switch (action.type) {
    case FranchaiseeActionTypes.SearchFranchaisee:
      return {
        ...state,
        search: action.payload
      };

    case FranchaiseeActionTypes.SearchFranchaiseeSuccess:
      return {
        ...state,
        searchResult: action.payload
      };

    default:
      return state;
  }
}
