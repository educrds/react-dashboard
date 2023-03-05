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
    tooltip: {
      usePointStyle: true,
    },
    title: {
      display: true,
      font: {
        size: 16,
        family: 'Poppins',
      },
      padding: {
        top: 20,
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 5,
      backgroundColor: '#215DBE',
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

export { options, labels };
