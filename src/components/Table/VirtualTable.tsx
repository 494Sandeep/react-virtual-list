import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Employee } from '../../@type/employee';
import { TextField, Button, Box, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../store/employee/actions';
import { Order } from '../../@type/table';

interface VirtualTableProps {
    items: Employee[];
    height: number;
    order: Order;
    orderBy: keyof Employee;
    onRequestSort: (property: keyof Employee) => void;
}

interface RowProps {
    index: number;
    style: React.CSSProperties;
    data: Employee[];
}

const VirtualRow: React.FC<RowProps> = ({ index, style, data }) => {
    const dispatch = useDispatch();
    const [editRowId, setEditRowId] = React.useState<number | null>(null);
    const [editFormData, setEditFormData] = React.useState<Partial<Employee>>({});

    const employee = data[index];

    const handleEditClick = (emp: Employee) => {
        setEditRowId(emp.id);
        setEditFormData(emp);
    };

    const handleSaveClick = () => {
        if (editFormData && editRowId) {
            dispatch(updateEmployee({ ...employee, ...editFormData }));
            setEditRowId(null);
        }
    };

    const handleCancelClick = () => {
        setEditRowId(null);
        setEditFormData({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const isEditing = editRowId === employee.id;

    return (
        <div style={style}>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ flex: 1, minWidth: '150px' }}>
                    {isEditing ? (
                        <TextField
                            name="name"
                            value={editFormData.name || ''}
                            onChange={handleInputChange}
                            size="small"
                            fullWidth
                        />
                    ) : (
                        employee.name
                    )}
                </Box>
                <Box sx={{ flex: 1, minWidth: '200px' }}>
                    {isEditing ? (
                        <TextField
                            name="email"
                            value={editFormData.email || ''}
                            onChange={handleInputChange}
                            size="small"
                            fullWidth
                        />
                    ) : (
                        employee.email
                    )}
                </Box>
                <Box sx={{ flex: 1, minWidth: '150px' }}>
                    {isEditing ? (
                        <TextField
                            name="designation"
                            value={editFormData.designation || ''}
                            onChange={handleInputChange}
                            size="small"
                            fullWidth
                        />
                    ) : (
                        employee.designation
                    )}
                </Box>
                <Box sx={{ flex: 1, minWidth: '100px' }}>
                    {isEditing ? (
                        <TextField
                            name="salary"
                            type="number"
                            value={editFormData.salary || ''}
                            onChange={handleInputChange}
                            size="small"
                            fullWidth
                        />
                    ) : (
                        `$${employee.salary.toLocaleString()}`
                    )}
                </Box>
                <Box sx={{ flex: 1, minWidth: '100px' }}>
                    {isEditing ? (
                        <TextField
                            name="experience"
                            type="number"
                            value={editFormData.experience || ''}
                            onChange={handleInputChange}
                            size="small"
                            fullWidth
                        />
                    ) : (
                        `${employee.experience} years`
                    )}
                </Box>
                <Box sx={{ minWidth: '120px' }}>
                    {isEditing ? (
                        <>
                            <Button size="small" onClick={handleSaveClick} sx={{ mr: 1 }}>
                                Save
                            </Button>
                            <Button size="small" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button size="small" onClick={() => handleEditClick(employee)}>
                            Edit
                        </Button>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export const VirtualTable: React.FC<VirtualTableProps> = ({ items, height, order, orderBy, onRequestSort }) => {
    const createSortHandler = (property: keyof Employee) => () => {
        onRequestSort(property);
    };

    const getSortIcon = (property: keyof Employee) => {
        if (orderBy === property) {
            return order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />;
        }
        return null;
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px 8px', backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                <Box sx={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={createSortHandler('name')}>
                    Name {getSortIcon('name')}
                </Box>
                <Box sx={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={createSortHandler('email')}>
                    Email {getSortIcon('email')}
                </Box>
                <Box sx={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={createSortHandler('designation')}>
                    Designation {getSortIcon('designation')}
                </Box>
                <Box sx={{ flex: 1, minWidth: '100px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={createSortHandler('salary')}>
                    Salary {getSortIcon('salary')}
                </Box>
                <Box sx={{ flex: 1, minWidth: '100px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={createSortHandler('experience')}>
                    Experience {getSortIcon('experience')}
                </Box>
                <Box sx={{ minWidth: '120px' }}>Actions</Box>
            </Box>

            {/* Virtual List */}
            <List
                height={height}
                width="100%"
                itemCount={items.length}
                itemSize={60}
                itemData={items}
            >
                {VirtualRow}
            </List>
        </Box>
    );
};
