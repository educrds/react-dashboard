import React from 'react';
import { Bar } from 'react-chartjs-2';
import { options, data } from '../../charts/chartConfig';
import DashboardItem from '../DashboardItem';
import './styles.scss';

const DashboardBarChart = () => {
  return (
    <DashboardItem>
      <div style={{ width: '100%' }}>
        <Bar options={options} data={data} />
      </div>
    </DashboardItem>
  );
};

export default DashboardBarChart;
