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
      grid: {
        drawTicks: false,
        display: false,
      },
      ticks: {
        font: {
          family: 'Poppins',
          size: 13,
        },
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

const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const data = {
  labels,
  datasets: [
    {
      label: 'Receitas',
      data: [2000, 3000, 2500, 4500, 3500, 4000, 1000, 1500, 2000, 2500, 1800, 3000],
      backgroundColor: '#bcffc6',
      borderRadius: 5,
    },
    {
      label: 'Despesas',
      data: [1000, 1500, 2000, 2500, 1800, 3000, 1000, 1750, 1000, 1500, 2800, 3000],
      backgroundColor: '#ff8c8c',
      borderRadius: 5,
    },
  ],
};

export { options, data };
