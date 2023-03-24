import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, ptBR } from '@mui/x-data-grid';
import { DeleteOutlineRounded, EditOutlined } from '@mui/icons-material';
import { Tab, Tabs, Box, Chip, Divider, IconButton, createTheme, ThemeProvider } from '@mui/material';
import { categoryColors } from '../../charts/doughnutChartConfig';
import PaymentChip from '../PaymentChip';
import moment from 'moment';
import { deleteDocumentById, getTransactions } from '../../services/transactions';
import { useSelector, useDispatch } from 'react-redux';
import AddTransactionModal from '../AddTransactionModal';
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
        scroller: {
          height: '100%',
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

interface PropsAllTransactions {
  type?: string;
}

const AllTransactions = ({ type }: PropsAllTransactions) => {
  const [uid] = useState('iVmUSglTCiR0GvPdWNzMzstEb3R2');
  const [selectedTab, setSelectedTab] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const allTransactions = useSelector((state: any) => state.transactions.transactions);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);

  const filterRowsByType = (row: any) => {
    if (selectedTab === 1) {
      return row.type === 'expenses';
    }
    if (selectedTab === 2) {
      return row.type === 'revenues';
    }
    return true;
  };

  const filterRows = () => {
    const filteredTransactions = allTransactions.filter(filterRowsByType);
    setTableData(filteredTransactions);
  };

  useEffect(() => {
    dispatch(getTransactions(uid));
  }, [dispatch, uid]);
  
  useEffect(() => {
    filterRows();
  }, [allTransactions, selectedTab, type]);
  

  const handleEdit = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleDelete = () => dispatch(deleteDocumentById(uid, selectedRow));

  return (
    <ThemeProvider theme={theme}>
      <div className='transaction_type'>
        <h2>Transações</h2>
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
          {selectedRow && <EditMenu handleDelete={handleDelete} handleEdit={handleEdit} />}
          {!type && (
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label='Tudo' />
              <Tab label='Despesas' />
              <Tab label='Receitas' />
            </Tabs>
          )}
        </Box>
      </div>
      <TransactionsTable
        key={selectedTab}
        tableData={tableData}
        columns={columns}
        setSelectedRow={setSelectedRow}
      />
      <AddTransactionModal
        onClose={handleCloseModal}
        open={showModal}
        transactionToEdit={selectedRow}
      />
    </ThemeProvider>
  );
};

const EditMenu = ({ handleDelete, handleEdit }) => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          height: 50,
          marginRight: '3vw',
          alignItems: 'center',
          width: 'fit-content',
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '.5rem',
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        <IconButton onClick={handleDelete} size='small'>
          <DeleteOutlineRounded fontSize='small' />
        </IconButton>
        <Divider orientation='vertical' />
        <IconButton onClick={handleEdit} size='small'>
          <EditOutlined fontSize='small' />
        </IconButton>
      </Box>
    </div>
  );
};

interface TransactionsTableProps {
  tableData: GridRowData[];
  columns: GridColDef[];
  setSelectedRow: (rowId: number) => void;
}

const TransactionsTable = ({ tableData, columns, setSelectedRow }: TransactionsTableProps) => {
  const handleRowSelectionChange = selectedRows => {
    const selectedRow = tableData.find(row => row.id === selectedRows[0]);
    setSelectedRow(selectedRow);
  };
  return (
    <DataGrid
      rows={tableData}
      columns={columns}
      autoHeight
      onRowSelectionModelChange={handleRowSelectionChange}
    />
  );
};

export default AllTransactions;
