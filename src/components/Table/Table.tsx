import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Employee } from '../../@type/employee';
import { HeadCell, Order } from '../../@type/table';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { EnhancedTableHead } from '../Table/TableHeader';
import { EnhancedTableBody } from '../Table/TableBody';
import { VirtualTable } from './VirtualTable';
import { getComparator } from '../../utils/utility';
import { generateLargeDataset } from '../../utils/dataGenerator';
import { setEmployees } from '../../store/employee/actions';

const headCells: HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'designation',
        numeric: false,
        disablePadding: false,
        label: 'Designation',
    },
    {
        id: 'salary',
        numeric: true,
        disablePadding: false,
        label: 'Salary',
    },
    {
        id: 'experience',
        numeric: true,
        disablePadding: false,
        label: 'Experience',
    },
];

export const EnhancedTable = () => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Employee>('name');
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setEmployees(generateLargeDataset(10000)));
    }, []); 

    const employees = useSelector((state: RootState) => state.employee.data);
    const filters = useSelector((state: RootState) => state.employee.filters);
    const viewMode = useSelector((state: RootState) => state.employee.viewMode);

    const filtered = employees.filter((emp) => {
        const nameMatch = emp.name.toLowerCase().includes(filters.name.toLowerCase());
        const emailMatch = emp.email.toLowerCase().includes(filters.email.toLowerCase());
        const designationMatch = emp.designation.toLowerCase().includes(filters.designation.toLowerCase());
        const salaryMatch = filters.salary === '' || emp.salary.toString().includes(filters.salary);
        const experienceMatch = filters.experience === '' || emp.experience.toString().includes(filters.experience);
        
        return nameMatch && emailMatch && designationMatch && salaryMatch && experienceMatch;
    });

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Employee,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleVirtualSort = (property: keyof Employee) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtered.length) : 0;

    const sortedData = React.useMemo(() => 
        [...filtered].sort(getComparator(order, orderBy)),
        [filtered, order, orderBy]
    );

    const visibleRows = React.useMemo(() => 
        sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [sortedData, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: '100%' }} className="enhanced-table">
            <Paper sx={{ width: '100%', mb: 2 }}>
                {viewMode === 'virtual' ? (
                    <VirtualTable 
                        items={sortedData} 
                        height={600}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleVirtualSort}
                    />
                ) : (
                    <>
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={filtered.length}
                                    headCells={headCells}
                                />
                                <EnhancedTableBody
                                    visibleRows={visibleRows}
                                    emptyRows={emptyRows}
                                />
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 50]}
                            component="div"
                            count={filtered.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </Paper>
        </Box>
    );
}

export default EnhancedTable;
