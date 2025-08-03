import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0C756F', // green
        },
        secondary: {
            main: '#FCDF6F', // yellow
        },
        error: {
            main: '#D92C54',
        },
        info: {
            main: '#E4EFE7',
        },
    },
    components: {
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1976d2',
                    '& .MuiTableCell-root': {
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontWeight: 'bold',
                    }
                },
            },
        },
    },
});

export default theme;
