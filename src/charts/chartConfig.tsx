import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end',
      labels: {
        font: {
          size: 15,
          family: 'Poppins',
        },
        usePointStyle: true,
        padding: 15,
      },
    },
    title: {
      display: true,
      align: 'start',
      text: 'Receitas | Despesas',
      font: {
        size: 18,
        family: 'Poppins',
        weight: '500',
      },
    },
    tooltip: {
      usePointStyle: true,
    },
  },
  scales: {
    y: {
      ticks: {
        font: {
          family: 'Poppins',
          size: 13,
        },
      },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: {
        font: {
          family: 'Poppins',
          size: 12,
        },
      },
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

const data = {
  labels,
  datasets: [
    {
      label: 'Receitas',
      data: [2000, 3000, 2500, 4500, 3500, 4000, 1000, 1500, 2000, 2500, 1800, 3000],
      backgroundColor: '#52b788',
      borderRadius: 5,
    },
    {
      label: 'Despesas',
      data: [1000, 1500, 2000, 2500, 1800, 3000, 1000, 1750, 1000, 1500, 2800, 3000],
      backgroundColor: '#bc4749',
      borderRadius: 5,
    },
  ],
};

export { options, data };
