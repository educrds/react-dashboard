import React from 'react';
import DoughnutChart from '..';

const ExpenseDoughnutChart = () => {
  const title = 'Despesas por categoria';
  const labels = ['Serviços', 'Aluguel', 'Casa', 'Lazer', 'Internet', 'Mercado'];
  const data = [300, 2000, 500, 500, 89, 750];
  const colors = ['#6B9DFE', '#FFBC6E', '#5D3882', '#B494FF', '#FE797A', '#FF7EA5'];

  return (
    <DoughnutChart title={title} labels={labels} data={data} colors={colors} />
  );
};

export default ExpenseDoughnutChart;
