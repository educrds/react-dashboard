import React, { useContext } from 'react';
import AllTransactions from '../../components/AllTransactions';
import RevenueDoughnutChart from '../../components/DoughnutChart/Revenue';
import { NavbarContext } from '../../contexts/NavbarContext';
import BarChart from '../../components/ChartBar';
import './styles.scss';

const Revenue = () => {
  const { collapsed } = useContext(NavbarContext);

  return (
    <div className={`wrapper ${collapsed && 'collapsed'}`}>
      <h2>Receitas</h2>
      <div className='revenue__charts'>
        <RevenueDoughnutChart />
        <BarChart
          title='Receitas'
          datasets={[
            {
              label: 'Receitas',
              data: [1000, 1500, 2000, 2500, 1800, 3000, 2500, 3000, 1000],
              backgroundColor: '#60d394',
            },
          ]}
        />
      </div>
      <AllTransactions />
    </div>
  );
};

export default Revenue;
