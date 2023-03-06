import React from 'react';
import DoughnutChart from '..';

const ExpenseDoughnutChart = () => {
  const title = 'Despesas por categoria';
  const labels = ['Serviços', 'Aluguel', 'Casa', 'Lazer', 'Internet', 'Mercado'];
  const data = [300, 2000, 500, 500, 89, 750];

  return <DoughnutChart title={title} labels={labels} data={data} />;
};

export default ExpenseDoughnutChart;
