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
  elements: {
    bar: {
      borderRadius: 0,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end',
      labels: {
        color: '#bfbfbf',
        font: {
          size: 13,
          family: 'Poppins',
        },
        usePointStyle: true,
        padding: 10,
      },
    },
    tooltip: {
      usePointStyle: true,
    },
  },
  scales: {
    y: {
      border: {
        dash: [5, 6],
        display: false,
      },
      grid: {
        drawTicks: false,
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

export { options, labels };
