import React from 'react';
import { Bar } from 'react-chartjs-2';
import DashboardItem from '../DashboardItem';
import { options, labels } from '../../charts/barChartConfig';
import './styles.scss';

type BarChartProps = {
  title: string;
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
};

const BarChart = ({ title, datasets }: BarChartProps) => {
  const data = {
    labels,
    datasets,
  };

  const chartOptions = {
    ...options,
    plugins: { ...options.plugins, title: { ...options.plugins.title, text: title } },
  };

  return (
    <DashboardItem>
      <Bar options={chartOptions} data={data} />
    </DashboardItem>
  );
};

export default BarChart;
