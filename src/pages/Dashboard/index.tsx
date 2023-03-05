import React, { useContext } from 'react';
import DashboardOverview from '../../components/DashboardOverview';
import BarChart from '../../components/ChartBar';
import AllTransactions from '../../components/AllTransactions';
import { NavbarContext } from '../../contexts/NavbarContext';
import './styles.scss';
import ExpenseDoughnutChart from '../../components/DoughnutChart/Expenses';
import RevenueDoughnutChart from '../../components/DoughnutChart/Revenue';

const data = [
  {
    label: 'Receitas',
    data: [2000, 3000, 2500, 4500, 3500, 4000, 1000, 1500, 2000, 2500, 1800, 3000],
    backgroundColor: '#bcffc6',
    borderRadius: 5,
  },
  {
    label: 'Despesas',
    data: [1000, 1500, 2000, 2500, 1800, 3000, 1000, 1750, 1000, 1500, 2800, 3000],
    backgroundColor: '#ff8c8c',
    borderRadius: 5,
  },
];

const Dashboard = () => {
  const { collapsed } = useContext(NavbarContext);

  return (
    <div className={`wrapper ${collapsed && 'collapsed'}`}>
      <MenuBar />
      <DashboardOverview />
      <BarChart title='Receitas | Despesas' datasets={data} />
      <div className='doughnut__charts'>
        <ExpenseDoughnutChart />
        <RevenueDoughnutChart />
      </div>
      <AllTransactions />
    </div>
  );
};

const MenuBar = () => {
  return (
    <div className='dashboard__bar'>
      <h1>Dashboard</h1>
      <img
        src='https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png'
        alt='profile photo'
      />
    </div>
  );
};

export default Dashboard;
