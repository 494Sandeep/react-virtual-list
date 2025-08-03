import { Employee } from "../../@type/employee";

export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export interface FilterState {
  name: string;
  email: string;
  designation: string;
  salary: string;
  experience: string;
}

export type ViewMode = 'pagination' | 'virtual';

export const setEmployees = (payload: Employee[]) => ({
  type: SET_EMPLOYEES,
  payload,
});

export const setFilters = (payload: Partial<FilterState>) => ({
  type: SET_FILTERS,
  payload,
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});

export const setViewMode = (payload: ViewMode) => ({
  type: SET_VIEW_MODE,
  payload,
});

export const updateEmployee = (payload: Employee) => ({
  type: UPDATE_EMPLOYEE,
  payload,
});
