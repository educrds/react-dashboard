import React from 'react';
import { Bar } from 'react-chartjs-2';
import { options, data } from '../../charts/barChartConfig';
import DashboardItem from '../DashboardItem';
import './styles.scss';

const BarChart = () => {
  return (
    <DashboardItem>
      <div style={{ width: '100%' }}>
        <Bar options={options} data={data} />
      </div>
    </DashboardItem>
  );
};

export default BarChart;
