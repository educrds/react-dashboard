import React, { useContext } from 'react';
import DashboardOverview from '../../components/DashboardOverview';
import BarChart from '../../components/ChartBar';
import AllTransactions from '../../components/AllTransactions';
import { NavbarContext } from '../../contexts/NavbarContext';
import './styles.scss';
import ExpenseDoughnutChart from '../../components/DoughnutChart/Expenses';
import ReceivesDoughnutChart from '../../components/DoughnutChart/Receives';

const Dashboard = () => {
  const { collapsed } = useContext(NavbarContext);

  return (
    <>
      <div className={`wrapper ${collapsed && 'collapsed'}`}>
        <MenuBar />
        <DashboardOverview />
        <BarChart />
        <div className='doughnut__charts'>
          <ExpenseDoughnutChart />
          <ReceivesDoughnutChart />
        </div>
        <AllTransactions />
      </div>
    </>
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
