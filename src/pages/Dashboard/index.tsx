import React from 'react';
import './styles.scss';
import DashboardOverview from '../../components/DashboardOverview';
import DashboardBarChart from '../../components/DashboardChartBar';
import DashboardDoughnutChart from '../../components/DashboardDoughnutChart';
import AllTransactions from '../../components/AllTransactions';
import Wrapper from '../../components/Wrapper';

const Dashboard = () => {
  return (
    <>
      <Wrapper>
        <MenuBar />
        <DashboardOverview />
        <DashboardBarChart />
        <div className='doughnut__charts'>
          <DashboardDoughnutChart />
          <DashboardDoughnutChart />
        </div>
        <AllTransactions />
      </Wrapper>
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
