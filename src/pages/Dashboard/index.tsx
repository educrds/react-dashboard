import React from 'react';
import DashboardOverview from '../../components/DashboardOverview';
import BarChart from '../../components/ChartBar';
import AllTransactions from '../../components/AllTransactions';
import ExpenseDoughnutChart from '../../components/DoughnutChart/Expenses';
import RevenueDoughnutChart from '../../components/DoughnutChart/Revenue';
import Wrapper from '../../components/Wrapper';
import './styles.scss';

const data = [
  {
    label: 'Receitas',
    data: [2000, 3000, 2500, 4500, 3500, 4000, 1000, 1500, 2000, 2500, 1800, 3000],
    backgroundColor: '#60d394',
  },
  {
    label: 'Despesas',
    data: [1000, 1500, 2000, 2500, 1800, 3000, 1000, 1750, 1000, 1500, 2800, 3000],
    backgroundColor: '#ee6055',
  },
];

const Dashboard = () => {
  return (
    <Wrapper>
      <MenuBar />
      <DashboardOverview />
      <Charts />
      <AllTransactions />
    </Wrapper>
  );
};

const Charts = () => {
  return (
    <>
      <div>
        <h3>Receitas | Despesas</h3>
        <BarChart title='Receitas | Despesas' datasets={data} />
      </div>
      <div className='doughnut__charts__container'>
        <div>
          <h3>Despesas por categoria</h3>
          <ExpenseDoughnutChart />
        </div>
        <div>
          <h3>Receitas por categoria</h3>
          <RevenueDoughnutChart />
        </div>
      </div>
    </>
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
