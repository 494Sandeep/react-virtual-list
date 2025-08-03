import * as React from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, Switch, FormControlLabel, Menu, MenuItem } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setFilters, clearFilters, setViewMode } from '../../store/employee/actions';
import { Employee } from '../../@type/employee';

export const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.employee.filters);
    const viewMode = useSelector((state: RootState) => state.employee.viewMode);
    const employees = useSelector((state: RootState) => state.employee.data);
    
    const [exportMenuAnchor, setExportMenuAnchor] = React.useState<null | HTMLElement>(null);
    
    const handleFilterChange = (field: string, value: string) => {
        dispatch(setFilters({ [field]: value }));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    const handleViewModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setViewMode(event.target.checked ? 'virtual' : 'pagination'));
    };

    const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
        setExportMenuAnchor(event.currentTarget);
    };

    const handleExportClose = () => {
        setExportMenuAnchor(null);
    };

    const getFilteredData = () => {
        return employees.filter((emp) => {
            const nameMatch = emp.name.toLowerCase().includes(filters.name.toLowerCase());
            const emailMatch = emp.email.toLowerCase().includes(filters.email.toLowerCase());
            const designationMatch = emp.designation.toLowerCase().includes(filters.designation.toLowerCase());
            const salaryMatch = filters.salary === '' || emp.salary.toString().includes(filters.salary);
            const experienceMatch = filters.experience === '' || emp.experience.toString().includes(filters.experience);
            
            return nameMatch && emailMatch && designationMatch && salaryMatch && experienceMatch;
        });
    };

    const exportToCSV = (data: Employee[], filename: string) => {
        const headers = ['Name', 'Email', 'Designation', 'Salary', 'Experience'];
        const csvContent = [
            headers.join(','),
            ...data.map(emp => [
                `"${emp.name}"`,
                `"${emp.email}"`,
                `"${emp.designation}"`,
                emp.salary,
                emp.experience
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportAll = () => {
        exportToCSV(employees, 'employees_all.csv');
        handleExportClose();
    };

    const handleExportFiltered = () => {
        const filteredData = getFilteredData();
        exportToCSV(filteredData, 'employees_filtered.csv');
        handleExportClose();
    };

    return (
        <Box marginBottom={2}>
            <Paper sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" style={{ alignItems: 'center', display: 'flex', gap: 4 }}>
                        <FilterListIcon /> Filters
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadIcon />}
                            onClick={handleExportClick}
                            size="small"
                        >
                            Export CSV
                        </Button>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={viewMode === 'virtual'}
                                    onChange={handleViewModeToggle}
                                    color="primary"
                                />
                            }
                            label={`${viewMode === 'virtual' ? 'Virtual Scrolling' : 'Pagination'}`}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2 }}>
                    <TextField
                        label="Name"
                        value={filters.name}
                        variant="standard"
                        onChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                    <TextField
                        label="Email"
                        value={filters.email}
                        variant="standard"
                        onChange={(e) => handleFilterChange('email', e.target.value)}
                    />
                    <TextField
                        label="Designation"
                        value={filters.designation}
                        variant="standard"
                        onChange={(e) => handleFilterChange('designation', e.target.value)}
                    />
                    <TextField
                        label="Salary"
                        value={filters.salary}
                        variant="standard"
                        onChange={(e) => handleFilterChange('salary', e.target.value)}
                    />
                    <TextField
                        label="Experience"
                        value={filters.experience}
                        variant="standard"
                        onChange={(e) => handleFilterChange('experience', e.target.value)}
                    />
                    <Grid gap={2} container alignItems="center" justifyContent="space-evenly">
                        <Button
                            size="medium"
                            color="error"
                            variant="contained"
                            sx={{ height: '28px', minHeight: '28px' }}
                            onClick={handleClearFilters}
                        >
                            Clear
                        </Button>
                    </Grid>
                </Box>
                
                {/* Export Menu */}
                <Menu
                    anchorEl={exportMenuAnchor}
                    open={Boolean(exportMenuAnchor)}
                    onClose={handleExportClose}
                >
                    <MenuItem onClick={handleExportAll}>
                        Export All Data ({employees.length} rows)
                    </MenuItem>
                    <MenuItem onClick={handleExportFiltered}>
                        Export Filtered Data ({getFilteredData().length} rows)
                    </MenuItem>
                </Menu>
            </Paper>
        </Box>
    );
}