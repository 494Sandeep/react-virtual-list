import { Employee } from "./employee";

export type Order = 'asc' | 'desc';

export interface EnhancedTableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Employee) => void;
    order: Order;
    orderBy: keyof Employee;
    rowCount: number;
    headCells: HeadCell[];
}

export interface EnhancedTableBodyProps {
    visibleRows: Employee[];
    emptyRows: number;
}
    
export interface HeadCell {
    disablePadding?: boolean;
    id: keyof Employee;
    label: string;
    numeric: boolean;
}