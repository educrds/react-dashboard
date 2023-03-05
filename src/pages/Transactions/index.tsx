import React, { useContext } from 'react';
import { ptBR } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AllTransactions from '../../components/AllTransactions';
import { NavbarContext } from '../../contexts/NavbarContext';

const theme = createTheme(ptBR);

const Transactions = () => {
  const { collapsed } = useContext(NavbarContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={`wrapper ${collapsed && 'collapsed'}`}>
          <AllTransactions />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Transactions;
