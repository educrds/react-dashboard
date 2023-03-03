import React from 'react';
import DashboardItem from '../DashboardItem';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import './styles.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  maintainAspectRatio: false, // Desativa a manutenção do aspect ratio
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: true,
      align: 'start',
      text: 'Receitas X Despesas',
    },
    tooltip: {
      usePointStyle: true,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Receita',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5000 })),
      backgroundColor: '#215dbe',
      borderRadius: 5, // defina o raio do canto arredondado
    },
    {
      label: 'Despesa',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      backgroundColor: '#DFF0FF',
      borderRadius: 5,
    },
  ],
};

const DashboardBarChart = () => {
  return (
    <DashboardItem>
      {/* <h3>Receitas X Despesas</h3> */}
      <div style={{ width: '100%' }}>
        <Bar options={options} data={data} />
      </div>
    </DashboardItem>
  );
};

export default DashboardBarChart;
