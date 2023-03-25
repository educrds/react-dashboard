import React from 'react';
import DashboardOverview from '../../components/DashboardOverview';
import BarChart from '../../components/ChartBar';
import AllTransactions from '../../components/AllTransactions';
import { ExpenseDoughnutChart } from '../Expense';
import { RevenueDoughnutChart } from '../Revenue';
import Wrapper from '../../components/Wrapper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import './styles.scss';

const Dashboard = () => {
  const transactions = useSelector((state: any) => state.transactions.transactions);
  const revenuesData = Array(12).fill(0);
  const expensesData = Array(12).fill(0);

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
      <MenuBar />
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
        chart={<BarChart title='Receitas | Despesas' datasets={data} />}
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

const MenuBar = () => {
  return (
    <div className='dashboard__bar'>
      <h2>Dashboard</h2>
      <img
        src='https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png'
        alt='profile photo'
      />
    </div>
  );
};

export default Dashboard;
