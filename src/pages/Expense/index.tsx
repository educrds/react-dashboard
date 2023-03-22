import React from 'react';
import AllTransactions from '../../components/AllTransactions';
import BarChart from '../../components/ChartBar';
import ExpenseDoughnutChart from '../../components/DoughnutChart/Expenses';
import Wrapper from '../../components/Wrapper';
import './styles.scss';

const Expenses = () => {
  return (
    <Wrapper>
      <h2>Despesas</h2>
      <div className='revenue__charts'>
        <ExpenseDoughnutChart />
        <BarChart
          title='Despesas'
          datasets={[
            {
              label: 'Despesas',
              data: [1000, 1500, 2000, 2500, 1800, 3000, 2500, 3000, 1000],
              backgroundColor: '#ee6055',
            },
          ]}
        />
      </div>
      <AllTransactions type='expenses' />
    </Wrapper>
  );
};

export default Expenses;
