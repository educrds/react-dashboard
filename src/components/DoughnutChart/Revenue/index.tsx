import React from 'react';
import DoughnutChart from '..';

const RevenueDoughnutChart = () => {
  const title = 'Receitas por categoria';
  const labels = ['Mensalidades', 'Freelancer'];
  const data = [3000, 2000];
  const colors = ['#6B9DFE', '#FFBC6E', '#5D3882', '#B494FF', '#FE797A', '#FF7EA5'];

  return <DoughnutChart title={title} labels={labels} data={data} colors={colors} />;
};

export default RevenueDoughnutChart;
