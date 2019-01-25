import { Action } from '@ngrx/store';

export enum UserActionTypes {
    ShowProfile = '[UserAction] ShowProfile'
}

export class ShowProfile implements Action {
  readonly type = UserActionTypes.ShowProfile;
  constructor(public payload: boolean) {}
}
export type UserActions = ShowProfile;
