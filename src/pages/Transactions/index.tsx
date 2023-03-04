import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, ptBR } from '@mui/x-data-grid';
import { Check, Clear } from '@mui/icons-material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Wrapper from '../../components/Wrapper';
import AllTransactions from '../../components/AllTransactions';
import './styles.scss';

const colorsByCategory = {
  Outros: '#d3d3d3',
  Serviços: '#6B9DFE',
  Trabalho: '#0000ff',
  Aluguel: '#FFBC6E',
  Internet: '#FE797A',
};

const theme = createTheme(ptBR);

const columns: GridColDef[] = [
  {
    field: 'situation',
    headerName: 'Situação',
    flex: 0.7,
    headerClassName: 'table__header__color',

    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      const situation = params.row.situation;
      if (situation === 'paga') {
        return <Check color='primary' />;
      }
      return <Clear color='error' />;
    },
  },
  {
    field: 'payment',
    headerName: 'Forma de Pagamento',
    flex: 1,
    headerClassName: 'table__header__color',
    sortable: true,
    renderCell: (params: GridValueGetterParams) => {
      const paymentMethod = params.row.payment;
      if (paymentMethod === 'Débito') {
        return (
          <Chip icon={<PaidOutlinedIcon fontSize='small' />} label='Débito' variant='outlined' />
        );
      }
      return <Chip icon={<CreditCardIcon fontSize='small' />} label='Crédito' variant='outlined' />;
    },
  },
  {
    field: 'date',
    headerName: 'Data',
    flex: 1,
    headerClassName: 'table__header__color',
  },
  {
    field: 'description',
    headerName: 'Descrição',
    flex: 2,
    headerClassName: 'table__header__color',
  },
  {
    field: 'category',
    headerName: 'Categoria',
    type: 'number',
    flex: 1,
    headerClassName: 'table__header__color',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridCellParams) => {
      const category = params.value;
      const color = colorsByCategory[category] || '#333';
      return <Chip label={category} style={{ backgroundColor: color, color: '#ffffff' }} />;
    },
  },
  {
    field: 'value',
    headerName: 'Valor',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    flex: 1,
    headerClassName: 'table__header__color',
  },
];

const rows = [
  {
    id: 1,
    situation: 'paga',
    payment: 'Débito',
    date: '03/03/2023',
    description: 'Garrafa de água - Shoppe',
    category: 'Outros',
    value: 'R$ 89,90',
  },
  {
    id: 2,
    situation: 'A pagar',
    payment: 'Crédito',
    date: '01/03/2023',
    description: 'Internet',
    category: 'Internet',
    value: 'R$ 89,90',
  },
  {
    id: 3,
    situation: 'paga',
    payment: 'Débito',
    date: '10/03/2023',
    description: 'Claro Flex',
    category: 'Internet',
    value: 'R$ 39,90',
  },
  {
    id: 4,
    situation: 'A pagar',
    payment: 'Crédito',
    date: '13/03/2023',
    description: 'Macbook Air',
    category: 'Trabalho',
    value: 'R$ 289,90',
  },
  {
    id: 5,
    situation: 'paga',
    payment: 'Débito',
    date: '01/03/2023',
    description: 'Aluguel',
    category: 'Aluguel',
    value: 'R$ 1.500',
  },
];

const Transactions = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <AllTransactions />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Transactions;
