import React, { useContext } from 'react';
import './styles.scss';
import DashboardOverview from '../../components/DashboardOverview';
import DashboardBarChart from '../../components/DashboardChartBar';
import DashboardDoughnutChart from '../../components/DashboardDoughnutChart';
import AllTransactions from '../../components/AllTransactions';
import { NavbarContext } from '../../contexts/NavbarContext';

const Dashboard = () => {
  const { collapsed } = useContext(NavbarContext);

  return (
    <>
      <div className={`wrapper ${collapsed && 'collapsed'}`}>
        <MenuBar />
        <DashboardOverview />
        <DashboardBarChart />
        <div className='doughnut__charts'>
          <DashboardDoughnutChart />
          <DashboardDoughnutChart />
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
