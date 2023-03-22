import React from 'react';
import AllTransactions from '../../components/AllTransactions';
import RevenueDoughnutChart from '../../components/DoughnutChart/Revenue';
import BarChart from '../../components/ChartBar';
import Wrapper from '../../components/Wrapper';
import './styles.scss';

const Revenue = () => {
  return (
    <Wrapper>
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
      <AllTransactions type='revenues' />
    </Wrapper>
  );
};

export default Revenue;
