import { Employee } from '../../@type/employee';
import { SET_EMPLOYEES, SET_FILTERS, CLEAR_FILTERS, SET_VIEW_MODE, UPDATE_EMPLOYEE, FilterState, ViewMode } from './actions';

interface EmployeeState {
  data: Employee[];
  filters: FilterState;
  viewMode: ViewMode;
}

const initialState: EmployeeState = {
  data: [],
  filters: {
    name: '',
    email: '',
    designation: '',
    salary: '',
    experience: '',
  },
  viewMode: 'pagination',
};

export const employeeReducer = (state = initialState, action: any): EmployeeState => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return { ...state, data: action.payload };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case CLEAR_FILTERS:
      return { ...state, filters: initialState.filters };
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        data: state.data.map(emp => 
          emp.id === action.payload.id ? action.payload : emp
        )
      };
    default:
      return state;
  }
};
