import React from 'react';
import { store } from './store';
import EnhancedTable from './components/Table/Table';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Filters } from './components/Filters/Filters';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div style={{ padding: '10px 60px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#1976d2' }}>
            Advanced Editable Data Table
          </h1>
          <Filters />
          <EnhancedTable />
        </div>
      </ThemeProvider>
    </Provider>
  );
};
export default App; 
