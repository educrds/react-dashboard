import React from 'react';
import DashboardItem from '../DashboardItem';
import { Doughnut } from 'react-chartjs-2';
import options, { categoryColors } from '../../charts/doughnutChartConfig';

type DoughnutChartProps = {
  title: string;
  labels: string[];
  data: number[];
  colors: string[];
  backgroundColor: string[];
};

const labelCenter = {
  beforeDatasetsDraw(chart) {
    const { ctx } = chart;
    const total = `R$ ${chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0)}`;
    const fontSize = 16;
    ctx.font = `medium ${fontSize}px Poppins`;
    ctx.textAlign = 'center';
    ctx.baseline = 'middle';
    ctx.fillStyle = '#bfbfbf';
    const x = chart.getDatasetMeta(0).data[0].x;
    const y = chart.getDatasetMeta(0).data[0].y;
    ctx.fillText(total, x, y);
    ctx.save();
  },
};

const DoughnutChart = ({ title, labels, data }: DoughnutChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map(label => categoryColors[label]),
      },
    ],
  };

  const chartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: { ...options.plugins.title, text: title },
    },
  };

  return (
    <DashboardItem>
      <Doughnut options={chartOptions} data={chartData} plugins={[labelCenter]} />
    </DashboardItem>
  );
};

export default DoughnutChart;
