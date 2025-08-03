import * as React from 'react';
import { EnhancedTableBodyProps } from "../../@type/table";
import { Button, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import { Employee, NewEmployee } from '../../@type/employee';
import { useDispatch } from 'react-redux';
import { setEmployees } from '../../store/employee/actions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function EnhancedTableBody(props: EnhancedTableBodyProps) {
    const dispatch = useDispatch();
    const employees = useSelector((state: RootState) => state.employee.data);
    const [editRowId, setEditRowId] = React.useState<number | null>(null);
    const [editFormData, setEditFormData] = React.useState<NewEmployee>({ name: '', email: '', designation: '', salary: 0, experience: 0 });

    const handleEditClick = (row: Employee) => {
        setEditRowId(row.id);
        setEditFormData({ name: row.name, email: row.email, designation: row.designation, salary: row.salary, experience: row.experience });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveClick = (id: number) => {
        employees.map((row: Employee) => (row.id === id ? { ...row, ...editFormData } : row));
        dispatch(setEmployees(employees));
        setEditRowId(null);
    };

    const handleCancelClick = () => {
        setEditRowId(null);
    };

    return <TableBody>
        {props.visibleRows.map((row) => {
            return (
                <TableRow hover key={row.id}>
                    <TableCell>
                        {editRowId === row.id ? (
                            <TextField
                                name="name"
                                value={editFormData.name}
                                onChange={handleInputChange}
                                size="small"
                            />
                        ) : (
                            row.name
                        )}</TableCell>
                    <TableCell>{editRowId === row.id ? (
                        <TextField
                            name="email"
                            value={editFormData.email}
                            onChange={handleInputChange}
                            size="small"
                        />
                    ) : (
                        row.email
                    )}</TableCell>
                    <TableCell>{editRowId === row.id ? (
                        <TextField
                            name="designation"
                            value={editFormData.designation}
                            onChange={handleInputChange}
                            size="small"
                        />
                    ) : (
                        row.designation
                    )}</TableCell>
                    <TableCell>{editRowId === row.id ? (
                        <TextField
                            type="number"
                            name="salary"
                            value={editFormData.salary}
                            onChange={handleInputChange}
                            size="small"
                        />
                    ) : (
                        row.salary
                    )}</TableCell>
                    <TableCell>{editRowId === row.id ? (
                        <TextField
                            type="number"
                            name="experience"
                            value={editFormData.experience}
                            onChange={handleInputChange}
                            size="small"
                        />
                    ) : (
                        row.experience
                    )}</TableCell>
                    <TableCell>
                        {editRowId === row.id ? (
                            <>
                                <Button
                                    color='primary'
                                    variant="contained"
                                    onClick={() => handleSaveClick(row.id)}
                                    size="small">
                                    Save
                                </Button>
                                <Button
                                    size="small"
                                    color='error'
                                    variant="contained"
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                size="small"
                                color='info'
                                variant="contained"
                                onClick={() => handleEditClick(row)}
                            >
                                Edit
                            </Button>
                        )}
                    </TableCell>
                </TableRow>
            );
        })}
        {props.emptyRows > 0 && (
            <TableRow style={{ height: 53 * props.emptyRows }}>
                <TableCell colSpan={6} />
            </TableRow>
        )}
    </TableBody>
}