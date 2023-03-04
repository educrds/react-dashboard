import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Check, Clear } from '@mui/icons-material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import Chip from '@mui/material/Chip';
import './styles.scss';

const columns: GridColDef[] = [
  {
    field: 'situation',
    headerName: 'Situação',
    flex: .7,
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
    flex: 1.5,
    headerClassName: 'table__header__color',
    sortable: true,
    renderCell: (params: GridValueGetterParams) => {
      const paymentMethod = params.row.payment;
      if (paymentMethod === 'Débito') {
        return <Chip icon={<PaidIcon fontSize='small' />} label='Débito' variant='outlined' />;
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
      const colorsByCategory = {
        Outros: '#555',
        Serviços: '#6B9DFE',
        Trabalho: '#0000ff',
        Aluguel: '#FFBC6E',
        Internet: '#FE797A',
      };
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

const DashboardTransactions = () => {
  return (
    <>
      <h3>Transaçoes</h3>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
        />
      </div>
    </>
  );
};

export default DashboardTransactions;
