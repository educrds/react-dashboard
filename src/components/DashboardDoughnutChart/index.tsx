import React from 'react';
import DashboardItem from '../DashboardItem';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './styles.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Serviços', 'Aluguel', 'Casa', 'Lazer', 'Internet', 'Mercado'],
  datasets: [
    {
      data: [300, 2000, 500, 500, 89, 750],
      backgroundColor: ['#6B9DFE', '#FFBC6E', '#5D3882', '#B494FF', '#FE797A', '#FF7EA5'],
      hoverOffset: 4,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  borderRadius: 5,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          size: 13,
          family: 'Poppins',
        },
        usePointStyle: true,
        padding: 15,
      },
    },
    title: {
      display: true,
      align: 'start',
      text: 'Receitas por categoria',
      font: {
        size: 18,
        family: 'Poppins',
        weight: '500',
      },
    },
  },
};

const DashboardDoughnutChart = () => {
  return (
    <DashboardItem>
      <Doughnut options={options} data={data} />
    </DashboardItem>
  );
};

export default DashboardDoughnutChart;
