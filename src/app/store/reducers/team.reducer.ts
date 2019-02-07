import { Action } from '@ngrx/store';
import {
    TeamActionTypes,
    TeamActions
} from '@appStore/actions/team.actions';
import { Team } from '@appModels/team';

export interface State {
    team: Team;  
}

export const initialState: State = {
    team: null
};

export function reducer(state = initialState, action: TeamActions): State {
  switch (action.type) {
    case TeamActionTypes.CreateTeam:
      return {
        ...state,
        team: action.payload
      };

    default:
      return state;
  }
}
