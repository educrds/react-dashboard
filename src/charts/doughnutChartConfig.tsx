import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  borderRadius: 5,
  plugins: {
    legend: {
      position: 'right',
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
      color: '#bfbfbf',
      font: {
        size: 18,
        family: 'Poppins',
        weight: '500',
      },
    },
  },
};

export default options;
