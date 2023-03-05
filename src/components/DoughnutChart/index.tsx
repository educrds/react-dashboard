import React from 'react';
import DashboardItem from '../DashboardItem';
import { Doughnut } from 'react-chartjs-2';
import options from '../../charts/doughnutChartConfig';
import './styles.scss';

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

  const chartOptions = {
    ...options,
    plugins: { ...options.plugins, title: { ...options.plugins.title, text: title } },
  };

  return (
    <DashboardItem>
      <Doughnut options={chartOptions} data={chartData} />
    </DashboardItem>
  );
};

export default DoughnutChart;
