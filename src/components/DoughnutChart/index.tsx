import React from 'react';
import DashboardItem from '../DashboardItem';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './styles.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  title: string;
  labels: string[];
  data: number[];
  colors: string[];
};

const DoughnutChart = ({ title, labels, data, colors }: DoughnutChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        hoverOffset: 2,
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
        text: title,
        font: {
          size: 18,
          family: 'Poppins',
          weight: '500',
        },
      },
    },
  };

  return (
    <DashboardItem>
      <Doughnut options={options} data={chartData} />
    </DashboardItem>
  );
};

export default DoughnutChart;
