export interface Employee {
    id: number;
    name: string;
    email: string;
    designation: string;
    salary: number;
    experience: number;
  }
  
  export type NewEmployee = Omit<Employee, 'id'>;