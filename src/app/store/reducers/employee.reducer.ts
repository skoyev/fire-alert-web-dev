import { Action } from '@ngrx/store';
import {
    EmployeeActionTypes,
    EmployeeActions
} from '@appStore/actions/employee.actions';
import { Employee } from '@appModels/employee';

export interface State {
    employee: Employee;  
}

export const initialState: State = {
    employee: null
};

export function reducer(state = initialState, action: EmployeeActions): State {
  switch (action.type) {
    case EmployeeActionTypes.Create:
      return {
        ...state,
        employee: action.payload
      };

    default:
      return state;
  }
}
