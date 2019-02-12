import { Action } from '@ngrx/store';
import { Team } from '@appModels/team';

export enum TeamActionTypes {
  CreateTeam = '[TeamAction] Create',
  CloseNewTeamModal = '[CloseNewTeamModal] Close Modal Window',
  TeamDetectChanges = '[TeamDetectChanges] Detect Changes',
  CreateTeamSuccess = '[CreateTeamSuccess] Create Success',
  TeamError = '[TeamError] Error',
  ShowNewTeam = '[ShowNewTeam] Show New Team'
}

export class CreateTeam implements Action {
  readonly type = TeamActionTypes.CreateTeam;
  constructor(public frID: number, public payload: Team) {}
}

export class CloseNewTeamModal implements Action {
  readonly type = TeamActionTypes.CloseNewTeamModal;
  constructor(public payload: boolean) {}
}

export class TeamDetectChanges implements Action {
  readonly type = TeamActionTypes.TeamDetectChanges;
  constructor(public payload: boolean) {}
}

export class CreateTeamSuccess implements Action {
  readonly type = TeamActionTypes.CreateTeamSuccess;
  constructor(public payload: boolean) {}
}

export class TeamError implements Action {
  readonly type = TeamActionTypes.TeamError;
  constructor(public payload: any) {}
}

export class ShowNewTeamModal implements Action {
  readonly type = TeamActionTypes.ShowNewTeam;
  constructor(public payload: boolean) {}
}

export type TeamActions = 
  CreateTeam |
  CreateTeamSuccess |
  TeamDetectChanges |
  CloseNewTeamModal |
  TeamError |
  ShowNewTeamModal;
