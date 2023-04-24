import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, ptBR } from '@mui/x-data-grid';
import { DeleteOutlineRounded, EditOutlined, KeyboardArrowDownRounded } from '@mui/icons-material';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  createTheme,
  ThemeProvider,
  Button,
  MenuItem,
} from '@mui/material';
import { StyledMenu } from '../../pages/Dashboard';
import { categoryColors } from '../../charts/doughnutChartConfig';
import PaymentChip from '../PaymentChip';
import moment from 'moment';
import { deleteDocumentById, getTransactions } from '../../services/transactions/selectors';
import { useSelector, useDispatch } from 'react-redux';
import AddTransactionModal from '../AddTransactionModal';
import './styles.scss';

const theme = createTheme(
  {
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
  },
  ptBR
);

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
    flex: 1,
    headerClassName: 'table_header_color',
    valueFormatter: params => {
      const words = params.value.split(' ');
      const capitalizedWords = words.map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      return capitalizedWords.join(' ');
    },
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

const AllTransactions = ({ type, month }: PropsAllTransactions) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const transactions = useSelector((state: any) => state.transactions.transactions);
  const transactionsByMonth = useSelector((state: any) => state.transactions.transactionsByMonth);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleTabChange = (event: React.SyntheticEvent) => {
    handleClose();
    setSelectedValue(event.currentTarget.getAttribute('value') || '');
  };

  const filterRowsByType = (row: any) => {
    if (selectedValue === 'Despesas') {
      return row.type === 'expenses';
    }
    if (selectedValue === 'Receitas') {
      return row.type === 'revenues';
    }
    return true;
  };

  const filterRows = () => {
    // problema de renderizar automatico apos CRUD aqui
    const filteredTransactions = transactionsByMonth.filter(filterRowsByType);
    setTableData(filteredTransactions);
  };

  useEffect(() => {
    dispatch(getTransactions(type));
  }, [dispatch, month]);

  useEffect(() => {
    filterRows();
  }, [transactions, selectedValue, type]);
  
  const handleEdit = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleDelete = () => dispatch(deleteDocumentById(selectedRow));

  return (
    <ThemeProvider theme={theme}>
      <div className='transaction_type'>
        <h2>Transações</h2>
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
          {selectedRow && <EditMenu handleDelete={handleDelete} handleEdit={handleEdit} />}
          {!type && (
            <div>
              <Button
                id='demo-customized-button'
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                variant='contained'
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownRounded />}
                sx={{ textTransform: 'capitalize', borderRadius: '.5rem', fontSize: '1rem' }}
              >
                {selectedValue || 'Tudo'}
              </Button>
              <StyledMenu
                id='demo-customized-menu'
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleTabChange} value={'Tudo'}>
                  Tudo
                </MenuItem>
                <MenuItem onClick={handleTabChange} value={'Despesas'}>
                  Despesas
                </MenuItem>
                <MenuItem onClick={handleTabChange} value={'Receitas'}>
                  Receitas
                </MenuItem>
              </StyledMenu>
            </div>
          )}
        </Box>
      </div>
      <TransactionsTable
        key={selectedValue}
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
          height: 42,
          alignItems: 'center',
          width: 'fit-content',
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '.5rem',
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1.5,
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
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'date',
      sort: 'desc',
    },
  ]);

  const handleRowSelectionChange = selectedRows => {
    const selectedRow = tableData.find(row => row.id === selectedRows[0]);
    setSelectedRow(selectedRow);
  };

  return (
    <DataGrid
      rows={tableData}
      columns={columns}
      autoHeight
      columnHeaderHeight={50}
      disableColumnSelector
      initialState={{
        ...tableData.initialState,
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      sortModel={sortModel}
      onSortModelChange={model => setSortModel(model)}
      pageSizeOptions={[5, 10, 15, 25]}
      onRowSelectionModelChange={handleRowSelectionChange}
    />
  );
};

export default AllTransactions;
