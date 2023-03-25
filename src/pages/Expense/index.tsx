import React from 'react';
import AllTransactions from '../../components/AllTransactions';
import BarChart from '../../components/ChartBar';
import Wrapper from '../../components/Wrapper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DoughnutChart from '../../components/DoughnutChart';
import './styles.scss';

const Expense = () => {
  const transactions = useSelector((state: any) => state.transactions.transactions);
  const expensesData = Array(12).fill(0);

  transactions
    .filter((transaction: any) => transaction.type === 'expenses')
    .forEach((transaction: any) => {
      const month = moment.unix(transaction.date).month();
      expensesData[month] += transaction.value;
    });

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
              data: expensesData,
              backgroundColor: '#ee6055',
            },
          ]}
        />
      </div>
      <AllTransactions type='expenses' />
    </Wrapper>
  );
};

export const ExpenseDoughnutChart = () => {
  const title = 'Despesas por categoria';
  const transactions = useSelector((state: any) => state.transactions.transactions);

  const expensesByCategory = transactions.reduce((acc: any, curr: any) => {
    if (curr.type === 'expenses') {
      const category = curr.category;
      if (!acc[category]) {
        acc[category] = curr.value;
      } else {
        acc[category] += curr.value;
      }
    }
    return acc;
  }, {});

  const labels = Object.keys(expensesByCategory);
  const data = Object.values(expensesByCategory);
  return <DoughnutChart title={title} labels={labels} data={data} />;
};

export default Expense;
