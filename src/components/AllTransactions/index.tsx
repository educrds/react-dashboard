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
import PaymentChip from '../PaymentChip';
import moment from 'moment';
import { deleteDocumentById, getTransactions } from '../../services/redux/transactions/selectors';
import { useSelector, useDispatch } from 'react-redux';
import AddTransactionModal from '../AddTransactionModal';
import { getCategories } from '../../services/redux/categories/selectors';
import './styles.scss';
import { getCategoryColors } from '../../charts/doughnutChartConfig';

const theme = createTheme(
  {
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

interface PropsAllTransactions {
  type?: string;
}

const AllTransactions = ({ type }: PropsAllTransactions) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [selectedTableRow, setSelectedRow] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [categoriesByColor, setCategoriesByColor] = useState(null);

  const categories = useSelector((state: any) => state.categories.categories);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const transactionsByMonth = useSelector((state: any) => state.transactions.transactionsByMonth);
  const transactions = useSelector((state: any) => state.transactions.transactions);

  const columns: GridColDef[] = [
    {
      field: 'situation',
      headerName: 'Situação',
      flex: 1,
      headerClassName: 'table_header_color',
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
            sortComparator: (date1, date2, params1, params2) => {
        // Converter as datas para o formato correto para comparação
        const convertedDate1 = moment(date1, 'DD/MM/YYYY');
        const convertedDate2 = moment(date2, 'DD/MM/YYYY');
    
        // Comparar as datas e retornar o resultado
        if (convertedDate1.isAfter(convertedDate2)) {
          return 1; // Retorna um número negativo para indicar que a primeira data é maior
        } else if (convertedDate1.isBefore(convertedDate2)) {
          return -1; // Retorna um número positivo para indicar que a primeira data é menor
        }
        return 0; // Retorna 0 se as datas forem iguais
      }
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
        const color = categoriesByColor[category] || '#333';
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
      cellClassName: params => {
        const type = params.row.type; // assuming the type is present in the row object
        return type === 'expenses' ? 'expenses_value' : 'revenues_value';
      },
    },
  ];

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
    if (type) {
      return row.type === type;
    }
    return true;
  };

  const filterRows = () => {
    if (type === 'all') {
      setTableData(transactions);
    } else {
      const filteredTransactions = transactionsByMonth.filter(filterRowsByType);
      setTableData(filteredTransactions);
    }
  };

  useEffect(() => {
    const fetchCategoryColors = async () => {
      try {
        const colors = await getCategoryColors(categories);
        setCategoriesByColor(colors);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    if (categories) {
      fetchCategoryColors();
    }
  }, [categories]);

  useEffect(() => {
    dispatch(getTransactions(type));
  }, [dispatch]);

  useEffect(() => {
    filterRows();
  }, [transactionsByMonth, selectedValue, type]);

  const handleEdit = () => setShowModal(true);
  const handleDelete = () => dispatch(deleteDocumentById(selectedTableRow));
  const handleCloseModal = () => setShowModal(false);

  return (
    <ThemeProvider theme={theme}>
      <div className='transaction_type'>
        <h2>Transações</h2>
        <Box sx={{ display: 'flex', textAlign: 'center', gap: '16px', alignItems: 'center' }}>
          {selectedTableRow && <EditMenu handleDelete={handleDelete} handleEdit={handleEdit} />}
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
        transactionToEdit={selectedTableRow}
      />
    </ThemeProvider>
  );
};

// Menu editar transação
const EditMenu = ({ handleDelete, handleEdit }) => {
  return (
    <>
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
        <DeleteButton onClick={handleDelete} />
        <Divider orientation='vertical' />
        <EditButton onClick={handleEdit} />
      </Box>
    </>
  );
};

// Botão deletar dentro do menu editar transação
const DeleteButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size='small'>
      <DeleteOutlineRounded fontSize='small' />
    </IconButton>
  );
};

// Botão editar dentro do menu editar transação
const EditButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size='small'>
      <EditOutlined fontSize='small' />
    </IconButton>
  );
};

interface TransactionsTableProps {
  tableData: GridRowData[];
  columns: GridColDef[];
  setSelectedRow: (rowId: number) => void;
}

const TransactionsTable = ({ tableData, columns, setSelectedRow }: TransactionsTableProps) => {
  const pageSizeOptions = [5, 10, 15, 25, tableData.length];
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'date',
      sort: 'desc',
    },
  ]);

  const handleChangeSelectedRow = idSelectedTableRow => {
    const selectedTableRowData = tableData.find(
      allTableData => allTableData.id === idSelectedTableRow[0]
    );
    setSelectedRow(selectedTableRowData);
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
      pageSizeOptions={pageSizeOptions}
      onRowSelectionModelChange={handleChangeSelectedRow}
    />
  );
};

export default AllTransactions;
