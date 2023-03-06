import React, { useContext } from 'react';
import AllTransactions from '../../components/AllTransactions';
import { NavbarContext } from '../../contexts/NavbarContext';
import BarChart from '../../components/ChartBar';
import ExpenseDoughnutChart from '../../components/DoughnutChart/Expenses';
import './styles.scss';

const Expenses = () => {
  const { collapsed } = useContext(NavbarContext);

  return (
    <div className={`wrapper ${collapsed && 'collapsed'}`}>
      <h2>Despesas</h2>
      <div className='revenue__charts'>
        <ExpenseDoughnutChart />
        <BarChart
          title='Despesas'
          datasets={[
            {
              label: 'Despesas',
              data: [1000, 1500, 2000, 2500, 1800, 3000, 2500, 3000, 1000],
              backgroundColor: '#ee6055'
            },
          ]}
        />
      </div>
      <AllTransactions />
    </div>
  );
};

export default Expenses;
