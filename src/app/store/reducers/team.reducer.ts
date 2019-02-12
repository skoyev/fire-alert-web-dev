import { Action } from '@ngrx/store';
import {
    TeamActionTypes,
    TeamActions
} from '@appStore/actions/team.actions';
import { Team } from '@appModels/team';

export interface State {
    team: Team; 
    showNewTeamModal: boolean; 
    closeNewTeamModal: boolean;
    createTeamSuccess: boolean;
    teamDetectChanges: boolean;

}

export const initialState: State = {
    team: null,
    showNewTeamModal: false, 
    closeNewTeamModal: false,
    createTeamSuccess: false,
    teamDetectChanges: false
};

export function reducer(state = initialState, action: TeamActions): State {
  switch (action.type) {
    case TeamActionTypes.CreateTeam:
      return {
        ...state,
        team: action.payload
    };

    case TeamActionTypes.ShowNewTeam:
      return {
        ...state,
        showNewTeamModal: action.payload
    };

    case TeamActionTypes.CreateTeamSuccess:
      return {
        ...state,
        createTeamSuccess: action.payload
    };

    case TeamActionTypes.TeamDetectChanges:
      return {
        ...state,
        teamDetectChanges: action.payload
    };

    case TeamActionTypes.CloseNewTeamModal:
      return {
        ...state,
        closeNewTeamModal: action.payload
    };

    default:
      return state;
  }
}
