import { Action } from '@ngrx/store';
import {
    EmployeeActionTypes,
    EmployeeActions
} from '@appStore/actions/employee.actions';
import { Employee } from '@appModels/employee';

export interface State {
    employee: Employee;
    showNewEmployeeModal: boolean; 
    createEmployeeSuccess: boolean;
}

export const initialState: State = {
    employee: null,
    showNewEmployeeModal: false,
    createEmployeeSuccess: false
};

export function reducer(state = initialState, action: EmployeeActions): State {
  switch (action.type) {
    case EmployeeActionTypes.ShowNewEmployee:
      return {
        ...state,
        showNewEmployeeModal: action.payload
      };

    case EmployeeActionTypes.CreateEmployee:
      return {
        ...state,
        employee: action.payload
      };

    case EmployeeActionTypes.CreateEmployeeSuccess:
      return {
        ...state,
        createEmployeeSuccess: action.payload
    };

    default:
      return state;
  }
}
