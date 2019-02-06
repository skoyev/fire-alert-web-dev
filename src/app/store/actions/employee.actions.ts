import { Action } from '@ngrx/store';
import { Employee } from '@appModels/employee';

export enum EmployeeActionTypes {
    Create = '[EmployeeAction] Create'
}

export class Create implements Action {
  readonly type = EmployeeActionTypes.Create;
  constructor(public payload: Employee) {}
}
export type EmployeeActions = Create;
