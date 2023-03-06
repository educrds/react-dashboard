import React from 'react';
import DoughnutChart from '..';

const RevenueDoughnutChart = () => {
  const title = 'Receitas por categoria';
  const labels = ['Mensalidades', 'Outras receitas'];
  const data = [3000, 2000];

  return <DoughnutChart title={title} labels={labels} data={data} />;
};

export default RevenueDoughnutChart;
