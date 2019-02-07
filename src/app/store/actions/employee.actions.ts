import { Action } from '@ngrx/store';
import { Employee } from '@appModels/employee';

export enum EmployeeActionTypes {
    ShowNewEmployee = '[ShowNewEmployee] ShowNewEmployee',
    CreateEmployee = '[EmployeeAction] Create Employee',
    CreateEmployeeSuccess = '[CreateEmployeeSuccess] CreateEmployee Success',
    EmployeeError = '[EmployeeError] Error'
}

export class CreateEmployeeSuccess implements Action {
  readonly type = EmployeeActionTypes.CreateEmployeeSuccess;
  constructor(public payload: boolean) {}
}

export class ShowNewEmployeeModal implements Action {
  readonly type = EmployeeActionTypes.ShowNewEmployee;
  constructor(public payload: boolean) {}
}

export class CreateEmployee implements Action {
  readonly type = EmployeeActionTypes.CreateEmployee;
  constructor(public payload: Employee) {}
}

export class EmployeeError implements Action {
  readonly type = EmployeeActionTypes.EmployeeError;
  constructor(public payload: any) {}
}

export type EmployeeActions = 
  CreateEmployee | 
  ShowNewEmployeeModal |
  CreateEmployeeSuccess |
  EmployeeError;
