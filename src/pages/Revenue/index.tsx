import React from 'react';
import AllTransactions from '../../components/AllTransactions';
import ChartBar from '../../components/ChartBar';
import Wrapper from '../../components/Wrapper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DoughnutChart from '../../components/DoughnutChart';
import './styles.scss';

const Revenues = () => {
  const transactions = useSelector((state: any) => state.transactions.transactions);
  const revenuesData = Array(12).fill(0);

  transactions
    .filter((transaction: any) => transaction.type === 'revenues')
    .forEach((transaction: any) => {
      const month = moment.unix(transaction.date).month();
      revenuesData[month] += transaction.value;
    });

  return (
    <Wrapper>
      <h2>Receitas</h2>
      <div className='revenue__charts'>
        <RevenueDoughnutChart />
        <ChartBar
          title='Receitas'
          datasets={[
            {
              label: 'Receitas',
              data: revenuesData,
              backgroundColor: '#60d394',
            },
          ]}
        />
      </div>
      <AllTransactions type='revenues' />
    </Wrapper>
  );
};

export const RevenueDoughnutChart = () => {
  const title = 'Receitas por categoria';
  const transactions = useSelector((state: any) => state.transactions.transactionsByMonth);

  const revenuesByCategory = transactions.reduce((acc: any, curr: any) => {
    if (curr.type === 'revenues') {
      const category = curr.category;
      if (!acc[category]) {
        acc[category] = curr.value;
      } else {
        acc[category] += curr.value;
      }
    }
    return acc;
  }, {});

  const labels = Object.keys(revenuesByCategory);
  const data = Object.values(revenuesByCategory);

  return <DoughnutChart title={title} labels={labels} data={data} />;
};

export default Revenues;