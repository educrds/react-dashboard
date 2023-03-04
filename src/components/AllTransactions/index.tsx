import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, ptBR } from '@mui/x-data-grid';
import { Check, Clear, CreditCard, PaidOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Tab, Tabs, Box, Chip } from '@mui/material';
import './styles.scss';

const colorsByCategory = {
  Outros: '#d3d3d3',
  Serviços: '#6B9DFE',
  Trabalho: '#0000ff',
  Aluguel: '#FFBC6E',
  Internet: '#FE797A',
};

const theme = createTheme({
  ptBR,
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: '.5rem',
          fontFamily: 'Poppins',
          padding: 0,
          minHeight: '36px',
          fontSize: '.8rem',
          color: '#BFBFBF',
          '&.Mui-selected': {
            backgroundColor: '#215DBE',
            color: '#F2F5FC',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        indicator: {
          backgroundColor: 'red',
          display: 'none',
        },
      },
    },
  },
});

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
        return <Chip icon={<PaidOutlined fontSize='small' />} label='Débito' variant='outlined' />;
      }
      return <Chip icon={<CreditCard fontSize='small' />} label='Crédito' variant='outlined' />;
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
  {
    id: 6,
    situation: 'Receita',
    payment: 'PIX',
    date: '01/03/2023',
    description: 'Salário',
    category: 'Receita',
    value: 'R$ 3.500',
  },
  {
    id: 7,
    situation: 'Receita',
    payment: 'PIX',
    date: '01/03/2023',
    description: 'Freelancer',
    category: 'Receita',
    value: 'R$ 1.500',
  },
];

const AllTransactions = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tableData, setTableData] = useState(rows);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);

  useEffect(() => {
    if (selectedTab === 0) {
      setTableData(rows);
    } else if (selectedTab === 1) {
      setTableData(rows.filter(row => row.situation !== 'Receita'));
    } else if (selectedTab === 2) {
      setTableData(rows.filter(row => row.situation === 'Receita'));
    }
  }, [selectedTab]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='change__transaction__type'>
          <h2>Transações</h2>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label='Tudo' />
                <Tab label='Despesas' />
                <Tab label='Receitas' />
              </Tabs>
            </Box>
          </Box>
        </div>
        <DataGrid rows={tableData} columns={columns} autoHeight />
      </ThemeProvider>
    </>
  );
};

export default AllTransactions;