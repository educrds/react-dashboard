import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, ptBR } from '@mui/x-data-grid';
import { DeleteOutlineRounded, EditOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Tab, Tabs, Box, Chip } from '@mui/material';
import { categoryColors } from '../../charts/doughnutChartConfig';
import PaymentChip from '../PaymentChip';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import moment from 'moment';
import { deleteDocument } from '../../services/transactions';
import './styles.scss';

const theme = createTheme({
  ptBR,
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          color: '#666',
          backgroundColor: '#fcfcfc',
          borderRadius: '0.5rem',
        },
      },
    },
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
            fontWeight: 600,
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
          display: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          height: '30px',
          fontWeight: 500,
        },
      },
    },
  },
});

const columns: GridColDef[] = [
  {
    field: 'situation',
    headerName: 'Situação',
    flex: 1,
    headerClassName: 'table_header_color',
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      const { status, type } = params.row;
      if (type === 'expenses') {
        return <PaymentChip label={status ? 'Paga' : 'Não paga'} />;
      }
      return <PaymentChip label={status ? 'Recebida' : 'Não recebida'} />;
    },
  },
  {
    field: 'date',
    headerName: 'Data',
    flex: 1,
    headerClassName: 'table_header_color',
    valueGetter: params => moment.unix(params.value).format('DD/MM/YYYY'),
  },
  {
    field: 'description',
    headerName: 'Descrição',
    flex: 2,
    headerClassName: 'table_header_color',
  },
  {
    field: 'category',
    headerName: 'Categoria',
    type: 'number',
    flex: 1,
    headerClassName: 'table_header_color',
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridCellParams) => {
      const category = params.value;
      const color = categoryColors[category] || '#333';
      return <Chip label={category} style={{ backgroundColor: color, color: '#ffffff' }} />;
    },
  },
  {
    field: 'value',
    headerName: 'Valor',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    flex: 1,
    headerClassName: 'table_header_color',
    valueFormatter: ({ value }) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
  },
];

// Função para obter todas as transactions (expenses e revenues)
const getAllTransactions = async (uid: string) => {
  const querySnapshot = await getDocs(collection(db, `transactions/${uid}/user_transactions`));
  const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return transactions;
};

const AllTransactions = ({ type }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setSelectedTab(newValue);

  const fetchData = async () => {
    const transactions = await getAllTransactions('iVmUSglTCiR0GvPdWNzMzstEb3R2');
    setAllTransactions(transactions);
  };

  const filterRows = () => {
    const filterByType = row => {
      if (selectedTab === 1) {
        return row.type === 'expenses';
      }
      if (selectedTab === 2) {
        return row.type === 'revenues';
      }
      if (type === 'expenses') {
        return row.type === 'expenses';
      }
      if (type === 'revenues') {
        return row.type === 'revenues';
      }
      return true;
    };

    const filteredTransactions = allTransactions.filter(filterByType);
    setTableData(filteredTransactions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRows();
  }, [selectedTab, allTransactions, type]);

  return (
    <ThemeProvider theme={theme}>
      <div className='transaction_type'>
        <h2>Transações</h2>
        {type !== 'revenues' && type !== 'expenses' && (
          <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
            {selectedRow && (
              <DeleteOutlineRounded fontSize='small' onClick={() => handleDelete(selectedRow.id)} />
            )}
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label='Tudo' />
              <Tab label='Despesas' />
              <Tab label='Receitas' />
            </Tabs>
          </Box>
        )}
      </div>
      <TransactionsTable tableData={tableData} columns={columns} setSelectedRow={setSelectedRow} />
    </ThemeProvider>
  );
};

interface TransactionsTableProps {
  tableData: GridRowData[];
  columns: GridColDef[];
  setSelectedRow: (rowId: number) => void;
}

function TransactionsTable({ tableData, columns, setSelectedRow }: TransactionsTableProps) {
  const handleRowSelectionChange = selectedRows => setSelectedRow(selectedRows[0]);
  return (
    <DataGrid
      rows={tableData}
      columns={columns}
      autoHeight
      onRowSelectionModelChange={handleRowSelectionChange}
    />
  );
}

export default AllTransactions;
