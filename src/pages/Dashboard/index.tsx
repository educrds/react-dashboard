import React, { useState, useEffect } from 'react';
import DashboardOverview from '../../components/DashboardOverview';
import ChartBar from '../../components/ChartBar';
import AllTransactions from '../../components/AllTransactions';
import { ExpenseDoughnutChart } from '../Expense';
import { RevenueDoughnutChart } from '../Revenue';
import Wrapper from '../../components/Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import { MenuItem, Menu, Button, styled, alpha } from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { labels } from '../../charts/barChartConfig';
import { getTransactionsByMonth } from '../../services/redux/transactions/selectors';
import './styles.scss';

const uid = localStorage.getItem('@Auth:uid');

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const transactions = useSelector((state: any) => state.transactions.transactions);
  const dispatch = useDispatch();

  const revenuesData = Array(12).fill(0);
  const expensesData = Array(12).fill(0);

  const handleMonthChange = month => {
    dispatch(getTransactionsByMonth(month));
    setSelectedMonth(month);
  };

  const getInfosUser = async () => {
    const infosUserQuery = collection(db, `transactions/${uid}/user_infos`);
    const infosUser = await getDocs(infosUserQuery);
    const { photoUrl } = infosUser.docs[0].data();
    setUserPhoto(photoUrl);
  };

  useEffect(() => {
    getInfosUser();
  }, []);

  useEffect(() => {
    const mesAtual = moment().month() + 1;
    dispatch(getTransactionsByMonth(mesAtual));
  }, [transactions]);

  transactions.forEach((transaction: any) => {
    const month = moment.unix(transaction.date).month();
    if (transaction.type === 'revenues') {
      revenuesData[month] += transaction.value;
    } else if (transaction.type === 'expenses') {
      expensesData[month] += transaction.value;
    }
  });

  const data = [
    { label: 'Receitas', data: revenuesData, backgroundColor: '#60d394' },
    { label: 'Despesas', data: expensesData, backgroundColor: '#ee6055' },
  ];

  return (
    <Wrapper>
      <MenuBar handleMonthChange={handleMonthChange} photo={userPhoto} />
      <DashboardOverview />
      <Charts data={data} />
      <AllTransactions />
    </Wrapper>
  );
};

const Charts = ({ data }: { data: any }) => {
  return (
    <>
      <Chart
        title='Receitas | Despesas'
        chart={<ChartBar title='Receitas | Despesas' datasets={data} />}
      />
      <div className='doughnut__charts__container'>
        <Chart title='Despesas por categoria' chart={<ExpenseDoughnutChart />} />
        <Chart title='Receitas por categoria' chart={<RevenueDoughnutChart />} />
      </div>
    </>
  );
};

interface ChartProps {
  title: string;
  chart: React.ReactNode;
}

const Chart = ({ title, chart }: ChartProps) => {
  return (
    <div>
      <h3>{title}</h3>
      {chart}
    </div>
  );
};

interface Props {
  handleMonthChange: (month: string) => void;
  photo: string;
}

const MenuBar: React.FC<Props> = ({ handleMonthChange, photo }) => {
  return (
    <div className='dashboard__bar'>
      <div>Dashboard</div>
      <MonthDropdown handleMonthChange={handleMonthChange} />
      <div>
        <img src={photo} alt='profile photo' />
      </div>
    </div>
  );
};

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '.5rem',
    marginTop: theme.spacing(1),
    minWidth: 135,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const MonthDropdown = ({ handleMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    const month = Number(event.target.id);
    setSelectedMonth(event.target.textContent);
    handleClose();
    handleMonthChange(month);
  };

  return (
    <>
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
          sx={{ textTransform: 'capitalize', borderRadius: '.5rem' }}
        >
          {selectedMonth}
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
          {labels.map((label, index) => (
            <MenuItem onClick={handleMenuItemClick} value={label} key={index} id={index + 1}>
              {label}
            </MenuItem>
          ))}
        </StyledMenu>
      </div>
    </>
  );
};

export default Dashboard;
