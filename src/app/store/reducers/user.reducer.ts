import { Action } from '@ngrx/store';
import {
    UserActionTypes,
    UserActions
} from '@appStore/actions/user.actions';

export interface State {
  userName: string;
  showProfile: boolean;
}

export const initialState: State = {
  userName: '',
  showProfile: false
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.ShowProfile:
      return {
        ...state,
        showProfile: action.payload
      };

    default:
      return state;
  }
}
