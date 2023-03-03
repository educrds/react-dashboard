import React from 'react';
import './styles.scss';
import DashboardOverview from '../../components/DashboardOverview';
import DashboardBarChart from '../../components/DashboardChartBar';

const Dashboard = () => {
  return (
    <div className='dashboard__container'>
      <MenuBar />
      <DashboardOverview />
      <DashboardBarChart />
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
