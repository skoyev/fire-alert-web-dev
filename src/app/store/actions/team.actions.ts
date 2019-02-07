import { Action } from '@ngrx/store';
import { Team } from '@appModels/team';

export enum TeamActionTypes {
  CreateTeam = '[TeamAction] Create'
}

export class CreateTeam implements Action {
  readonly type = TeamActionTypes.CreateTeam;
  constructor(public payload: Team) {}
}
export type TeamActions = CreateTeam;
